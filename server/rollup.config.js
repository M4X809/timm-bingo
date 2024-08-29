/*
 * File: rollup.config.js
 * Project: cron-plugins
 * File Created: 10.08.2024, 15:08:05
 *
 * Last Modified: 29.08.2024, 10:08:86
 * Modified By: MAX809
 */

import { defineConfig } from "rollup";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import json from "@rollup/plugin-json";


const config = defineConfig({
	input: ["server.ts"],
	output: [
		{
			format: "cjs",
			compact: true,
			sourcemap: "inline",
			dir: "./",
		},
	],
	plugins: [
		json(),
		commonjs(),
		nodeResolve({
			moduleDirectories: ["node_modules"],
		}),
		// typescript({
		// 	noEmit: true,
		// }),
		// terser(),
		cleanup({
			// comments: ["sources"],
		}),
	],
});

export default config;
