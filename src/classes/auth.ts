import { Buffer } from 'buffer';

export type SessionId = string;
export type Email = string;
export type UserId = Email;
export type Password = string;

export type Credentials = {
    email: Email,
    password: Password
}

export class Session {

    public readonly id: SessionId;

    constructor(public readonly userId: UserId, sessionId: SessionId | SessionIdGenerator){
        if (sessionId instanceof SessionIdGenerator){
            this.id = sessionId.generate(userId)            

            return;
        }
        this.id = sessionId;
    }
}

export class SessionIdGenerator{
    constructor(private salt: string){}

    generate(userId: UserId): SessionId
    {
        const randomString = Math.random().toString(36).substring(2, 14);
        const timestamp = Date.now().toString();
        const sessionData = `${randomString}|${timestamp}|${userId}|${this.salt}`;       
        
        return Buffer.from(sessionData).toString('base64') as SessionId;
    }
}

interface Provider<T> {
    fetch(identifier: string): Promise<T|null>,
    store(element: T): Promise<void>
}

export interface SessionManager {
    isLoggedIn(): Promise<boolean>,
    login(credentials: Credentials): Promise<SessionId>,
    logout(): Promise<void>,
}

export interface SessionProvider extends Provider<Session>{}

export class User {    
    constructor(readonly id: UserId, readonly password: Password){}
}

export interface UserProvider extends Provider<User>{}

