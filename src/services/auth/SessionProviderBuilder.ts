import type { SessionProvider } from "@/classes/auth";
import { SESSION_STORAGE } from "astro:env/server";
import EphimerSessionProvider from "./session/EphimerSessionProvider";
import SQLiteSessionProvider from "./session/SQLiteSessionProvider";

class SessionProviderBuilder
{
    public build(): SessionProvider
    {
        switch(SESSION_STORAGE){
            case 'NONE':
                return EphimerSessionProvider;
            case 'SQLITE':
            default:
                return SQLiteSessionProvider;
        }
    }
}

export default new SessionProviderBuilder;