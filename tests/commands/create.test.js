import path from 'node:path';
import { execa } from 'execa';
import fixturify from 'fixturify';
import { describe, expect, it } from 'vitest';

import { makeFolder } from '../helpers.js';

describe('create command tests', () => {
	it('creates a presentation in the current directory', async () => {
		const { cwd } = await makeFolder({ files: {} });

		const result = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal create`;

		const fixtures = fixturify.readSync(cwd);

		expect(result.exitCode).to.equal(0);
		expect(result.stdout).toStrictEqual(
			`\nauto-reveal\n\n  Setting up your presentation in\n  ${cwd}\n\n  Hint: Create new slides by running "auto-reveal add".\n  Hint: Create new vertical slides by adding "---" inside your slide markdown file.\n`,
		);
		expect(fixtures).toStrictEqual({
			public: {},
			slides: {
				'000.md': expect.stringMatching(/.*/),
			},
			'package.json': expect.stringMatching(/.*/),
		});
		expect(fixtures.slides['000.md']).toStrictEqual(
			`# ${path.basename(cwd)}\n\nNote:\n\nThis note is only visible to the presenter.\n`,
		);
		expect(JSON.parse(fixtures['package.json'])).toStrictEqual({
			name: expect.stringMatching(/^tmp-/),
			version: '0.0.0',
			scripts: {
				'auto-reveal': 'auto-reveal',
				start: 'auto-reveal start',
				build: 'auto-reveal build',
			},
			keywords: ['auto-reveal', 'presentation'],
			type: 'module',
			private: true,
			author: '',
			description: '',
		});
	});
});
