import _ from 'lodash';

const space = ' ';
const spacesCount = 4;

const indent = (depth, isFull = true) => {
  const indentSize = spacesCount * depth;
  return isFull ? _.repeat(space, indentSize) : _.repeat(space, indentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const result = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const buildString = (key, value, depth, symbol = ' ') => `${indent(depth, false)}${symbol} ${key}: ${stringify(value, depth)}`;

const iter = (node, depth) => node.map((item) => {
  const output1 = buildString(item.key, item.value1, depth, '-');
  const output2 = buildString(item.key, item.value2, depth, '+');
  switch (item.type) {
    case 'added':
      return buildString(item.key, item.value, depth, '+');
    case 'removed':
      return buildString(item.key, item.value, depth, '-');
    case 'unmodified':
      return buildString(item.key, item.value, depth);
    case 'modified':
      return `${output1}\n${output2}`;
    case 'nested':
      return `${indent(depth)}${item.key}: {\n${iter(item.children, depth + 1).join('\n')}\n${indent(depth)}}`;
    default:
      throw new Error(`Unknown property type: '${item.type}'!`);
  }
});

export default (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
