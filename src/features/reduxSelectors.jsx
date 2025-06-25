// This file contains utility selectors to extract specific field values from the Redux state.
// It's designed to be used with useSelector in your components to prevent unnecessary re-renders.

// Helper function to safely get a nested value from an object/array based on a path string.
// This is a generic utility and can be used for any nested data structure.

const getNestedValue = (obj, path) => {
  if (!obj) return undefined;

  const pathParts = path.split('.');
  let current = obj;

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (Array.isArray(current)) {
      const index = Number(part);
      if (isNaN(index) || index < 0 || index >= current.length) {
        return undefined; // Invalid index for array
      }
      current = current[index];
    } else if (typeof current === 'object' && current !== null) {
      if (!current.hasOwnProperty(part)) {
        return undefined; // Property not found
      }
      current = current[part];
    } else {
      // Current is a primitive or null, and path still has parts
      return undefined;
    }
  }
  return current;
};

/**
 * Selector to get a specific field's property (like 'value', 'label', 'type', etc.)
 * from the Redux form state based on its path.
 *
 * @param {Object} state - The entire Redux state object.
 * @param {string} fieldPath - The path to the field object itself (e.g., "0", "0.children.1").
 * @param {string} propertyName - The name of the property to retrieve from the field object (e.g., "value", "label").
 * @returns {any} The value of the specified property for the field, or undefined if not found.
 */
export const selectFieldValue = (state, fieldPath, propertyName) => {
  // Ensure we are accessing the 'form' slice of your Redux state
  const formState = state.form;

  // Build the full path to the specific property of the field
  const fullPropertyPath = `${fieldPath}.${propertyName}`;

  // Use the generic helper to traverse the state and get the value
  return getNestedValue(formState, fullPropertyPath);
};

// You might also have other selectors here if needed, for example:
/*
export const selectFormEntirely = (state) => state.form;

export const selectFieldObject = (state, fieldPath) => {
  const formState = state.form;
  return getNestedValue(formState, fieldPath);
};
*/


// features/reduxSelectors.js
// import { findFieldByPath, findFieldById } from '../objectway/FindFieldByPath'; // Adjust path based on where you put formUtils.js



// /**
//  * Selects a specific field object from the Redux state by its unique ID.
//  * Returns { field, path } or null.
//  * This is used by MemoizedFieldWrapper to get the full field object and its current path.
//  * @param {object} state The full Redux state.
//  * @param {string} fieldId The unique ID of the field.
//  * @returns {{field: object, path: string}|null} The field object and its Redux path, or null.
//  */
// export const selectFieldByIdAndPath = (state, fieldId) => {
//   return findFieldById(state.form, fieldId);
// };

// /**
//  * Selects the entire form data from the Redux state.
//  * Used by top-level components and for dynamic logic evaluation.
//  * @param {object} state The full Redux state.
//  * @returns {Array} The array representing the entire form data.
//  */
// export const selectFormData = (state) => state.form;

// // This helper is used internally by formSlice and might also be useful elsewhere
// export const getNestedValue = (obj, path) => {
//   return path.split('.').reduce((acc, key) => acc && acc[key], obj);
// };

// // This is still available if specific components need to select by a direct path for some reason.
// export const selectFieldValue = (state, path, property) => {
//   const field = findFieldByPath(state.form, path);
//   return field ? field[property] : undefined;
// };
