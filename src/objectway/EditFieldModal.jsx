
import React, { useState, useEffect } from 'react';

// Import Redux dispatch (though onSave prop handles the dispatch for now)
// import { useDispatch } from 'react-redux';
// import { updateEntireField } from '../features/formSlice'; // Adjust path


const EditFieldModal = ({ field, onClose, onSave }) => {
  const [editedField, setEditedField] = useState(field);
  // const dispatch = useDispatch(); // Not directly used here, onSave prop handles it

  useEffect(() => {
    // Sync internal state if the 'field' prop changes
    // Also, ensure dependencyValue is a string for the textarea if it's not already
    setEditedField(prev => ({
        ...field,
        dependencyValue: (field.dependencyValue !== undefined && field.dependencyValue !== null)
            ? (Array.isArray(field.dependencyValue)
                ? JSON.stringify(field.dependencyValue)
                : String(field.dependencyValue)
              )
            : ''
    }));
  }, [field]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedField(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

    const handleDependencyValueChange = (e) => {
        const value = e.target.value;
        let parsedValue = value;
        try {
            // Attempt to parse as JSON for array or complex values
            const temp = JSON.parse(value);
            // If it's a valid array or object, keep it parsed.
            // Otherwise, treat as a string.
            parsedValue = (typeof temp === 'object' && temp !== null) ? temp : value;
        } catch (error) {
            // If parsing fails, treat as a simple string
            parsedValue = value;
        }
        setEditedField(prev => ({
            ...prev,
            dependencyValue: parsedValue
        }));
    };

  const handleOptionsChange = (index, prop, value) => {
    setEditedField(prev => {
      const newOptions = [...(prev.options || [])]; // Ensure options array exists
      newOptions[index] = { ...newOptions[index], [prop]: value };
      return { ...prev, options: newOptions };
    });
  };

  const handleAddOption = () => {
    setEditedField(prev => ({
      ...prev,
      options: [...(prev.options || []), { value: '', label: '' }],
    }));
  };

  const handleRemoveOption = (index) => {
    setEditedField(prev => {
      const newOptions = [...prev.options];
      newOptions.splice(index, 1);
      return { ...prev, options: newOptions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Statemanager's onSave handles the dispatch to updateEntireField
    onSave(editedField);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Edit Field</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
            <input
              type="text"
              name="id"
              value={editedField.id || ''}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={editedField.name || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Label:</label>
            <input
              type="text"
              name="label"
              value={editedField.label || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
            <select
              name="type"
              value={editedField.type || ''}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="textarea">Textarea</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="select">Select</option>
               <option value="group">group</option>
              {/* <option value="group">Group</option> */} {/* Uncomment if you re-introduce 'group' type */}
            </select>
          </div>

          {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea') && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Placeholder:</label>
              <input
                type="text"
                name="placeholder"
                value={editedField.placeholder || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
          )}

          {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea' || editedField.type === 'select' || editedField.type === 'radio') && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Default Value:</label>
              <input
                type={editedField.type === 'checkbox' ? 'checkbox' : 'text'}
                name="value"
                checked={editedField.type === 'checkbox' ? editedField.value : undefined}
                value={editedField.type === 'checkbox' ? '' : editedField.value || ''}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${editedField.type === 'checkbox' ? 'h-4 w-4' : ''}`}
              />
            </div>
          )}

          {/* New Fields for Visibility Logic */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Visible If (Field Name):</label>
            <input
              type="text"
              name="visibleIf"
              value={editedField.visibleIf || ''}
              onChange={handleChange}
              placeholder="e.g., userType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">Enter the 'name' of the field this field depends on for visibility.</p>
          </div>

          {editedField.visibleIf && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Dependency Value:</label>
              <textarea
                name="dependencyValue"
                value={editedField.dependencyValue || ''}
                onChange={handleDependencyValueChange} // Use the new handler
                placeholder='e.g., "organization" or ["value1", "value2"] or "nonEmpty"'
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Enter the value(s) the dependent field must have for this field to be visible.
                For multiple values, use JSON array syntax (e.g., `["value1", "value2"]`).
                Use "nonEmpty" (string) if visible when dependent field has any value.
              </p>
            </div>
          )}

          {(editedField.type === 'radio' || editedField.type === 'select') && (
            <div className="mb-4 border p-3 rounded-md">
              <label className="block text-gray-700 text-sm font-bold mb-2">Options:</label>
              {editedField.options && editedField.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2 gap-2">
                  <input
                    type="text"
                    placeholder="Value"
                    value={option.value || ''}
                    onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
                    className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={option.label || ''}
                    onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
                    className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
              >
                Add Option
              </button>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFieldModal;