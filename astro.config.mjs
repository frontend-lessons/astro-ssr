// @ts-check
import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';



// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({mode:'standalone'}),
    site: 'https://astro.dev',
    integrations: [db(), tailwind()],
});
