/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

/// <reference types="vite-plugin-svgr/client" />
import svgr from 'vite-plugin-svgr';

// function redirectFirebaseMessagingSw() {
// 	return {
// 		name: 'block-firebase-messaging-sw',
// 		configureServer(server) {
// 			server.middlewares.use((req, res, next) => {
// 				if (req.url === '/firebase-messaging-sw.js') {
// 					res.writeHead(302, { Location: '/' });
// 					res.end();
// 				} else {
// 					next();
// 				}
// 			});
// 		},
// 	};
// }

export default defineConfig({
	cacheDir: '../../node_modules/.vite/kwicon-app',

	define: {
		'process.env': {
			// API
			VITE_API_URL: process.env.VITE_API_URL,

			// AZURE
			VITE_IMAGE_SAS_TOKEN: process.env.VITE_IMAGE_SAS_TOKEN,
			VITE_COMMUNICATION_SERVICES_ENDPOINT: process.env.VITE_COMMUNICATION_SERVICES_ENDPOINT,

			// AUTH0
			VITE_APP_AUTH0_DOMAIN: process.env.VITE_APP_AUTH0_DOMAIN,
			VITE_APP_AUTH0_CLIENT_ID: process.env.VITE_APP_AUTH0_CLIENT_ID,

			// APP & WEBSITE URL
			VITE_APP_URL: process.env.VITE_APP_URL,
			VITE_WEBSITE_URL: process.env.VITE_WEBSITE_URL,

			// QUICKBLOX
			VITE_QB_APP_ID: process.env.VITE_QB_APP_ID,
			VITE_QB_AUTH_KEY: process.env.VITE_QB_AUTH_KEY,
			VITE_QB_AUTH_SECRET: process.env.VITE_QB_AUTH_SECRET,
			VITE_QB_ACCOUNT_KEY: process.env.VITE_QB_ACCOUNT_KEY,

			// FIREBASE
			VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
			VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
			VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
			VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
			VITE_FIREBASE_MESSAGING_SENDER_ID:
				process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
			VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
			VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID,
			VITE_FIREBASE_VAPI_KEY: process.env.VITE_FIREBASE_VAPI_KEY,
		},
	},

	server: {
		port: 4400,
		host: 'localhost',
	},

	preview: {
		port: 4500,
		host: 'localhost',
	},

	plugins: [
		react(),
		svgr(),
		// redirectFirebaseMessagingSw(),
		viteTsConfigPaths({
			root: '../../',
		}),
	],

	// Uncomment this if you are using workers.
	worker: {
		plugins: [
			viteTsConfigPaths({
				root: '../../',
			}),
		],
	},

	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
