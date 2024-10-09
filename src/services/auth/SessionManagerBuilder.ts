import type { SessionManager } from "@/classes/auth";
import type { APIContext } from "astro";
import { SESSION_MODE } from "astro:env/server";
import CookieSessionManager from "./session/CookieSessionManager";
import SessionProviderBuilder from "./SessionProviderBuilder";

class SessionManagerBuilder {
    build(context : APIContext): SessionManager
    {
        switch(SESSION_MODE.valueOf()){
            case 'COOKIE':
            default:
                return new CookieSessionManager(context.cookies, SessionProviderBuilder.build());
        }        
    }
}

export default new SessionManagerBuilder;