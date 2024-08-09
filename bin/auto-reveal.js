#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { build, createServer } from 'vite';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme, getTitle } from '../lib/utils.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cwd = process.cwd();

const themeFolder = path.dirname(getTheme());
const config = {
	configFile: false,
	root: path.join(__dirname, '..', 'src'),
	publicDir: path.join(cwd, 'public'),
	base: './',
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

const program = new Command();

program.name(process.env.npm_package_name);
program.description(process.env.npm_package_description);
program.version(process.env.npm_package_version);

program
	.command('start', {
		isDefault: true,
	})
	.description('Live-reloading server for your slides.')
	.action(start);

program
	.command('build')
	.description('Build a static copy of your presentation.')
	.option('-o, --outDir <path>', 'Output directory', config.build.outDir)
	.action((options) =>
		build({
			...config,
			build: {
				...config.build,
				outDir: options.outDir
					? path.resolve(cwd, options.outDir)
					: config.build.outDir,
			},
		}),
	);

program.parse();
