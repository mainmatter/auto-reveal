import fs from 'node:fs';
import path from 'node:path';
import fixturify from 'fixturify';
import { Project } from 'fixturify-project';
import { globby } from 'globby';
import tmp from 'tmp';

tmp.setGracefulCleanup();

export async function makeProject({ files = {}, theme } = {}) {
	const project = new Project('test-app', '0.0.1', {
		files,
	});

	project.files = files;

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

export async function makeFolder({ files } = {}) {
	const _tmp = tmp.dirSync({ unsafeCleanup: true });
	const baseDir = fs.realpathSync(_tmp.name);

	fixturify.writeSync(baseDir, files);

	return { cwd: baseDir };
}

export async function getFileContents(glob, cwd) {
	// there should only be one file that matches this glob
	const [firstFile] = await globby([glob], { cwd });

	if (!firstFile) {
		throw new Error(`No file found matching glob ${glob}`);
	}

	return fs.readFileSync(path.join(cwd, firstFile), 'utf8');
}
