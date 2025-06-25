
// src/features/formSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

const initialFormData = [
  {
    "id": "mcaddr182878opm4g",
    "name": "fullName",
    "type": "dropdown",
    "label": "Your Full Name",
    "placeholder": "Enter your full name",
    "value": "John Doe",
    "dependencyValue": "",
    "jsCode": "const res = await fetch(\"http://localhost:3000/api/users\");\nconst users = await res.json();\nreturn users.map(user => ({\n  label: user.name,\n  value: user.id\n}));\n"
  },
{
    "id": generateUniqueId(),
    "name": "emailAddress",
    "type": "dropdown",
    "label": "Your Email",
    "placeholder": "Enter your email address",
    "value": "john.doe@example.com",
    "dependencyValue": "",
    "jsCode": "const selectedId = fieldValues?.fullName;\n\nlet username = '';\nif (selectedId === '1') username = 'anushtha';\nelse if (selectedId === '2') username = 'rahul';\nelse if (selectedId === '3') username = 'priya';\nelse throw new Error(\"No valid fullName selected\");\n\nconst response = await fetch(`http://localhost:3000/api/user/${username}/options`);\nconst data = await response.json();\n\n// Ensure each object has a label and value for dropdown rendering\nreturn data.map(item => ({\n  label: item.name,\n  value: item.id\n}));\n"
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
    "name": "userType",
    "type": "radio",
    "label": "Are you an Individual or Organization?",
    "value": "individual",
    "options": [
      { "value": "individual", "label": "Individual" },
      { "value": "organization", "label": "Organization" }
    ]
  },
  {
    "id": generateUniqueId(),
    "name": "companyDetailsGroup", // Example of a group dependent on userType
    "type": "group",
    "label": "Company Information",
    "visibleIf": "userType",
    "dependencyValue": "organization",
    "children": [
      {
        "id": generateUniqueId(),
        "name": "companyName",
        "type": "text",
        "label": "Company Name",
        "placeholder": "Enter your company name",
        "value": ""
      },
      {
        "id": generateUniqueId(),
        "name": "companyWebsite",
        "type": "text",
        "label": "Company Website",
        "placeholder": "e.g., www.example.com",
        "value": ""
      }
    ]
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
    "value": "This form is great!",
    "visibleIf": "rating",
    "dependencyValue": ["1", "2"] // Visible if rating is 'Poor' or 'Fair'
  },
  {
    "id": generateUniqueId(),
    "name": "subscribeNewsletter",
    "type": "checkbox",
    "label": "Subscribe to our newsletter",
    "value": true,
    "visibleIf": "emailAddress",
    "dependencyValue": "nonEmpty" // Visible if emailAddress has any value
  },
  {
    "id": generateUniqueId(),
    "name": "addressGroup",
    "type": "group",
    "label": "Personal Address Information",
    "children": [
      {
        "id": generateUniqueId(),
        "name": "street",
        "type": "text",
        "label": "Street Address",
        "placeholder": "Enter street address",
        "value": ""
      },
      {
        "id": generateUniqueId(),
        "name": "city",
        "type": "text",
        "label": "City",
        "placeholder": "Enter city",
        "value": ""
      },
      {
        "id": generateUniqueId(),
        "name": "zipCode",
        "type": "text",
        "label": "Zip Code",
        "placeholder": "Enter zip code",
        "value": "",
        "visibleIf": "city",
        "dependencyValue": "nonEmpty"
      }
    ]
  }
];

const getTargetContainerAndField = (state, path) => {
  const pathParts = path.split('.').map(part => (isNaN(Number(part)) ? part : Number(part)));
  let current = state; // Start from the root draft state
  let parentContainer = null;
  let targetIndex = null; // For array elements

 for (let i = 0; i < pathParts.length; i++) {
 const part = pathParts[i];

if (i === pathParts.length - 2) { // This is the last part of the path
      if (typeof part === 'number' && Array.isArray(current)) {
    parentContainer = current; // The array containing the target field
    targetIndex = part; // The index of the target field
    } else {
      // If the last part is a string, it means the path points directly to an object (e.g., "fieldName")
    // In our case, for "addchildren", the path should point to the group object itself.
    parentContainer = current; // 'current' is the group object
    targetIndex = null; // No index needed, we're modifying 'children' property
    }
 }

if (Array.isArray(current)) {
 current = current[part];
 } else if (typeof current === 'object' && current !== null) {
 current = current[part];
} else {
 return { parentContainer: null, targetField: null, targetIndex: null }; // Invalid path segment
 }
 }

  // If targetIndex is not null, it means the path pointed to an item *within* an array.
  // We return the item itself as 'targetField' and its parent array as 'parentContainer'.
  // If targetIndex is null, it means the path pointed directly to an object, which is 'current'.
return {
 parentContainer: parentContainer,
targetField: targetIndex !== null ? parentContainer[targetIndex] : current,
 targetIndex: targetIndex
 };
};

const getTargetContainerAndFieldfordeleteandupdownormovefield = (state, path) => {
  const pathParts = path.split('.').map(part => (isNaN(Number(part)) ? part : Number(part)));
  let current = state; // Start from the root draft state
  let parentContainer = null;
  let targetIndex = null; // For array elements

 for (let i = 0; i < pathParts.length; i++) {
 const part = pathParts[i];

if (i === pathParts.length - 1) { // This is the last part of the path
      if (typeof part === 'number' && Array.isArray(current)) {
    parentContainer = current; // The array containing the target field
    targetIndex = part; // The index of the target field
    } else {
      // If the last part is a string, it means the path points directly to an object (e.g., "fieldName")
    // In our case, for "addchildren", the path should point to the group object itself.
    parentContainer = current; // 'current' is the group object
    targetIndex = null; // No index needed, we're modifying 'children' property
    }
 }

if (Array.isArray(current)) {
 current = current[part];
 } else if (typeof current === 'object' && current !== null) {
 current = current[part];
} else {
 return { parentContainer: null, targetField: null, targetIndex: null }; // Invalid path segment
 }
 }

  // If targetIndex is not null, it means the path pointed to an item *within* an array.
  // We return the item itself as 'targetField' and its parent array as 'parentContainer'.
  // If targetIndex is null, it means the path pointed directly to an object, which is 'current'.
return {
 parentContainer: parentContainer,
targetField: targetIndex !== null ? parentContainer[targetIndex] : current,
 targetIndex: targetIndex
 };
};


const formSlice = createSlice({
  name: 'form',
  initialState: initialFormData,
  reducers: {
    setFormData: (state, action) => {
      return action.payload;
    },

    updateFieldValue: (state, action) => {
      const { path, newValue } = action.payload;
      // Removed the undefined 'updateNested' call

      const { targetField } = getTargetContainerAndField(state, path);
console.log(targetField)
  
      if (targetField && typeof targetField === 'object') {
        targetField.value = newValue; // Immer allows direct assignment on drafted objects
      } else {
          console.warn(`Attempted to update value for non-existent or invalid field at path: ${path}`);
      }
    },
    addField: (state, action) => {
      const { path } = action.payload || {}; // Path can be null/undefined for root
      const newField = {
        id: generateUniqueId(),
        name: `newField_${generateUniqueId()}`,
        type: 'text',
        label: 'New Field Label',
        placeholder: 'Enter new text here',
        value: '',
        visibleIf: '', // Default for new fields
        dependencyValue: '' // Default for new fields
      };

      if (path) {
        // Add to children of a specific group
        const { targetField: parentGroup } = getTargetContainerAndField(state, path);
        if (parentGroup && parentGroup.type === 'group') { // Ensure it's actually a group
          if (!parentGroup.children) {
            parentGroup.children = [];
          }
          parentGroup.children.push(newField);
        } else {
          console.warn(`Attempted to add field to non-group path: ${path}`);
        }
      } else {
        // Add to the root array
        state.push(newField);
      }
    },



    deleteField: (state, action) => {
      const path = action.payload;
      const { parentContainer, targetIndex } = getTargetContainerAndFieldfordeleteandupdownormovefield(state, path);

  console.log(parentContainer,targetIndex)

      if (Array.isArray(parentContainer) && targetIndex !== null) {
        parentContainer.splice(targetIndex, 1);
      } else {
        console.warn(`Could not delete field at path: ${path}`);
      }
    },


    moveField: (state, action) => {
      const { path, direction } = action.payload;
      const { parentContainer, targetIndex } = getTargetContainerAndFieldfordeleteandupdownormovefield(state, path);

      if (Array.isArray(parentContainer) && targetIndex !== null) {
        const newIndex = targetIndex + (direction === 'up' ? -1 : 1);
        if (newIndex >= 0 && newIndex < parentContainer.length) {
          const [movedItem] = parentContainer.splice(targetIndex, 1);
          parentContainer.splice(newIndex, 0, movedItem);
        }
      } else {
        console.warn(`Could not move field at path: ${path}`);
      }
    },

    updateEntireField: (state, action) => {
      const { path, updatedField } = action.payload;
      const { parentContainer, targetIndex } = getTargetContainerAndFieldfordeleteandupdownormovefield(state, path);

      if (Array.isArray(parentContainer) && targetIndex !== null) {
        parentContainer[targetIndex] = updatedField; // Replace the entire object
      } else {
        console.warn(`Could not update entire field at path: ${path}`);
      }
    },

    // The corrected addchildren reducer
    addchildren: (state, action) => {
      const parentGroupPath = action.payload; // This should be the path to the GROUP object

      const newChildField = {
        id: generateUniqueId(),
        name: `childField_${generateUniqueId()}`,
        type: 'text',
        label: 'New Child Field',
        placeholder: 'Enter child text',
        value: '',
        visibleIf: '', // Default for new fields
        dependencyValue: '' // Default for new fields
      };

      const { targetField: parentGroup } = getTargetContainerAndField(state, parentGroupPath);

      if (parentGroup && typeof parentGroup === 'object' && parentGroup.type === 'group') {
        // Ensure the 'children' array exists
        if (!parentGroup.children) {
          parentGroup.children = []; // Immer allows this on the drafted object
        }
        // Push the new field into the 'children' array
        parentGroup.children.push(newChildField); // Immer allows .push() on drafted arrays
      } else {
        console.error(`Error adding child: Path '${parentGroupPath}' does not point to a valid group object.`);
      }
    },
  },
});

export const {
  updateFieldValue,
  addField,
  deleteField,
  moveField,
  updateEntireField,
  setFormData,
  addchildren,
} = formSlice.actions;

export default formSlice.reducer;