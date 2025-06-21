import { useState } from 'react';
import Render from './Render';
import JsonTextEditor from '../JsonTextEditor';
import EditFieldModal from './EditFieldModal';
import React from 'react';  
import { produce } from 'immer';
import FormPreview from './FormPreview';
import JsonEditorPanel from './JsonEditorPanel';


// Flattened initial data - no 'section' type, no nested 'children'
let initialData = [
  {
    "id": 11,
    "name": "fullName",
    "type": "text",
    "label": "Your Full Name",
    "placeholder": "Enter your full name",
    "value": "John Doe"
  },
  {
    "id": 12,
    "name": "emailAddress",
    "type": "email",
    "label": "Your Email",
    "placeholder": "Enter your email address",
    "value": "john.doe@example.com",
    "dependsOn": {
  "path": "0.value",
   "expectedValues": ["1", "2"],
    "mode": "enabled",
}

  },
  {
    "id": 13,
    "name": "gender",
    "type": "radio",
    "label": "Select your Gender",
    "value": "male",
    "options": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" },
      { "value": "other", "label": "Other" }
    ]
  },
  {
    "id": 21,
    "name": "rating",
    "type": "select",
    "label": "How would you rate us?",
    "value": "5",
    "options": [
      { "value": "5", "label": "Excellent" },
      { "value": "4", "label": "Very Good" },
      { "value": "3", "label": "Good" },
      { "value": "2", "label": "Fair" },
      { "value": "1", "label": "Poor" }
    ]
  },
  {
    "id": 22,
    "name": "comments",
    "type": "textarea",
    "label": "Any additional comments?",
    "placeholder": "Enter your comments here",
    "value": "This form is great!"
  },
  {
    "id": 23,
    "name": "subscribeNewsletter",
    "type": "checkbox",
    "label": "Subscribe to our newsletter",
    "value": true
  }
];

const Statemanager = () => {

  const updateData = (modifierFn) => {
  setData(currentData => produce(currentData, modifierFn));
};


  const [data, setData] = useState(initialData);
  const [editingField, setEditingField] = useState(null);
  const [editingFieldPath, setEditingFieldPath] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  // Helper function to get a value from a nested object/array using a string path
  const getDeep = (obj, path) => {
    return path.split('.').reduce((acc, key) => {
      const parsedKey = isNaN(Number(key)) ? key : Number(key);
      return acc && acc[parsedKey] !== undefined ? acc[parsedKey] : undefined;
    }, obj);
  };

  // Helper function to set a value in a nested object/array using a string path
  const setDeep = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
      // Ensure the path exists for nested objects/arrays
      if (!current[key] && (typeof key === 'number' || keys[i+1] === 'children')) { // 'children' is no longer relevant here, but kept for robust path handling
        current[key] = isNaN(Number(keys[i+1])) ? {} : [];
      }
      current = current[key];
    }
    const finalKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
    current[finalKey] = value;
  };

  const increase = (path) => {
    const newData = structuredClone(data);
    const indexToMove = Number(path); // Path is now simply the index

    if (indexToMove > 0) {
      const itemToMove = newData.splice(indexToMove, 1)[0];
      newData.splice(indexToMove - 1, 0, itemToMove);
    }
    setData(newData);
  };

  const dicrease = (path) => {
    const newData = structuredClone(data);
    const indexToMove = Number(path); // Path is now simply the index

    if (indexToMove < newData.length - 1) {
      const itemToMove = newData.splice(indexToMove, 1)[0];
      newData.splice(indexToMove + 1, 0, itemToMove);
    }
    setData(newData);
  };

  // addfield now always adds to the top-level array
  const addfield = () => { 
  // Removed 'path' argument as it's always the root
  updateData(draft => {
  //  const newData = structuredClone(data);
    const newFieldId = Math.floor(Math.random() * 1000000);

    const newField = {
      id: newFieldId,
      name: `newField${newFieldId}`,
      type: 'text',
      label: 'New Field Label',
      placeholder: 'Enter new text here',
      value: '',
    };
    
    draft.push(newField);
    setData(draft);
   
  });
}

  const deleteField = (path) => {
    updateData(draft => {
    // const newData = structuredClone(data);
    const indexToDelete = Number(path); // Path is now simply the index

    draft.splice(indexToDelete, 1);
    setData(draft);
  });
}

  const handleUpdate = (propertyPath, newValue) => {
    updateData(draft=>{
    // const newData = structuredClone(data);
    setDeep(draft, propertyPath, newValue);
    setData(draft);
  });
  };


  const handleEditField = (field, path) => {
    setEditingField(structuredClone(field));
    setEditingFieldPath(path);
    setShowEditModal(true);
  };

  const handleSaveEditedField = (updatedField) => {
    updateData(draft => {

    // const newData = structuredClone(data);
    setDeep(draft, editingFieldPath, updatedField); // Update the entire field object
    setData(draft);
    setShowEditModal(false);
    setEditingField(null);
    setEditingFieldPath('');
  });
}

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingField(null);
    setEditingFieldPath('');
  };

  return (
   
    // <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-100 p-4 font-sans gap-6">
    //   <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
    //     <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
    //       Dynamic Form Preview
    //     </h1>
    //     {/* Add button to add new fields to the main list */}
    //     <div className="mb-4 text-center">
    //         <button
    //             onClick={addfield} // Call addfield without any arguments
    //             className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 inline-flex items-center text-lg"
    //         >
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    //             </svg>
    //             Add New Field
    //         </button>
    //     </div>
    //     <div className="overflow-y-auto flex-grow">
    //         <Render
    //         data={data}
    //         onUpdate={handleUpdate}
    //         path={""} // Path is always empty for the top level
    //         addfield={addfield} // Still passing addfield, but its internal logic is simpler
    //         deleteField={deleteField}
    //         increase={increase}
    //         dicrease={dicrease}
    //         onEditField={handleEditField}
    //         />
    //     </div>
    //   </div>

    //   <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
    //     <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
    //       JSON Data Editor
    //     </h1>
    //     <p className="text-gray-600 mb-4 text-sm text-center">
    //       Edit the raw JSON data below. Changes will instantly reflect in the form preview.
    //     </p>
    //     <div className="flex-grow">
    //       <JsonTextEditor data={data} setData={setData} />
    //     </div>
    //   </div>

    //   {showEditModal && (
    //     <EditFieldModal
    //       field={editingField}
    //       onClose={handleCloseEditModal}
    //       onSave={handleSaveEditedField}
    //     />
    //   )}
    // </div>
<>
 <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-100 p-4 gap-6">
      <FormPreview
        data={data}
        onAdd={addfield}
        onUpdate={handleUpdate}
        onDelete={deleteField}
        onIncrease={increase}
        onDecrease={dicrease}
        onEdit={handleEditField}
      />


      <JsonEditorPanel data={data} setData={setData} />

      {showEditModal && (
        <EditFieldModal
          field={editingField}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedField}
        />
      )}
    </div>
</>
    
  );
};


export default React.memo(Statemanager);