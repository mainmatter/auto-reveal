const fs = require('node:fs');
const path = require('node:path');

function readJsonSync(filePath, silent = true) {
	try {
		if (fs.accessSync(filePath, fs.constants.R_OK)) {
			if (!silent) {
				console.error(`${filePath} can't be read.`);
			}

			return {};
		}

		const content = fs.readFileSync(filePath, 'utf-8');

		return JSON.parse(content);
	} catch {
		if (!silent) {
			console.error(`${filePath} can't be parsed as JSON.`);
		}

		return {};
	}
}

function getThemePackage() {
	const packageJson = readJsonSync(path.join(process.cwd(), 'package.json'));
	return [
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	].find((name) => name.startsWith('auto-reveal-theme-'));
}

function getTheme() {
	const theme = getThemePackage();

	if (!theme) {
		return;
	}

	// This can't be done with `import.meta.resolve` because it doesn't support a parent as of Node.js 20,
	// which is the reason why this whole file is a CommonJS module.
	const themePkg = require.resolve(theme, {
		paths: [process.cwd()],
	});
	const dir = path.dirname(themePkg);
	const config = path.resolve(dir, 'config.json');

	return {
		dir,
		main: themePkg,
		config: readJsonSync(config),
	};
}

function getRevealJsTheme(theme = 'black') {
	const revealJs = require.resolve('reveal.js', {
		paths: [process.cwd()],
	});

	const main = path.join(path.dirname(revealJs), 'theme', `${theme}.css`);

	return {
		dir: path.dirname(main),
		main,
		config: {},
	};
}

module.exports = {
	readJsonSync,
	getTheme,
	getThemePackage,
	getRevealJsTheme,
};
