import { join } from 'node:path';
import { createServer } from 'vite';
import { config } from '../config.js';

const cwd = process.cwd();

export async function start() {
	const server = await createServer(config);

	server.watcher.add(join(cwd, 'slides'));

	await server.listen();
	server.printUrls();
	server.bindCLIShortcuts({ print: true });
}
