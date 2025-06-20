











import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Import memoized field components
import MemoizedInputField from './FormFields/MemoizedInputField';
import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
import MemoizedRadioField from './FormFields/MemoizedRadioField';
import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
import MemoizedSelectField from './FormFields/MemoizedSelectField';

// SVG Icons (Replace with a proper icon library like Heroicons if you have one)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Helper to find a field's value by name in the entire form data structure
const findFieldByName = (formArray, nameToFind) => {
  for (const field of formArray) {
    if (field.name === nameToFind) {
      return field.value; // Found the field, return its value
    }
    if (field.children && Array.isArray(field.children)) {
      const childValue = findFieldByName(field.children, nameToFind);
      if (childValue !== undefined) {
        return childValue; // Found in children
      }
    }
  }
  return undefined; // Field not found
};

const Render = memo(({
  data,
  deleteField,
  addfield,
  increase,
  dicrease,
  onEditField,
  path = "",
  fullFormData
}) => {
  console.log(`Rendering Render component at path: "${path}" with ${data.length} items`);

  const renderFormField = useCallback((item, currentPath) => {
    let isVisible = true;

    if (item.visibleIf) {
      const dependentFieldValue = findFieldByName(fullFormData, item.visibleIf);

      if (dependentFieldValue !== undefined) {
        if (Array.isArray(item.dependencyValue)) {
          isVisible = item.dependencyValue.includes(dependentFieldValue);
        } else if (item.dependencyValue === "nonEmpty") {
          isVisible = !!dependentFieldValue;
        } else {
          isVisible = (dependentFieldValue === item.dependencyValue);
        }
      } else {
        console.warn(`Dependency field '${item.visibleIf}' not found for field '${item.name}' at path '${currentPath}'. Assuming visible.`);
      }
    }

    if (!isVisible) {
      return null;
    }

    switch (item.type) {
      case "text":
      case "email":
        return <MemoizedInputField item={item} currentPath={currentPath} />;
      case "textarea":
        return <MemoizedTextareaField item={item} currentPath={currentPath} />;
      case "radio":
        return <MemoizedRadioField item={item} currentPath={currentPath} />;
      case "checkbox":
        return <MemoizedCheckboxField item={item} currentPath={currentPath} />;
      case "select":
        return <MemoizedSelectField item={item} currentPath={currentPath} />;
      case "group":
        return (
          <div className="flex-grow"> {/* Added flex-grow to push buttons to right */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.label || item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Group of Fields</p>
          </div>
        );
      default:
        return (
          <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
            <p className="font-bold">Unknown Field Type: {item.type}</p>
            <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
          </div>
        );
    }
  }, [fullFormData]);

  return (
    <ul className="list-none pl-4 mt-4 border-l-2 border-indigo-200"> {/* Adjusted border for visual appeal */}
      <AnimatePresence initial={false}>
        {data.map((item, index) => {
          const currentPath = path ? `${path}.${index}` : `${index}`;

          let isItemVisible = true;
          if (item.visibleIf) {
            const dependentFieldValue = findFieldByName(fullFormData, item.visibleIf);

            if (dependentFieldValue !== undefined) {
              if (Array.isArray(item.dependencyValue)) {
                isItemVisible = item.dependencyValue.includes(dependentFieldValue);
              } else if (item.dependencyValue === "nonEmpty") {
                isItemVisible = !!dependentFieldValue;
              } else {
                isItemVisible = (dependentFieldValue === item.dependencyValue);
              }
            } else {
              console.warn(`Top-level dependency field '${item.visibleIf}' not found for item '${item.name}' at path '${currentPath}'. Assuming visible.`);
            }
          }

          if (!isItemVisible) {
            return null;
          }

          return (
            <motion.li
              key={item.id}
              className="relative border border-gray-200 p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-3 gap-4 flex-wrap"> {/* items-start for better alignment with multiline field types */}
                {renderFormField(item, currentPath)}

                <div className="flex gap-2 flex-shrink-0 mt-1"> {/* Added mt-1 for slight top margin on buttons */}
                  <button
                    onClick={() => onEditField(item, currentPath)}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                    title="Edit Field"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => deleteField(currentPath)}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                    title="Delete Field"
                  >
                    <TrashIcon />
                  </button>
                  {index !== 0 && (
                    <button
                      onClick={() => increase(currentPath)}
                      className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                      title="Move Up"
                    >
                      <ArrowUpIcon />
                    </button>
                  )}
                  {index < data.length - 1 && (
                    <button
                      onClick={() => dicrease(currentPath)}
                      className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                      title="Move Down"
                    >
                      <ArrowDownIcon />
                    </button>
                  )}
                  {item.type === 'group' && (
                    <button
                      onClick={() => addfield(`${currentPath}.children`)}
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                      title="Add Child Field"
                    >
                      <PlusCircleIcon /> <span className="ml-1 hidden sm:inline">Child</span>
                    </button>
                  )}
                </div>
              </div>

              {item.type === 'group' && item.children && item.children.length > 0 && (
                <Render
                  data={item.children}
                  deleteField={deleteField}
                  addfield={addfield}
                  increase={increase}
                  dicrease={dicrease}
                  onEditField={onEditField}
                  path={`${currentPath}.children`}
                  fullFormData={fullFormData}
                />
              )}
              {/* Path indicator moved to a more subtle position */}
              <span className="absolute bottom-2 right-4 text-xs text-gray-400 font-mono opacity-70">Path: {currentPath}</span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
});

export default Render;