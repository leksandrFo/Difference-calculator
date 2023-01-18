import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
