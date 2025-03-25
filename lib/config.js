import path from 'node:path';
import url from 'node:url';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme, getTitle } from '../lib/utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const cwd = process.cwd();
const outDir = path.join(process.cwd(), 'dist');

const themeFolder = dirname(getTheme());
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
			'@theme': themeFolder,
			slides: path.join(cwd, 'slides'),
		},
	},
	build: {
		outDir: path.join(cwd, 'dist'),
	},
};

export { config, outDir };
