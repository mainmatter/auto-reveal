import { describe, expect, test } from 'vitest';
import { toNearest } from '../lib/utils';

describe('Utils', () => {
	test('toNearest', async () => {
		expect(toNearest(3, 5)).toBe(5);
		expect(toNearest(7, 10)).toBe(10);
		expect(toNearest(15, 15)).toBe(15);
		expect(toNearest(10, 20)).toBe(20);
		expect(toNearest(10, 5)).toBe(10);
		expect(toNearest(0, 10)).toBe(0);
	});
});
