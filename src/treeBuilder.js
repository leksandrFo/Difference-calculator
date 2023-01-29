import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  return sortedKeys.map((key) => {
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
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: buildTree(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        type: 'modified',
      };
    }
    return {
      key,
      value: data1[key],
      type: 'unmodified',
    };
  });
};

export default buildTree;
