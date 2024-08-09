#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, createServer } from 'vite';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme, getTitle } from '../lib/utils.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const argv = process.argv.slice(2);
const cwd = process.cwd();

const themeFolder = path.dirname(getTheme());
const config = {
	configFile: false,
	root: path.join(__dirname, '..', 'src'),
	publicDir: path.join(cwd, 'public'),
	server: {
		port: 1337,
		fs: {
			allow: [themeFolder, '.'],
		},
	},
	plugins: [
		viteEjsPlugin({
			title: getTitle(),
		}),
	],
	resolve: {
		alias: {
			slides: path.join(cwd, 'slides'),
			'@theme': themeFolder,
		},
	},
	build: {
		outDir: path.join(cwd, 'dist'),
	},
};

async function start() {
	const server = await createServer(config);

	server.watcher.add(path.join(cwd, 'slides'));

	await server.listen();
	server.printUrls();
	server.bindCLIShortcuts({ print: true });
}

if (!argv[0] || argv[0] === 'start') {
	start();
} else if (argv[0] === 'build') {
	build(config);
}
