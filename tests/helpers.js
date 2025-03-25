import fs from 'node:fs';
import path from 'node:path';
import { Project } from 'fixturify-project';
import { globby } from 'globby';

export async function makeProject({ files = {}, theme } = {}) {
	const project = new Project('test-app', '0.0.1', {
		files,
	});

	// setup the current auto-reveal as a dev dependency to link its bin
	project.linkDevDependency('auto-reveal', { baseDir: '.', resolveName: '.' });

	project.linkDevDependency('reveal.js', {
		baseDir: '.',
		resolveName: 'reveal.js',
	});

	project.addDependency(theme);

	await project.write();

	return { cwd: project.baseDir, project };
}

export async function getFileContents(glob, cwd) {
	// there should only be one file that matches this glob
	const [indexCss] = await globby([glob], { cwd });
	return fs.readFileSync(path.join(cwd, indexCss), 'utf8');
}
