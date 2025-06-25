
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path based on your structure

const InputField = ({ item, currentPath,fieldValues, setFieldValues  }) => {
  console.log("Hii buddy i am Inputfield")
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue }));
  }, [dispatch, currentPath]);
  

  return (
    <div className="mb-4 flex-grow">
      <label htmlFor={item.id} className="block text-gray-700 text-sm font-bold mb-2">
        {item.label}
      </label>
      <input
        type={item.type}
        id={item.id}
        name={item.name}
        placeholder={item.placeholder}
        value={item.value || ''} // Ensure value is not null/undefined
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
      />
    </div>
  );
};

const MemoizedInputField = memo(InputField);
export default MemoizedInputField;