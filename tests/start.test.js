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
});
