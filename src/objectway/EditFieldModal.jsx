
// import React, { useState, useEffect } from 'react';

// // Import Redux dispatch (though onSave prop handles the dispatch for now)
// import { useDispatch } from 'react-redux';
// import { updateEntireField } from '../features/formSlice'; // Adjust path


// const EditFieldModal = ({ field, onClose, onSave }) => {
//   const [editedField, setEditedField] = useState(field);
//    const dispatch = useDispatch(); // Not directly used here, onSave prop handles it

//   useEffect(() => {
//     // Sync internal state if the 'field' prop changes
//     // Also, ensure dependencyValue is a string for the textarea if it's not already
//     setEditedField(prev => ({
//         ...field,
//         dependencyValue: (field.dependencyValue !== undefined && field.dependencyValue !== null)
//             ? (Array.isArray(field.dependencyValue)
//                 ? JSON.stringify(field.dependencyValue)
//                 : String(field.dependencyValue)
//               )
//             : ''
//     }));
//   }, [field]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//     const handleDependencyValueChange = (e) => {
//         const value = e.target.value;
//         let parsedValue = value;
//         try {
//             // Attempt to parse as JSON for array or complex values
//             const temp = JSON.parse(value);
//             // If it's a valid array or object, keep it parsed.
//             // Otherwise, treat as a string.
//             parsedValue = (typeof temp === 'object' && temp !== null) ? temp : value;
//         } catch (error) {
//             // If parsing fails, treat as a simple string
//             parsedValue = value;
//         }
//         setEditedField(prev => ({
//             ...prev,
//             dependencyValue: parsedValue
//         }));
//     };

//   const handleOptionsChange = (index, prop, value) => {
//     setEditedField(prev => {
//       const newOptions = [...(prev.options || [])]; // Ensure options array exists
//       newOptions[index] = { ...newOptions[index], [prop]: value };
//       return { ...prev, options: newOptions };
//     });
//   };

//   const handleAddOption = () => {
//     setEditedField(prev => ({
//       ...prev,
//       options: [...(prev.options || []), { value: '', label: '' }],
//     }));
//   };

//   const handleRemoveOption = (index) => {
//     setEditedField(prev => {
//       const newOptions = [...prev.options];
//       newOptions.splice(index, 1);
//       return { ...prev, options: newOptions };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Statemanager's onSave handles the dispatch to updateEntireField
//     onSave(editedField);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Edit Field</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={editedField.id || ''}
//               readOnly
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={editedField.name || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Label:</label>
//             <input
//               type="text"
//               name="label"
//               value={editedField.label || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
//             <select
//               name="type"
//               value={editedField.type || ''}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="text">Text</option>
//               <option value="email">Email</option>
//               <option value="textarea">Textarea</option>
//               <option value="radio">Radio</option>
//               <option value="checkbox">Checkbox</option>
//               <option value="select">Select</option>
//                <option value="group">group</option>
//               {/* <option value="group">Group</option> */} {/* Uncomment if you re-introduce 'group' type */}
//             </select>
//           </div>

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Placeholder:</label>
//               <input
//                 type="text"
//                 name="placeholder"
//                 value={editedField.placeholder || ''}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//               />
//             </div>
//           )}

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea' || editedField.type === 'select' || editedField.type === 'radio') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Default Value:</label>
//               <input
//                 type={editedField.type === 'checkbox' ? 'checkbox' : 'text'}
//                 name="value"
//                 checked={editedField.type === 'checkbox' ? editedField.value : undefined}
//                 value={editedField.type === 'checkbox' ? '' : editedField.value || ''}
//                 onChange={handleChange}
//                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${editedField.type === 'checkbox' ? 'h-4 w-4' : ''}`}
//               />
//             </div>
//           )}

//           {/* New Fields for Visibility Logic */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Visible If (Field Name):</label>
//             <input
//               type="text"
//               name="visibleIf"
//               value={editedField.visibleIf || ''}
//               onChange={handleChange}
//               placeholder="e.g., userType"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//             <p className="text-xs text-gray-500 mt-1">Enter the 'name' of the field this field depends on for visibility.</p>
//           </div>

//           {editedField.visibleIf && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Dependency Value:</label>
//               <textarea
//                 name="dependencyValue"
//                 value={editedField.dependencyValue || ''}
//                 onChange={handleDependencyValueChange} // Use the new handler
//                 placeholder='e.g., "organization" or ["value1", "value2"] or "nonEmpty"'
//                 rows="3"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//               ></textarea>
//               <p className="text-xs text-gray-500 mt-1">
//                 Enter the value(s) the dependent field must have for this field to be visible.
//                 For multiple values, use JSON array syntax (e.g., `["value1", "value2"]`).
//                 Use "nonEmpty" (string) if visible when dependent field has any value.
//               </p>
//             </div>
//           )}

//           {(editedField.type === 'radio' || editedField.type === 'select') && (
//             <div className="mb-4 border p-3 rounded-md">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Options:</label>
//               {editedField.options && editedField.options.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2 gap-2">
//                   <input
//                     type="text"
//                     placeholder="Value"
//                     value={option.value || ''}
//                     onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Label"
//                     value={option.label || ''}
//                     onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOption(index)}
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddOption}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
//               >
//                 Add Option
//               </button>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFieldModal;


// import React, { useState, useEffect } from 'react';

// const EditFieldModal = ({ field, onClose, onSave }) => {
//   // Initialize editedField with a structure that matches your JSON,
//   // ensuring nested objects are present to avoid errors.
//   const [editedField, setEditedField] = useState(() => ({
//     ...field,
//     dynamic: {
//       visibility: {
//         modes: field.dynamic?.visibility?.modes || [],
//         conditions: {
//           static: field.dynamic?.visibility?.conditions?.static || [],
//           dynamic: field.dynamic?.visibility?.conditions?.dynamic || '',
//         },
//       },
//       dependency: {
//         static: field.dynamic?.dependency?.static || [],
//         dynamic: field.dynamic?.dependency?.dynamic || '',
//       },
//     },
//   }));

//   useEffect(() => {
//     // Sync internal state if the 'field' prop changes
//     // Deep merge to preserve dynamic properties if they exist
//     setEditedField(prev => ({
//       ...field,
//       dynamic: {
//         visibility: {
//           modes: field.dynamic?.visibility?.modes || [],
//           conditions: {
//             static: field.dynamic?.visibility?.conditions?.static || [],
//             dynamic: field.dynamic?.visibility?.conditions?.dynamic || '',
//           },
//         },
//         dependency: {
//           static: field.dynamic?.dependency?.static || [],
//           dynamic: field.dynamic?.dependency?.dynamic || '',
//         },
//       },
//     }));
//   }, [field]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleOptionsChange = (index, prop, value) => {
//     setEditedField(prev => {
//       const newOptions = [...(prev.options || [])];
//       newOptions[index] = { ...newOptions[index], [prop]: value };
//       return { ...prev, options: newOptions };
//     });
//   };

//   const handleAddOption = () => {
//     setEditedField(prev => ({
//       ...prev,
//       options: [...(prev.options || []), { value: '', label: '' }],
//     }));
//   };

//   const handleRemoveOption = (index) => {
//     setEditedField(prev => {
//       const newOptions = [...prev.options];
//       newOptions.splice(index, 1);
//       return { ...prev, options: newOptions };
//     });
//   };

//   // --- Handlers for New Dynamic Logic ---

//   const handleVisibilityModeChange = (e) => {
//     const { value, checked } = e.target;
//     setEditedField(prev => {
//       const currentModes = prev.dynamic.visibility.modes;
//       console.log(currentModes)
//       const newModes = checked
//         ? [...currentModes, value]
//         : currentModes.filter(mode => mode !== value);
//       return {
//         ...prev,
//         dynamic: {
//           ...prev.dynamic,
//           visibility: {
//             ...prev.dynamic.visibility,
//             modes: newModes,
//           },
//         },
//       };
//     });
//   };

//   const handleStaticConditionChange = (index, prop, value, type) => {
//     setEditedField(prev => {
//       const newStaticConditions = [...prev.dynamic.visibility.conditions.static];
//       // Ensure the condition object exists
//       if (!newStaticConditions[index]) {
//         newStaticConditions[index] = {};
//       }

//       // Special handling for 'value' to attempt JSON parsing for arrays/objects
//       let processedValue = value;
//       if (prop === 'value') {
//         try {
//           const parsed = JSON.parse(value);
//           processedValue = parsed;
//         } catch (e) {
//           // If parsing fails, keep it as a string
//           processedValue = value;
//         }
//       }

//       newStaticConditions[index] = {
//         ...newStaticConditions[index],
//         [prop]: processedValue,
//       };
//       return {
//         ...prev,
//         dynamic: {
//           ...prev.dynamic,
//           visibility: {
//             ...prev.dynamic.visibility,
//             conditions: {
//               ...prev.dynamic.visibility.conditions,
//               static: newStaticConditions,
//             },
//           },
//         },
//       };
//     });
//   };

//   const handleAddStaticCondition = () => {
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic,
//         visibility: {
//           ...prev.dynamic.visibility,
//           conditions: {
//             ...prev.dynamic.visibility.conditions,
//             static: [...prev.dynamic.visibility.conditions.static, { field: '', operator: 'equals', value: '' }],
//           },
//         },
//       },
//     }));
//   };

//   const handleRemoveStaticCondition = (index) => {
//     setEditedField(prev => {
//       const newStaticConditions = [...prev.dynamic.visibility.conditions.static];
//       newStaticConditions.splice(index, 1);
//       return {
//         ...prev,
//         dynamic: {
//           ...prev.dynamic,
//           visibility: {
//             ...prev.dynamic.visibility,
//             conditions: {
//               ...prev.dynamic.visibility.conditions,
//               static: newStaticConditions,
//             },
//           },
//         },
//       };
//     });
//   };

//   const handleDynamicConditionChange = (e) => {
//     const { value } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic,
//         visibility: {
//           ...prev.dynamic.visibility,
//           conditions: {
//             ...prev.dynamic.visibility.conditions,
//             dynamic: value,
//           },
//         },
//       },
//     }));
//   };

//   const handleStaticDependencyChange = (index, value) => {
//     setEditedField(prev => {
//       const newStaticDependencies = [...prev.dynamic.dependency.static];
//       newStaticDependencies[index] = value;
//       return {
//         ...prev,
//         dynamic: {
//           ...prev.dynamic,
//           dependency: {
//             ...prev.dynamic.dependency,
//             static: newStaticDependencies,
//           },
//         },
//       };
//     });
//   };

//   const handleAddStaticDependency = () => {
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic,
//         dependency: {
//           ...prev.dynamic.dependency,
//           static: [...prev.dynamic.dependency.static, ''],
//         },
//       },
//     }));
//   };

//   const handleRemoveStaticDependency = (index) => {
//     setEditedField(prev => {
//       const newStaticDependencies = [...prev.dynamic.dependency.static];
//       newStaticDependencies.splice(index, 1);
//       return {
//         ...prev,
//         dynamic: {
//           ...prev.dynamic,
//           dependency: {
//             ...prev.dynamic.dependency,
//             static: newStaticDependencies,
//           },
//         },
//       };
//     });
//   };

//   const handleDynamicDependencyChange = (e) => {
//     const { value } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic,
//         dependency: {
//           ...prev.dynamic.dependency,
//           dynamic: value,
//         },
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(editedField);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Edit Field</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Existing Fields (ID, Name, Label, Type, Placeholder, Default Value) */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={editedField.id || ''}
//               readOnly
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={editedField.name || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Label:</label>
//             <input
//               type="text"
//               name="label"
//               value={editedField.label || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
//             <select
//               name="type"
//               value={editedField.type || ''}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="text">Text</option>
//               <option value="email">Email</option>
//               <option value="textarea">Textarea</option>
//               <option value="radio">Radio</option>
//               <option value="checkbox">Checkbox</option>
//               <option value="select">Select</option>
//               <option value="group">Group</option>
//             </select>
//           </div>

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Placeholder:</label>
//               <input
//                 type="text"
//                 name="placeholder"
//                 value={editedField.placeholder || ''}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//               />
//             </div>
//           )}

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea' || editedField.type === 'select' || editedField.type === 'radio') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Default Value:</label>
//               <input
//                 type={editedField.type === 'checkbox' ? 'checkbox' : 'text'}
//                 name="value"
//                 checked={editedField.type === 'checkbox' ? editedField.value : undefined}
//                 value={editedField.type === 'checkbox' ? '' : editedField.value || ''}
//                 onChange={handleChange}
//                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${editedField.type === 'checkbox' ? 'h-4 w-4' : ''}`}
//               />
//             </div>
//           )}

//           {/* New Section for Dynamic Visibility */}
//           <hr className="my-6" />
//           <h3 className="text-xl font-bold mb-4">Visibility Logic</h3>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Modes:</label>
//             <div className="flex gap-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   value="visible"
//                   checked={editedField.dynamic.visibility.modes.includes('visible')}
//                   onChange={handleVisibilityModeChange}
//                   className="form-checkbox"
//                 />
//                 <span className="ml-2">Visible</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   value="disable"
//                   checked={editedField.dynamic.visibility.modes.includes('disable')}
//                   onChange={handleVisibilityModeChange}
//                   className="form-checkbox"
//                 />
//                 <span className="ml-2">Disable</span>
//               </label>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Select how this field's visibility or interaction is controlled by conditions.</p>
//           </div>

//           <div className="mb-4 border p-3 rounded-md">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Static Conditions:</label>
//             {editedField.dynamic.visibility.conditions.static.map((condition, index) => (
//               <div key={index} className="flex items-center mb-2 gap-2">
//                 <input
//                   type="text"
//                   placeholder="Field Name"
//                   value={condition.field || ''}
//                   onChange={(e) => handleStaticConditionChange(index, 'field', e.target.value)}
//                   className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/3"
//                 />
//                 <select
//                   value={condition.operator || 'equals'}
//                   onChange={(e) => handleStaticConditionChange(index, 'operator', e.target.value)}
//                   className="shadow border rounded py-1 px-2 text-gray-700 w-1/4"
//                 >
//                   <option value="equals">Equals</option>
//                   <option value="notEquals">Not Equals</option>
//                   <option value="greaterThan">Greater Than</option>
//                   <option value="lessThan">Less Than</option>
//                   <option value="includes">Includes (for arrays)</option>
//                   <option value="excludes">Excludes (for arrays)</option>
//                   <option value="nonEmpty">Not Empty</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Value (e.g., 'admin' or [1,2])"
//                   value={
//                     typeof condition.value === 'object' && condition.value !== null
//                       ? JSON.stringify(condition.value)
//                       : String(condition.value || '')
//                   }
//                   onChange={(e) => handleStaticConditionChange(index, 'value', e.target.value)}
//                   className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/3"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveStaticCondition(index)}
//                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddStaticCondition}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
//             >
//               Add Static Condition
//             </button>
//             <p className="text-xs text-gray-500 mt-1">Define conditions based on other field values. For array values, use JSON array syntax (e.g., `["value1", "value2"]`). Use "nonEmpty" operator if visible when dependent field has any value.</p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Dynamic Condition (JS Expression):</label>
//             <textarea
//               name="dynamicCondition"
//               value={editedField.dynamic.visibility.conditions.dynamic || ''}
//               onChange={handleDynamicConditionChange}
//               placeholder="e.g., formData.age > 18 && formData.country === 'India'"
//               rows="3"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             ></textarea>
//             <p className="text-xs text-gray-500 mt-1">
//               Enter a JavaScript expression. `formData` will be available, containing all current form values.
//             </p>
//           </div>

//           {/* New Section for Dependencies */}
//           <hr className="my-6" />
//           <h3 className="text-xl font-bold mb-4">Field Dependencies</h3>

//           <div className="mb-4 border p-3 rounded-md">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Static Dependencies (Field Names):</label>
//             {editedField.dynamic.dependency.static.map((depField, index) => (
//               <div key={index} className="flex items-center mb-2 gap-2">
//                 <input
//                   type="text"
//                   placeholder="Dependent Field Name"
//                   value={depField || ''}
//                   onChange={(e) => handleStaticDependencyChange(index, e.target.value)}
//                   className="shadow appearance-none border rounded py-1 px-2 text-gray-700 flex-grow"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveStaticDependency(index)}
//                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddStaticDependency}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
//             >
//               Add Static Dependency
//             </button>
//             <p className="text-xs text-gray-500 mt-1">List field names that, when changed, should trigger a re-evaluation of this field's visibility/logic.</p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Dynamic Dependency (JS Expression):</label>
//             <textarea
//               name="dynamicDependency"
//               value={editedField.dynamic.dependency.dynamic || ''}
//               onChange={handleDynamicDependencyChange}
//               placeholder="e.g., formData.subscription === 'pro' && formData.referralUsed === true"
//               rows="3"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             ></textarea>
//             <p className="text-xs text-gray-500 mt-1">
//               Enter a JavaScript expression. Changes to any field referenced here will trigger re-evaluation.
//             </p>
//           </div>


//           {(editedField.type === 'radio' || editedField.type === 'select') && (
//             <div className="mb-4 border p-3 rounded-md">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Options:</label>
//               {editedField.options && editedField.options.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2 gap-2">
//                   <input
//                     type="text"
//                     placeholder="Value"
//                     value={option.value || ''}
//                     onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Label"
//                     value={option.label || ''}
//                     onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOption(index)}
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddOption}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
//               >
//                 Add Option
//               </button>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFieldModal;





// import React, { useState, useEffect, useCallback } from 'react';

// const EditFieldModal = ({ field, onClose, onSave }) => {
//   // --- Utility Functions (moved inside the component) ---

//   /**
//    * Extracts field names from a JavaScript expression string.
//    * This is used to build the `dependencies` array. It will now
//    * also identify if the 'bundle' object is accessed.
//    * @param {string} jsCodeString The JavaScript expression string.
//    * @returns {string[]} An array of unique field names and potentially a '__bundle__' flag.
//    */
//   const resolveDependencyFields = useCallback((jsCodeString) => {
//     const dependencies = new Set(); 

//     if (!jsCodeString || typeof jsCodeString !== 'string') {
//       return [];
//     }

//     // Regex to find `formData.fieldName` or `formData["fieldName"]`
//     // and `bundle.propertyName` or `bundle["propertyName"]`
//     const regex = /(formData|bundle)\.(?:([a-zA-Z_$][a-zA-Z0-9_$]*)|\[\s*['"]([a-zA-Z_$][a-zA-Z0-9_$]*)['"]\s*\])/g;
//     let match;

//     while ((match = regex.exec(jsCodeString)) !== null) {
//       const context = match[1]; // 'formData' or 'bundle'
//       const propertyName = match[2] || match[3]; // The field/property name

//       if (context === 'formData' && propertyName) {
//         dependencies.add(propertyName);
//       } else if (context === 'bundle') {
//         // If 'bundle' is accessed at all, mark it as a dependency.
//         // This is a simplification; a full AST parser would be needed
//         // to track specific nested bundle properties (e.g., bundle.inputData.sheets).
//         // For reactive updates, merely knowing 'bundle' was used is often enough
//         // as the entire bundleData prop will likely trigger re-renders.
//         dependencies.add('__bundle__'); 
//       }
//     }

//     return Array.from(dependencies);
//   }, []); // Memoize as it doesn't depend on external state

//   // --- Component State and Handlers ---

//   // Initialize editedField with the new visibilityMode
//   const [editedField, setEditedField] = useState(() => ({
//     ...field,
//     dynamic: {
//       visibilityCode: field.dynamic?.visibilityCode || '',
//       visibilityMode: field.dynamic?.visibilityMode || 'show', // Default mode
//     },
//   }));

//   useEffect(() => {
//     // Sync internal state if the 'field' prop changes
//     setEditedField(prev => ({
//       ...field,
//       dynamic: {
//         visibilityCode: field.dynamic?.visibilityCode || '',
//         visibilityMode: field.dynamic?.visibilityMode || 'show',
//       },
//     }));
//   }, [field]); // Dependency array for useEffect

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleOptionsChange = (index, prop, value) => {
//     setEditedField(prev => {
//       const newOptions = [...(prev.options || [])];
//       newOptions[index] = { ...newOptions[index], [prop]: value };
//       return { ...prev, options: newOptions };
//     });
//   };

//   const handleAddOption = () => {
//     setEditedField(prev => ({
//       ...prev,
//       options: [...(prev.options || []), { value: '', label: '' }],
//     }));
//   };

//   const handleRemoveOption = (index) => {
//     setEditedField(prev => {
//       const newOptions = [...prev.options];
//       newOptions.splice(index, 1);
//       return { ...prev, options: newOptions };
//     });
//   };

//   // --- Handlers for Dynamic Logic ---
//   const handleVisibilityCodeChange = (e) => {
//     const { value } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic, // Keep other dynamic properties like mode
//         visibilityCode: value,
//       },
//     }));
//   };

//   const handleVisibilityModeChange = (e) => {
//     const { value } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...prev.dynamic, // Keep other dynamic properties like code
//         visibilityMode: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // The 'dependencies' array is now entirely derived from visibilityCode.
//     const extractedDependencies = resolveDependencyFields(editedField.dynamic.visibilityCode);

//     const fieldToSave = {
//       ...editedField,
//       dynamic: {
//         ...editedField.dynamic,
//         // Save the derived dependencies for the form renderer to watch
//         dependencies: Array.from(new Set(extractedDependencies)), 
//       },
//     };
//     onSave(fieldToSave);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Edit Field</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Existing Fields (ID, Name, Label, Type, Placeholder, Default Value) */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
//             <input
//               type="text"
//               name="id"
//               value={editedField.id || ''}
//               readOnly
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={editedField.name || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Label:</label>
//             <input
//               type="text"
//               name="label"
//               value={editedField.label || ''}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
//             <select
//               name="type"
//               value={editedField.type || ''}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="text">Text</option>
//               <option value="email">Email</option>
//               <option value="textarea">Textarea</option>
//               <option value="radio">Radio</option>
//               <option value="checkbox">Checkbox</option>
//               <option value="select">Select</option>
//               <option value="group">Group</option>
//             </select>
//           </div>

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Placeholder:</label>
//               <input
//                 type="text"
//                 name="placeholder"
//                 value={editedField.placeholder || ''}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//               />
//             </div>
//           )}

//           {(editedField.type === 'text' || editedField.type === 'email' || editedField.type === 'textarea' || editedField.type === 'select' || editedField.type === 'radio') && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Default Value:</label>
//               <input
//                 type={editedField.type === 'checkbox' ? 'checkbox' : 'text'}
//                 name="value"
//                 checked={editedField.type === 'checkbox' ? editedField.value : undefined}
//                 value={editedField.type === 'checkbox' ? '' : editedField.value || ''}
//                 onChange={handleChange}
//                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${editedField.type === 'checkbox' ? 'h-4 w-4' : ''}`}
//               />
//             </div>
//           )}

//           {/* Combined JavaScript Control for Visibility & Behavior */}
//           <hr className="my-6" />
//           <h3 className="text-xl font-bold mb-4">Dynamic Field Behavior (JavaScript)</h3>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Behavior Mode:</label>
//             <select
//               name="visibilityMode"
//               value={editedField.dynamic.visibilityMode || 'show'}
//               onChange={handleVisibilityModeChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="show">Show if expression is TRUE</option>
//               <option value="hide">Hide if expression is TRUE</option>
//               <option value="enable">Enable if expression is TRUE</option>
//               <option value="disable">Disable if expression is TRUE</option>
//               <option value="custom">Custom (Expression returns 'show'/'hide'/'enable'/'disable')</option>
//             </select>
//             <p className="text-xs text-gray-500 mt-1">
//               Choose how the JavaScript expression below will control this field's display or interaction.
//             </p>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               JavaScript Expression:
//             </label>
//             <textarea
//               name="visibilityCode"
//               value={editedField.dynamic.visibilityCode || ''}
//               onChange={handleVisibilityCodeChange}
//               placeholder={`e.g.,\nformData.userRole === 'admin' || bundle.featureFlags.betaEnabled\n\nFor 'Custom' mode, you can return a string:\nbundle.inputData.sheets === 'Sheet1' ? 'disable' : 'show'`}
//               rows="5"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 font-mono text-sm"
//             ></textarea>
//             <p className="text-xs text-gray-500 mt-1">
//               Enter a JavaScript expression.
//               <br />
//               - `formData` (all current form values) is available.
//               <br />
//               - `bundle` (external data like `bundle.inputData` or `bundle.authData`) is also available.
//               <br />
//               The result of this expression will be interpreted based on the "Behavior Mode" selected above.
//               <br />
//               **Dependencies are automatically inferred** from any fields (`formData.fieldName`) or bundle properties (`bundle.propertyName`) you reference here.
//             </p>
//           </div>

//           {(editedField.type === 'radio' || editedField.type === 'select') && (
//             <div className="mb-4 border p-3 rounded-md">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Options:</label>
//               {editedField.options && editedField.options.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2 gap-2">
//                   <input
//                     type="text"
//                     placeholder="Value"
//                     value={option.value || ''}
//                     onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Label"
//                     value={option.label || ''}
//                     onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
//                     className="shadow appearance-none border rounded py-1 px-2 text-gray-700 w-1/2"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOption(index)}
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddOption}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm mt-2"
//               >
//                 Add Option
//               </button>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFieldModal;


// EditFieldModal.jsx
// import React, { useState, useEffect, useCallback } from 'react';

// // --- Start: SVG Icons (Directly embedded) ---
// // These icons are for the Save and Cancel buttons within the modal.
// const SaveIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-1v5.586l-1.293-1.293z" /><path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H9zM6 7h8v6H6V7z" clipRule="evenodd" /></svg>);
// const CancelIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);
// // --- End: SVG Icons ---


// const EditFieldModal = ({ field, onClose, onSave }) => {
//   // `editedField` state holds a deep copy of the `field` prop.
//   // This is crucial for allowing "Cancel" to discard changes without affecting the parent's state.
//   const [editedField, setEditedField] = useState(() => JSON.parse(JSON.stringify(field || {})));

//   // `useEffect` to re-initialize `editedField` when the `field` prop changes.
//   // Ensures the modal always displays the correct field data when opened for a new field.
//   useEffect(() => {
//     setEditedField(JSON.parse(JSON.stringify(field || {})));
//   }, [field]); // Dependency: `field` object.

//   // General change handler for basic input fields (text, email, select, checkbox etc.)
//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setEditedField(prev => ({
//       ...prev, // Copy all previous properties of the field
//       [name]: type === 'checkbox' ? checked : value, // Handle checkbox's boolean value vs. other input types' string values
//     }));
//   }, []); // `handleChange` has no external dependencies beyond `e` and `setEditedField` (React guarantee), so it's memoized once.

//   // Change handler for properties nested within the `dynamic` object (e.g., `visibilityCode`, `visibilityMode`).
//   const handleDynamicChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setEditedField(prev => ({
//       ...prev,
//       dynamic: {
//         ...(prev.dynamic || {}), // Ensure `dynamic` object exists; create an empty one if it doesn't
//         [name]: value, // Update the specific dynamic property by its `name`
//       },
//     }));
//   }, []); // `handleDynamicChange` has no external dependencies beyond `e` and `setEditedField`, so it's memoized once.

//   // --- Handlers for managing the static `options` array (for select, radio, checkbox types) ---
//   const handleOptionChange = useCallback((index, key, value) => {
//     setEditedField(prev => {
//       const newOptions = [...(prev.options || [])]; // Create a shallow copy of the options array for immutability
//       newOptions[index] = { ...newOptions[index], [key]: value }; // Deep copy and update the specific option object at `index`
//       return { ...prev, options: newOptions }; // Return new state with the updated options array
//     });
//   }, []); // `handleOptionChange` has no external dependencies.

//   const addOption = useCallback(() => {
//     setEditedField(prev => ({
//       ...prev,
//       options: [...(prev.options || []), { label: '', value: '' }], // Add a new empty option object to the end of the array
//     }));
//   }, []); // `addOption` has no external dependencies.

//   const removeOption = useCallback((indexToRemove) => {
//     setEditedField(prev => ({
//       ...prev,
//       options: prev.options.filter((_, index) => index !== indexToRemove), // Filter out the option at the specified `indexToRemove`
//     }));
//   }, []); // `removeOption` has no external dependencies.
//   // --- End Handlers for static `options` ---

//   // Form submission handler. This function is called when the modal's form is submitted.
//   const handleSubmit = useCallback((e) => {
//     e.preventDefault(); // Prevent the default browser form submission behavior (which would reload the page)
//     onSave(editedField); // Call the `onSave` prop (passed from `App.jsx`) with the final `editedField` data
//   }, [editedField, onSave]); // Dependencies: `editedField` (the current state of the form in the modal) and `onSave` callback.

//   // If `editedField.id` is not present, it means no valid field data has been loaded, so render nothing.
//   if (!editedField.id) return null;

//   return (
//     // Modal overlay: fixed position, covers the entire screen, semi-transparent dark background, centers its content.
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
//       {/* Modal content area: white background, rounded corners, shadow, responsive width, max height with overflow scrolling. */}
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
//         {/* Modal Title */}
//         <h2 className="text-2xl font-bold mb-4 text-indigo-700">Edit Field: {editedField.name || editedField.id}</h2>
        
//         {/* Form for editing field properties */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Basic Field Properties Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
//               <input type="text" name="id" id="id" value={editedField.id || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100" readOnly />
//             </div>
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (for formData)</label>
//               <input type="text" name="name" id="name" value={editedField.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//             </div>
//             <div>
//               <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label (Display Text)</label>
//               <input type="text" name="label" id="label" value={editedField.label || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//             </div>
//             <div>
//               <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
//               <select name="type" id="type" value={editedField.type || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
//                 <option value="">Select Type</option>
//                 <option value="text">Text</option>
//                 <option value="email">Email</option>
//                 <option value="textarea">Textarea</option>
//                 <option value="radio">Radio</option>
//                 <option value="checkbox">Checkbox</option>
//                 <option value="select">Select</option>
//                 <option value="group">Group</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700">Placeholder</label>
//               <input type="text" name="placeholder" id="placeholder" value={editedField.placeholder || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" id="description" value={editedField.description || ''} onChange={handleChange} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"></textarea>
//           </div>

//           {/* Static Options Section */}
//           {/* Renders only if the field type supports options AND there is NO dynamic optionsSourceCode defined */}
//           {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && !editedField.dynamic?.optionsSourceCode && (
//             <div className="border border-dashed border-gray-300 p-4 rounded-md bg-gray-50">
//               <h3 className="text-lg font-semibold mb-3 text-gray-800">Static Options</h3>
//               {editedField.options?.length === 0 && <p className="text-sm text-gray-500 mb-2">No static options defined. Use "Add Option" or dynamic options source.</p>}
//               {editedField.options?.map((option, index) => (
//                 <div key={index} className="flex gap-2 mb-2 items-center">
//                   <input
//                     type="text"
//                     value={option.label || ''}
//                     onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
//                     placeholder="Label"
//                     className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm"
//                   />
//                   <input
//                     type="text"
//                     value={option.value || ''}
//                     onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
//                     placeholder="Value"
//                     className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm"
//                   />
//                   <button type="button" onClick={() => removeOption(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors">Remove</button>
//                 </div>
//               ))}
//               <button type="button" onClick={addOption} className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">Add Static Option</button>
//             </div>
//           )}

//           {/* Dynamic Properties Section */}
//           <div className="border border-blue-300 p-4 rounded-md bg-blue-50">
//             <h3 className="text-lg font-semibold mb-3 text-blue-800">Dynamic Properties (Advanced)</h3>

//             {/* Visibility Code Field */}
//             <div>
//               <label htmlFor="visibilityCode" className="block text-sm font-medium text-gray-700">Visibility Code (JavaScript)</label>
//               <textarea name="visibilityCode" id="visibilityCode" value={editedField.dynamic?.visibilityCode || ''} onChange={handleDynamicChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono text-xs"></textarea>
//               <p className="text-xs text-gray-500 mt-1">
//                 Enter JavaScript code that returns `true` or `false`.
//                 `formData` (current form values) and `bundle` (global data) are available.
//                 Example: `return !!formData.selectedCountry;`
//               </p>
//             </div>

//             {/* Visibility Mode Select */}
//             <div className="mt-4">
//               <label htmlFor="visibilityMode" className="block text-sm font-medium text-gray-700">Visibility Mode</label>
//               <select name="visibilityMode" id="visibilityMode" value={editedField.dynamic?.visibilityMode || 'show'} onChange={handleDynamicChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
//                 <option value="show">Show if code returns true</option>
//                 <option value="hide">Hide if code returns true (inverse)</option>
//               </select>
//             </div>

//             {/* Options Source Code Field (NEW) */}
//             {/* Renders only if the field type supports options */}
//             {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && (
//               <div className="mt-4">
//                 <label htmlFor="optionsSourceCode" className="block text-sm font-medium text-gray-700">Options Source Code (JavaScript Expression)</label>
//                 <textarea name="optionsSourceCode" id="optionsSourceCode" value={editedField.dynamic?.optionsSourceCode || ''} onChange={handleDynamicChange} rows="8" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono text-xs"></textarea>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {/* Enter JavaScript code that returns an array of `{ label: '...', value: '...' }` objects.
//                   `formData` (current form values) and `bundle` (global data) are available.
//                   Example: `return [{ label: 'Option 1', value: 'value1' }, { label: 'Option 2', value: formData.someField }];` */}
//                 </p>
//                 <p className="text-xs text-red-500 mt-1">
//                   {/* Note: If this field is populated, 'Static Options' above will be ignored. This code should directly return an array of `{ label, value }` objects. */}
//                 </p>
//               </div>
//             )}
//           </div> {/* End Dynamic Properties Section */}

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center"
//             >
//               <CancelIcon /> Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
//             >
//               <SaveIcon /> Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditFieldModal;


import React, { useState, useEffect, useCallback } from 'react';

const SaveIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-1v5.586l-1.293-1.293z" /><path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H9zM6 7h8v6H6V7z" clipRule="evenodd" /></svg>);
const CancelIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);

const EditFieldModal = ({ field, onClose, onSave }) => {
  const [editedField, setEditedField] = useState(() => {
    // Transform incoming 'field' prop for modal state if it has nested dynamic props
    const transformedField = JSON.parse(JSON.stringify(field || {}));
    if (transformedField.dynamic) {
      // Flatten visibility for editing in modal
      if (transformedField.dynamic.visibility?.conditions?.jsExpression) {
        transformedField.dynamic.visibilityCode = transformedField.dynamic.visibility.conditions.jsExpression;
      }
      if (transformedField.dynamic.visibility?.modes) {
        // Assuming only one mode for simplicity or converting array to single string
        transformedField.dynamic.visibilityMode = transformedField.dynamic.visibility.modes[0] || 'show';
      }
      // Flatten options for editing in modal
      if (transformedField.dynamic.options?.jsExpression) {
        transformedField.dynamic.optionsSourceCode = transformedField.dynamic.options.jsExpression;
      }
    }
    return transformedField;
  });

  useEffect(() => {
    // Re-initialize editedField when the field prop changes
    const transformedField = JSON.parse(JSON.stringify(field || {}));
    if (transformedField.dynamic) {
      if (transformedField.dynamic.visibility?.conditions?.jsExpression) {
        transformedField.dynamic.visibilityCode = transformedField.dynamic.visibility.conditions.jsExpression;
      }
      if (transformedField.dynamic.visibility?.modes) {
        transformedField.dynamic.visibilityMode = transformedField.dynamic.visibility.modes[0] || 'show';
      }
      if (transformedField.dynamic.options?.jsExpression) {
        transformedField.dynamic.optionsSourceCode = transformedField.dynamic.options.jsExpression;
      }
    }
    setEditedField(transformedField);
  }, [field]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEditedField(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleDynamicChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedField(prev => ({
      ...prev,
      dynamic: {
        ...(prev.dynamic || {}),
        [name]: value,
      },
    }));
  }, []);

  const handleOptionChange = useCallback((index, key, value) => {
    setEditedField(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[index] = { ...newOptions[index], [key]: value };
      return { ...prev, options: newOptions };
    });
  }, []);

  const addOption = useCallback(() => {
    setEditedField(prev => ({
      ...prev,
      options: [...(prev.options || []), { label: '', value: '' }],
    }));
  }, []);

  const removeOption = useCallback((indexToRemove) => {
    setEditedField(prev => ({
      ...prev,
      options: prev.options.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const finalField = JSON.parse(JSON.stringify(editedField)); // Create a deep copy for manipulation

    // Clean up temporary state properties and format to desired JSON structure
    if (finalField.dynamic) {
      // Handle visibility
      finalField.dynamic.visibility = {}; // Initialize visibility object
      if (finalField.dynamic.visibilityCode) {
        finalField.dynamic.visibility.conditions = { jsExpression: finalField.dynamic.visibilityCode };
        delete finalField.dynamic.visibilityCode;
      } else {
        // If no code, ensure conditions is an empty object
        finalField.dynamic.visibility.conditions = { static: [], jsExpression: "" };
      }

      if (finalField.dynamic.visibilityMode && finalField.dynamic.visibilityMode !== 'show') {
          finalField.dynamic.visibility.modes = [finalField.dynamic.visibilityMode];
      } else {
          finalField.dynamic.visibility.modes = [];
      }
      delete finalField.dynamic.visibilityMode;

      // Handle options
      if (finalField.dynamic.optionsSourceCode) {
        finalField.dynamic.options = { jsExpression: finalField.dynamic.optionsSourceCode };
        // If dynamic options source code is provided, remove static options
        if (finalField.hasOwnProperty('options')) {
          delete finalField.options;
        }
      } else {
        // If no dynamic options code, ensure dynamic.options is clean or absent
        // and static options (finalField.options) remain if they exist.
        if (finalField.dynamic.hasOwnProperty('options')) { // Remove if it was dynamically set previously
            delete finalField.dynamic.options;
        }
      }
      delete finalField.dynamic.optionsSourceCode;

      // If dynamic object becomes empty after cleaning, remove it
      if (Object.keys(finalField.dynamic.visibility).length === 0 && Object.keys(finalField.dynamic.options || {}).length === 0 && Object.keys(finalField.dynamic).length <= 2) {
        // Check for specific properties that are always empty objects initially
        const hasMeaningfulDynamicProps = Object.keys(finalField.dynamic).some(key =>
            key !== 'visibility' && key !== 'options' && Object.keys(finalField.dynamic[key]).length > 0
        );
        if(!hasMeaningfulDynamicProps && (!finalField.dynamic.visibility?.conditions?.jsExpression && finalField.dynamic.visibility?.modes?.length === 0) && (!finalField.dynamic.options?.jsExpression) ) {
            delete finalField.dynamic;
        }
      }
    }


    onSave(finalField);
  }, [editedField, onSave]);

  if (!editedField.id) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Edit Field: {editedField.name || editedField.id}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
              <input type="text" name="id" id="id" value={editedField.id || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100" readOnly />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (for formData)</label>
              <input type="text" name="name" id="name" value={editedField.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label (Display Text)</label>
              <input type="text" name="label" id="label" value={editedField.label || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select name="type" id="type" value={editedField.type || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                <option value="">Select Type</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="textarea">Textarea</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select</option>
                <option value="group">Group</option>
              </select>
            </div>
            <div>
              <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700">Placeholder</label>
              <input type="text" name="placeholder" id="placeholder" value={editedField.placeholder || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={editedField.description || ''} onChange={handleChange} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"></textarea>
          </div>

          {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && !editedField.dynamic?.optionsSourceCode && (
            <div className="border border-dashed border-gray-300 p-4 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Static Options</h3>
              {editedField.options?.length === 0 && <p className="text-sm text-gray-500 mb-2">No static options defined. Use "Add Option" or dynamic options source.</p>}
              {editedField.options?.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={option.label || ''}
                    onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm"
                  />
                  <input
                    type="text"
                    value={option.value || ''}
                    onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="flex-1 border border-gray-300 rounded-md py-2 px-3 text-sm"
                  />
                  <button type="button" onClick={() => removeOption(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addOption} className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">Add Static Option</button>
            </div>
          )}

          <div className="border border-blue-300 p-4 rounded-md bg-blue-50">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Dynamic Properties (Advanced)</h3>

            <div>
              <label htmlFor="visibilityCode" className="block text-sm font-medium text-gray-700">Visibility Code (JavaScript)</label>
              <textarea name="visibilityCode" id="visibilityCode" value={editedField.dynamic?.visibilityCode || ''} onChange={handleDynamicChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono text-xs"></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Enter JavaScript code that returns `true` or `false`.
                `formData` (current form values) and `bundle` (global data) are available.
                Example: `return bundle.someField === 'value';`
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="visibilityMode" className="block text-sm font-medium text-gray-700">Visibility Mode</label>
              <select name="visibilityMode" id="visibilityMode" value={editedField.dynamic?.visibilityMode || 'show'} onChange={handleDynamicChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                <option value="show">Show if code returns true</option>
                <option value="hide">Hide if code returns true (inverse)</option>
              </select>
            </div>

            {(editedField.type === 'select' || editedField.type === 'radio' || editedField.type === 'checkbox') && (
              <div className="mt-4">
                <label htmlFor="optionsSourceCode" className="block text-sm font-medium text-gray-700">Options Source Code (JavaScript Expression)</label>
                <textarea name="optionsSourceCode" id="optionsSourceCode" value={editedField.dynamic?.optionsSourceCode || ''} onChange={handleDynamicChange} rows="8" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono text-xs"></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {/* Enter JavaScript code that returns an array of `{ label: '...', value: '...' }` objects.
                  `bundle` (global data) is available.
                  Example: `(() => { switch (bundle.country?.toLowerCase()) { case 'india': return [{ label: 'State A', value: 'A' }]; default: return []; } })()` */}
                </p>
                <p className="text-xs text-red-500 mt-1">
                  Note: If this field is populated, 'Static Options' above will be ignored and removed from the saved JSON.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center"
            >
              <CancelIcon /> Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
            >
              <SaveIcon /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFieldModal;








