import { Session, type SessionId, type SessionProvider, type UserId } from "@/classes/auth";

class EphimerSessionProvider implements SessionProvider {
    public async fetch(identifier: string): Promise<Session | null> { 
        const sessionId = identifier as SessionId;       

        return new Promise(()=>{
            return new Session('ephimer-user-id' as UserId, sessionId);
        });
    }

    public async store(element: Session): Promise<void> {
        return new Promise(()=>{});
    }
}

export default new EphimerSessionProvider();