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
		expect(result.stdout).to.include('\nauto-reveal\n');
		expect(fixtures).toStrictEqual({
			public: {},
			slides: {
				'000.md': expect.stringMatching(/^# tmp-/),
			},
			'package.json': expect.stringMatching(/.*/),
		});
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
