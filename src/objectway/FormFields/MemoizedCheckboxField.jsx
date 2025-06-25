
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice';
import { selectFieldValue } from '../../features/reduxSelectors';

const MemoizedCheckboxField = memo(({ item, currentPath, fieldValues, setFieldValues }) => {
  const dispatch = useDispatch();

  // ALL values are pulled directly from Redux
  const value = useSelector(state => selectFieldValue(state, currentPath, 'value'));
  const label = useSelector(state => selectFieldValue(state, currentPath, 'label'));

  const handleChange = (e) => {
    // DISPATCH directly to Redux (checkbox value is typically a boolean)
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.checked }));
  };

  

  return (
    <div className="mb-2 flex-grow flex items-center">
      <input
        id={item.id}
        name={item.name}
        type="checkbox"
        checked={value || false} // Controlled component: checked status from Redux (default to false if undefined)
        onChange={handleChange}
        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <label htmlFor={item.id} className="ml-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
});

export default MemoizedCheckboxField;