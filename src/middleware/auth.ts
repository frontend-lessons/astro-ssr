import { defineMiddleware } from "astro:middleware";
import type { Route, Routes } from "@/classes/server";
import SessionManagerBuilder from "../services/auth/SessionManagerBuilder";
import OnPrivateRouteRequested from "@/classes/middleware/behaviours/OnPrivateRouteRequestedBehaviour";

declare namespace App {
    interface Locals {
        routes: Routes
    }
}


function routeIsMatched(url : URL, routes: Routes): boolean
{   
    return routes.reduce(
        function(result: boolean, route: Route): boolean
        {
            if (result){
                return result;
            }

            var newResult = route.path instanceof RegExp 
                ? route.path.test(url.pathname)
                : (route.path.toLocaleLowerCase().localeCompare(url.pathname.toLocaleLowerCase())==0);

            return newResult;
        }, 
        false
    );
}

export const AuthMiddleware = defineMiddleware(async (context, next)=>{
    const url = context.url as URL;
    const sessionManager = SessionManagerBuilder.build(context);
    const onPrivateRouteRequested = new OnPrivateRouteRequested(context.request, sessionManager);
    
    // When a context.locals.routes (which are considered private) is requested
    // the according behaviour is performed
    if (routeIsMatched(url, (context.locals as App.Locals).routes)){        
        const result = await onPrivateRouteRequested.behave();
        // If behaviour performance results in a Response this is returned as middleware result
        if (!!result){
            return result;
        }
    }

    return next();
});
