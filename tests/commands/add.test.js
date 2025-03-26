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
			'\nauto-reveal\n\n  Created ./slides/000.md\n  Hint: Create a vertical slide by adding "---" to that file.\n',
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
			'\nauto-reveal\n\n  Created ./slides/010.md\n  Hint: Create a vertical slide by adding "---" to that file.\n',
		);
		expect(result.exitCode).to.equal(0);
		expect(fixtures).toStrictEqual({
			slides: {
				'000.md': '# Slide 1',
				'010.md': 'Note:\n\nThis note is only visible to the presenter.\n',
			},
		});
	});

	it('adds a new slide with a custom increment', async () => {
		const { cwd } = await makeFolder({
			files: {
				slides: {
					'003.md': '# Slide 1',
				},
			},
		});

		const result1 = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal add -i 5`;

		expect(result1.stdout).toStrictEqual(
			'\nauto-reveal\n\n  Created ./slides/010.md\n  Hint: Create a vertical slide by adding "---" to that file.\n',
		);
		expect(result1.exitCode).to.equal(0);

		const result2 = await execa({
			cwd,
		})`${process.cwd()}/bin/auto-reveal add -i 5`;

		expect(result2.stdout).toStrictEqual(
			'\nauto-reveal\n\n  Created ./slides/015.md\n  Hint: Create a vertical slide by adding "---" to that file.\n',
		);
		expect(result2.exitCode).to.equal(0);

		const fixtures = fixturify.readSync(cwd);
		expect(fixtures).toStrictEqual({
			slides: {
				'003.md': '# Slide 1',
				'010.md': 'Note:\n\nThis note is only visible to the presenter.\n',
				'015.md': 'Note:\n\nThis note is only visible to the presenter.\n',
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
			'\nauto-reveal\n\n  Created ./slides/010-hallole.md\n  Hint: Create a vertical slide by adding "---" to that file.\n',
		);
		expect(result.exitCode).to.equal(0);
		expect(fixtures).toStrictEqual({
			slides: {
				'000.md': '# Slide 1',
				'010-hallole.md':
					'# 👋 Hallöle\n\nNote:\n\nThis note is only visible to the presenter.\n',
			},
		});
	});
});
