import { execa } from 'execa';
import fixturify from 'fixturify';
import { describe, expect, it } from 'vitest';

import { makeFolder } from '../helpers.js';

describe('add command tests', () => {
	it('adds a new slide in an empty slides folder', async () => {
		const { cwd } = await makeFolder({
			files: {
				slides: {},
			},
		});

		const result = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal add`;

		const fixtures = fixturify.readSync(cwd);

		expect(result.stdout).toStrictEqual(
			'auto-reveal\n\n  Created ./slides/000.md\n  Create a vertical slide by adding "---" to that file.',
		);
		expect(result.exitCode).to.equal(0);
		expect(fixtures).toStrictEqual({
			slides: {
				'000.md': 'Note:\n\nThis note is only visible to the presenter.\n',
			},
		});
	});

	it('adds a new slide without a title', async () => {
		const { cwd } = await makeFolder({
			files: {
				slides: {
					'000.md': '# Slide 1',
				},
			},
		});

		const result = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal add`;

		const fixtures = fixturify.readSync(cwd);

		expect(result.stdout).toStrictEqual(
			'auto-reveal\n\n  Created ./slides/001.md\n  Create a vertical slide by adding "---" to that file.',
		);
		expect(result.exitCode).to.equal(0);
		expect(fixtures).toStrictEqual({
			slides: {
				'000.md': '# Slide 1',
				'001.md': 'Note:\n\nThis note is only visible to the presenter.\n',
			},
		});
	});

	it('adds a new slide with a title', async () => {
		const { cwd } = await makeFolder({
			files: {
				slides: {
					'000.md': '# Slide 1',
				},
			},
		});

		const result = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal add 👋 Hallöle`;

		const fixtures = fixturify.readSync(cwd);

		expect(result.stdout).toStrictEqual(
			'auto-reveal\n\n  Created ./slides/001-hallole.md\n  Create a vertical slide by adding "---" to that file.',
		);
		expect(result.exitCode).to.equal(0);
		expect(fixtures).toStrictEqual({
			slides: {
				'000.md': '# Slide 1',
				'001-hallole.md':
					'# 👋 Hallöle\n\nNote:\n\nThis note is only visible to the presenter.\n',
			},
		});
	});
});
