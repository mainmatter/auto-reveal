import { createServer } from 'vite';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { start } from '../lib/commands/start.js';

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
});
