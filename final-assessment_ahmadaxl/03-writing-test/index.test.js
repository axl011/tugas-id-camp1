import test from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('sum should return correct results', () => {
  assert.strictEqual(sum(2, 3), 5, '2 + 3 should be 5');
  assert.strictEqual(sum(-1, 1), 0, '-1 + 1 should be 0');
  assert.strictEqual(sum(0, 0), 0, '0 + 0 should be 0');
  assert.strictEqual(sum(10, 20), 30, '10 + 20 should be 30');
});