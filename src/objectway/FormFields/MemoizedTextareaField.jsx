
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice';
import { selectFieldValue } from '../../features/reduxSelectors';

const MemoizedTextareaField = memo(({ item, currentPath }) => {
   console.log("Hii buddy i am SelectField")
  const dispatch = useDispatch();

  // ALL values are pulled directly from Redux
  const value = useSelector(state => selectFieldValue(state, currentPath, 'value'));
  const label = useSelector(state => selectFieldValue(state, currentPath, 'label'));
  const placeholder = useSelector(state => selectFieldValue(state, currentPath, 'placeholder'));

  const handleChange = (e) => {
    // DISPATCH directly to Redux
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue: e.target.value }));
  };

  return (
    <div className="mb-2 flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={item.id}
        name={item.name}
        placeholder={placeholder}
        value={value || ''} // Controlled component: value always from Redux
        onChange={handleChange}
        rows="3"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      ></textarea>
    </div>
  );
});

export default MemoizedTextareaField;