export const selectFieldValue = (state, fieldName) => {
  const flatten = (obj, prefix = '') =>
    Object.keys(obj).reduce((acc, key) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flatten(obj[key], path));
      } else {
        acc[path] = obj[key];
      }
      return acc;
    }, {});

  const flatForm = flatten(state.form.formData || {});
  const entry = Object.entries(flatForm).find(([key]) => key.endsWith(`${fieldName}.value`));
  return entry ? entry[1] : '';
};
