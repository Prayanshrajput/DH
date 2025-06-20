// src/features/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit'; // ✅ CORRECT


// Helper to generate unique IDs - important for React keys and identifying fields
const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

// Your initial form data, now living in Redux
const initialFormData = [
  {
    "id": generateUniqueId(),
    "name": "fullName",
    "type": "text",
    "label": "Your Full Name",
    "placeholder": "Enter your full name",
    "value": "John Doe"
  },
  {
    "id": generateUniqueId(),
    "name": "emailAddress",
    "type": "email",
    "label": "Your Email",
    "placeholder": "Enter your email address",
    "value": "john.doe@example.com"
  },
  {
    "id": generateUniqueId(),
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
    "id": generateUniqueId(),
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
    "id": generateUniqueId(),
    "name": "comments",
    "type": "textarea",
    "label": "Any additional comments?",
    "placeholder": "Enter your comments here",
    "value": "This form is great!"
  },
  {
    "id": generateUniqueId(),
    "name": "subscribeNewsletter",
    "type": "checkbox",
    "label": "Subscribe to our newsletter",
    "value": true
  }
];

export const formSlice = createSlice({
  name: 'form', // A name for your slice. Used in action types.
  initialState: initialFormData, // The initial state for this slice

  // Reducers define how the state changes in response to actions
  reducers: {
    // Action to update a specific field's property (e.g., '0.value', '1.label')
    updateFieldValue: (state, action) => {
      // action.payload will be { path: '0.value', newValue: 'New Name' }
      const { path, newValue } = action.payload;
      const pathParts = path.split('.').map(part => {
        const num = Number(part);
        return isNaN(num) ? part : num;
      });

      // Navigate to the correct nested property using Immer's draft state
      let current = state; // Immer makes 'state' mutable here
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (current[key] === undefined || current[key] === null) {
            // This case should ideally not happen if paths are valid,
            // but guards against errors if intermediate path is missing.
            current[key] = (typeof pathParts[i+1] === 'number') ? [] : {};
        }
        current = current[key];
      }
      current[pathParts[pathParts.length - 1]] = newValue;
    },

    // Action to add a new field (always to the root array for now)
    addField: (state, action) => {
      // action.payload could optionally specify type/initial values, otherwise default
      const newFieldId = generateUniqueId();
      const newField = action.payload || { // Allow payload to override defaults
        id: newFieldId,
        name: `newField${newFieldId}`,
        type: 'text',
        label: 'New Field Label',
        placeholder: 'Enter new text here',
        value: '',
      };
      state.push(newField); // Immer allows direct mutation here
    },

    // Action to delete a field
    deleteField: (state, action) => {
      // action.payload is the path (e.g., '0' for top-level, '2.children.0' for nested)
      const path = action.payload;
      const pathParts = path.split('.').map(part => {
        const num = Number(part);
        return isNaN(num) ? part : num;
      });

      let currentCollection = state;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (currentCollection[key] === undefined || currentCollection[key] === null) {
            // Path not found, nothing to delete
            return;
        }
        currentCollection = currentCollection[key];
      }

      const indexToDelete = pathParts[pathParts.length - 1];
      if (Array.isArray(currentCollection) && typeof indexToDelete === 'number') {
        currentCollection.splice(indexToDelete, 1);
      } else {
        // Handle deletion from object if applicable (e.g., properties)
        delete currentCollection[indexToDelete];
      }
    },

    // Action to move a field up/down
    moveField: (state, action) => {
      // action.payload is { path: '0', direction: 'up' | 'down' }
      const { path, direction } = action.payload;
      const pathParts = path.split('.').map(part => {
        const num = Number(part);
        return isNaN(num) ? part : num;
      });

      let currentCollection = state; // Start at the root array (or object)
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (!currentCollection[key]) return; // Path not found
        currentCollection = currentCollection[key];
      }

      const index = pathParts[pathParts.length - 1];
      if (Array.isArray(currentCollection) && typeof index === 'number') {
        if (direction === 'up' && index > 0) {
          const [item] = currentCollection.splice(index, 1);
          currentCollection.splice(index - 1, 0, item);
        } else if (direction === 'down' && index < currentCollection.length - 1) {
          const [item] = currentCollection.splice(index, 1);
          currentCollection.splice(index + 1, 0, item);
        }
      }
    },

    // Action to update an entire field object (useful for EditFieldModal)
    updateEntireField: (state, action) => {
      // action.payload is { path: '0', updatedField: { ... } }
      const { path, updatedField } = action.payload;
      const pathParts = path.split('.').map(part => {
        const num = Number(part);
        return isNaN(num) ? part : num;
      });

      let currentCollection = state;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (!currentCollection[key]) return;
        currentCollection = currentCollection[key];
      }

      const indexToUpdate = pathParts[pathParts.length - 1];
      if (Array.isArray(currentCollection) && typeof indexToUpdate === 'number') {
        currentCollection[indexToUpdate] = updatedField;
      }
    },

    // Action to replace the entire form data (e.g., from JsonTextEditor)
    setFormData: (state, action) => {
      // action.payload is the new full data array
      return action.payload; // Return new state directly
    },
  },
});

// Export actions generated by createSlice
export const {
  updateFieldValue,
  addField,
  deleteField,
  moveField,
  updateEntireField,
  setFormData,
} = formSlice.actions;

// Export the reducer for the store
export default formSlice.reducer;