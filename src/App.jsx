
import Render from './objectway/Render'; // Adjust path
import EditFieldModal from './objectway/EditFieldModal'; // Adjust path
import React, { useState, useEffect, useCallback } from 'react';

// Import your form schema directly
 // IMPORTANT: Ensure this file exists with the updated JSON above



function App() {
  // formSchema should typically be static or only change when the form structure itself is edited
  // User input values are managed in fullFormData
   const initialFormSchema = useSelector(state => state.form); 
  const [formSchema, setFormSchema] = useState(initialFormSchema);
  const [fullFormData, setFullFormData] = useState([]);
  const [bundleData, setBundleData] = useState({
    // Bundle data can hold global configs or auth tokens if needed for other APIs
    authData: {} // Empty as API key is directly in schema, but good to keep structure
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldToEdit, setCurrentFieldToEdit] = useState(null);
  const [currentFieldPath, setCurrentFieldPath] = useState('');

  // Helper to recursively extract current form data values from the schema for initial state
  const extractFormData = useCallback((schema) => {
    const data = [];
    schema.forEach(field => {
      data.push({ name: field.name, value: field.value, type: field.type });
      if (field.type === 'group' && field.children) {
        data.push(...extractFormData(field.children));
      }
    });
    return data;
  }, []);

  // Initialize fullFormData on component mount or when schema changes
  // This effect runs only when formSchema reference changes, which should be rare now.
  useEffect(() => {
    setFullFormData(extractFormData(formSchema));
  }, [formSchema, extractFormData]);


  // Central onChange handler for form fields from Render.jsx
  const handleFieldChange = useCallback((item, newValue) => {
    setFullFormData(prevFormData => {
      const updatedData = prevFormData.map(field =>
        field.name === item.name ? { ...field, value: newValue } : field
      );

      // Reset dependent dropdowns when parent changes
      if (item.name === 'selectedCountry') {
          const stateField = updatedData.find(f => f.name === 'selectedState');
          if (stateField) stateField.value = ''; // Reset state
          const cityField = updatedData.find(f => f.name === 'selectedCity');
          if (cityField) cityField.value = ''; // Reset city
      } else if (item.name === 'selectedState') {
          const cityField = updatedData.find(f => f.name === 'selectedCity');
          if (cityField) cityField.value = ''; // Reset city
      }

      return updatedData;
    });

    // --- IMPORTANT CHANGE HERE ---
    // REMOVED: setFormSchema call from here.
    // The formSchema should not change on every user input.
    // Live field values are managed solely in `fullFormData`.
    // The `Render` component reads current values from `fullFormData`.

  }, []);

  // Placeholder functions for design mode features (these still modify formSchema, which is fine for design mode)
  const handleAddfield = useCallback((path) => { console.log("Add field at path:", path); }, []);
  const handleDeleteField = useCallback((path) => { console.log("Delete field at path:", path); }, []);
  const handleIncreaseOrder = useCallback((path) => { console.log("Increase order for field at path:", path); }, []);
  const handleDecreaseOrder = useCallback((path) => { console.log("Decrease order for field at path:", path); }, []);

  const handleOpenEditModal = useCallback((field, path) => {
    setCurrentFieldToEdit(field);
    setCurrentFieldPath(path);
    setIsModalOpen(true);
  }, []);

  const handleSaveEditedField = useCallback((updatedField) => {
    // This function still needs to update formSchema, as it's part of the design mode.
    // This is OK because design mode changes are less frequent than user input.
    setFormSchema(prevSchema => {
      const updateSchema = (schema, targetId) => {
        return schema.map(field => {
          if (field.id === targetId) {
            return updatedField;
          }
          if (field.type === 'group' && field.children) {
            return { ...field, children: updateSchema(field.children, targetId) };
          }
          return field;
        });
      };
      return updateSchema(prevSchema, updatedField.id);
    });
    setIsModalOpen(false);
    setCurrentFieldToEdit(null);
    setCurrentFieldPath('');
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentFieldToEdit(null);
    setCurrentFieldPath('');
  }, []);

  const handleFormSubmit = useCallback((data) => {
    console.log("Form Submitted:", data);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Dynamic Form with Live API Data (Optimized)</h1>

      <Render
        data={formSchema} // This prop should now be stable during user input
        fullFormData={fullFormData} // Live state of your form data
        bundleData={bundleData} // Bundle data (now minimal, but ready for auth)
        onChange={handleFieldChange} // Central handler for input changes
        onFormSubmit={handleFormSubmit} // Form submission handler

        // Pass design-time props to Render
        deleteField={handleDeleteField}
        addfield={handleAddfield}
        increase={handleIncreaseOrder}
        dicrease={handleDecreaseOrder}
        onEditField={handleOpenEditModal}
      />

      {/* Debugging Info */}
      <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Debugging Info:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Current Full Form Data:</h4>
            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto max-h-60">{JSON.stringify(fullFormData, null, 2)}</pre>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Current Bundle Data:</h4>
            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto max-h-60">{JSON.stringify(bundleData, null, 2)}</pre>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Current Form Schema (Static During Input):</h4>
            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto max-h-60">{JSON.stringify(formSchema, null, 2)}</pre>
          </div>
        </div>
      </div>

      {isModalOpen && currentFieldToEdit && (
        <EditFieldModal
          field={currentFieldToEdit}
          onClose={handleCloseModal}
          onSave={handleSaveEditedField}
        />
      )}
    </div>
  );
}

export default App;