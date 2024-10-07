const fs = require('node:fs');
const path = require('node:path');

let packageJson;

function getPackageJson(cwd = process.cwd()) {
	if (packageJson) {
		return packageJson;
	}

	try {
		packageJson = JSON.parse(
			fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'),
		);

		return packageJson;
	} catch {
		console.error('No package.json found');
	}

	return { name: '', dependencies: {} };
}

function getThemePackage() {
	const packageJson = getPackageJson();
	return [
		...Object.keys(packageJson.dependencies),
		...Object.keys(packageJson.devDependencies),
	].find((name) => name.startsWith('auto-reveal-theme-'));
}

function getTheme() {
	const theme = getThemePackage();

	if (!theme) {
		return 'reveal.js/dist/theme/simple.css';
	}

	// This can't be done with `import.meta.resolve` because it doesn't support a parent as of Node.js 20,
	// which is the reason why this whole file is a CommonJS module.
	return require.resolve(path.join(theme, 'package.json'), {
		paths: [process.cwd()],
	});
}

module.exports = {
	getTheme,
	getThemePackage,
};
