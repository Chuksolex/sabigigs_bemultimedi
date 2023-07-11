
// import React, { useState } from "react";
// import "./Seller.scss";
// import newRequest from "../../utils/newRequest.js";
// import { useNavigate } from "react-router-dom";

// function Seller() {

//   const navigate = useNavigate();
//     const [user, setUser] = useState({
      
//       isSeller: false,
//       desc: "",
//     });
// // Later you can try useMutations from Tanstack Query: its used for creating, updating and deleting data: or for server side effects.
//          const handleSeller = (e) => {
//           setUser((prev) => {
//             return {...prev, isSeller: e.target.checked };
//           });

//          };

         

      

//       const handleChange = (e) => {
//         setUser((prev) => {
//           return { ...prev, [e.target.name]: e.target.value };
//         });
//       };


//      const handleSubmit = async (e) => {
//              e.preventDefault();
    
//                 try {
//                  await newRequest.put("/users/:id", {
//                      user
            
//                  });

//                 navigate("/")
//              }   catch (err) {
//              console.log(err);
             
//             }
      
//         } 
// return (
// <div className="seller">
//     <form onSubmit={handleSubmit}>
//         <div className="right">
//           <h1>Become a seller</h1>
//           <div className="toggle">
//             <label htmlFor="">Activate the seller account</label>
//             <label className="switch">
//               <input type="checkbox" name="checked"  onChange={handleSeller} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//           <label htmlFor="">Phone Number</label>
//            <input
//              name="phone"
//             type="text"
//              placeholder="+1 234 567 89"
//              onChange={handleChange}
//            />
//           <label htmlFor="">Description</label>
//           <textarea
//             placeholder="A short description of yourself"
//             name="desc"
//             id=""
//             cols="30"
//             rows="10"
//             onChange={handleChange}
//           ></textarea>
//            <button type="submit">Register Seller</button>
//         </div>
//     </form>
// </div>
// )
// }

// export default Seller;

import React, { useState } from 'react';
 import "./SellerSwitchPage.scss";
 import newRequest from "../../utils/newRequest.js";
  import { useNavigate } from "react-router-dom";

const SellerSwitchPage = () => {
  const [desc, setDesc] = useState('');

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Update the user's isSeller status and store the seller description
    const updatedUserData = {
      isSeller: true,
      desc,
    };

    try {
      // Make an API request to update the user data
      const response = await newRequest.put("/users/:id", updatedUserData);
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }

    // Redirect the user to the desired page
      
      navigate("/")
    // (e.g., their seller dashboard)
    
  };

  return (
    <div className='seller-switch-page'>
      <h2>Switch to Seller</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Brief Description of yourself:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Switch to Seller</button>
      </form>
    </div>
  );
};

export default SellerSwitchPage;





