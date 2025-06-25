import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice';
import { selectFieldValue } from '../../features/reduxSelectors';

const MemoizedRadioField = memo(({ item, currentPath }) => {
  console.log("Hii buddy i am rediobutton")
  const dispatch = useDispatch();

  // ALL values are pulled directly from Redux
  const value = useSelector(state => selectFieldValue(state, currentPath, 'value'));
  const label = useSelector(state => selectFieldValue(state, currentPath, 'label'));
  const options = useSelector(state => selectFieldValue(state, currentPath, 'options')); // Get options from Redux too

  const handleChange = (e) => {
    // DISPATCH directly to Redux
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="mt-1 space-y-2">
        {options && Array.isArray(options) && options.map(option => (
          <div key={`${item.id}-${option.value}`} className="flex items-center">
            <input
              id={`${item.id}-${option.value}`}
              name={item.name} // Radio buttons in a group share the same 'name'
              type="radio"
              value={option.value}
              checked={value === option.value} // Controlled component: checked status from Redux
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