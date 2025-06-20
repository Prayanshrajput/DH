import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Render = ({ data, onUpdate, deleteField, increase, dicrease, onEditField }) => {
  // Path is now simply the index of the item in the flat array
  // We no longer need 'path' as a prop from parent for nested structures, as there are none.
  // It's effectively just the index for array operations.

  const renderFormField = (item, currentPath) => {
    switch (item.type) {
      case "text":
      case "email":
        return (
          <div className="mb-2 flex-grow">
            <label htmlFor={`${currentPath}-input`} className="block text-gray-700 text-sm font-medium mb-1">
              {item.label || item.name}:
            </label>
            <input
              id={`${currentPath}-input`}
              type={item.type}
              value={item.value || ''}
              placeholder={item.placeholder}
              onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        );
      case "textarea":
        return (
          <div className="mb-2 flex-grow">
            <label htmlFor={`${currentPath}-textarea`} className="block text-gray-700 text-sm font-medium mb-1">
              {item.label || item.name}:
            </label>
            <textarea
              id={`${currentPath}-textarea`}
              value={item.value || ''}
              placeholder={item.placeholder}
              onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[60px] transition-all duration-200"
            ></textarea>
          </div>
        );
      case "radio":
        return (
          <div className="mb-2 flex-grow">
            <label className="block text-gray-700 text-sm font-medium mb-1">{item.label || item.name}:</label>
            {item.options && item.options.map((option, optIndex) => (
              <div key={`${currentPath}-radio-${optIndex}`} className="inline-block mr-4">
                <input
                  type="radio"
                  id={`${currentPath}-radio-${optIndex}`}
                  name={currentPath} // Name attribute is important for radio groups
                  value={option.value}
                  checked={item.value === option.value}
                  onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
                  className="mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`${currentPath}-radio-${optIndex}`} className="text-gray-700">{option.label}</label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="mb-2 flex-grow flex items-center">
            <input
              type="checkbox"
              id={`${currentPath}-checkbox`}
              checked={item.value || false}
              onChange={(e) => onUpdate(`${currentPath}.value`, e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={`${currentPath}-checkbox`} className="text-gray-700 text-sm font-medium">
              {item.label || item.name}
            </label>
          </div>
        );
      case "select":
        return (
          <div className="mb-2 flex-grow">
            <label htmlFor={`${currentPath}-select`} className="block text-gray-700 text-sm font-medium mb-1">
              {item.label || item.name}:
            </label>
            <select
              id={`${currentPath}-select`}
              value={item.value || ''}
              onChange={(e) => onUpdate(`${currentPath}.value`, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {item.options && item.options.map((option, optIndex) => (
                <option key={`${currentPath}-select-option-${optIndex}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      // 'section' case is removed, as we don't have sections anymore
      default:
        // Fallback for unknown types, perhaps a simple text input or an error message
        return (
          <div className="mb-2 flex-grow text-red-500">
            <p className="font-semibold">Unknown Field Type: {item.type}</p>
            <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
          </div>
        );
    }
  };

  return (
    <ul className="list-none pl-0"> {/* Adjusted padding */}
      <AnimatePresence initial={false}>
        {data.map((item, index) => {
          const currentPath = `${index}`; // Path is now simply the array index

          return (
            <motion.li
              key={item.id} // Using item.id for key as index can be problematic with reordering
              className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              // layout // Add layout prop for Framer Motion to animate reordering
            >
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                {renderFormField(item, currentPath)}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onEditField(item, currentPath)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
                    title="Edit Field"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {/* Removed "Add Sibling Field" button from here, it's now a global button in Statemanager */}
                  <button
                    onClick={() => deleteField(currentPath)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
                    title="Delete Field"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  {index !== 0 && (
                    <button
                      onClick={() => increase(currentPath)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
                      title="Move Up"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  )}
                  {index < data.length - 1 && (
                    <button
                      onClick={() => dicrease(currentPath)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
                      title="Move Down"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  )}
                  {/* Removed "Add Child Field" button as there are no children */}
                </div>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                (Path: {currentPath})
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

export default React.memo(Render);