// src/components/FormFields/MemoizedSelectField.jsx
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path based on your structure

// Helper to select field properties from Redux state for a given path
// Reusing the same helper as in MemoizedCheckboxField, as it's generic
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

const MemoizedSelectField = memo(({ item, currentPath, onUpdate }) => {
  const dispatch = useDispatch();

  // Use useSelector to get the specific properties for THIS field from the Redux store
  // The component will re-render ONLY if these specific properties change.
  const { label, name, value, id, options } = useSelector(state => selectFieldProps(state, currentPath));

  // Use the selected label for the console log
  console.log(`Rendering MemoizedSelectField: ${label || name} at ${currentPath}`);

  // The onChange handler now dispatches a Redux action
  const handleChange = (e) => {
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1">
        {label || name}:
      </label>
      <select
        id={id} // Use the id from Redux state for accessibility
        name={name} // Use the name from Redux state
        value={value || ''} // Use the value from Redux state
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        {/* Render options from Redux state */}
        {options && options.map((option, optIndex) => (
          <option key={`${id}-option-${optIndex}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default MemoizedSelectField;