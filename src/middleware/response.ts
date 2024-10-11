import { defineMiddleware } from "astro:middleware"
import { typeOfRequest, type RequestType }  from "@/classes/server";

export const ResponseMiddleware = defineMiddleware( async (context, next)=>{
    const requestType = typeOfRequest(context.request);
    let response = await next();

    switch(requestType){
        case "FETCH":
            if (context.request.headers.get('accept') !== 'application/json'){
                return response;
            }
            response.headers.set('Content-Type','application/json');

            if (response.status >= 300 && response.status < 400){
                // When client uses fetch, the "Location" header is missed intentionally (as a header), but is returned to client via body
                // please read https://fetch.spec.whatwg.org/#concept-request-redirect-mode
                // and consider that providing no "Location" when responding with a Redirect HTTP Status Code, avoids fetch method to "follow" the initial request
                // so the following body is returned (containing the Location where to got in the "redirect" value)

                // A different approach that must be considered in endpoints is responding with a 200 HTTP Status Code containing a header leading the client to the url
                response = new Response(
                    // Body
                    JSON.stringify(
                        {"redirect": response.headers.get('Location')}
                    ), 
                    // Headers
                    {
                        status: response.status,
                        headers: {'Content-Type':'application/json'} 
                    }
                );
            }
        default:
            
    }

    return response;
});