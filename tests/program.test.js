import { afterEach, describe, expect, test, vi } from 'vitest';
import { build } from '../lib/commands/build.js';
import { start } from '../lib/commands/start.js';
import { program } from '../lib/program.js';

vi.mock('../lib/commands/start.js', {
	start: vi.fn(),
});

vi.mock('../lib/commands/build.js', {
	start: vi.fn(),
});

describe('auto-reveal CLI', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	test('Using auto-reveal without any command triggers the start function', async () => {
		await program.parseAsync(['node', 'auto-reveal']);

		expect(start).toBeCalledTimes(1);
	});

	test('Using auto-reveal start triggers the start function', async () => {
		await program.parseAsync(['node', 'auto-reveal', 'start']);

		expect(start).toBeCalledTimes(1);
	});

	test('Using auto-reveal start with a port passes the port to the start function', async () => {
		await program.parseAsync([
			'node',
			'auto-reveal',
			'start',
			'--port',
			'8080',
		]);

		expect(start).toBeCalledTimes(1);
		expect(start.mock.lastCall[0].port).toBe('8080');
	});

	test('Using auto-reveal start without --host does not pass a host to the start function', async () => {
		await program.parseAsync(['node', 'auto-reveal', 'start']);

		expect(start).toBeCalledTimes(1);
		expect(start.mock.lastCall[0].host).toBeUndefined();
	});

	test('Using auto-reveal start with --host passes true to the start function', async () => {
		await program.parseAsync(['node', 'auto-reveal', 'start', '--host']);

		expect(start).toBeCalledTimes(1);
		expect(start.mock.lastCall[0].host).toBe(true);
	});

	test('Using auto-reveal start with a host address passes it to the start function', async () => {
		await program.parseAsync([
			'node',
			'auto-reveal',
			'start',
			'--host',
			'0.0.0.0',
		]);

		expect(start).toBeCalledTimes(1);
		expect(start.mock.lastCall[0].host).toBe('0.0.0.0');
	});

	test('Using auto-reveal build triggers the build function', async () => {
		await program.parseAsync(['node', 'auto-reveal', 'build']);

		expect(build).toBeCalledTimes(1);
	});
});
