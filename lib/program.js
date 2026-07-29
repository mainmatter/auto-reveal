import { Command } from 'commander';

import { add, DEFAULT_INCREMENT } from './commands/add.js';
import { build } from './commands/build.js';
import { create } from './commands/create.js';
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
	.option(
		'--host [host]',
		'Expose the server on the network (optionally on a specific address)',
	)
	.action(start);

program
	.command('create')
	.alias('init')
	.description('Create a new presentation.')
	.argument(
		'[target]',
		'Directory to create the presentation in (default: current directory)',
	)
	.option(
		'-n, --name <name>',
		'Name of the presentation (default: name of current directory)',
	)
	.action(create);

program
	.command('add')
	.alias('slide')
	.description('Add a new slide to your presentation.')
	.argument('[title...]', 'Title of the slide')
	.option(
		'-i, --increment <increment>',
		'Increment of the slide prefix',
		DEFAULT_INCREMENT,
	)
	.action(add);

program
	.command('build')
	.description('Build a static copy of your presentation.')
	.option('-o, --outDir <path>', 'Output directory', config.build.outDir)
	.action(build);

export { program };
