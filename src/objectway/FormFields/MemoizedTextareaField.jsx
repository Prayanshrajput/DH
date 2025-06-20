// src/components/FormFields/MemoizedTextareaField.jsx
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path based on your structure

// Helper to select field properties from Redux state for a given path
// Reusing the same helper as in other MemoizedField components
const selectFieldProps = (state, path) => {
  const pathParts = path.split('.').map(part => {
    const num = Number(part);
    return isNaN(num) ? part : num;
  });
  let current = state.form; // Start from the 'form' slice of your Redux state

  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i];
    if (current === undefined || current === null) return {}; // Path not found or intermediate undefined
    current = current[key];
  }
  return current || {}; // Return the field object itself, or an empty object if undefined
};

const MemoizedTextareaField = memo(({ item, currentPath, onUpdate }) => {
  const dispatch = useDispatch();

  // Use useSelector to get the specific properties for THIS field from the Redux store
  // The component will re-render ONLY if these specific properties change.
  const { label, name, value, id, placeholder } = useSelector(state => selectFieldProps(state, currentPath));

  // Use the selected label for the console log
  console.log(`Rendering MemoizedTextareaField: ${label || name} at ${currentPath}`);

  // The onChange handler now dispatches a Redux action
  const handleChange = (e) => {
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1">
        {label || name}:
      </label>
      <textarea
        id={id} // Use the id from Redux state
        name={name} // Use the name from Redux state
        value={value || ''} // Use the value from Redux state
        placeholder={placeholder || ''} // Use the placeholder from Redux state
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[60px] transition-all duration-200"
      ></textarea>
    </div>
  );
});

export default MemoizedTextareaField;