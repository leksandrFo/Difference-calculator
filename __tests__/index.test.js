import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const formats = ['.json', '.yaml', '.yml'];

describe('testing genDiff function', () => {
  test.each(formats)('testing %p format', (format) => {
    const filepath1 = getFixturePath(`file1${format}`);
    const filepath2 = getFixturePath(`file2${format}`);
    const stylishExpected = readFixture('stylishResult.txt');
    const plainExpected = readFixture('plainResult.txt');
    const jsonExpected = readFixture('jsonResult.txt');
    expect(genDiff(filepath1, filepath2)).toEqual(stylishExpected);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishExpected);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainExpected);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonExpected);
  });
  test('parsers error', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('stylishResult.txt'))).toThrow('The format .txt is not supported');
  });
  test('formatter name error', () => {
    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'style')).toThrow("Unknown format: 'style'!");
  });
});
