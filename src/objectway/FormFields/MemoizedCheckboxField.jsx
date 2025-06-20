// src/components/FormFields/MemoizedCheckboxField.jsx
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path based on your structure

// Helper to select field properties from Redux state for a given path
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

const MemoizedCheckboxField = memo(({ item, currentPath, onUpdate }) => {
  const dispatch = useDispatch();

  // Use useSelector to get the specific label, name, and value for THIS field
  // The component will re-render ONLY if these specific properties change in the Redux state.
  const { label, name, value, id } = useSelector(state => selectFieldProps(state, currentPath));

  // Use the selected label for the console log
  console.log(`Rendering MemoizedCheckboxField: ${label || name} at ${currentPath}`);

  // The onChange handler now dispatches a Redux action
  const handleChange = (e) => {
    // For checkboxes, the value is e.target.checked (boolean)
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.checked }));
  };

  return (
    <div className="mb-2 flex-grow flex items-center">
      <input
        type="checkbox"
        id={id} // Use the actual item.id for htmlFor and id attribute for accessibility
        name={name} // Use the actual item.name for the name attribute
        checked={value || false} // Use the value from Redux state, default to false
        onChange={handleChange}
        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">
        {label || name} {/* Use label from Redux state */}
      </label>
    </div>
  );
});

export default MemoizedCheckboxField;