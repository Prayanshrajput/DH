

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice';
import { selectFieldValue } from '../../features/reduxSelectors';

const MemoizedSelectField = memo(({ item, currentPath }) => {
  console.log("Hii buddy i am SelectField")
  const dispatch = useDispatch();

  // ALL values are pulled directly from Redux
  const value = useSelector(state => selectFieldValue(state, currentPath, 'value'));
  const label = useSelector(state => selectFieldValue(state, currentPath, 'label'));
  const options = useSelector(state => selectFieldValue(state, currentPath, 'options')); // Get options from Redux

  const handleChange = (e) => {
    // DISPATCH directly to Redux
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={item.id}
        name={item.name}
        value={value || ''} // Controlled component: value always from Redux
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {/* Render a default empty option if no value is set, or if it's desired */}
        {!value && <option value="">Select an option</option>}
        {options && Array.isArray(options) && options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default MemoizedSelectField;