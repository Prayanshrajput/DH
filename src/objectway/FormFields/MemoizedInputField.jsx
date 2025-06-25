
import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice'; // Adjust path based on your structure

const InputField = ({ item, currentPath }) => {
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
        onMouseOut={()=>{}}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
      />
    </div>
  );
};

const MemoizedInputField = memo(InputField);
export default MemoizedInputField;

// components/MemoizedInputField.jsx (apply similar changes to Checkbox, Radio, Select, Textarea)
// import React, { memo, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFieldValue } from '../../features/formSlice';
// import { selectFieldValue } from '../../features/reduxSelectors'; // <-- THIS IS THE KEY CHANGE

// const InputField = ({ item, currentPath, isDisabled }) => {
//   const dispatch = useDispatch();

//   // Use selectFieldValue with item.id for stable subscriptions
//   const value = useSelector(state => selectFieldValue(state, item.id, 'value'));
//   const label = useSelector(state => selectFieldValue(state, item.id, 'label'));
//   const placeholder = useSelector(state => selectFieldValue(state, item.id, 'placeholder'));
//   const type = useSelector(state => selectFieldValue(state, item.id, 'type'));

//   const handleChange = useCallback((e) => {
//     const newValue = e.target.value;
//     // currentPath (index-based) is still needed for dispatching the update
//     dispatch(updateFieldValue({ path: `${currentPath}.value`, newValue }));
//   }, [dispatch, currentPath]);

//   return (
//     <div className="mb-4 flex-grow">
//       <label htmlFor={item.id} className="block text-gray-700 text-sm font-bold mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         id={item.id}
//         name={item.name}
//         placeholder={placeholder}
//         value={value || ''}
//         onChange={handleChange}
//         disabled={isDisabled}
//         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isDisabled ? 'cursor-not-allowed bg-gray-100 opacity-60' : ''}`}
//       />
//     </div>
//   );
// };

// const MemoizedInputField = memo(InputField);
// export default MemoizedInputField;