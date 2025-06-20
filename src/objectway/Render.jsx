// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';


// const Render = ({ data, onUpdate, deleteField,addfield, increase, dicrease, onEditField, path = "" }) => {
//   console.log("render is render")

//     const renderFormField = (item, currentPath) => {
//     switch (item.type) {
//       case "text":
//       case "email":
//         return (
//           <div className="mb-2 flex-grow">
//             <label htmlFor={`${currentPath}-input`} className="block text-gray-700 text-sm font-medium mb-1">
//               {item.label || item.name}:
//             </label>
//             <input
//               id={`${currentPath}-input`}
//               type={item.type}
//               value={item.value || ''}
//               placeholder={item.placeholder}
//               onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         );
//       case "textarea":
//         return (
//           <div className="mb-2 flex-grow">
//             <label htmlFor={`${currentPath}-textarea`} className="block text-gray-700 text-sm font-medium mb-1">
//               {item.label || item.name}:
//             </label>
//             <textarea
//               id={`${currentPath}-textarea`}
//               value={item.value || ''}
//               placeholder={item.placeholder}
//               onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[60px] transition-all duration-200"
//             ></textarea>
//           </div>
//         );
//       case "radio":
//         return (
//           <div className="mb-2 flex-grow">
//             <label className="block text-gray-700 text-sm font-medium mb-1">{item.label || item.name}:</label>
//             {item.options && item.options.map((option, optIndex) => (
//               <div key={`${currentPath}-radio-${optIndex}`} className="inline-block mr-4">
//                 <input
//                   type="radio"
//                   id={`${currentPath}-radio-${optIndex}`}
//                   name={currentPath} // Name attribute is important for radio groups
//                   value={option.value}
//                   checked={item.value === option.value}
//                   onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
//                   className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                 />
//                 <label htmlFor={`${currentPath}-radio-${optIndex}`} className="text-gray-700">{option.label}</label>
//               </div>
//             ))}
//           </div>
//         );
//       case "checkbox":
//         return (
//           <div className="mb-2 flex-grow flex items-center">
//             <input
//               type="checkbox"
//               id={`${currentPath}-checkbox`}
//               checked={item.value || false}
//               onChange={(e) => onUpdate(`${currentPath}.value`, e.target.checked)}
//               className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor={`${currentPath}-checkbox`} className="text-gray-700 text-sm font-medium">
//               {item.label || item.name}
//             </label>
//           </div>
//         );
//       case "select":
//         return (
//           <div className="mb-2 flex-grow">
//             <label htmlFor={`${currentPath}-select`} className="block text-gray-700 text-sm font-medium mb-1">
//               {item.label || item.name}:
//             </label>
//             <select
//               id={`${currentPath}-select`}
//               value={item.value || ''}
//               onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             >
//               {item.options && item.options.map((option, optIndex) => (
//                 <option key={`${currentPath}-select-option-${optIndex}`} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       // 'section' case is removed, as we don't have sections anymore
//       default:
//         // Fallback for unknown types, perhaps a simple text input or an error message
//         return (
//           <div className="mb-2 flex-grow text-red-500">
//             <p className="font-semibold">Unknown Field Type: {item.type}</p>
//             <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <ul className="list-none pl-4 border-l border-gray-300">
//       <AnimatePresence initial={false}>
//         {data.map((item, index) => {
//           const currentPath = path ? `${path}.${index}` : `${index}`;

//           return (
//             <motion.li
//               key={item.id}
//               className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
//                 {renderFormField(item, currentPath)}

//                 <div className="flex gap-2 flex-shrink-0">
//                   <button onClick={() => onEditField(item, currentPath)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-md text-sm" title="Edit Field">✏️</button>
//                   <button onClick={() => deleteField(currentPath)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-md text-sm" title="Delete Field">🗑️</button>
//                   {index !== 0 && (
//                     <button onClick={() => increase(currentPath)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md text-sm" title="Move Up">⬆️</button>
//                   )}
//                   {index < data.length - 1 && (
//                     <button onClick={() => dicrease(currentPath)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md text-sm" title="Move Down">⬇️</button>
//                   )}

//                   {/* this parts is working conditions */}
//                   {/* {(item.children && item.children.length == 0) ?(<button onClick={() => { addfield(`${currentPath}.children`) }}>Add_Children</button>):(<></>)} */}
//                 </div>
//               </div>

//               {/* Recursive rendering of children */}
//               {item.children && item.children.length > 0 && (
//                 <Render
//                   data={item.children}
//                   onUpdate={onUpdate}
//                   deleteField={deleteField}
//                   increase={increase}
//                   dicrease={dicrease}
//                   onEditField={onEditField}
//                   path={`${currentPath}.children`}
//                 />
//               )}

//               <span className="ml-2 text-xs text-gray-500">(Path: {currentPath})</span>
//             </motion.li>
//           );
//         })}
//       </AnimatePresence>
//     </ul>
//   );
// };

// export default Render;


// src/Render.jsx
// src/Render.jsx
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the new memoized field components
// (These files need to be updated in the next step to use Redux hooks)
import MemoizedInputField from './FormFields/MemoizedInputField';
import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
import MemoizedRadioField from './FormFields/MemoizedRadioField';
import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
import MemoizedSelectField from './FormFields/MemoizedSelectField';


// Memoize the Render component itself
const Render = memo(({ data, onUpdate, deleteField, addfield, increase, dicrease, onEditField, path = "" }) => {
  // This console log will still fire if `data` prop changes (which it does from Statemanager)
  // or if its own state/props change. The true optimization is in the leaf components.
  console.log(`Rendering Render component at path: "${path}"`);

  const renderFormField = (item, currentPath) => {
    switch (item.type) {
      case "text":
      case "email":
        // Pass relevant props down. Individual fields will select their own values.
        return <MemoizedInputField item={item} currentPath={currentPath} onUpdate={onUpdate} />;
      case "textarea":
        return <MemoizedTextareaField item={item} currentPath={currentPath} onUpdate={onUpdate} />;
      case "radio":
        return <MemoizedRadioField item={item} currentPath={currentPath} onUpdate={onUpdate} />;
      case "checkbox":
        return <MemoizedCheckboxField item={item} currentPath={currentPath} onUpdate={onUpdate} />;
      case "select":
        return <MemoizedSelectField item={item} currentPath={currentPath} onUpdate={onUpdate} />;
      case "group":
        return (
          <div className="mb-2 flex-grow">
            <h3 className="text-md font-semibold text-gray-700 mb-2">{item.label || item.name} (Group)</h3>
          </div>
        );
      default:
        return (
          <div className="mb-2 flex-grow text-red-500">
            <p className="font-semibold">Unknown Field Type: {item.type}</p>
            <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
          </div>
        );
    }
  };

  return (
    <ul className="list-none pl-4 border-l border-gray-300">
      <AnimatePresence initial={false}>
        {data.map((item, index) => {
          const currentPath = path ? `${path}.${index}` : `${index}`;

          return (
            <motion.li
              key={item.id}
              className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                {renderFormField(item, currentPath)}

                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => onEditField(item, currentPath)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-md text-sm" title="Edit Field">✏️</button>
                  <button onClick={() => deleteField(currentPath)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-md text-sm" title="Delete Field">🗑️</button>
                  {index !== 0 && (
                    <button onClick={() => increase(currentPath)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md text-sm" title="Move Up">⬆️</button>
                  )}
                  {index < data.length - 1 && (
                    <button onClick={() => dicrease(currentPath)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md text-sm" title="Move Down">⬇️</button>
                  )}
                </div>
              </div>

              {item.children && item.children.length > 0 && (
                <Render
                  data={item.children}
                  onUpdate={onUpdate}
                  deleteField={deleteField}
                  addfield={addfield}
                  increase={increase}
                  dicrease={dicrease}
                  onEditField={onEditField}
                  path={`${currentPath}.children`}
                />
              )}

              <span className="ml-2 text-xs text-gray-500">(Path: {currentPath})</span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
});

export default Render;