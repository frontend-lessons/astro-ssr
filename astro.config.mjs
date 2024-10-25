// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';


const HOSTNAME = process.env.HOSTNAME

const options = {
	key: fs.readFileSync("./private/server.key"),
	cert: fs.readFileSync("./private/server.crt")
}

// https://astro.build/config
export default defineConfig({
    output: 'server',
    vite: { server: {https: options} },
    adapter: node({mode:'standalone'}),
    site: `https://${HOSTNAME}}`,
    integrations: [tailwind()],
});
