import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  "../App.css"

const EditFieldModal = ({ field, onClose, onSave }) => {
  const [editedField, setEditedField] = useState(field);
  const [newOptionValue, setNewOptionValue] = useState('');
  const [newOptionLabel, setNewOptionLabel] = useState('');

  useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedField(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOptionChange = (index, property, value) => {
    const updatedOptions = editedField.options.map((option, i) =>
      i === index ? { ...option, [property]: value } : option
    );
    setEditedField(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleAddOption = () => {
    if (newOptionValue.trim() && newOptionLabel.trim()) {
      setEditedField(prev => ({
        ...prev,
        options: [...(prev.options || []), { value: newOptionValue.trim(), label: newOptionLabel.trim() }]
      }));
      setNewOptionValue('');
      setNewOptionLabel('');
    }
  };

  const handleRemoveOption = (indexToRemove) => {
    setEditedField(prev => ({
      ...prev,
      options: prev.options.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedField);
  };

  if (!field) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform scale-95"
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Edit Field: <span className="text-blue-600">{field.label || field.name}</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Field Name (ID):</label>
              <input
                type="text"
                name="name"
                value={editedField.name || ''}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Label:</label>
              <input
                type="text"
                name="label"
                value={editedField.label || ''}
                onChange={handleChange}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Type:</label>
              <select name="type" value={editedField.type || ''} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="textarea">Textarea</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select</option>
                <option value="Dropdown">Select</option>
                {/* <option value="section">Section</option> Removed section type */}
              </select>
            </div>
            {/* Conditional rendering for placeholder is simpler now */}
            {editedField.type !== 'radio' && editedField.type !== 'checkbox' && editedField.type !== 'select' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Placeholder:</label>
                <input
                  type="text"
                  name="placeholder"
                  value={editedField.placeholder || ''}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            )}

            {(editedField.type === 'radio' || editedField.type === 'select') && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Options:</label>
                {editedField.options && editedField.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                      placeholder="Option Value"
                      className="shadow-sm appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mr-2"
                    />
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                      placeholder="Option Label"
                      className="shadow-sm appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button type="button" onClick={() => handleRemoveOption(index)} className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded transition-all duration-200 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    placeholder="New Value"
                    className="shadow-sm appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 mr-2"
                  />
                  <input
                    type="text"
                    value={newOptionLabel}
                    onChange={(e) => setNewOptionLabel(e.target.value)}
                    placeholder="New Label"
                    className="shadow-sm appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <button type="button" onClick={handleAddOption} className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 flex-shrink-0">
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditFieldModal;