import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { getExtension, genDiff } from '../src/index.js';
// import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getExtension', () => {
  expect(getExtension(getFixturePath('file1.json'))).toEqual('.json');
});

/*
test('Errors', () => {
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('expected.js'))).toThrow('The extension .js is not supported');
  expect(() => genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'style')).toThrow("Unknown format: 'style'!");
});

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFixture('stylishExpected.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(readFixture('stylishExpected.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFixture('plainExpected.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'json')).toEqual(readFixture('jsonExpected.txt'));
});
*/

const extensions = ['.json', '.yaml', '.yml'];

/*
const formatNames = ['stylish', 'plain', 'json'];

describe('testing genDiff function', () => {
  test.each(extensions, formatNames)("substitution of 'extension' and 'formatName' parameters", (extension, formatName) => {
    const filepath1 = getFixturePath(`file1${extension}`);
    const filepath2 = getFixturePath(`file2${extension}`);
    switch(formatName) {
      case 'stylish':
        expect(genDiff(filepath1, filepath2, formatName)).toEqual(readFixture('stylishExpected.txt'));
      case 'plain':
        expect(genDiff(filepath1, filepath2, formatName)).toEqual(readFixture('plainExpected.txt'));
      case 'json':
        expect(genDiff(filepath1, filepath2, formatName)).toEqual(readFixture('jsonExpected.txt'));
      default:
        throw new Error(`Unknown format: '${formatName}'!`);
    }
  });
});
*/

describe('testing genDiff function', () => {
  test.each(extensions)('testing extension', (extension) => {
    const filepath1 = getFixturePath(`file1${extension}`);
    const filepath2 = getFixturePath(`file2${extension}`);
    const readFixture = (filename) => readFileSync(getFixturePath(filename).toString());
      expect(genDiff(filepath1, filepath2)).toEqual(readFixture('stylishExpected.txt'));
  });
});
