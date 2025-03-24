import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme, getTitle } from '../lib/utils.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cwd = process.cwd();
const outDir = join(process.cwd(), 'dist');

const themeFolder = dirname(getTheme());
const config = {
	configFile: false,
	root: join(__dirname, '..', 'src'),
	publicDir: join(cwd, 'public'),
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
			slides: join(cwd, 'slides'),
			'@theme': themeFolder,
		},
	},
	build: {
		outDir: join(cwd, 'dist'),
	},
};

export { config, outDir };
