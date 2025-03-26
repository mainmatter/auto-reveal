import fs from 'node:fs/promises';
import path from 'node:path';
import { deburr, kebabCase } from 'lodash-es';
import { mkdirp } from 'mkdirp';
import { ascii } from '../utils.js';
import { writeNewSlide } from './add.js';

export async function create(target, { name }) {
	const targetDirectory = target ? path.resolve(target) : process.cwd();

	name ??= path.basename(targetDirectory);

	if (target) {
		await mkdirp(targetDirectory);
	}

	console.log(
		`\nauto-reveal\n\n  Setting up your presentation in \n  ${targetDirectory}\n\n  Hint: Create new slides by running "auto-reveal add". \n  Hint: Create new vertical slides by adding "---" inside your slide markdown file.\n`,
	);

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
