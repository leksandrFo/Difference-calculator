import _ from 'lodash';

const buildTree = (data1, data2) => {
  const data1Keys = _.keys(data1);
  const data2Keys = _.keys(data2);
  const unitedKeys = _.sortBy(_.union(data1Keys, data2Keys));
  const result = [...unitedKeys].map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        value: buildTree(data1[key], data2[key]),
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

export default buildTree;
