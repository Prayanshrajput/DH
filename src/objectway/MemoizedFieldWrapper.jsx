// components/MemoizedFieldWrapper.jsx
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectFieldByIdAndPath, selectFormData } from '../features/reduxSelectors';
import { checkStaticConditions, evaluateExpression } from './FindFieldByPath'; // New imports

// Import all specific field components (non-memoized for internal use in wrapper)
import {
  deleteField,
  moveField,
  addField,
} from '.././features/formSlice'; // Adjust path
import { selectFormData } from '.././features/reduxSelectors'; // Adjust path

// Import all memoized field components
import MemoizedInputField from './FormFields/MemoizedInputField';
import MemoizedTextareaField from './FormFields/MemoizedTextareaField';
import MemoizedSelectField from './FormFields/MemoizedSelectField';
import MemoizedRadioField from './FormFields/MemoizedRadioField';
import MemoizedCheckboxField from './FormFields/MemoizedCheckboxField';
import ApiRender from './ApiRender'; // Your ApiRender component
import EditFieldModal from './EditFieldModal'; // Your EditFieldModal component

// Map field types to their corresponding presentational components
const fieldComponentsMap = {
  text: InputField,
  email: InputField,
  textarea: TextareaField,
  select: SelectField,
  radio: RadioField,
  checkbox: CheckboxField,
  apiRender: ApiRender,
};

// This is the component that will be heavily memoized, acting as a smart selector.
const FieldWrapper = ({ fieldId, fullFormData, onUpdateFieldValue, onEditField, currentPath }) => {
  // console.log(`FieldWrapper Render: ${fieldId}`); // Debugging which wrappers render

  // Select the specific field object and its precise path from Redux
  // This useSelector will ONLY re-run if the field object (or its path) for THIS ID changes.
  const fieldDataAndPath = useSelector(state => selectFieldByIdAndPath(state, fieldId));
  const item = fieldDataAndPath?.field;
  // const preciseCurrentPath = fieldDataAndPath?.path; // Use this if you need the absolute path from root via ID lookup

  // If field is not found (e.g., deleted by another action before this renders)
  if (!item) {
    return null;
  }

  // Calculate visibility and disabled state for THIS field
  const { dynamic } = item;
  let isVisible = true;
  let isDisabled = false;

  if (dynamic?.visibility) {
    const { modes, conditions } = dynamic.visibility;

    if (modes.length > 0) {
      let conditionMet = false;

      // Check static conditions
      const staticMet = checkStaticConditions(conditions.static, fullFormData);
      if (staticMet) {
        conditionMet = true;
      }

      // Check dynamic conditions if provided
      if (!conditionMet && conditions.dynamic) {
        const dynamicMet = evaluateExpression(conditions.dynamic, fullFormData);
        if (dynamicMet) {
          conditionMet = true;
        }
      }

      if (modes.includes('visible')) {
        isVisible = conditionMet;
      }
      if (modes.includes('disable')) {
        isDisabled = conditionMet;
      }
    }
  }

  // If not visible, return null early
  if (!isVisible) {
    return null;
  }

  // Handle onChange for value updates
  const handleChange = useCallback((newValue) => {
    // Use the currentPath received from Render, which is index-based for formSlice
    // This path is stable for the duration of this wrapper's render cycle.
    onUpdateFieldValue(`${currentPath}.value`, newValue);
  }, [onUpdateFieldValue, currentPath]);

  // If it's a group, render children recursively through the main Render component
  if (item.type === 'group') {
    // This is a special case: group children are rendered by the main Render component.
    // The MemoizedFieldWrapper itself doesn't render the children directly.
    // The group rendering logic is in Render.jsx
    return (
      <>
        {/* Rendered label for field (group type) to show context */}
        <p className="text-sm font-semibold text-gray-800 mb-2">{item.label}</p>
        {/* The children rendering is handled by the Render component higher up */}
        {/* No children rendering here, Render.jsx handles it */}
      </>
    );
  }

  const SpecificFieldComponent = fieldComponentsMap[item.type];

  if (!SpecificFieldComponent) {
    return <div className="text-red-500">Unknown Field Type: {item.type}</div>;
  }

  return (
    <>
      {/* Label always shown here for consistency with the field wrapper */}
      <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
      {/* Render the specific field component, passing only necessary props */}
      <SpecificFieldComponent
        id={item.id}
        name={item.name}
        label={item.label} // Passed for consistent rendering
        type={item.type}
        value={item.value}
        placeholder={item.placeholder}
        options={item.options}
        isDisabled={isDisabled}
        onChange={handleChange} // Pass the stable callback
        field={item} // For ApiRender, it needs the whole field object for source config
      />
    </>
  );
};

// Memoize FieldWrapper
// It re-renders only if fieldId changes OR fullFormData reference changes (to re-evaluate visibility)
// The fullFormData dependency is still important for visibility/disabled logic.
// However, the *inner* field components will only update their DOM if their *primitive props* change.
const areFieldWrapperPropsEqual = (prevProps, nextProps) => {
  // Only re-render if the field ID changes (field replaced/deleted)
  if (prevProps.fieldId !== nextProps.fieldId) {
    return false;
  }
  // Or if the full form data object reference changes (for visibility re-evaluation)
  // This is the key for triggering dynamic logic checks.
  if (prevProps.fullFormData !== nextProps.fullFormData) {
    return false;
  }
  // Or if the callbacks change (they shouldn't, due to useCallback in Statemanager)
  if (prevProps.onUpdateFieldValue !== nextProps.onUpdateFieldValue ||
      prevProps.onEditField !== nextProps.onEditField ||
      prevProps.currentPath !== nextProps.currentPath) {
    return false;
  }
  return true; // Otherwise, stay memoized
};

export default memo(FieldWrapper, areFieldWrapperPropsEqual);