import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const buildPropertyName = (node, path) => (path ? `${path}.${node.key}` : `${node.key}`);

const iter = (tree, path) => tree
  .filter((node) => node.type !== 'unmodified')
  .map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${buildPropertyName(node, path)}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${buildPropertyName(node, path)}' was removed`;
      case 'modified':
        return `Property '${buildPropertyName(node, path)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, buildPropertyName(node, path)).join('\n');
      default:
        throw new Error(`Unknown property type: '${node.type}'!`);
    }
  });

export default (tree) => {
  const result = iter(tree, '');
  return `${result.join('\n')}`;
};
