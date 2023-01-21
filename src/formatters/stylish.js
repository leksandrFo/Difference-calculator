import _ from 'lodash';

const insertFullIndent = (depth, indent = ' ', indentCount = 4) => _.repeat(indent, indentCount * depth);
const insertShortIndent = (depth, indent = ' ', indentCount = 4) => _.repeat(indent, (indentCount * depth) - 2);

const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const result = Object.entries(data).map(([key, value]) => `${insertFullIndent(depth + 1)}${key}: ${getString(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${insertFullIndent(depth)}}`;
};

const insertString = (key, value, depth, symbol = ' ') => `${insertShortIndent(depth)}${symbol} ${key}: ${getString(value, depth)}`;

export default (tree) => {
  const iter = (node, depth) => node.map(({ key, value, type }) => {
    switch (type) {
      case 'added':
        return insertString(key, value, depth, '+');
      case 'removed':
        return insertString(key, value, depth, '-');
      case 'unmodified':
        return insertString(key, value, depth);
      case 'modified':
        return `${insertString(key, value[0], depth, '-')}\n${insertString(key, value[1], depth, '+')}`;
      case 'nested':
        return `${insertFullIndent(depth)}${key}: {\n${iter(value, depth + 1).join('\n')}\n${insertFullIndent(depth)}}`;
      default:
        throw new Error(`Unknown property type: '${type}'!`);
    }
  });
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
