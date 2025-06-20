import { useState,useEffect } from 'react'
import Render from './Render'
import JsonTextEditor from './JsonTextEditor';
import Statemanager from './objectway/Statemanager';



let initialData = [
  {
    "id": 1,
    "name": "Level 1",
    "children": [
      {
        "id": 11,
        "name": "Level 11",
        "children": [
          {
            "id": 11,
            "name": "Level 11",
            "children": []
          },
        ]
      },
      {
        "id": 12,
        "name": "Level 12",
        "children": []
      }
    ]
  },
  {
    "id": 2,
    "name": "Level 2",
    "children": [
      {
        "id": 21,
        "name": "Level 21",
        "children": []
      },
      {
        "id": 22,
        "name": "Level 22",
        "children": []
      }
    ]
  }
];





const App = () => {
  const [data, setData] = useState(initialData);


  const [jsonText, setJsonText] = useState(data);
    useEffect(() => {
    setJsonText(JSON.stringify(data, null, 2));
  }, [data]);
  //  When user manually edits JSON
  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setData(parsed); // updates the tree view
    } catch (err) {
      // Optional: show error, or ignore until valid JSON
      console.error('Invalid JSON:', err);
    }
  };


  const increase = (path) => {
  const newData = JSON.parse(JSON.stringify(data));
  const keys = path.split('.');

  let current = newData;
  if(keys.length==1){
    const index = isNaN(keys[0]) ? keys[0] : Number(keys[0]);
     const temp = current[index];
    current[index] = current[index-1];
    current[index-1] = temp;
  }
  else{
    for (let i = 0; i < keys.length - 2; i++) {
    const key = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
    current = current[key];
  }

  const parentKey = isNaN(keys[keys.length - 2]) ? keys[keys.length - 2] : Number(keys[keys.length - 2]);
  const index = Number(keys[keys.length - 1]);

  // parents 
  current=current[parentKey]

  const temp=current[index-1];
  current[index-1]=current[index]
  current[index]=temp
 
  // const temp = current[parentKey][index - 1];
  //   current[parentKey][index - 1] = current[parentKey][index];
  //   current[parentKey][index] = temp;
  }

    setData(newData); 
};

   const dicrease=(path)=>{

     const newData = JSON.parse(JSON.stringify(data));
     const keys = path.split('.');

  let current = newData;
  if(keys.length==1){

      const index = isNaN(keys[0]) ? keys[0] : Number(keys[0]);
      const temp = current[index];
      current[index] = current[index+1];
      current[index+1] = temp;
  
  }
  else{

    for (let i = 0; i < keys.length - 1; i++) {
    const key = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
    current = current[key];
   }

 
   const index = isNaN(keys[keys.length-1]) ? keys[keys.length-1] : Number(keys[keys.length-1]);
      const temp = current[index];
      current[index] = current[index+1];
      current[index+1] = temp;
    console.log(current)
  }

    setData(newData); 
  }

  const addfield = (path) => {
    console.log(path)
    const newData = structuredClone(data);

    // If root level
    if (!path) {
      newData.push({
        id: Math.floor(Math.random() * 100000),
        name: 'New Level',
        children: []
      });
      setData(newData);
      return;
    }

    const keys = path.split('.');
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
      current = current[key];
     
    }

    console.log(current)
    const finalKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);

    if (!Array.isArray(current[finalKey])) {
      current[finalKey] = [];
    }

    current[finalKey].push({
      id: Math.floor(Math.random() * 100000),
      name: 'New Level',
      children: []
    });

    setData(newData);
  };


  const deleteField = (path) => {
    console.log(path)

    const newData = structuredClone(data);
    const keys = path.split('.');

    const lastKey = isNaN(keys[keys.length - 1])
      ? keys[keys.length - 1]
      : Number(keys[keys.length - 1]);

    const parentPath = keys.slice(0, -1);
    let parent = newData;

    for (let i = 0; i < parentPath.length; i++) {
      const key = isNaN(parentPath[i])
        ? parentPath[i]
        : Number(parentPath[i]);
      parent = parent[key];
    }

    if (Array.isArray(parent)) {
      parent.splice(lastKey, 1); // Remove from array
    } else if (typeof parent === 'object' && parent !== null) {
      console.log(parent)
      console.log(parent[lastKey])
      delete parent[lastKey]; // Delete key from object
    }

    setData(newData);
  };

  const updateName = (Path, newValue) => {   // keyToUpdate -> label, key, value, placeholder....
    const newData = JSON.parse(JSON.stringify(data)); // or JSON.parse(JSON.stringify(data))
  
    function setDeep(obj, path, value) {
      const keys = path.split('.');
      // path -> 0.children.1.label
      // value -> rudraksh
      // keys -> [0,children,1,name]
      console.log(keys)
      let current = obj;    // switches between array and object
      for (let i = 0; i < keys.length - 1; i++) {

        const key = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
         // first treverse key = 0
         // second treverse key = children
        current = current[key];
        // first treversse current = 0th index {}
        // 2nd treversse current = children of 0th index {} -> [{},{}]
      }
      current[keys[keys.length - 1]] = value;
    }

    setDeep(newData, Path, newValue)
    console.log(newData);
    setData(newData);
  };



  return (
    // <div >
    //   {/* <Render   data={data} onUpdate={updateName} path={""} addfield={addfield} deleteField={deleteField} increase={increase} dicrease={dicrease} /> */}
    //   {/* <JsonTextEditor data={data} setData={setData}></JsonTextEditor> */}
     
    //   {/* <div>
    //     <h3>Edit JSON</h3>
    //     <textarea
    //       style={{ width: '100%', height: '500px', fontFamily: 'monospace' }}
    //       value={jsonText}
    //       onChange={handleJsonChange}
    //     />
    //   </div> */}

    // </div>
    <Statemanager></Statemanager>
  );
};
export default App



