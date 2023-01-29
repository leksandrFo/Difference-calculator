import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

export default (data) => {
  const iter = (tree, keys) => tree
    .filter((node) => node.type !== 'unmodified')
    .map((node) => {
      const currentKey = keys ? `${keys}.${node.key}` : `${node.key}`;
      switch (node.type) {
        case 'added':
          return `Property '${currentKey}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${currentKey}' was removed`;
        case 'modified':
          return `Property '${currentKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'nested':
          return iter(node.children, currentKey).join('\n');
        default:
          throw new Error(`Unknown property type: '${node.type}'!`);
      }
    });
  const result = iter(data, '');
  return `${result.join('\n')}`;
};
