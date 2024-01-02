/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

/// <reference types="vite-plugin-svgr/client" />
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/kwicon-website',

	define: {
		'process.env': {
			VITE_API_URL: process.env.VITE_API_URL,
			VITE_IMAGE_SAS_TOKEN: process.env.VITE_IMAGE_SAS_TOKEN,
			VITE_APP_AUTH0_DOMAIN: process.env.VITE_APP_AUTH0_DOMAIN,
			VITE_APP_AUTH0_CLIENT_ID: process.env.VITE_APP_AUTH0_CLIENT_ID,
			VITE_APP_URL: process.env.VITE_APP_URL,
			VITE_WEBSITE_URL: process.env.VITE_WEBSITE_URL,
			VITE_QB_APP_ID: process.env.VITE_QB_APP_ID,
			VITE_QB_AUTH_KEY: process.env.VITE_QB_AUTH_KEY,
			VITE_QB_AUTH_SECRET: process.env.VITE_QB_AUTH_SECRET,
			VITE_QB_ACCOUNT_KEY: process.env.VITE_QB_ACCOUNT_KEY,
		},
	},

	server: {
		port: 4200,
		host: 'localhost',
	},

	preview: {
		port: 4300,
		host: 'localhost',
	},

	plugins: [
		react(),
		svgr(),
		viteTsConfigPaths({
			root: '../../',
		}),
	],

	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
