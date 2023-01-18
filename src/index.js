import path from 'path';
import { readFileSync } from 'fs';
import process from 'process';
import _ from 'lodash';
import getData from './parsers.js';
import formatSelection from './formatters/index.js';

const getExtension = (filePath) => path.parse(filePath).ext;

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath).toString();
  return getData(data, getExtension(filePath));
};

const getTreeWithDifferences = (data1, data2) => {
  const data1Keys = _.keys(data1);
  const data2Keys = _.keys(data2);
  const unitedKeys = _.sortBy(_.union(data1Keys, data2Keys));
  const result = [...unitedKeys].map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        value: getTreeWithDifferences(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'removed',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value: [data1[key], data2[key]],
        type: 'modified',
      };
    }
    return {
      key,
      value: data1[key],
      type: 'unmodified',
    };
  });
  return result;
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);
  const differences = getTreeWithDifferences(data1, data2);
  return formatSelection(differences, format);
};

export { getExtension, readFile, genDiff };
