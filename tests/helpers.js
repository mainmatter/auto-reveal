import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Project } from 'fixturify-project';
import { globby } from 'globby';

export async function makeProject({ files = {}, theme } = {}) {
	const project = new Project('test-app', '0.0.1', {
		files,
	});

	// setup the current auto-reveal as a dev dependency to link its bin
	project.linkDevDependency('auto-reveal', { resolveName: '.', baseDir: '.' });

	project.addDependency(theme);

	await project.write();

	return { cwd: project.baseDir, project };
}

export async function getFileContents(glob, cwd) {
	// there should only be one file that matches this glob
	const [indexCss] = await globby([glob], { cwd });
	return readFileSync(join(cwd, indexCss), 'utf8');
}
