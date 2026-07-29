import { createServer } from 'vite';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { start } from '../../lib/commands/start.js';
import { config } from '../../lib/config.js';

vi.mock('vite', () => ({
	createServer: vi.fn(() => ({
		listen: vi.fn(),
		watcher: {
			add: vi.fn(),
		},
		printUrls: vi.fn(),
		bindCLIShortcuts: vi.fn(),
	})),
}));

describe('start command', () => {
	afterEach(() => {
		vi.clearAllMocks();
		// config is a module-level singleton that start() mutates
		delete config.server.host;
	});

	test('start creates vite server with necessary config', async () => {
		await start();

		expect(createServer).toBeCalledTimes(1);
	});

	test('passing a port to start changes the port of the vite server config', async () => {
		await start({ port: 4242 });

		expect(createServer).toBeCalledTimes(1);
		expect(createServer.mock.lastCall[0].server.port).toBe(4242);
	});

	test('start does not expose the server on the network by default', async () => {
		await start();

		expect(createServer).toBeCalledTimes(1);
		expect(createServer.mock.lastCall[0].server.host).toBeUndefined();
	});

	test('passing host to start exposes the vite server on all addresses', async () => {
		await start({ host: true });

		expect(createServer).toBeCalledTimes(1);
		expect(createServer.mock.lastCall[0].server.host).toBe(true);
	});

	test('passing a host address to start exposes the vite server on that address', async () => {
		await start({ host: '10.0.0.5' });

		expect(createServer).toBeCalledTimes(1);
		expect(createServer.mock.lastCall[0].server.host).toBe('10.0.0.5');
	});
});
