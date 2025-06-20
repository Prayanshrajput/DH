import React from 'react';
import Render from './Render';

const FormPreview = ({ data, onAdd, onUpdate, onDelete, onIncrease, onDecrease, onEdit }) => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
        Dynamic Form Preview
      </h1>

      <div className="mb-4 text-center">
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 inline-flex items-center text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Field
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        <Render
          data={data}
          onUpdate={onUpdate}
          path={""}
          addfield={onAdd}
          deleteField={onDelete}
          increase={onIncrease}
          dicrease={onDecrease}
          onEditField={onEdit}
        />
      </div>
    </div>
  );
};

export default React.memo(FormPreview);
