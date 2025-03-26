import fs from 'node:fs';
import path from 'node:path';
import * as utils from './common-utils.cjs';

export function getTitle(defaultTitle = 'auto-reveal') {
	try {
		const README = fs.readFileSync(
			path.join(process.cwd(), 'README.md'),
			'utf-8',
		);
		const match = /^# (.*)$/gm.exec(README);

		if (match) {
			return match[1];
		}
	} catch {
		console.error('No README.md found, falling back to `name` in package.json');
	}

	return process.env.npm_package_name ?? defaultTitle;
}

export function ascii(str) {
	return str.replace(/[^\x20-\x7E]/g, '');
}

export const toNearest = (number, base = 10) => Math.ceil(number / base) * base;

export function printAutoRevealMessage(message = '') {
	console.log(
		`\nauto-reveal\n\n${message.trim().replace(/^(?!\s*$)/gm, '  ')}\n`,
	);
}

const { getTheme, getThemePackage, getRevealJsTheme, readJsonSync } = utils;

export { getTheme, getThemePackage, getRevealJsTheme, readJsonSync };
