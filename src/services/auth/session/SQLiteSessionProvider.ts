import { Session, type SessionId, type SessionProvider, type UserId } from "@/classes/auth";

import { db, Sessions, eq } from 'astro:db';

class SQLiteSessionProvider implements SessionProvider
{
    async fetch(identifier: string): Promise<Session | null> {
        const sessions = await db.select().from(Sessions).where(eq(Sessions.sessionId, identifier));
        console.log("Sessions", sessions);
        const session = sessions.shift() as {sessionId: string, userId: string};
        console.log("Session", session);
        
        return new Session(session.sessionId as SessionId, session.userId as UserId);
    }

    async store(element: Session): Promise<void> {        
        await db.insert(Sessions).values({sessionId: element.id, userId: element.userId});        
    }
}

export default new SQLiteSessionProvider;