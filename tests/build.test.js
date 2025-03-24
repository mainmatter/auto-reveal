import { build as viteBuild } from 'vite';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { build } from '../lib/commands/build.js';

vi.mock('vite', () => ({
	build: vi.fn(),
}));

describe('start command', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	test('build runs vite build with necessary config', async () => {
		await build();

		expect(viteBuild).toBeCalledTimes(1);
	});
});
