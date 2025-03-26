import { Command } from 'commander';

import { build } from './commands/build.js';
import { init } from './commands/init.js';
import { start } from './commands/start.js';
import { config } from './config.js';

const program = new Command();

program.name(process.env.npm_package_name);
program.description(process.env.npm_package_description);
program.version(process.env.npm_package_version);

program
	.command('start', {
		isDefault: true,
	})
	.description('Live-reloading server for your slides.')
	.option('-p, --port <port>', 'Port to run the server on', 1337)
	.action(start);

program
	.command('init')
	.description('Create a new presentation.')
	.argument(
		'[target]',
		'Directory to create the presentation in (default: current directory)',
	)
	.option(
		'-n, --name <name>',
		'Name of the presentation (default: name of current directory)',
	)
	.action(init);

program
	.command('build')
	.description('Build a static copy of your presentation.')
	.option('-o, --outDir <path>', 'Output directory', config.build.outDir)
	.action(build);

export { program };
