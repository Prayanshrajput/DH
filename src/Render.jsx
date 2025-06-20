
// Try 
import React from 'react';


const Render = ({ data, onUpdate, path, addfield, deleteField,increase,dicrease }) => {
console.log("render");
  return (
    <ul >
      console.log("render");
      {data.map((item, index) => {
        let currentPath = "";

        // Manage path perents or children
        if (path == "") {
          currentPath = `${index}`;
        } else {
          currentPath = `${path}.${index}`;
        }

       

        return (
          <li key={currentPath}>
            <div style={{ marginBottom: '5px' }}>

              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(`${currentPath}.name`, e.target.value)}
              />
                  {index == data.length - 1 ? (<button onClick={() => { addfield(path) }}>+</button>) : (<></>)}
             
                  <button onClick={() => { deleteField(currentPath) }}>-</button>
                
                  {index!=0?(<button onClick={() => { increase(currentPath) }}><span>↑</span></button>):(<></>)}
               
                  { index<data.length-1 ? (<button onClick={() => { dicrease(currentPath) }}><span>↓</span></button>):(<></>)}

{/* this parts is working conditions */}
                  {(item.children && item.children.length == 0) ?(<button onClick={() => { addfield(`${currentPath}.children`) }}>Add_Children</button>):(<></>)}

                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#555' }}>
                    ({currentPath})
                    </span>
                    
            </div>
            {item.children && item.children.length > 0 && (
              <Render
                data={item.children}
                onUpdate={onUpdate}
                path={`${currentPath}.children`}
                addfield={addfield}
                deleteField={deleteField}
                increase={increase}
                dicrease={dicrease}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Render);