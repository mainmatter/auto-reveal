import fs from 'node:fs/promises';
import path from 'node:path';
import { globby } from 'globby';
import { deburr, kebabCase } from 'lodash-es';
import { ascii, printAutoRevealMessage, toNearest } from '../utils.js';

const DIGITS = 3;
export const DEFAULT_INCREMENT = 10;

const filenameTemplate = (number, digits, title) =>
	`${number.toString().padStart(digits, '0')}${
		title ? `-${kebabCase(ascii(deburr(title)))}` : ''
	}.md`;

const slideTemplate = (title) =>
	`${title ? `# ${title}\n\n` : ''}Note:

This note is only visible to the presenter.
`;

const createMessageTemplate = (filename) => `Created ./slides/${filename}
Hint: Create a vertical slide by adding "---" to that file.`;

export async function nextSlideNumber(increment = DEFAULT_INCREMENT) {
	const slides = await globby('slides/*.md');

	if (slides.length === 0) {
		return 0;
	}

	const lastSlide = slides.at(-1);
	const lastSlideName = path.basename(lastSlide);
	const lastSlideNumber = Number.parseInt(lastSlideName, 10);

	return toNearest(lastSlideNumber, increment) + Number.parseInt(increment, 10);
}

export async function writeNewSlide(
	title,
	{
		writeTitleToFileName = true,
		cwd = process.cwd(),
		increment = DEFAULT_INCREMENT,
	} = {},
) {
	const number = await nextSlideNumber(increment);
	const filename = filenameTemplate(
		number,
		DIGITS,
		writeTitleToFileName ? title : '',
	);

	await fs.writeFile(path.join(cwd, filename), slideTemplate(title));

	return { filename };
}

export async function add(title, { increment = DEFAULT_INCREMENT } = {}) {
	const { filename } = await writeNewSlide(
		title ? title.join(' ') : undefined,
		{
			increment,
			cwd: path.join(process.cwd(), 'slides'),
		},
	);

	printAutoRevealMessage(createMessageTemplate(filename));
}
