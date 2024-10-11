import { AbstractBehaviour, type RequestBehaviour } from "../Behaviour";
import type { SessionManager } from "@/classes/auth";

export default class OnPrivateRouteRequested extends AbstractBehaviour<Request> implements RequestBehaviour
{

    constructor(subject: Request, protected sessionManager: SessionManager)
    {
        super(subject);
    }

    public async behave(): Promise<Response|null>
    {
        if (await this.sessionManager.isLoggedIn()){
            return null;
        } 
        
        return new Response(undefined,{status: 302, headers:{'Location':'/auth/login'}});
    }
}