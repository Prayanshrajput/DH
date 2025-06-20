// JsonTextEditor.jsx (No changes needed, as it relies on props)
import React, { useState, useEffect } from 'react';

const JsonTextEditor = ({ data, setData }) => {
  // Internal state to hold the JSON string
  const [jsonString, setJsonString] = useState('');

  // Effect to update the internal string when 'data' prop changes
  // This happens when Redux state updates.
  useEffect(() => {
    try {
      setJsonString(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Error stringifying JSON:", e);
      setJsonString("// Invalid JSON data");
    }
  }, [data]);

  // Handle changes in the textarea
  const handleChange = (e) => {
    setJsonString(e.target.value);
  };

  // Handle apply button click or blur to update the form data
  const handleApply = () => {
    try {
      const parsedData = JSON.parse(jsonString);
      // Call the setData prop, which will now dispatch a Redux action
      setData(parsedData);
    } catch (e) {
      alert("Invalid JSON format. Please correct it.");
      console.error("Error parsing JSON:", e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        className="flex-grow font-mono text-sm p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
        value={jsonString}
        onChange={handleChange}
        onBlur={handleApply} // Auto-apply on blur
        spellCheck="false"
      ></textarea>
      <button
        onClick={handleApply}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
      >
        Apply JSON
      </button>
    </div>
  );
};

export default JsonTextEditor;