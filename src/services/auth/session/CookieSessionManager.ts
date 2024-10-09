import { Session, SessionIdGenerator, type Credentials, type SessionId, type SessionManager, type SessionProvider, type UserId } from "@/classes/auth";
import type { AstroCookies } from "astro";
import { SESSION_SALT, SESSION_MAX_AGE } from "astro:env/server";
import { SESSION_SESSIONID_KEY, APP_DOMAIN } from "astro:env/client";

export default class CookieSessionManager implements SessionManager
{    
    constructor(private readonly cookies: AstroCookies, private provider: SessionProvider )
    {}

    public async isLoggedIn(): Promise<boolean> {
        if (! this.cookies.has(SESSION_SESSIONID_KEY)){
            return new Promise(()=>false);
        }

        const sessionId = this.cookies.get(SESSION_SESSIONID_KEY)?.value;

        return this.provider.fetch(sessionId as string).then((session)=>(session instanceof Session));        
    }

    public async login(credentials: Credentials): Promise<SessionId> {
        const generator = new SessionIdGenerator(SESSION_SALT);
        const session = new Session(credentials.email as UserId, generator);
        
        this.cookies.set(SESSION_SESSIONID_KEY,session.id as string, { httpOnly: true, path: '/', domain: APP_DOMAIN, maxAge: SESSION_MAX_AGE });

        return this.provider.store(session).then(()=>session.id);        
    }

    public async logout(): Promise<void> {
        return this.isLoggedIn().then((isLogged: boolean)=>{
            if(isLogged){ this.cookies.delete(SESSION_SESSIONID_KEY, { httpOnly: true, domain: APP_DOMAIN, path: '/' })} 
        });
    }

}