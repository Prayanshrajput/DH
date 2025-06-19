// import React from 'react';

// // let steps= {
// //   root: [ 'A', 'B', 'C' ],
// //   'A-Children-A1': [],
// //   'A-Children-A2': [],
// //   'A-Children-A3': [],
// //   'B-Children-B1': [],
// //   'B-Children-B2': [],
// //   'B-Children-B3': [],
// //   'C-Children-C1': [],
// //   'C-Children-C2': [],
// //   'C-Children-C3': []
// // }
// // let blocks={
// //   A: {
// //     placeholder: 'Enter Your name',
// //     require: true,
// //     value: 'prayansh',
// //     key: 'name',
// //     children: [ [Object] ]
// //   },
// //   'A-Children-A1': { name: 'option1' },
// //   'A-Children-A2': { name: 'option2' },
// //   'A-Children-A3': { name: 'option3' },
// //   B: {
// //     placeholder: 'Enter Your age',
// //     require: true,
// //     code: [],
// //     value: '21',
// //     key: 'age',
// //     children: [ [Object] ]
// //   },
// //   'B-Children-B1': { name: '18' },
// //   'B-Children-B2': { name: '19' },
// //   'B-Children-B3': { name: '20' },
// //   C: {
// //     placeholder: 'Enter Your Skills',
// //     require: true,
// //     code: [],
// //     value: 'Enter kar bhai',
// //     key: 'skills',
// //     children: [ [Object] ]
// //   },
// //   'C-Children-C1': { name: 'java' },
// //   'C-Children-C2': { name: 'javascript' },
// //   'C-Children-C3': { name: 'typescript' }
// // }

// // const StepRenderer = () => {
// //   const SEPARATOR = '-Children-'; // adjust if you're using another symbol

// //   return (
// //     <div>
// //       {steps.root.map((stepKey) => {
// //         const block = blocks[stepKey];

// //         return (
// //           <div key={stepKey} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
// //             <h3>{block.placeholder}</h3>
// //             <p><strong>Value:</strong> {block.value}</p>

// //             {/* Render Children */}
// //             {Object.keys(steps)
// //               .filter((key) => key.startsWith(`${stepKey}${SEPARATOR}`))
// //               .map((childKey) => (
// //                 <div key={childKey} style={{ paddingLeft: '20px', marginTop: '5px' }}>
// //                   ➤ {blocks[childKey]?.name}
// //                 </div>
// //               ))}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default StepRenderer;


// import React, { useState } from 'react';

// const StepRenderer = () => {
//   const SEPARATOR = '-Children-';

//   // Initial data
//   const initialSteps = {
//     root: ['A', 'B', 'C'],
//     'A-Children-A1': [],
//     'A-Children-A2': [],
//     'A-Children-A3': [],
//     'B-Children-B1': [],
//     'B-Children-B2': [],
//     'B-Children-B3': [],
//     'C-Children-C1': [],
//     'C-Children-C2': [],
//     'C-Children-C3': [],
//   };

//   const initialBlocks = {
//     A: {
//       placeholder: 'Enter Your name',
//       require: true,
//       value: 'prayansh',
//       key: 'name',
//       children: [],
//     },
//     'A-Children-A1': { name: 'option1' },
//     'A-Children-A2': { name: 'option2' },
//     'A-Children-A3': { name: 'option3' },
//     B: {
//       placeholder: 'Enter Your age',
//       require: true,
//       code: [],
//       value: '21',
//       key: 'age',
//       children: [],
//     },
//     'B-Children-B1': { name: '18' },
//     'B-Children-B2': { name: '19' },
//     'B-Children-B3': { name: '20' },
//     C: {
//       placeholder: 'Enter Your Skills',
//       require: true,
//       code: [],
//       value: 'Enter kar bhai',
//       key: 'skills',
//       children: [],
//     },
//     'C-Children-C1': { name: 'java' },
//     'C-Children-C2': { name: 'javascript' },
//     'C-Children-C3': { name: 'typescript' },
//   };

//   const [steps, setSteps] = useState(initialSteps);
//   const [blocks, setBlocks] = useState(initialBlocks);

//   // Handle updates to value or name
//   const handleChange = (key, field, newValue) => {
//     setBlocks((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         [field]: newValue,
//       },
//     }));
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h2>Dynamic Step Editor</h2>

//       {steps.root.map((stepKey) => {
//         const block = blocks[stepKey];

//         return (
//           <div
//             key={stepKey}
//             style={{
//               marginBottom: '25px',
//               padding: '15px',
//               border: '1px solid #aaa',
//               borderRadius: '8px',
//               background: '#f9f9f9',
//             }}
//           >
//             <h3>{block.placeholder}</h3>
//             <label>
//               <strong>{block.key}: </strong>
//               <input
//                 type="text"
//                 value={block.value}
//                 onChange={(e) => handleChange(stepKey, 'value', e.target.value)}
//                 style={{ marginLeft: '10px', padding: '4px' }}
//               />
//             </label>

//             <div style={{ marginTop: '10px', fontSize: '14px' }}>
//               <strong>Options:</strong>
//               {Object.keys(steps)
//                 .filter((childKey) => childKey.startsWith(`${stepKey}${SEPARATOR}`))
//                 .map((childKey) => (
//                   <div key={childKey} style={{ paddingLeft: '20px', marginTop: '5px' }}>
//                     <input
//                       type="text"
//                       value={blocks[childKey]?.name}
//                       onChange={(e) => handleChange(childKey, 'name', e.target.value)}
//                       style={{ marginRight: '8px', padding: '4px' }}
//                     />
//                     <span style={{ color: '#555' }}>({childKey})</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StepRenderer;
