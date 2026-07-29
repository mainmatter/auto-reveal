import { join } from 'node:path';
import { createServer } from 'vite';
import { config } from '../config.js';

const cwd = process.cwd();

export async function start({ port = 1337, host } = {}) {
	config.server.port = Number(port);

	if (host !== undefined) {
		config.server.host = host;
	}

	const server = await createServer(config);

	server.watcher.add(join(cwd, 'slides'));

	await server.listen();
	server.printUrls();
	server.bindCLIShortcuts({ print: true });
}
