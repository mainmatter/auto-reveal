import { Command } from 'commander';

import { build } from './commands/build.js';
import { start } from './commands/start.js';
import { config } from './config.js';

const program = new Command();

program.name(process.env.npm_package_name);
program.description(process.env.npm_package_description);
program.version(process.env.npm_package_version);

program
	.command('start')
	.description('Live-reloading server for your slides.')
	.action(start);

program
	.command('build')
	.description('Build a static copy of your presentation.')
	.option('-o, --outDir <path>', 'Output directory', config.build.outDir)
	.action(build);

export { program };
