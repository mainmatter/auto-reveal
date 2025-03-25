import path from 'node:path';
import url from 'node:url';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import {
	getRevealJsTheme,
	getTheme,
	getTitle,
	readJsonSync,
} from '../lib/utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const cwd = process.cwd();
const outDir = path.join(process.cwd(), 'dist');
const pkg = readJsonSync(path.join(cwd, 'package.json'));
const configFromPackage = pkg['auto-reveal'] || {
	theme: undefined,
	config: {},
};

export default function themeConfigPlugin() {
	const theme = getTheme();

	return {
		name: 'auto-reveal',
		resolveId(id) {
			if (id === 'virtual:auto-reveal/config') {
				return '\0virtual:auto-reveal/config';
			}
		},
		load(id) {
			if (id === '\0virtual:auto-reveal/config') {
				let config = configFromPackage.config;

				config = {
					...config,
					...(theme?.config ?? {}),
				};

				return `const config = ${JSON.stringify(config)};export default config;`;
			}
		},
		config() {
			return {
				server: {
					fs: {
						allow: [theme?.dir, '.'].filter(Boolean),
					},
				},
				resolve: {
					alias: {
						'@theme': theme?.main,
					},
				},
			};
		},
	};
}

const config = {
	configFile: false,
	root: path.join(__dirname, '..', 'src'),
	publicDir: path.join(cwd, 'public'),
	base: './',
	server: {
		port: 1337,
	},
	plugins: [
		viteEjsPlugin({
			title: getTitle(),
		}),
		themeConfigPlugin(),
	],
	resolve: {
		alias: {
			slides: path.join(cwd, 'slides'),
		},
	},
	build: {
		outDir: path.join(cwd, 'dist'),
	},
};

export { config, outDir };
