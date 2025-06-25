// import React, { memo, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFieldValue } from '../../features/formSlice';
// import { selectFieldValue } from '../../features/reduxSelectors';

// const MemoizedDropdownField = memo(({ item, currentPath }) => {
//   const dispatch = useDispatch();
//   const value = useSelector((state) => selectFieldValue(state, item.name));
  
//   const [options, setOptions] = useState(item.options || []);
//   const [jsCode, setJsCode] = useState(item.jsCode || '');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     dispatch(updateFieldValue({ path: currentPath, value: e.target.value }));
//   };

//   const runJSCode = () => {
//     try {
//       const fn = new Function(jsCode); // run code inside a new function
//       const result = fn();

//       if (Array.isArray(result)) {
//         setOptions(result);
//         setError('');
//       } else {
//         throw new Error("Returned result is not an array");
//       }
//     } catch (err) {
//       setError(err.message);
//       setOptions([]);
//     }
//   };

//   return (
//     <div className="mb-4 w-full">
//       <label className="block text-gray-700 font-semibold mb-2">
//         {item.label}
//       </label>

//       <select
//         value={value || ''}
//         onChange={handleChange}
//         disabled={item.disabled}
//         className="w-full border border-gray-300 p-2 rounded mb-2"
//       >
//         <option value="" disabled>Select an option</option>
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value || opt}>
//             {opt.label || opt}
//           </option>
//         ))}
//       </select>

//       <textarea
//         value={jsCode}
//         onChange={(e) => setJsCode(e.target.value)}
//         placeholder="Write JS code that returns an array of {label, value}"
//         className="w-full border border-gray-300 p-2 rounded mb-2 h-24 text-sm font-mono"
//       />

//       <button
//         onClick={runJSCode}
//         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
//       >
//         Run Code
//       </button>

//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// });

// export default MemoizedDropdownField;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFieldValue } from '../../features/formSlice';
// import { selectFlattenedForm } from '../../features/reduxSelectors';

// const getValueByPath = (data, path) => {
//   const parts = path.split('.');
//   return parts.reduce((obj, part) => (obj ? obj[part] : undefined), data);
// };

// const MemoizedDropdownField = ({ item, currentPath, fullFormData }) => {
//   const dispatch = useDispatch();
//   const [options, setOptions] = useState(item.options || []);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const runJsCode = async () => {
//       if (!item.jsCode) return;

//       try {
//         const contextValue = item.dependsOn?.path
//           ? getValueByPath(fullFormData, item.dependsOn.path)
//           : undefined;

//         const asyncFn = new Function(
//           'dependencyValue',
//           `
//             return (async () => {
//               ${item.jsCode}
//             })();
//           `
//         );

//         const result = await asyncFn(contextValue);

//         if (!Array.isArray(result)) {
//           throw new Error('JS code must return an array of { label, value }');
//         }

//         setOptions(result);
//         setError('');
//       } catch (err) {
//         console.error('Dropdown JS Error:', err);
//         setError(err.message);
//         setOptions([]);
//       }
//     };

//     runJsCode();
//   }, [item.jsCode, fullFormData, item.dependsOn?.path]);

//   const handleChange = (e) => {
//     dispatch(updateFieldValue({ path: currentPath, value: e.target.value }));
//   };

//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-1">{item.label || item.name}</label>
//       <select
//         value={item.value || ''}
//         onChange={handleChange}
//         disabled={item.disabled}
//         className="border rounded px-3 py-2 w-full"
//       >
//         <option value="">-- Select an option --</option>
//         {options.map((opt, idx) => (
//           <option key={idx} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// };

// export default MemoizedDropdownField;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFieldValue } from '../../features/formSlice';
import { useSelector } from 'react-redux';


const MemoizedDropdownField = ({ item, currentPath , fieldValues, setFieldValues}) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(item.options || []);
  const [error, setError] = useState('');

//   useEffect(() => {
//     const runJsCode = async () => {
//       if (!item.jsCode) return;

//       try {
       
//         const asyncFn = new Function("fieldValues", `
//   return (async () => {
//     ${item.jsCode}
//   })();
// `);
// const result = await asyncFn(fieldValues || {});


//         if (!Array.isArray(result)) {
//           throw new Error('JS code must return an array of { label, value }');
//         }

//         setOptions(result);
//         setError('');
//       } catch (err) {
//         console.error('Dropdown JS Error:', err);
//         setError(err.message);
//         setOptions([]);
//       }
//     };

//     runJsCode();
//   }, [item.jsCode]);


useEffect(() => {
  const runJsCode = async () => {
    if (!item.jsCode) return;

    try {
      const asyncFn = new Function("fieldValues", `
        return (async () => {
          ${item.jsCode}
        })();
      `);
      const result = await asyncFn(fieldValues || {});

      if (!Array.isArray(result)) {
        throw new Error('JS code must return an array of { label, value }');
      }

      setOptions(result);
      setError('');
    } catch (err) {
      console.error('Dropdown JS Error:', err);
      setError(err.message);
      setOptions([]);
    }
  };

  runJsCode();
}, [item.jsCode, fieldValues]); // ✅ Add fieldValues here




  // const handleChange = (e) => {
  //   dispatch(updateFieldValue({ path: currentPath, value: e.target.value }));
  // };

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    // Redux update
    dispatch(updateFieldValue({ path: currentPath, value: selectedValue }));

    // Local state update
    setFieldValues?.((prev) => ({
      ...prev,
      [item.name]: selectedValue
    }));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{item.label || item.name}</label>
      <select
        value={item.value || ''}
        onChange={handleChange}
        disabled={item.disabled}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">-- Select an option --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default MemoizedDropdownField;
