import { defineMiddleware } from "astro:middleware";
import type { Routes } from "@/classes/server";
import config from 'astro.config';

interface AstroUserConfig{
    routes : Routes
}

declare namespace App {
    interface Locals {
        routes: Routes
    }
}

const routes = (config as AstroUserConfig).routes;

export const RoutesMiddleware = defineMiddleware((context, next)=>{
    (context.locals as App.Locals).routes = routes.map<{path: string|RegExp}>((route)=>{
        var result = route.path;
        if (! (result instanceof RegExp)){ 
            if (result.length > 3 && result.at(0) === '/' && result.at(-1) === '/' && 
                (result.substring(0,3) === '/\\/' || result.search(/^\/[^\w]/) != -1)) {
                try {
                    result = new RegExp(result.replace(/^\/|\/$/g, ''));
                }catch(error){
                    console.log(error)
                    return { path: route.path };
                }
            }
        }
        return {path: result};
    });

    return next();
});