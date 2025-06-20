// src/components/FormFields/MemoizedRadioField.jsx
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from "../../features/formSlice"; // Adjust path

// Helper to select field properties from Redux state
const selectFieldProps = (state, path) => {
  const pathParts = path.split('.').map(part => {
    const num = Number(part);
    return isNaN(num) ? part : num;
  });
  let current = state.form;

  for (let i = 0; i < pathParts.length; i++) {
    const key = pathParts[i];
    if (current === undefined || current === null) return {};
    current = current[key];
  }
  return current || {};
};


const MemoizedRadioField = memo(({ item, currentPath, onUpdate }) => {
  const dispatch = useDispatch();

  // Select the specific properties needed for this field
  const { label, value, options } = useSelector(state => selectFieldProps(state, currentPath));

  console.log(`Rendering MemoizedRadioField: ${label} at ${currentPath}`);

  const handleChange = (e) => {
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="mt-1 space-y-2">
        {options && options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${item.id}-${option.value}`} // Unique ID for each radio option
              name={item.name} // Group radio buttons by name
              type="radio"
              value={option.value}
              checked={value === option.value} // Value from Redux state
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor={`${item.id}-${option.value}`} className="ml-2 block text-sm text-gray-900">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MemoizedRadioField;