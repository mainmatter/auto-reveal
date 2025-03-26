import fs from 'node:fs/promises';
import path from 'node:path';
import { deburr, kebabCase } from 'lodash-es';
import { mkdirp } from 'mkdirp';

export async function init(target, { name }) {
	const targetDirectory = target ? path.resolve(target) : process.cwd();

	name ??= path.basename(targetDirectory);

	if (target) {
		await mkdirp(targetDirectory);
	}

	console.log(
		`\nauto-reveal\n\n  Setting up your presentation in \n  ${
			target ? targetDirectory : 'current directory'
		}`,
	);

	await mkdirp(path.join(targetDirectory, 'slides'));
	await mkdirp(path.join(targetDirectory, 'public'));

	await fs.writeFile(
		path.join(targetDirectory, 'slides', '000.md'),
		`# ${name}`,
	);
	await fs.writeFile(
		path.join(targetDirectory, 'package.json'),
		`${JSON.stringify(
			{
				name: kebabCase(deburr(name)),
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
