// import React, { useState,useEffect } from 'react';

// const JsonTextEditor = ({data,setData}) => {


//   const [text, setText] = useState(JSON.stringify(data, null, 2));

//   useEffect(() => {
//   setText(JSON.stringify(data, null, 2));
// }, [data]);

//   const handleApply = () => {
//     try {
//       const parsed = JSON.parse(text);
//       console.log(parsed)
//       setData(parsed);
//       alert("✅ JSON updated successfully!");
//     } catch (err) {
//       alert("❌ Invalid JSON: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h3>Editable JSON TextArea</h3>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={20}
//         style={{
//           width: '100%',
//           fontFamily: 'monospace',
//           fontSize: '14px',
//           padding: '10px',
//           borderRadius: '5px'
//         }}
//       />
//       <br />
//       <button onClick={handleApply}>Apply Changes</button>

//     </div>
//   );
// };

// export default JsonTextEditor;

import React, { useState, useEffect } from 'react';

const JsonTextEditor = ({ data, setData }) => {
  const [text, setText] = useState(JSON.stringify(data, null, 2));

  useEffect(() => {
    setText(JSON.stringify(data, null, 2));
  }, [data]);

  const getValueByPath = (obj, path) => {
    const keys = path.split('.');
    let current = obj;
    for (let key of keys) {
      key = isNaN(key) ? key : Number(key);
      if (!current || !(key in current)) return undefined;
      current = current[key];
    }
    return current;
  };

  const checkDependencyViolations = (parsedData) => {
    const violations = [];

    const dfs = (items, parentPath = '') => {
      items.forEach((item, index) => {
        const currentPath = parentPath ? `${parentPath}.${index}` : `${index}`;

        if (item.dependsOn && item.value !== undefined && item.value !== "") {
          const dependencyValue = getValueByPath(parsedData, item.dependsOn.path);
          if (!dependencyValue) {
            violations.push({
              path: currentPath,
              dependsOn: item.dependsOn.path
            });
          }
        }

        if (Array.isArray(item.children)) {
          dfs(item.children, `${currentPath}.children`);
        }
      });
    };

    dfs(parsedData);
    return violations;
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);

      const violations = checkDependencyViolations(parsed);

      if (violations.length > 0) {
        const message = violations
          .map(
            (v) =>
              `❌ You tried to set a value at "${v.path}", but it depends on "${v.dependsOn}" which has no value.`
          )
          .join('\n');
        alert(message);
        return;
      }

      setData(parsed);
      alert("✅ JSON updated successfully!");
    } catch (err) {
      alert("❌ Invalid JSON: " + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Editable JSON TextArea</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={20}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          borderRadius: '5px'
        }}
      />
      <br />
      <button onClick={handleApply}>Apply Changes</button>
    </div>
  );
};

export default JsonTextEditor;
