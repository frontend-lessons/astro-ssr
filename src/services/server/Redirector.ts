import type { ValidRedirectStatus } from "astro";
import { typeOfRequest, type RequestType }  from "@/classes/server";


export default class Redirector{
    private requestType: RequestType;

    constructor(private astroRedirect: (path: string, status?: ValidRedirectStatus) => Response, request: Request){
        this.requestType = typeOfRequest(request);
    }

    public redirect(path: string, status?: ValidRedirectStatus): Response
    {
        switch(this.requestType){
            case "FETCH":
                return new Response(
                    JSON.stringify({
                       "action performed": 'login',
                       "redirect": path
                    }),{
                        status,
                    }
                  );
            default:
                return this.astroRedirect(path, status);
        }
    }   
}
