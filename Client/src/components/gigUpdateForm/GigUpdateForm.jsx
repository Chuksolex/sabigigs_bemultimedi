// import React, { useState } from "react";

// const GigUpdateForm = ({ initialValues, onSubmit }) => {
//     const [state, setState] = useState(initialValues);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setState((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit(state);
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={state.title}
//           onChange={handleChange}
//         />
  
//         <label htmlFor="badge">Badge</label>
//         <input
//           type="text"
//           id="badge"
//           name="badge"
//           value={state.badge}
//           onChange={handleChange}
//         />
  
//         <label htmlFor="discount">Discount</label>
//         <input
//           type="number"
//           id="discount"
//           name="discount"
//           value={state.discount}
//           onChange={handleChange}
//         />
  
//         <label htmlFor="topRated">Top Rated</label>
//         <input
//           type="checkbox"
//           id="topRated"
//           name="topRated"
//           checked={state.topRated}
//           onChange={handleChange}
//         />
  
//         {/* Add any additional fields required for gig update */}
  
//         <button type="submit">Update Gig</button>
//       </form>
//     );
//   };
  
// export default GigUpdateForm;
