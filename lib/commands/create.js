import fs from 'node:fs/promises';
import path from 'node:path';
import { deburr, kebabCase } from 'lodash-es';
import { mkdirp } from 'mkdirp';
import { ascii, printAutoRevealMessage } from '../utils.js';
import { writeNewSlide } from './add.js';

const createMessageTemplate = (
	targetDirectory,
) => `Setting up your presentation in
${targetDirectory}

Hint: Create new slides by running "auto-reveal add".
Hint: Create new vertical slides by adding "---" inside your slide markdown file.`;

export async function create(target, { name }) {
	const targetDirectory = target ? path.resolve(target) : process.cwd();

	name ??= path.basename(targetDirectory);

	if (target) {
		await mkdirp(targetDirectory);
	}

	printAutoRevealMessage(createMessageTemplate(targetDirectory));

	await mkdirp(path.join(targetDirectory, 'slides'));
	await mkdirp(path.join(targetDirectory, 'public'));

	await writeNewSlide(name, {
		cwd: path.join(targetDirectory, 'slides'),
		writeTitleToFileName: false,
	});

	await fs.writeFile(
		path.join(targetDirectory, 'package.json'),
		`${JSON.stringify(
			{
				name: kebabCase(ascii(deburr(name))),
				version: '0.0.0',
				scripts: {
					'auto-reveal': 'auto-reveal',
					start: 'auto-reveal start',
					build: 'auto-reveal build',
				},
				type: 'module',
				keywords: ['auto-reveal', 'presentation'],
				private: true,
				author: '',
				description: '',
			},
			null,
			2,
		)}\n`,
	);
}
