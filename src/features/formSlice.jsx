
// // // // src/features/formSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

// const initialFormData = [
//   {
//     "id": "name",
//     "name": "fullName",
//     "type": "text",
//     "label": "Your Full Name",
//     "placeholder": "Enter your full name",
//     "value": "John Doe"
//   },
//   {
//     "id":"email",
//     "name": "emailAddress",
//     "type": "email",
//     "label": "Your Email",
//     "placeholder": "Enter your email address",
//     "value": "john.doe@example.com"
//   },
//   {
//     "id":"userinfo",
//     "name": "userType",
//     "type": "radio",
//     "label": "Are you an Individual or Organization?",
//     "value": "individual",
//     "options": [
//       { "value": "individual", "label": "Individual" },
//       { "value": "organization", "label": "Organization" }
//     ]
//   },
//   {
//     "id":"compdetails",
//     "name": "companyDetailsGroup", // Example of a group dependent on userType
//     "type": "group",
//     "label": "Company Information",
//     "visibleIf": "userType",
//     "dependencyValue": "organization",
//     "children": [
//       {
//         "id": "compname",
//         "name": "companyName",
//         "type": "text",
//         "label": "Company Name",
//         "placeholder": "Enter your company name",
//         "value": ""
//       },
//       {
//         "id": "compsite",
//         "name": "companyWebsite",
//         "type": "text",
//         "label": "Company Website",
//         "placeholder": "e.g., www.example.com",
//         "value": ""
//       }
//     ]
//   },
//   {
//     "id": "gender",
//     "name": "gender",
//     "type": "radio",
//     "label": "Select your Gender",
//     "value": "male",
//     "options": [
//       { "value": "male", "label": "Male" },
//       { "value": "female", "label": "Female" },
//       { "value": "other", "label": "Other" }
//     ]
//   },
//   {
//     "id":"rating",
//     "name": "rating",
//     "type": "select",
//     "label": "How would you rate us?",
//     "value": "5",
//     "options": [
//       { "value": "5", "label": "Excellent" },
//       { "value": "4", "label": "Very Good" },
//       { "value": "3", "label": "Good" },
//       { "value": "2", "label": "Fair" },
//       { "value": "1", "label": "Poor" }
//     ]
//   },
//   {
//     "id":"comments",
//     "name": "comments",
//     "type": "textarea",
//     "label": "Any additional comments?",
//     "placeholder": "Enter your comments here",
//     "value": "This form is great!",
//     "visibleIf": "rating",
//     "dependencyValue": ["1", "2"] // Visible if rating is 'Poor' or 'Fair'
//   },
//   {
//     "id":"subnews",
//     "name": "subscribeNewsletter",
//     "type": "checkbox",
//     "label": "Subscribe to our newsletter",
//     "value": true,
//     "visibleIf": "emailAddress",
//     "dependencyValue": "nonEmpty" // Visible if emailAddress has any value
//   },
//   {
//     "id":"add",
//     "name": "addressGroup",
//     "type": "group",
//     "label": "Personal Address Information",
//     "children": [
//       {
//         "id": "street",
//         "name": "street",
//         "type": "text",
//         "label": "Street Address",
//         "placeholder": "Enter street address",
//         "value": ""
//       },
//       {
//         "id": "city",
//         "name": "city",
//         "type": "text",
//         "label": "City",
//         "placeholder": "Enter city",
//         "value": ""
//       },
//       {
//         "id":"zipCode",
//         "name": "zipCode",
//         "type": "text",
//         "label": "Zip Code",
//         "placeholder": "Enter zip code",
//         "value": "",
//         "visibleIf": "city",
//         "dependencyValue": "nonEmpty"
//       }
//     ]
//   }
// ];


const initialFormData=[
  {
    "id": "field_country",
    "name": "country",
    "label": "Country",
    "type": "text",
    "value": "india",
    "placeholder": "Enter 'India' or 'USA'",
    "path": "0",
    "dynamic": {
      "visibility": {
        "modes": [],
        "conditions": {
          "static": [],
          "jsExpression": ""
        }
      }
    }
  },
  {
    "id": "field_state",
    "name": "state",
    "label": "State",
    "type": "select",
    "value": "MH",
    "placeholder": "Select a state",
    "path": "1",
    "options": [],
    "dynamic": {
      "visibility": {
        "modes": [],
        "conditions": {
          "static": [],
          "jsExpression": "bundle.country && bundle.country.length > 0"
        }
      },
      "options": {
        "jsExpression": "(() => { switch (bundle.country?.toLowerCase()) { case 'india': return [{ \"label\": \"Maharashtra\", \"value\": \"MH\" }, { \"label\": \"Delhi\", \"value\": \"DL\" }, { \"label\": \"Karnataka\", \"value\": \"KA\" }, { \"label\": \"Uttar Pradesh\", \"value\": \"UP\" }, { \"label\": \"Rajasthan\", \"value\": \"RJ\" }]; case 'usa': return [{ \"label\": \"California\", \"value\": \"CA\" }, { \"label\": \"Texas\", \"value\": \"TX\" }, { \"label\": \"New York\", \"value\": \"NY\" }, { \"label\": \"Florida\", \"value\": \"FL\" }, { \"label\": \"Illinois\", \"value\": \"IL\" }]; default: return [{ \"label\": \"Select Country First\", \"value\": \"\" }]; } })()"
      }
    }
  },
  {
    "id": "field_city",
    "name": "city",
    "label": "City",
    "type": "select",
    "value": "NAG",
    "placeholder": "Select a city",
    "path": "2",
    "dynamic": {
      "visibility": {
        "conditions": {
          "jsExpression": "bundle.state && bundle.state.length > 0 && bundle.country.length>0"
        },
        "modes": []
      },
      "options": {
        "jsExpression": "(() => { switch (bundle.state?.toLowerCase()) { case 'mh': return [{ \"label\": \"Mumbai\", \"value\": \"MUM\" }, { \"label\": \"Pune\", \"value\": \"PUN\" }, { \"label\": \"Nagpur\", \"value\": \"NAG\" }, { \"label\": \"Nashik\", \"value\": \"NAS\" }, { \"label\": \"Aurangabad\", \"value\": \"AUR\" }]; case 'dl': return [{ \"label\": \"New Delhi\", \"value\": \"NDL\" }, { \"label\": \"Old Delhi\", \"value\": \"ODL\" }, { \"label\": \"Ghaziabad\", \"value\": \"GHA\" }, { \"label\": \"Faridabad\", \"value\": \"FAR\" }, { \"label\": \"Gurgaon\", \"value\": \"GUR\" }]; case 'ca': return [{ \"label\": \"Los Angeles\", \"value\": \"LA\" }, { \"label\": \"San Francisco\", \"value\": \"SF\" }, { \"label\": \"San Diego\", \"value\": \"SD\" }, { \"label\": \"Sacramento\", \"value\": \"SAC\" }, { \"label\": \"San Jose\", \"value\": \"SJ\" }]; case 'tx': return [{ \"label\": \"Houston\", \"value\": \"HOU\" }, { \"label\": \"Dallas\", \"value\": \"DAL\" }, { \"label\": \"Austin\", \"value\": \"AUS\" }, { \"label\": \"San Antonio\", \"value\": \"SAT\" }, { \"label\": \"Fort Worth\", \"value\": \"FTW\" }]; default: return [{ \"label\": \"Select State First\", \"value\": \"\" }]; } })()"
      }
    }
  }
]




// let initinitialFormDataialData = [
//   {
//     "id": 11,
//     "name": "fullName",
//     "type": "text",
//     "label": "Your Full Name",
//     "placeholder": "Enter your full name",
//     "value": "John Doe"
//   },
//   {
//     "id": 12,
//     "name": "emailAddress",
//     "type": "email",
//     "label": "Your Email",
//     "placeholder": "Enter your email address",
//     "value": "john.doe@example.com",
//     "dependsOn": {
//   "path": "0.value",
//    "expectedValues": ["1", "2"],
//     "mode": "enabled",
// }
//   },
//   {
//     "id": 13,
//     "name": "gender",
//     "type": "radio",
//     "label": "Select your Gender",
//     "value": "male",
//     "options": [
//       { "value": "male", "label": "Male" },
//       { "value": "female", "label": "Female" },
//       { "value": "other", "label": "Other" }
//     ]
//   },
//   {
//     "id": 21,
//     "name": "rating",
//     "type": "select",
//     "label": "How would you rate us?",
//     "value": "5",
//     "options": [
//       { "value": "5", "label": "Excellent" },
//       { "value": "4", "label": "Very Good" },
//       { "value": "3", "label": "Good" },
//       { "value": "2", "label": "Fair" },
//       { "value": "1", "label": "Poor" }
//     ]
//   },
//   {
//     "id": 22,
//     "name": "comments",
//     "type": "textarea",
//     "label": "Any additional comments?",
//     "placeholder": "Enter your comments here",
//     "value": "This form is great!"
//   },
//   {
//     "id": 23,
//     "name": "subscribeNewsletter",
//     "type": "checkbox",
//     "label": "Subscribe to our newsletter",
//     "value": true
//   }
// ];


// const initialFormData=[
//   {
//     "id": "country_field",
//     "name": "selectedCountry",
//     "label": "Country Name (ISO2 Code):",
//     "type": "text",
//     "value": "",
//     "placeholder": "e.g., US or IN",
//     "description": "Enter country's ISO2 code (e.g., US for USA, IN for India) to fetch states.",
//     "dynamic": {
//       "visibilityCode": "return true;",
//       "visibilityMode": "show",
//       "dependencies": []
//     }
//   },
//   {
//     "id": "state_field",
//     "name": "selectedState",
//     "label": "Select State:",
//     "type": "select",
//     "value": "",
//     "placeholder": "Enter a valid Country first...",
//     "description": "States will load based on the country you enter (expects ISO2 code for best results).",
//     "options": [],
//     "dynamic": {
//       "visibilityCode": "return !!formData.selectedCountry && formData.selectedCountry.trim().length === 2;",
//       "visibilityMode": "show",
//       "optionsApiSourceCode": "const countryCode = formData.selectedCountry.toUpperCase(); // Ensure uppercase for ISO2\n\nconst response = await z.request({\n  url: `https://api.countrystatecity.in/v1/countries/\${countryCode}/states`,\n  method: 'GET',\n  headers: {\n    'X-CSCAPI-KEY': 'YOUR_API_KEY' // <<< REPLACE THIS WITH YOUR ACTUAL KEY\n  }\n});\n\nconst data = response.json;\nif (response.status === 200 && Array.isArray(data)) {\n  return data.map(item => ({ label: item.name, value: item.iso2 })); // Using iso2 as value for states\n}\nreturn [];",
//       "optionsMapping": {
//         "labelKey": "name",
//         "valueKey": "iso2"
//       },
//       "dependencies": ["selectedCountry", "__bundle__"]
//     }
//   },
//   {
//     "id": "city_field",
//     "name": "selectedCity",
//     "label": "Select City:",
//     "type": "select",
//     "value": "",
//     "placeholder": "Select state first...",
//     "description": "Cities will load based on the selected state and country.",
//     "options": [],
//     "dynamic": {
//       "visibilityCode": "return !!formData.selectedCountry && formData.selectedCountry.trim().length === 2 && !!formData.selectedState && formData.selectedState.trim().length > 0;",
//       "visibilityMode": "show",
//       "optionsApiSourceCode": "const countryCode = formData.selectedCountry.toUpperCase();\nconst stateCode = formData.selectedState;\n\nconst response = await z.request({\n  url: `https://api.countrystatecity.in/v1/countries/\${countryCode}/states/\${stateCode}/cities`,\n  method: 'GET',\n  headers: {\n    'X-CSCAPI-KEY': 'YOUR_API_KEY' // <<< REPLACE THIS WITH YOUR ACTUAL KEY\n  }\n});\n\nconst data = response.json;\nif (response.status === 200 && Array.isArray(data)) {\n  return data.map(item => ({ label: item.name, value: item.name })); // Using city name as value\n}\nreturn [];",
//       "optionsMapping": {
//         "labelKey": "name",
//         "valueKey": "name"
//       },
//       "dependencies": ["selectedCountry", "selectedState", "__bundle__"]
//     }
//   }
// ]

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



      if (Array.isArray(parentContainer) && targetIndex !== null) {
        parentContainer.splice(targetIndex, 1);
      } else {
        console.warn(`Could not delete field at path: ${path}`);
      }
    },


    moveField: (state, action) => {
      const { path, direction } = action.payload;
      // const sc=[...state]
      let { parentContainer, targetIndex } = getTargetContainerAndFieldfordeleteandupdownormovefield(state, path);
      let pc=[...parentContainer]

      if (Array.isArray(pc) && targetIndex !== null) {
        const newIndex = targetIndex + (direction === 'up' ? -1 : 1);

        if (newIndex >= 0 && newIndex < pc.length) {
        console.log(targetIndex,targetIndex+newIndex)
          let temp=pc[targetIndex]
          pc[targetIndex]=pc[newIndex]
          pc[newIndex]=temp

          return pc
         
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


// import { createSlice } from '@reduxjs/toolkit';
// import { findFieldByPath } from '../objectway/FindFieldByPath'; // Adjust path if needed

// // Helper to get the parent container and index for updates
// const getParentContainerAndIndex = (state, path) => {
//   const pathParts = path.split('.');
//   const fieldIndex = Number(pathParts.pop());
//   const parentPath = pathParts.join('.');

//   let parentContainer = state;
//   if (parentPath) {
//     const parentField = findFieldByPath(state, parentPath);
//     if (parentField && parentField.children && Array.isArray(parentField.children)) {
//       parentContainer = parentField.children;
//     } else {
//       // This case handles a malformed path or a field that shouldn't have children at this point
//       console.error("Invalid parent path or parent field has no children:", parentPath);
//       return { parentContainer: null, fieldIndex: -1 };
//     }
//   }
//   return { parentContainer, fieldIndex };
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState: [], // Initial state is an empty array of form fields
//   reducers: {
//     // Adds a new field to the form
//     addField: (state, action) => {
//       const { parentPath, newField } = action.payload;
//       if (parentPath) {
//         const parentField = findFieldByPath(state, parentPath);
//         if (parentField && parentField.children) {
//           parentField.children.push(newField);
//         } else if (parentField) {
//           // If parent exists but doesn't have children yet, create it
//           parentField.children = [newField];
//         } else {
//           console.error("Parent field not found for path:", parentPath);
//         }
//       } else {
//         state.push(newField); // Add to root if no parentPath
//       }
//     },
//     // Deletes a field from the form
//     deleteField: (state, action) => {
//       const { path } = action.payload;
//       const { parentContainer, fieldIndex } = getParentContainerAndIndex(state, path);

//       if (parentContainer && fieldIndex !== -1 && parentContainer[fieldIndex]) {
//         parentContainer.splice(fieldIndex, 1);
//       } else {
//         console.error("Field not found for deletion at path:", path);
//       }
//     },
//     // Updates a specific property (like 'value') of a field
//     updateFieldValue: (state, action) => {
//       const { path, newValue } = action.payload;
//       const targetField = findFieldByPath(state, path);
//       if (targetField) {
//         // Assume the path points directly to the 'value' property of the field object
//         // If path is e.g., "0.value", then targetField is the value itself.
//         // If path is e.g., "0.children.1.value", then targetField is the value itself.
//         // It's crucial that `findFieldByPath` returns the *parent object* if path ends in .value
//         // and that we update the correct property on that parent.
//         // A common pattern is `path` like "0" and `property` like "value".
//         // Let's refine `findFieldByPath` and `updateFieldValue` to work with `path` as field path + property
//         const pathParts = path.split('.');
//         const propertyToUpdate = pathParts.pop(); // 'value', 'label', 'options', etc.
//         const fieldPath = pathParts.join('.');
//         const field = findFieldByPath(state, fieldPath);

//         if (field && typeof field === 'object' && field !== null) {
//           field[propertyToUpdate] = newValue;
//         } else {
//           console.error("Field or property not found for update at path:", fieldPath, propertyToUpdate);
//         }

//       } else {
//         console.error("Field not found for update at path:", path);
//       }
//     },
//     // Updates the entire field object (used after editing in a modal)
//     updateEntireField: (state, action) => {
//       const { path, updatedField } = action.payload;
//       const { parentContainer, fieldIndex } = getParentContainerAndIndex(state, path);

//       if (parentContainer && fieldIndex !== -1 && parentContainer[fieldIndex]) {
//         parentContainer[fieldIndex] = { ...updatedField }; // Replace the entire object
//       } else {
//         console.error("Field not found for entire update at path:", path);
//       }
//     },
//     // Moves a field up or down within its array/children
//     moveField: (state, action) => {
//       const { path, direction } = action.payload;
//       const { parentContainer, fieldIndex } = getParentContainerAndIndex(state, path);
//       if (parentContainer && fieldIndex !== -1) {
//         const newIndex = fieldIndex + (direction === 'up' ? -1 : 1);
//         if (newIndex >= 0 && newIndex < parentContainer.length) {
//           const [movedField] = parentContainer.splice(fieldIndex, 1);
//           parentContainer.splice(newIndex, 0, movedField);
//         }
//       } else {
//         console.error("Field not found for move at path:", path);
//       }
//     },
//     // Sets the entire form data (e.g., for loading a saved form)
//     setFormData: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const {
//   addField,
//   deleteField,
//   updateFieldValue,
//   updateEntireField,
//   moveField,
//   setFormData,
// } = formSlice.actions;

// export default formSlice.reducer;