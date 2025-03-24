import { execa } from 'execa';
import { beforeAll, describe, expect, it } from 'vitest';

import { Project } from 'fixturify-project';

async function makeProject(files = {}) {
	const project = new Project('test-app', '0.0.1', {
		files,
	});

	// setup the current auto-reveal as a dev dependency to link its bin
	project.linkDevDependency('auto-reveal', { resolveName: '.', baseDir: '.' });
	await project.write();

	return { cwd: project.baseDir };
}

describe('default theme tests', () => {
	it(
		'can work without a theme or any slides',
		{ timeout: 1000000 },
		async () => {
			const { cwd } = await makeProject();
			const result = await execa({
				cwd,
			})`./node_modules/.bin/auto-reveal build`;
			expect(result.code).to.equal(0);
		},
	);
});
