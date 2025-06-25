// // src/Statemanager.jsx
import { useState, useCallback } from 'react';
import Render from './Render';
import JsonTextEditor from '../JsonTextEditor';
import EditFieldModal from './EditFieldModal';
import "../App.css"; // Ensure your CSS is correctly linked

// Import Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFieldValue,
  addField,
  deleteField,
  moveField,
  updateEntireField,
  setFormData,
  addchildren // Ensure this action is imported
} from '../features/formSlice'; // Adjust path if needed

const Statemanager = () => {
  // Use useSelector to get the formData from the Redux store
  const formData = useSelector(state => state.form); // Assuming your form data is at `state.form`
  const dispatch = useDispatch();

  // State for the edit modal remains local to Statemanager
  const [editingField, setEditingField] = useState(null);
  const [editingFieldPath, setEditingFieldPath] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  console.log("Statemanager is rendering");

  // --- Memoized Callbacks (dispatching Redux actions) ---

  const handleUpdate = useCallback((propertyPath, newValue) => {
    dispatch(updateFieldValue({ path: propertyPath, newValue }));
  }, [dispatch]);

  const handleDeleteField = useCallback((pathStr) => {
    dispatch(deleteField(pathStr));
  }, [dispatch]);

  const handleIncrease = useCallback((pathStr) => {
    dispatch(moveField({ path: pathStr, direction: 'up' }));
  }, [dispatch]);

  const handleDecrease = useCallback((pathStr) => {
    dispatch(moveField({ path: pathStr, direction: 'down' }));
  }, [dispatch]);

  const handleAddField = useCallback(() => {
    // Add field to the root level. If you want to add to a specific path from a global button,
    // you'd need a way to specify that path here, or create another action.
    dispatch(addField({ path: "" })); // Empty path for root
  }, [dispatch]);

  
  const handleAddChildFieldToGroup = useCallback((parentPath) => {
    dispatch(addchildren(parentPath));
  }, [dispatch]);


  const handleEditField = useCallback((field, path) => {
    setEditingField(structuredClone(field)); // Deep copy the field for editing modal
    setEditingFieldPath(path);
    setShowEditModal(true);
  }, []);

  const handleSaveEditedField = useCallback((updatedField) => {
    // Dispatch action to update the entire field object in Redux
    dispatch(updateEntireField({ path: editingFieldPath, updatedField }));
    setShowEditModal(false);
    setEditingField(null);
    setEditingFieldPath('');
  }, [editingFieldPath, dispatch]);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditingField(null);
    setEditingFieldPath('');
  }, []);

  const handleSetJsonData = useCallback((newData) => {
    dispatch(setFormData(newData)); // Dispatch the action to replace Redux state
  }, [dispatch]);


  return (
    <div className="flex flex-col lg:flex-row w-screen min-h-screen bg-gray-100 p-4 font-sans gap-6">
      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
          Dynamic Form Preview
        </h1>
        <div className="mb-4 text-center">
          <button
            onClick={handleAddField} // Calls the Redux action to add a field to the root
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 inline-flex items-center text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Root Field
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          <Render
            data={formData} // The current level data (initially the root formData from Redux)
            onUpdate={handleUpdate}
            path={""} // Top-level path is empty
            addfield={handleAddChildFieldToGroup} // This is for adding children *into* groups/sections now
            deleteField={handleDeleteField}
            increase={handleIncrease}
            dicrease={handleDecrease}
            onEditField={handleEditField}
            fullFormData={formData} // !!! CRITICAL: Pass the entire formData for dependency lookup !!!
          />
        </div>
      </div>

      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg flex flex-col overflow-hidden">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-3 text-center">
          JSON Data Editor
        </h1>
        <p className="text-gray-600 mb-4 text-sm text-center">
          Edit the raw JSON data below. Changes will instantly reflect in the form preview.
        </p>
        <div className="flex-grow">
          <JsonTextEditor data={formData} setData={handleSetJsonData} />
        </div>
      </div>

      {showEditModal && (
        <EditFieldModal
          field={editingField}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditedField}
        />
      )}
    </div>
  );
};

export default Statemanager;

