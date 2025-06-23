import React, { useEffect, useState } from "react";

const getValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const ApiRender = ({ field }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!field.source?.source) return;

    try {
    //   const config = JSON.parse(field.source.source);
    const config = field.source.source; // ✅ Already a JS object now

      fetch(config.url, {
        method: config.method || "GET",
        headers: config.headers || {},
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setApiData(data);
          } else {
            setApiData([data]);
          }
        })
        .catch(err => {
          console.error("API Error:", err);
          setError("Failed to fetch");
        });
    } catch (e) {
      setError("Invalid config");
    }
  }, [field]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!field.source?.renderFields) return null;

  return (
    <div className="mt-4 bg-gray-100 p-3 rounded-md border">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">API Data</h4>
      {apiData.map((item, idx) => (
        <div key={idx} className="mb-2 p-2 border-b last:border-0">
          {field.source.renderFields.map(({ label, path }) => (
            <p key={path} className="text-sm">
              <strong>{label}:</strong> {getValueByPath(item, path)}
            </p>
          ))}
        </div>
        
      ))}
    </div>
  );
};

export default ApiRender;
