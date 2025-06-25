export const findFieldByPath = (formData, path) => {
  const parts = path.split('.').map(Number);
  let current = formData;
  for (let part of parts) {
    if (Array.isArray(current)) {
      current = current[part];
    } else if (current && current.children && Array.isArray(current.children)) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current;
};


// In a new file, e.g., 'utils/formUtils.js' or directly in 'reduxSelectors.js'
// utils/formUtils.js
// export const findFieldByPath = (formData, path) => {
//   const parts = path.split('.');
//   let current = formData;

//   for (let part of parts) {
//     const numericPart = Number(part);

//     if (Array.isArray(current) && !isNaN(numericPart)) {
//       current = current[numericPart];
//     } else if (current && current.children && Array.isArray(current.children) && !isNaN(numericPart)) {
//       current = current.children[numericPart];
//     } else if (current && typeof current === 'object' && current !== null) {
//       current = current[part];
//     } else {
//       return null;
//     }
//   }
//   return current;
// };


export const findFieldById = (formData, id) => {
  let foundField = null;

  const traverse = (fields) => {
    if (!fields) return;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.id === id) {
        foundField = field;
        return;
      }
      if (field.type === 'group' && field.children) {
        traverse(field.children);
      }
    }
  };

  traverse(formData);
  return foundField;
};