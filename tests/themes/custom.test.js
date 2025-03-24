import { execa } from 'execa';
import { Project } from 'fixturify-project';
import { describe, expect, it } from 'vitest';

import { getFileContents, makeProject } from '../helpers';

describe('custom theme tests', () => {
	it('includes a custom theme css in the build', async () => {
		const theme = new Project('auto-reveal-theme-basic', '0.0.1', {
			files: {
				'theme.css': 'body { background-color: #234567; }',
				'config.json': '{}',
			},
		});
		theme.pkg.main = 'theme.css';

		const { cwd } = await makeProject({ files: {}, theme });

		const result = await execa({
			cwd,
		})`./node_modules/.bin/auto-reveal build`;

		expect(result.exitCode).to.equal(0);
		expect(await getFileContents('dist/assets/index*.css', cwd)).to.include(
			'background-color:#234567',
		);
	});

	it('includes a custom theme css in the build when the plugin does not have a config defined', async () => {
		const theme = new Project('auto-reveal-theme-basic', '0.0.1', {
			files: {
				'theme.css': 'body { background-color: #234567; }',
			},
		});
		theme.pkg.main = 'theme.css';

		const { cwd } = await makeProject({ files: {}, theme });

		const result = await execa({
			cwd,
		})`./node_modules/.bin/auto-reveal build`;

		expect(result.exitCode).to.equal(0);
		expect(await getFileContents('dist/assets/index*.css', cwd)).to.include(
			'background-color:#234567',
		);
	});
});
