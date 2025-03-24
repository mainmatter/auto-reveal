import { execa } from 'execa';
import { describe, expect, it } from 'vitest';

import { makeProject } from '../helpers';

// not using a theme doesn't work right now
describe.skip('default theme tests', () => {
	it('can work without a theme or any slides', async () => {
		const { cwd } = await makeProject();
		const result = await execa({
			cwd,
		})`./node_modules/.bin/auto-reveal build`;
		expect(result.exitCode).to.equal(0);
	});
});
