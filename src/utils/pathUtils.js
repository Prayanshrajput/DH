// src/utils/pathUtils.js

export const getValueByPath = (data, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return acc[key];
    }
    return undefined;
  }, data);
};
