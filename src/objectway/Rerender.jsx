// import React, { memo, useMemo } from 'react';

// // Import your Memoized field components
// import MemoizedInputField from './FormFields/MemoizedInputField';
// import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
// import MemoizedRadioField from './FormFields/MemoizedRadioField';
// import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
// import MemoizedSelectField from './FormFields/MemoizedSelectField';

// // Helper to dynamically extract bundle dependencies (field names) from a JS expression string
// // and then return their VALUES from the bundle.

// // const getExpressionDependencies = (jsExpression, bundle) => {
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
// //     const fieldName = match[1] || match[2] || match[3];
// //     if (fieldName) {
// //       dependencies.add(fieldName);
// //     }
// //   }

// //   // Return the actual VALUES from the bundle for these identified dependencies.
// //   // These values are what useMemo will watch for changes.
// //   return Array.from(dependencies).map(fieldName => bundle[fieldName]);
// // };


// const Rerender = memo(({ item, currentPath, dependency }) => {

//   // Optimized calculation for options
//   const calculatedOptions = useMemo(() => {
//     let options = []; // Default empty array

//     if ((item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') && item.dynamic?.options?.jsExpression) {
//       try {
//         const fn = new Function("bundle", `return ${item.dynamic.options.jsExpression}`);
//         const result = fn(bundle);
//         options = Array.isArray(result) ? result : [];
//       } catch (e) {
//         console.error("JS Options Expression Error for field:", item.name, "Expression:", item.dynamic.options.jsExpression, "Error:", e);
//         console.error("Current bundle state:", dependency);
//         options = [{ label: "Error loading options", value: "" }];
//       }
//     } else {
//       options = item.options || [];
//     }
//     return options;
//   }, [dependency]);


//   // Optimized calculation for visibility
//   const isFieldVisible = useMemo(() => {
//     const jsCondition = item.dynamic?.visibility?.conditions?.jsExpression;

//     let conditionResult = true; // Default if no expression
//     if (jsCondition) {
//       try {
//         const fn = new Function("bundle", `return (${jsCondition})`);
//         conditionResult = fn(bundle);
//       } catch (e) {
//         console.error("JS Visibility Condition Error for field:", item.name, "Condition:", jsCondition, "Error:", e);
//         console.error("Current bundle state:", bundle);
//         conditionResult = false;
//       }
//     }

//     const visibilityMode = item.dynamic?.visibility?.modes?.[0] || 'show';
//     if (visibilityMode === 'hide') {
//       return !conditionResult;
//     }
//     return conditionResult;
//   }, [dependency]);


//   if (!isFieldVisible) {
//       return null;
//   }

//   const commonProps = {
//     item: { ...item, options: calculatedOptions },
//     currentPath,
//   };

//   switch (item.type) {
//     case "text":
//     case "email":
//       return <MemoizedInputField {...commonProps} />;
//     case "textarea":
//       return <MemoizedTextareaField {...commonProps} />;
//     case "radio":
//       return <MemoizedRadioField {...commonProps} />;
//     case "checkbox":
//       return <MemoizedCheckboxField {...commonProps} />;
//     case "select":
//       return <MemoizedSelectField {...commonProps} />;
//     default:
//       if (item.type === 'group') {
//         return (
//             <div className="flex-grow">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{item.label || item.name}</h3>
//                 <p className="text-sm text-gray-500 mb-2">Group of Fields</p>
//             </div>
//         );
//       }
//       return (
//         <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
//           <p className="font-bold">Unknown Field Type: {item.type}</p>
//           <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
//         </div>
//       );
//   }
// });

// export default Rerender;


import React, { memo, useMemo } from 'react';

// Import your Memoized field components
import MemoizedInputField from './FormFields/MemoizedInputField';
import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
import MemoizedRadioField from './FormFields/MemoizedRadioField';
import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
import MemoizedSelectField from './FormFields/MemoizedSelectField';

// The getExpressionDependencies helper is now in Render.js, so it's removed from here.

const Rerender = memo(({ item, currentPath, bundle, dependency }) => { // Now accepts bundle AND dependency

  // Optimized calculation for options
  const calculatedOptions = useMemo(() => {
    let options = []; // Default empty array

    if ((item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') && item.dynamic?.options?.jsExpression) {
      try {
        // `bundle` is still needed here as it's passed to the `new Function` context.
        const fn = new Function("bundle", `return ${item.dynamic.options.jsExpression}`);
        const result = fn(bundle);
        options = Array.isArray(result) ? result : [];
      } catch (e) {
        console.error("JS Options Expression Error for field:", item.name, "Expression:", item.dynamic.options.jsExpression, "Error:", e);
        console.error("Current bundle state (for options):", bundle); // Log full bundle if needed for context
        options = [{ label: "Error loading options", value: "" }];
      }
    } else {
      options = item.options || [];
    }
    return options;
  }, [
    dependency // Use the pre-calculated, granular dependency array
  ]);


  // Optimized calculation for visibility
  const isFieldVisible = useMemo(() => {
    const jsCondition = item.dynamic?.visibility?.conditions?.jsExpression;

    let conditionResult = true; // Default if no expression
    if (jsCondition) {
      try {
        // `bundle` is still needed here for evaluation.
        const fn = new Function("bundle", `return (${jsCondition})`);
        conditionResult = fn(bundle);
      } catch (e) {
        console.error("JS Visibility Condition Error for field:", item.name, "Condition:", jsCondition, "Error:", e);
        console.error("Current bundle state (for visibility):", bundle); // Log full bundle if needed for context
        conditionResult = false;
      }
    }

    const visibilityMode = item.dynamic?.visibility?.modes?.[0] || 'show';
    if (visibilityMode === 'hide') {
      return !conditionResult;
    }
    return conditionResult;
  }, [
    dependency // Use the pre-calculated, granular dependency array
  ]);


  if (!isFieldVisible) {
      return null;
  }


  const commonProps = {
    item: { ...item, options: calculatedOptions },
    currentPath,
  };

  switch (item.type) {
    case "text":
    case "email":
      return <MemoizedInputField {...commonProps} />;
    case "textarea":
      return <MemoizedTextareaField {...commonProps} />;
    case "radio":
      return <MemoizedRadioField {...commonProps} />;
    case "checkbox":
      return <MemoizedCheckboxField {...commonProps} />;
    case "select":
      return <MemoizedSelectField {...commonProps} />;
    default:
      if (item.type === 'group') {
        return (
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.label || item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Group of Fields</p>
            </div>
        );
      }
      return (
        <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
          <p className="font-bold">Unknown Field Type: {item.type}</p>
          <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
        </div>
      );
  }
});

export default Rerender;
