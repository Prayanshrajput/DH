// src/components/FormFields/MemoizedInputField.jsx
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path

const selectFieldValue = (state, path, property) => {
  const pathParts = path.split('.').map(part => {
    const num = Number(part);
    return isNaN(num) ? part : num;
  });
  let current = state.form; // Start from the 'form' slice of your Redux state

  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i];
    if (current === undefined || current === null) return undefined; // Path not found
    current = current[key];
  }
  // After navigating to the item, select the specific property (e.g., 'value', 'label')
  return current ? current[property] : undefined;
};

const MemoizedInputField = memo(({ item, currentPath, onUpdate }) => {
  const dispatch = useDispatch();

  // Use useSelector to get the value directly from the Redux store
  // This component will only re-render if the SPECIFIC value at this path changes.
  const value = useSelector(state => selectFieldValue(state, currentPath, 'value'));
  const label = useSelector(state => selectFieldValue(state, currentPath, 'label'));
  const placeholder = useSelector(state => selectFieldValue(state, currentPath, 'placeholder'));
  const type = useSelector(state => selectFieldValue(state, currentPath, 'type')); // To ensure the type is consistent

  console.log(`Rendering MemoizedInputField: ${label} at ${currentPath}`);

  // The onChange handler dispatches a Redux action
  const handleChange = (e) => {
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type} // Use type from Redux state
        id={item.id}
        name={item.name}
        value={value || ''} // Use value from Redux state
        onChange={handleChange}
        placeholder={placeholder} // Use placeholder from Redux state
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
});

export default MemoizedInputField;