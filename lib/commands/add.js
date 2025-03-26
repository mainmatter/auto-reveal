import fs from 'node:fs/promises';
import path from 'node:path';
import { globby } from 'globby';
import { deburr, kebabCase } from 'lodash-es';
import { ascii } from '../utils.js';

const DIGITS = 3;

const filenameTemplate = (number, digits, title) =>
	`${number.toString().padStart(digits, '0')}${
		title ? `-${kebabCase(ascii(deburr(title)))}` : ''
	}.md`;

const slideTemplate = (title) =>
	`${title ? `# ${title}\n\n` : ''}Note:

This note is only visible to the presenter.
`;

export async function nextSlideNumber() {
	const slides = await globby('slides/*.md');

	if (slides.length === 0) {
		return 0;
	}

	const lastSlide = slides.at(-1);
	const lastSlideName = path.basename(lastSlide);

	return Number.parseInt(lastSlideName, 10) + 1;
}

export async function writeNewSlide(
	title,
	{ writeTitleToFileName = true, cwd = process.cwd() } = {},
) {
	const number = await nextSlideNumber();
	const filename = filenameTemplate(
		number,
		DIGITS,
		writeTitleToFileName ? title : '',
	);

	await fs.writeFile(path.join(cwd, filename), slideTemplate(title));

	return { filename };
}

export async function add(title, { increment = 1 } = {}) {
	const { filename } = await writeNewSlide(
		title ? title.join(' ') : undefined,
		{
			cwd: path.join(process.cwd(), 'slides'),
		},
	);

	console.log(
		`auto-reveal\n\n  Created ./slides/${filename}\n  Create a vertical slide by adding "---" to that file.`,
	);
}
