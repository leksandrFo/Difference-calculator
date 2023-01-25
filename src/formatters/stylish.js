import _ from 'lodash';

const buildFullIndent = (depth, indent = ' ', indentCount = 4) => _.repeat(indent, indentCount * depth);
const buildShortIndent = (depth, indent = ' ', indentCount = 4) => _.repeat(indent, (indentCount * depth) - 2);

const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const result = Object.entries(data).map(([key, value]) => `${buildFullIndent(depth + 1)}${key}: ${getString(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${buildFullIndent(depth)}}`;
};

const buildString = (key, value, depth, symbol = ' ') => `${buildShortIndent(depth)}${symbol} ${key}: ${getString(value, depth)}`;

export default (tree) => {
  const iter = (node, depth) => node.map(({ key, value, type }) => {
    switch (type) {
      case 'added':
        return buildString(key, value, depth, '+');
      case 'removed':
        return buildString(key, value, depth, '-');
      case 'unmodified':
        return buildString(key, value, depth);
      case 'modified':
        return `${buildString(key, value[0], depth, '-')}\n${buildString(key, value[1], depth, '+')}`;
      case 'nested':
        return `${buildFullIndent(depth)}${key}: {\n${iter(value, depth + 1).join('\n')}\n${buildFullIndent(depth)}}`;
      default:
        throw new Error(`Unknown property type: '${type}'!`);
    }
  });
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
