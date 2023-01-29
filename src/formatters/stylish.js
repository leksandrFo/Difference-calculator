import _ from 'lodash';

const space = ' ';
const spaceCount = 4;

const indent = (depth, isFull = true) => {
  const IndentSize = spaceCount * depth;
  return isFull ? _.repeat(space, IndentSize) : _.repeat(space, IndentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const result = Object.entries(data).map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const buildString = (key, value, depth, symbol = ' ') => `${indent(depth, false)}${symbol} ${key}: ${stringify(value, depth)}`;

export default (tree) => {
  const iter = (node, depth) => node.map((item) => {
    switch (item.type) {
      case 'added':
        return buildString(item.key, item.value, depth, '+');
      case 'removed':
        return buildString(item.key, item.value, depth, '-');
      case 'unmodified':
        return buildString(item.key, item.value, depth);
      case 'modified':
        return `${buildString(item.key, item.oldValue, depth, '-')}\n${buildString(item.key, item.newValue, depth, '+')}`;
      case 'nested':
        return `${indent(depth)}${item.key}: {\n${iter(item.children, depth + 1).join('\n')}\n${indent(depth)}}`;
      default:
        throw new Error(`Unknown property type: '${item.type}'!`);
    }
  });
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
