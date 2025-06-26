
// import React, { memo, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import ApiRender from './ApiRender'; // adjust the path as needed



// // Import memoized field components
// import MemoizedInputField from './FormFields/MemoizedInputField';
// import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
// import MemoizedRadioField from './FormFields/MemoizedRadioField';
// import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
// import MemoizedSelectField from './FormFields/MemoizedSelectField';

// // SVG Icons (Replace with a proper icon library like Heroicons if you have one)
// const EditIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// const ArrowUpIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
//   </svg>
// );

// const ArrowDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
//   </svg>
// );

// const PlusCircleIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // Helper to find a field's value by name in the entire form data structure
// // const findFieldByName = (formArray, nameToFind) => {
// //   for (const field of formArray) {
// //     if (field.name === nameToFind) {
// //       return field.value; // Found the field, return its value
// //     }
// //     if (field.children && Array.isArray(field.children)) {
// //       const childValue = findFieldByName(field.children, nameToFind);
// //       if (childValue !== undefined) {
// //         return childValue; // Found in children
// //       }
// //     }
// //   }
// //   return undefined; // Field not found
// // };

// // const isDisabled = (item, data) => {
// //   if (!item.dependsOn || item.dependsOn.mode !== "enabled") return false;
// //   // if (!item.dependsOn) return false; // no dependency → not disabled
// //   const dependentValue = getValueByPath(data, item.dependsOn.path);
// //   return !dependentValue; // disable if value is empty/null/undefined
// // };

// // const shouldRenderField = (item, data) => {
// //   if (!item.dependsOn || item.dependsOn.mode !== "visible") return true;

// //   const actualValue = getValueByPath(data, item.dependsOn.path);
// //   const expectedValues = item.dependsOn.expectedValues;

// //   if (!expectedValues) return !!actualValue;

// //   return Array.isArray(expectedValues)
// //     ? expectedValues.includes(actualValue)
// //     : actualValue === expectedValues;
// // };

// // const Render = memo(({
// //   data,
// //   deleteField,
// //   addfield,
// //   increase,
// //   dicrease,
// //   onEditField,
// //   path = "",
// //   fullFormData
// // }) => {
// //   console.log(`Rendering Render component at path: "${path}" with ${data.length} items`);

// //   const renderFormField = useCallback((item, currentPath) => {
// //     let isVisible = true;

// //     // if (item.visibleIf) {
// //     //   const dependentFieldValue = findFieldByName(fullFormData, item.visibleIf);

// //     //   if (dependentFieldValue !== undefined) {
// //     //     if (Array.isArray(item.dependencyValue)) {
// //     //       isVisible = item.dependencyValue.includes(dependentFieldValue);
// //     //     } else if (item.dependencyValue === "nonEmpty") {
// //     //       isVisible = !!dependentFieldValue;
// //     //     } else {
// //     //       isVisible = (dependentFieldValue === item.dependencyValue);
// //     //     }
// //     //   } else {
// //     //     console.warn(`Dependency field '${item.visibleIf}' not found for field '${item.name}' at path '${currentPath}'. Assuming visible.`);
// //     //   }
// //     // }

// //     // if (!isVisible) {
// //     //   return null;
// //     // }

// //     switch (item.type) {
// //       case "text":
// //       case "email":
// //         return <MemoizedInputField item={item} currentPath={currentPath} />;
// //       case "textarea":
// //         return <MemoizedTextareaField item={item} currentPath={currentPath} />;
// //       case "radio":
// //         return <MemoizedRadioField item={item} currentPath={currentPath} />;
// //       case "checkbox":
// //         return <MemoizedCheckboxField item={item} currentPath={currentPath} />;
// //       case "select":
// //         return <MemoizedSelectField item={item} currentPath={currentPath} />;
// //       case "group":
// //         return (
// //           <div className="flex-grow"> {/* Added flex-grow to push buttons to right */}
// //             <h3 className="text-lg font-bold text-gray-800 mb-2">{item.label || item.name}</h3>
// //             <p className="text-sm text-gray-500 mb-2">Group of Fields</p>
// //           </div>
// //         );
// //       default:
// //         return (
// //           <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
// //             <p className="font-bold">Unknown Field Type: {item.type}</p>
// //             <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
// //           </div>
// //         );
// //     }
// //   }, [fullFormData]);

// //   return (
// //     <ul className="list-none pl-4 mt-4 border-l-2 border-indigo-200"> {/* Adjusted border for visual appeal */}
// //       <AnimatePresence initial={false}>
// //         {data.map((item, index) => {
// //           const currentPath = path ? `${path}.${index}` : `${index}`;

// //           if (!shouldRenderField(item, data)) {
// //     return null; // skip rendering this field
// //         }

// //           // let isItemVisible = true;
// //           // if (item.visibleIf) {
// //           //   const dependentFieldValue = findFieldByName(fullFormData, item.visibleIf);

// //           //   if (dependentFieldValue !== undefined) {
// //           //     if (Array.isArray(item.dependencyValue)) {
// //           //       isItemVisible = item.dependencyValue.includes(dependentFieldValue);
// //           //     } else if (item.dependencyValue === "nonEmpty") {
// //           //       isItemVisible = !!dependentFieldValue;
// //           //     } else {
// //           //       isItemVisible = (dependentFieldValue === item.dependencyValue);
// //           //     }
// //           //   } else {
// //           //     console.warn(`Top-level dependency field '${item.visibleIf}' not found for item '${item.name}' at path '${currentPath}'. Assuming visible.`);
// //           //   }
// //           // }

// //           // if (!isItemVisible) {
// //           //   return null;
// //           // }
          

// //           return (
// //             <motion.li
// //               key={item.id}
// //               className="relative border border-gray-200 p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, x: -50 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <div className="flex items-start justify-between mb-3 gap-4 flex-wrap"> {/* items-start for better alignment with multiline field types */}
// //                 {renderFormField(item, currentPath)}
// //                 <div className="w-full">
// //                       {item.source?.type === "apiCall" && (
// //                       <ApiRender field={item} />
// //                   )}
// //                  </div>

// //                 <div className="flex gap-2 flex-shrink-0 mt-1"> {/* Added mt-1 for slight top margin on buttons */}
// //                   <button
// //                     onClick={() => onEditField(item, currentPath)}
// //                     className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
// //                     title="Edit Field"
// //                   >
// //                     <EditIcon />
// //                   </button>
// //                   <button
// //                     onClick={() => deleteField(currentPath)}
// //                     className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
// //                     title="Delete Field"
// //                   >
// //                     <TrashIcon />
// //                   </button>
// //                   {index !== 0 && (
// //                     <button
// //                       onClick={() => increase(currentPath)}
// //                       className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
// //                       title="Move Up"
// //                     >
// //                       <ArrowUpIcon />
// //                     </button>
// //                   )}
// //                   {index < data.length - 1 && (
// //                     <button
// //                       onClick={() => dicrease(currentPath)}
// //                       className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
// //                       title="Move Down"
// //                     >
// //                       <ArrowDownIcon />
// //                     </button>
// //                   )}
// //                   {item.type === 'group' && (
// //                     <button
// //                       onClick={() => addfield(`${currentPath}.children`)}
// //                       className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
// //                       title="Add Child Field"
// //                     >
// //                       <PlusCircleIcon /> <span className="ml-1 hidden sm:inline">Child</span>
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               {item.type === 'group' && item.children && item.children.length > 0 && (
// //                 <Render
// //                   data={item.children}
// //                   deleteField={deleteField}
// //                   addfield={addfield}
// //                   increase={increase}
// //                   dicrease={dicrease}
// //                   onEditField={onEditField}
// //                   path={`${currentPath}.children`}
// //                   fullFormData={fullFormData}
// //                 />
// //               )}
// //               {/* Path indicator moved to a more subtle position */}
// //               <span className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono opacity-70">Path: {currentPath}</span>
// //             </motion.li>
// //           );
// //         })}
// //       </AnimatePresence>
// //     </ul>
// //   );
// // });

// // export default Render;



// import React, { memo, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // ApiRender is assumed to be defined and imported from another file.
// // If ApiRender is not imported, please ensure its definition is accessible in your project.
// import ApiRender from './ApiRender';



// // Form field components
// import MemoizedInputField from './FormFields/MemoizedInputField';
// import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
// import MemoizedRadioField from './FormFields/MemoizedRadioField';
// import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
// import MemoizedSelectField from './FormFields/MemoizedSelectField';
// import Rerender from './Rerender';


// const getValueByPath = (data, path) => {
//   const parts = path.split('.');
//   let current = data;
//   for (let part of parts) {
//     if (Array.isArray(current)) part = Number(part);
//     if (current && part in current) {
//       current = current[part];
//     } else {
//       return undefined;
//     }
//   }
//   return current;
// };

// const buildBundleFromArray = (formArray) => {
//   const bundle = {};
//   const flatten = (arr) => {
//     arr.forEach((field) => {
//       if (field.name) {
//         bundle[field.name] = field.value;
//       }
//       if (Array.isArray(field.children)) flatten(field.children);
//     });
//   };
//   flatten(formArray);
//   return bundle;
// };



// //   const getExpressionDependencies = (jsExpression, bundle) => {
// //   if (!jsExpression || typeof jsExpression !== 'string') {
// //     return [];
// //   }

// //   const dependencies = new Set();
// //   // Regex to match:
// //   // 1. bundle.fieldName (dot notation)
// //   // 2. bundle['fieldName'] or bundle["fieldName"] (bracket notation with string literals)
// //   const regex = /bundle(?:\.([a-zA-Z_$][0-9a-zA-Z_$]*)|\[(?:'([a-zA-Z_$][0-9a-zA-Z_$]*)'|"([a-zA-Z_$][0-9a-zA-Z_$]*)")\])/g;
// //   let match;

// //   while ((match = regex.exec(jsExpression)) !== null) {
// //     // Group 1: dot notation capture (e.g., 'country')
// //     // Group 2: single-quoted bracket notation capture (e.g., 'state')
// //     // Group 3: double-quoted bracket notation capture (e.g., 'city')
// //     const fieldName = match[1] || match[2] || match[3];
// //     if (fieldName) {
// //       dependencies.add(fieldName);
// //     }
// //   }

// //   // Return the actual values from the bundle for these identified dependencies
// //   return Array.from(dependencies);
// // };

// const getExpressionDependencies = (jsExpression, bundle) => {
//   if (!jsExpression || typeof jsExpression !== 'string') {
//     return [];
//   }

//   const dependencies = new Set();
//   // Regex to match:
//   // 1. bundle.fieldName (dot notation)
//   // 2. bundle['fieldName'] or bundle["fieldName"] (bracket notation with string literals)
//   const regex = /bundle(?:\.([a-zA-Z_$][0-9a-zA-Z_$]*)|\[(?:'([a-zA-Z_$][0-9a-zA-Z_$]*)'|"([a-zA-Z_$][0-9a-zA-Z_$]*)")\])/g;
//   let match;

//   while ((match = regex.exec(jsExpression)) !== null) {
//     const fieldName = match[1] || match[2] || match[3];
//     if (fieldName) {
//       dependencies.add(fieldName);
//     }
//   }

//   // Return the actual VALUES from the bundle for these identified dependencies.
//   // These values are what useMemo will watch for changes.
//   return Array.from(dependencies).map(fieldName => bundle[fieldName]);
// };


// const shouldDisplayField = (item, bundle) => {
//   const jsCondition = item.dynamic?.visibility?.conditions?.jsExpression;
//     let temp=getExpressionDependencies(jsCondition,bundle)
//     console.log(temp)
//   if (jsCondition) {
//     try {
//       const fn = new Function("bundle", `return (${jsCondition})`);
//       return fn(bundle);
//     } catch (e) {
//       console.error("JS Condition Error for field:", item.name, "Condition:", jsCondition, "Error:", e);
//       console.error("Current bundle state:", bundle);
//       return false;
//     }
//   }
//   return true;
// };


// const Render = memo(({
//   data,
//   deleteField,
//   addfield,
//   increase,
//   dicrease,
//   onEditField,
//   path = "",
//   fullFormData // fullFormData is still passed down for building bundle and recursive calls
// }) => {
//   const bundle = useMemo(() => buildBundleFromArray(fullFormData), [fullFormData]);
//   console.log(bundle)




//   // renderFormField calculates dynamic options directly
//   // const renderFormField = useCallback((item, currentPath) => {
//   //   let calculatedOptions = []; // Default empty array

//   //   // Check if the field type supports options AND has a dynamic options expression
//   //   if ((item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') && item.dynamic?.options?.jsExpression) {
//   //     try {
//   //       // Evaluate the jsExpression directly here to get the options
//   //       const fn = new Function("bundle", `return ${item.dynamic.options.jsExpression}`);
//   //       const result = fn(bundle); // Pass the current bundle to the dynamic function

//   //       // Ensure the result is an array, otherwise handle it
//   //       calculatedOptions = Array.isArray(result) ? result : [];
//   //     } catch (e) {
//   //       console.error("JS Options Expression Error for field:", item.name, "Expression:", item.dynamic.options.jsExpression, "Error:", e);
//   //       console.error("Current bundle state:", bundle);
//   //       calculatedOptions = [{ label: "Error loading options", value: "" }]; // Show an error option
//   //     }
//   //   } else {
//   //     // If no dynamic expression, use static options if they exist
//   //     calculatedOptions = item.options || [];
     
//   //   }

//   //   const commonProps = {
//   //     // Pass the item, but override its 'options' with the calculated ones
//   //     item: { ...item, options: calculatedOptions },
//   //     currentPath, // Current path to find data in Redux (for value, label etc.)
//   //   };



//   //   switch (item.type) {
//   //     case "text":
//   //     case "email":
//   //       return <MemoizedInputField {...commonProps} />;
//   //     case "textarea":
//   //       return <MemoizedTextareaField {...commonProps} />;
//   //     case "radio":
//   //       return <MemoizedRadioField {...commonProps} />;
//   //     case "checkbox":
//   //       return <MemoizedCheckboxField {...commonProps} />;
//   //     case "select":
//   //       return <MemoizedSelectField {...commonProps} />; // MemoizedSelectField now receives calculated options via commonProps.item
//   //     case "group":
//   //       return (
//   //         <div className="flex-grow">
//   //           <h3 className="text-lg font-bold text-gray-800 mb-2">{item.label || item.name}</h3>
//   //           <p className="text-sm text-gray-500 mb-2">Group of Fields</p>
//   //         </div>
//   //       );
//   //     default:
//   //       return (
//   //         <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
//   //           <p className="font-bold">Unknown Field Type: {item.type}</p>
//   //           <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
//   //         </div>
//   //       );
//   //   }
//   // }, [bundle]); // Add bundle to dependencies, as it's used to calculate dynamic options


// const renderFormField = (item, currentPath) => {
//     // Rerender will internally handle:
//     // 1. Evaluating its visibility (isFieldVisible).
//     // 2. Calculating its options (calculatedOptions) based on its jsExpression and relevant bundle values.
//     // 3. Rendering the correct Memoized*Field component (e.g., MemoizedInputField, MemoizedSelectField).
//     // If the field is not visible, Rerender will return null.
//     let dependency=getExpressionDependencies(item.dynamic?.options?.jsExpression, bundle)

//     return (
//         <Rerender
//             item={item} // The full field configuration object
//             currentPath={currentPath} // The path to this field in the Redux store
//             dependency={dependency} // The flattened form data (needed by jsExpressions)
//         />
//     );
//   };
  

//   return (
//     <ul className="list-none pl-4 mt-4 border-l-2 border-indigo-200">
//       <AnimatePresence initial={false}>
//         {data.map((item, index) => {
//           const currentPath = path ? `${path}.${index}` : `${index}`;

//           if (!shouldDisplayField(item, bundle)) return null;

//           return (
//             <motion.li
//               key={item.id}
//               className="relative border border-gray-200 p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
//                 {renderFormField(item, currentPath)}

//                 <div className="w-full">
//                   {item.source?.type === "apiCall" && <ApiRender field={item} />}
//                 </div>

//                 <div className="flex gap-2 flex-shrink-0 mt-1">
//                   <button onClick={() => onEditField(item, currentPath)} title="Edit Field">✏️</button>
//                   <button onClick={() => deleteField(currentPath)} title="Delete Field">🗑️</button>
//                   {index !== 0 && (
//                     <button onClick={() => increase(currentPath)} title="Move Up">⬆️</button>
//                   )}
//                   {index < data.length - 1 && (
//                     <button onClick={() => dicrease(currentPath)} title="Move Down">⬇️</button>
//                   )}
//                   {item.type === 'group' && (
//                     <button onClick={() => addfield(`${currentPath}.children`)} title="Add Child Field">➕</button>
//                   )}
//                 </div>
//               </div>

//               {item.type === 'group' && item.children?.length > 0 && (
//                 <Render
//                   data={item.children}
//                   deleteField={deleteField}
//                   addfield={addfield}
//                   increase={increase}
//                   dicrease={dicrease}
//                   onEditField={onEditField}
//                   path={`${currentPath}.children`}
//                   fullFormData={fullFormData} // fullFormData is still passed down recursively
//                 />
//               )}

//               <span className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono opacity-70">Path: {currentPath}</span>
//             </motion.li>
//           );
//         })}
//       </AnimatePresence>
//     </ul>
//   );
// });

// export default Render;





import React, { memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the Rerender component from the Rerender.js Canvas
import Rerender from './Rerender'; // Adjust this path if Rerender.js is in a different directory

// ApiRender is assumed to be defined and imported from another file.
// Ensure this path is correct in your project.
import ApiRender from './ApiRender';


// Utility functions (remain the same as they were)
const getValueByPath = (data, path) => {
  const parts = path.split('.');
  let current = data;
  for (let part of parts) {
    if (Array.isArray(current)) part = Number(part);
    if (current && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
};

const buildBundleFromArray = (formArray) => {
  const bundle = {};
  const flatten = (arr) => {
    arr.forEach((field) => {
      if (field.name) {
        bundle[field.name] = field.value;
      }
      if (Array.isArray(field.children)) flatten(field.children);
    });
  };
  flatten(formArray);

  return bundle;
};


// The shouldDisplayField function is now entirely handled within the Rerender component itself.
// So, it's not needed as a separate function here in Render.js anymore.


// NEW: Helper to dynamically extract bundle dependencies (field names) from a JS expression string
// and then return their VALUES from the bundle.
const getExpressionDependencies = (jsExpression, bundle) => {
  if (!jsExpression || typeof jsExpression !== 'string') {
    return [];
  }

  const dependencies = new Set();
  const regex = /bundle(?:\.([a-zA-Z_$][0-9a-zA-Z_$]*)|\[(?:'([a-zA-Z_$][0-9a-zA-Z_$]*)'|"([a-zA-Z_$][0-9a-zA-Z_$]*)")\])/g;
  let match;

  while ((match = regex.exec(jsExpression)) !== null) {
    const fieldName = match[1] || match[2] || match[3];
    if (fieldName) {
      dependencies.add(fieldName);
    }
  }

  // Return the actual VALUES from the bundle for these identified dependencies.
  // These values are what useMemo will watch for changes.
  return Array.from(dependencies).map(fieldName => bundle[fieldName]);
};


const Render = memo(({
  data,
  deleteField,
  addfield,
  increase,
  dicrease,
  onEditField,
  path = "",
  fullFormData // fullFormData is still passed down for building the bundle and recursive calls
}) => {
  // Build the bundle once for this Render component's scope.
  // This bundle is then passed down to each Rerender instance.
  const bundle = useMemo(() => buildBundleFromArray(fullFormData), [fullFormData]);


  // renderFieldWithWrapper is now a regular function, not memoized by useCallback.
  const renderFieldWithWrapper = (item, currentPath) => {
    // Calculate the dependencies for this specific field's options and visibility expressions.
    const optionsDependencies = getExpressionDependencies(item.dynamic?.options?.jsExpression, bundle);
    const visibilityDependencies = getExpressionDependencies(item.dynamic?.visibility?.conditions?.jsExpression, bundle);
    console.log(optionsDependencies)

    // Combine all relevant dependencies for this item into a single array to pass to Rerender.
    // This combined array will be used by Rerender's internal useMemo hooks.



    // const combinedDependencies = useMemo(() => ([
    //     // item.type, // Item type can influence options/visibility
    //     // item.dynamic?.options?.jsExpression, // Expression string itself
    //     // item.options, // Static options
    //     // item.dynamic?.visibility?.conditions?.jsExpression, // Visibility expression string
    //     // item.dynamic?.visibility?.modes?.[0], // Visibility mode
    //     // item.name, // Used for console.error reporting, if it changes it means the field item changed
    //     ...optionsDependencies, // Specific bundle values for options
    //     ...visibilityDependencies // Specific bundle values for visibility
    // ]), [
    //     // item.type,
    //     // item.dynamic?.options?.jsExpression,
    //     // item.options,
    //     // item.dynamic?.visibility?.conditions?.jsExpression,
    //     // item.dynamic?.visibility?.modes?.[0],
    //     // item.name,
    //     // Since optionsDependencies and visibilityDependencies are already arrays of values,
    //     // spreading them here ensures the memoization is granular.
    //     ...optionsDependencies,
    //     ...visibilityDependencies
    // ]);



    const combinedDependencies=[
        ...optionsDependencies, // Specific bundle values for options
        ...visibilityDependencies // Specific bundle values for visibility
    ]


    // Rerender will internally handle:
    // 1. Evaluating its visibility (isFieldVisible).
    // 2. Calculating its options (calculatedOptions) based on its jsExpression and relevant bundle values.
    // 3. Rendering the correct Memoized*Field component (e.g., MemoizedInputField, MemoizedSelectField).
    // If the field is not visible, Rerender will return null.
    return (
        <Rerender
            item={item} // The full field configuration object
            currentPath={currentPath} // The path to this field in the Redux store
            bundle={bundle} // The flattened form data (needed by jsExpressions for evaluation)
            dependency={combinedDependencies} // Pass the optimized dependency array to Rerender
        />
    );
  };


  return (
    <ul className="list-none pl-4 mt-4 border-l-2 border-indigo-200">
      <AnimatePresence initial={false}>
        {data.map((item, index) => {
          const currentPath = path ? `${path}.${index}` : `${index}`;

          // Call the function that returns the Rerender component.
          // Rerender itself will decide if the field should be displayed or not
          // by returning null if not visible.
          const renderedFieldContent = renderFieldWithWrapper(item, currentPath);

          // If Rerender returns null (meaning the field is hidden),
          // we skip rendering this entire list item.
          if (renderedFieldContent === null) {
            return null;
          }

          return (
            <motion.li
              key={item.id} // Use item.id as a stable key for React lists
              className="relative border border-gray-200 p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
                {renderedFieldContent} {/* Render the output from the Rerender component */}

                {item.source?.type === "apiCall" && (
                    <div className="w-full">
                        <ApiRender field={item} />
                    </div>
                )}

                <div className="flex gap-2 flex-shrink-0 mt-1">
                  {/* Action buttons for editing, deleting, moving fields */}
                  <button onClick={() => onEditField(item, currentPath)} title="Edit Field">✏️</button>
                  <button onClick={() => deleteField(currentPath)} title="Delete Field">🗑️</button>
                  {index !== 0 && (
                    <button onClick={() => increase(currentPath)} title="Move Up">⬆️</button>
                  )}
                  {index < data.length - 1 && (
                    <button onClick={() => dicrease(currentPath)} title="Move Down">⬇️</button>
                  )}
                  {/* Add child field button for group types */}
                  {item.type === 'group' && (
                    <button onClick={() => addfield(`${currentPath}.children`)} title="Add Child Field">➕</button>
                  )}
                </div>
              </div>

              {/* Recursively render children if the item is a group and has children */}
              {item.type === 'group' && item.children?.length > 0 && (
                <Render
                  data={item.children}
                  deleteField={deleteField}
                  addfield={addfield}
                  increase={increase}
                  dicrease={dicrease}
                  onEditField={onEditField}
                  path={`${currentPath}.children`} // Adjust path for children
                  fullFormData={fullFormData} // Pass fullFormData down for child Render instances
                />
              )}

              {/* Display current field path for debugging/identification */}
              <span className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono opacity-70">Path: {currentPath}</span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
});

export default Render;

