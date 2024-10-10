// @ts-check
import fs from 'node:fs';
import { defineConfig, envField } from 'astro/config';
import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

const routes = JSON.parse(fs.readFileSync("./private/routes.json").toString());
const options = {
	key: fs.readFileSync("./private/server.key"),
	cert: fs.readFileSync("./private/server.crt")
}

// https://astro.build/config
export default defineConfig({
    routes,
    output: 'server',
    vite: { server: {https: options} },
    adapter: node({mode:'standalone'}),
    site: 'https://astro.dev',
    integrations: [db(), tailwind()],
    
    // Please refer to https://github.com/withastro/roadmap/blob/main/proposals/0049-astro-env.md
    // and also https://docs.astro.build/en/reference/configuration-reference/#experimentalenv
    experimental: {
        // Environment Vars
        env: {
            schema: {
                // Platform
                APP_DOMAIN: envField.string({ access: "public", context: "client"}),
                // Session
                SESSION_MODE: envField.enum({ access: "secret", context: "server", values: ['COOKIE'], default: 'COOKIE'}),
                SESSION_STORAGE: envField.enum({ access: "secret", context: "server", values: ['SQLITE', 'NONE', 'BACKEND'], default: 'SQLITE'}),
                SESSION_SESSIONID_KEY: envField.string( { access: "public", context: "client", min: 5, max: 255, default: "sessionId" }),
                SESSION_MAX_AGE: envField.number({ access: "secret", context: "server", gt: 60*60-1, lt: 60*60*24*400+1, default: 60*60*24*400, int: true }),
                SESSION_SALT: envField.string({ access: "secret", context: "server" }),
            }
        }
    }
});
