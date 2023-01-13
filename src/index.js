import path from 'path';
import { readFileSync } from 'fs';
import process from 'process';
import _ from 'lodash';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath).toString();
  return JSON.parse(data);
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = readFile(filePath1);
  const obj2 = readFile(filePath2);
  const obj1Keys = Object.getOwnPropertyNames(obj1);
  const obj2Keys = Object.getOwnPropertyNames(obj2);
  const unitedKeys = _.sortBy(_.union(obj1Keys, obj2Keys));
  const differences = unitedKeys.reduce((acc, key) => {
    let newAcc = acc;
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      newAcc = obj1[key] === obj2[key]
        ? `${acc}\n    ${key}: ${obj1[key]}`
        : `${acc}\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    } else {
      newAcc = Object.hasOwn(obj1, key)
        ? `${acc}\n  - ${key}: ${obj1[key]}`
        : `${acc}\n  + ${key}: ${obj2[key]}`;
    } return newAcc;
  }, '');
  const result = `{${differences}\n}`;
  return result;
};

export { readFile, genDiff };
