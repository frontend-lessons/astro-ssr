// Authentication classes Module

import { Buffer } from 'buffer';
import { type Provider } from './common';

export type SessionId = string;
export type Email = string;
export type UserId = Email;
export type Password = string;
export type Credentials = {
    email: Email,
    password: Password
}

export interface Session {
    id: SessionId;
    userId: Email;
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

export function newSession(user: UserId, session: SessionId|SessionIdGenerator): Session {
    return {
        id: (session instanceof SessionIdGenerator) ? session.generate(user) : session ,
        userId: user as Email
    } as Session;
}

export interface SessionProvider extends Provider<Session>{}

export interface SessionManager {
    isLoggedIn(): Promise<boolean>,
    login(credentials: Credentials): Promise<SessionId>,
    logout(): Promise<void>,
}

export interface User {
    id: UserId;
    password?: Password;
}

export function newUser(email: Email, password?: Password): User {
    return {
        id: email as UserId,
        password,        
    } as User;
}

export interface UserProvider extends Provider<User>{}
