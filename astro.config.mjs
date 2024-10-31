// @ts-check
process.loadEnvFile()

import fs from 'node:fs';
import { defineConfig, envField } from 'astro/config';
import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { sessionPresets } from './private/sessionMode.mjs';

const HOSTNAME = process.env.HOSTNAME
const PORT = parseInt(process.env.PORT) 
const APP_MODE = process.env.APP_MODE;
const SESSION = sessionPresets(APP_MODE);

const options = {
	key: fs.readFileSync("./private/server.key"),
	cert: fs.readFileSync("./private/server.crt")
}

// https://astro.build/config
export default defineConfig({
    output: 'server',
    vite: { server: {https: options, port: PORT }},
    server: { port: PORT },
    adapter: node({mode:'standalone'}),
    site: `https://${HOSTNAME}}`,
    integrations: [db(), tailwind()],
    
    // Please refer to https://github.com/withastro/roadmap/blob/main/proposals/0049-astro-env.md
    // and also https://docs.astro.build/en/reference/configuration-reference/#experimentalenv
    experimental: {
        // Environment Vars
        env: {
            schema: {   
                // APP_MODE RELATED ENV VARS                
                SESSION_MODE: envField.enum({ context: "server", access: "public", values: ['COOKIE', 'LUCIA', 'JWT', 'AUTHJS'], default: SESSION.MODE}),
                SESSION_STORAGE: envField.enum({ context: "server", access: "secret", values: ['NONE', 'SQLITE', 'BACKEND'], default: SESSION.STORAGE}),
                OAUTH: envField.boolean({context: "client", access: "public", default: SESSION.OAUTH}),
                // AUTH RELATED ENV VARS
                SESSION_SALT: envField.string({ access: "secret", context: "server" }),

            },
            validateSecrets: true
        }
    }
});    
