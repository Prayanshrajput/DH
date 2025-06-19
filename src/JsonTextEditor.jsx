import React, { useState,useEffect } from 'react';

const JsonTextEditor = ({data,setData}) => {


  const [text, setText] = useState(JSON.stringify(data, null, 2));

  useEffect(() => {
  setText(JSON.stringify(data, null, 2));
}, [data]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      console.log(parsed)
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
