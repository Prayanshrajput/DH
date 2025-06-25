// import React, { useEffect, useState } from "react";

// const getValueByPath = (obj, path) => {
//   return path.split('.').reduce((acc, key) => acc?.[key], obj);
// };

// const ApiRender = ({ field }) => {
//   const [apiData, setApiData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!field.source?.source) return;

//     try {
//     //   const config = JSON.parse(field.source.source);
//     const config = field.source.source; // ✅ Already a JS object now

//       fetch(config.url, {
//         method: config.method || "GET",
//         headers: config.headers || {},
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (Array.isArray(data)) {
//             setApiData(data);
//           } else {
//             setApiData([data]);
//           }
//         })
//         .catch(err => {
//           console.error("API Error:", err);
//           setError("Failed to fetch");
//         });
//     } catch (e) {
//       setError("Invalid config");
//     }
//   }, [field]);

//   if (error) return <div className="text-red-600">{error}</div>;
//   if (!field.source?.renderFields) return null;

//   return (
//     <div className="mt-4 bg-gray-100 p-3 rounded-md border">
//       <h4 className="text-sm font-semibold mb-2 text-gray-700">API Data</h4>
//       {apiData.map((item, idx) => (
//         <div key={idx} className="mb-2 p-2 border-b last:border-0">
//           {field.source.renderFields.map(({ label, path }) => (
//             <p key={path} className="text-sm">
//               <strong>{label}:</strong> {getValueByPath(item, path)}
//             </p>
//           ))}
//         </div>
        
//       ))}
//     </div>
//   );
// };

// export default ApiRender;

// ApiRender.jsx
import React, { memo, useState, useEffect, useCallback, useMemo, useRef } from 'react';

// --- Start: Embedded Utility Functions and Hooks ---

// getValueByPath Utility: A helper function to safely get a field's value from the flat `fullFormData` array.
const getValueByPath = (formDataArray, name) => {
  if (!formDataArray || !Array.isArray(formDataArray)) {
    console.warn("getValueByPath: formDataArray is not a valid array.");
    return undefined;
  }
  const field = formDataArray.find(f => f.name === name);
  return field ? field.value : undefined;
};

// Mock 'z' object: This object mimics an external environment's API request utility (e.g., Zapier's `z.request`).
// It uses the browser's native `fetch` API to make HTTP requests.
const z = {
  request: async ({ url, method, headers, body }) => {
    try {
      const response = await fetch(url, {
        method: method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        let errorBody = await response.text();
        try {
          errorBody = JSON.parse(errorBody);
        } catch (e) {
          // not a JSON body, keep as plain text
        }
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`);
      }

      const json = await response.json();
      return { json, status: response.status, headers: response.headers };
    } catch (error) {
      console.error("[z.request] Error during API call:", error);
      throw error;
    }
  },
};

// useDynamicVisibility Hook: Evaluates user-provided JavaScript code to control field visibility.
const useDynamicVisibility = (visibilityCode, formData, bundleData, itemId) => {
  const [isVisible, setIsVisible] = useState(true);

  const executeVisibilityCode = useMemo(() => {
    if (!visibilityCode || typeof visibilityCode !== 'string' || visibilityCode.trim() === '') {
      return () => true;
    }
    try {
      const func = new Function('formData', 'bundle', 'z', `return (async () => { ${visibilityCode} })();`);
      return func;
    } catch (error) {
      console.error(`[useDynamicVisibility] Error parsing visibilityCode for item ${itemId}:`, error);
      return () => {
        console.error(`[useDynamicVisibility] Returning false due to parsing error for item ${itemId}.`);
        return false;
      };
    }
  }, [visibilityCode, itemId]);

  useEffect(() => {
    let isMounted = true;

    const evaluate = async () => {
      try {
        const result = await executeVisibilityCode(formData, bundleData, z);
        if (isMounted) {
          setIsVisible(!!result);
        }
      } catch (error) {
        console.error(`[useDynamicVisibility] Error executing visibilityCode for item ${itemId}:`, error);
        if (isMounted) {
          setIsVisible(false);
        }
      }
    };

    evaluate();

    return () => {
      isMounted = false;
    };
  }, [executeVisibilityCode, formData, bundleData, itemId]);

  return isVisible;
};

// useDynamicApiOptions Hook: Fetches options for select/radio/checkbox fields using user-provided API code.
const useDynamicApiOptions = (optionsApiSourceCode, formData, bundleData, optionsMapping, itemId) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);

  const executeOptionsApiSourceCode = useMemo(() => {
    if (!optionsApiSourceCode || typeof optionsApiSourceCode !== 'string' || optionsApiSourceCode.trim() === '') {
      return () => Promise.resolve([]);
    }
    try {
      const func = new Function('formData', 'bundle', 'z', `return (async () => { ${optionsApiSourceCode} })();`);
      return func;
    } catch (parseError) {
      console.error(`[useDynamicApiOptions] Error parsing optionsApiSourceCode for item ${itemId}:`, parseError);
      setError(new Error("Failed to parse options API source code. Check syntax."));
      return () => Promise.resolve([]);
    }
  }, [optionsApiSourceCode, itemId]);

  useEffect(() => {
    let isMounted = true;

    const fetchOptions = async () => {
      setError(null);
      setOptions([]);

      if (!optionsApiSourceCode || typeof optionsApiSourceCode !== 'string' || optionsApiSourceCode.trim() === '') {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const result = await executeOptionsApiSourceCode(formData, bundleData, z);
          if (isMounted) {
            if (Array.isArray(result)) {
              if (optionsMapping && optionsMapping.labelKey && optionsMapping.valueKey) {
                setOptions(result.map(item => ({
                  label: item[optionsMapping.labelKey] !== undefined ? String(item[optionsMapping.labelKey]) : '',
                  value: item[optionsMapping.valueKey] !== undefined ? String(item[optionsMapping.valueKey]) : ''
                })));
              } else {
                setOptions(result);
              }
            } else {
              console.warn(`[useDynamicApiOptions] optionsApiSourceCode for item ${itemId} did not return an array. Result:`, result);
              setOptions([]);
            }
          }
        } catch (execError) {
          console.error(`[useDynamicApiOptions] Error executing optionsApiSourceCode for item ${itemId}:`, execError);
          if (isMounted) {
            setError(new Error(`Failed to fetch options: ${execError.message || 'Unknown error'}`));
            setOptions([]);
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }, 500);
    };

    fetchOptions();

    return () => {
      isMounted = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [executeOptionsApiSourceCode, formData, bundleData, optionsMapping, optionsApiSourceCode, itemId]);

  return { options, isLoading, error };
};
// --- End: Embedded Utility Functions and Hooks ---


// --- Start: Memoized Form Field Components (Directly embedded as requested) ---
// These are simple, presentational React components for various HTML form input types.

const InputField = memo(({ item, value, onChange, disabled }) => {
  return (
    <div className="flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {item.label}
      </label>
      <input
        type={item.type || 'text'}
        id={item.id}
        name={item.name}
        value={value}
        onChange={onChange}
        placeholder={item.placeholder}
        disabled={disabled}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-75"
      />
      {item.description && (
        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
      )}
    </div>
  );
});


const TextareaField = memo(({ item, value, onChange, disabled }) => {
  return (
    <div className="flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {item.label}
      </label>
      <textarea
        id={item.id}
        name={item.name}
        value={value}
        onChange={onChange}
        placeholder={item.placeholder}
        disabled={disabled}
        rows="3"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-75"
      ></textarea>
      {item.description && (
        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
      )}
    </div>
  );
});


const RadioField = memo(({ item, value, onChange, disabled, options }) => {
  return (
    <div className="flex-grow">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {item.label}
      </label>
      <div className="mt-1 space-y-2">
        {(options || []).map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${item.id}-${option.value}`}
              name={item.name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor={`${item.id}-${option.value}`} className="ml-3 block text-sm text-gray-900 cursor-pointer disabled:opacity-50">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {item.description && (
        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
      )}
    </div>
  );
});


const CheckboxField = memo(({ item, value, onChange, disabled }) => {
  // This CheckboxField is designed for a single boolean checkbox.
  return (
    <div className="flex-grow">
      <div className="flex items-center">
        <input
          id={item.id}
          name={item.name}
          type="checkbox"
          checked={!!value}
          onChange={onChange}
          disabled={disabled}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label htmlFor={item.id} className="ml-3 block text-sm text-gray-900 cursor-pointer disabled:opacity-50">
          {item.label}
        </label>
      </div>
      {item.description && (
        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
      )}
    </div>
  );
});


const SelectField = memo(({ item, value, onChange, disabled, options, error }) => {
  const hasOptions = options && options.length > 0;

  return (
    <div className="flex-grow">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
        {item.label}
      </label>
      <select
        id={item.id}
        name={item.name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:opacity-75"
      >
        <option value="">{item.placeholder || "Select an option"}</option>
        {disabled && !hasOptions && !error && (
            <option value="" disabled>Loading...</option>
        )}
        {hasOptions && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
         {!disabled && !hasOptions && !error && (
             <option value="" disabled>No options found</option>
         )}
      </select>
      {item.description && (
        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
      )}
      {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});
// --- End: Memoized Form Field Components ---


// ApiRender Component: The main component responsible for rendering an individual field.
const ApiRender = memo(({ item, fullFormData, bundleData, onChange }) => {
  // Determine field visibility based on user-provided JS code and current form/bundle data.
  const isVisible = useDynamicVisibility(item.dynamic?.visibilityCode, fullFormData, bundleData, item.id);
  const visibilityMode = item.dynamic?.visibilityMode || 'show';

  const shouldRender = visibilityMode === 'show' ? isVisible : !isVisible;

  if (!shouldRender) {
    return null;
  }

  // Use the dynamic options hook if the field type supports options and has a dynamic source code.
  const { options, isLoading, error: apiError } = (item.type === 'select' || item.type === 'radio' || item.type === 'checkbox') && item.dynamic && item.dynamic.optionsApiSourceCode
    ? useDynamicApiOptions(
        item.dynamic.optionsApiSourceCode,
        fullFormData,
        bundleData,
        item.dynamic.optionsMapping,
        item.id
      )
    : { options: item.options || [], isLoading: false, error: null };

  // Get the current value of this specific field from the flat `fullFormData` array.
  const fieldValue = getValueByPath(fullFormData, item.name) || '';

  // Memoized callback function for handling changes from the individual field components.
  const handleFieldChange = useCallback((e) => {
    let value;
    if (e && e.target) {
      value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    } else {
      value = e;
    }
    onChange(item, value);
  }, [onChange, item]);

  // Determine if the field should be disabled.
  const isDisabledField = isLoading;

  // Render the appropriate memoized field component based on the field's `type`.
  switch (item.type) {
    case "text":
    case "email":
      return (
        <InputField
          item={item}
          value={fieldValue}
          onChange={handleFieldChange}
          disabled={isDisabledField}
        />
      );
    case "textarea":
      return (
        <TextareaField
          item={item}
          value={fieldValue}
          onChange={handleFieldChange}
          disabled={isDisabledField}
        />
      );
    case "radio":
      return (
        <RadioField
          item={item}
          value={fieldValue}
          onChange={handleFieldChange}
          disabled={isDisabledField}
          options={options}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          item={item}
          value={fieldValue}
          onChange={handleFieldChange}
          disabled={isDisabledField}
          options={options}
        />
      );
    case "select":
      return (
        <SelectField
          item={item}
          value={fieldValue}
          onChange={handleFieldChange}
          disabled={isDisabledField}
          options={options}
          error={apiError?.message}
        />
      );
    case "group":
      console.warn(`[ApiRender] Encountered a 'group' type for direct rendering. ApiRender expects single field items. Item ID: ${item.id}`);
      return (
        <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
          <p className="font-bold">Error: Groups should not be rendered by ApiRender directly.</p>
          <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
        </div>
      );
    default:
      return (
        <div className="flex-grow text-red-600 p-2 border border-red-300 rounded-md bg-red-50">
          <p className="font-bold">Unknown Field Type: {item.type}</p>
          <p className="text-sm">Name: {item.name}, Label: {item.label}</p>
        </div>
      );
  }
});

export default ApiRender;
