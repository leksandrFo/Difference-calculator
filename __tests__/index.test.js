import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { getExtension, genDiff } from '../src/index.js';
import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getExtension', () => {
  expect(getExtension(getFixturePath('file1.json'))).toEqual('.json');
});

test('Extension error', () => {
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('expected.js'))).toThrow('The format .js is not supported');
});

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expected);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(expected);
});
