import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

export default (data) => {
  const iter = (tree, keys) => tree
    .filter((node) => node.type !== 'unmodified')
    .map(({ key, value, type }) => {
      const currentKey = keys ? `${keys}.${key}` : `${key}`;
      switch (type) {
        case 'added':
          return `Property '${currentKey}' was added with value: ${getValue(value)}`;
        case 'removed':
          return `Property '${currentKey}' was removed`;
        case 'modified':
          return `Property '${currentKey}' was updated. From ${getValue(value[0])} to ${getValue(value[1])}`;
        case 'nested':
          return iter(value, currentKey).join('\n');
        default:
          throw new Error(`Unknown property type: '${type}'!`);
      }
    });
  const result = iter(data, '');
  return `${result.join('\n')}`;
};
