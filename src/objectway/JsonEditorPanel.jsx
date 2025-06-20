import React from 'react';
import JsonTextEditor from '../JsonTextEditor';

const JsonEditorPanel = ({ data, setData }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
        JSON Data Editor        
      </h1>
      <p className="text-gray-600 mb-4 text-sm text-center">
        Edit the raw JSON data below. Changes will instantly reflect in the form preview.
      </p>
      <div className="flex-grow">
        <JsonTextEditor data={data} setData={setData} />
      </div>
    </div>
  );
};

export default React.memo(JsonEditorPanel);

