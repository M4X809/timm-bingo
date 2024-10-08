/*
 * File: vite.config.ts
 * Project: timm-bingo
 * File Created: 27.08.2024, 23:08:57
 *
 * Last Modified: 13.09.2024, 20:09:29
 * Modified By: MAX809
 */

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

const viteCompressionFilter = /\.(js|mjs|json|css|html|svg)$/i;

export default defineConfig(() => {
	return {
		preview: {
			port: 5173,
		},

		build: {
			outDir: "./out", 

			emptyOutDir: true,
			manifest: true,
			rollupOptions: {
				output: {
					chunkFileNames: "assets/sl-[hash]-[name].js",
				},
			},

			chunkSizeWarningLimit: 1200,
			copyPublicDir: true,
			sourcemap: true,
		},
		plugins: [
			react(),
			viteCompression({
				algorithm: "gzip",
				filter: viteCompressionFilter,
			}),
		],
	};
});
