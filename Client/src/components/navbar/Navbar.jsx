import React, {Component, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import CurrencySwitch from '../currencySwitch/currencySwitch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';



const Navbar = () => {
//Here we make the navbar to have some animation effect, color change when scrolled
const [active, setActive] = useState(false);
const isActive = () => { window.scrollY >0 ? setActive(true) : setActive(false)}
const [open, setOpen] = useState(false);
const navigate = useNavigate();
const [input, setInput] = useState("");


const handleSearch= () => {
  if (input.trim() !== "") {
  navigate(`/gigs?search=${input}`);
  setInput("");
}
}


const {pathname} = useLocation();

useEffect(() => {
  window.addEventListener("scroll", isActive)

  return () => {
    window.removeEventListener("scroll", isActive)
  }
}, []);


const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const handleLogout = async () => {
  try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
  } catch (err) {
    console.log(err);
    
  }
};
//const cart = useSelector((state) => state.cartSlice.cart);
const cartCount = useSelector((state) => state.cartSlice.cartCount);

console.log("cart in cartCount:", cartCount);

const encodeCategory = (categoryName) => {
  const encodedCategoryName = encodeURIComponent(categoryName);
  return `/gigs?cat=${encodedCategoryName}`;
};



const categories = [
  {
    name: 'Programming & Tech',
    subcategories: ['Web Design', 'Web Development', 'Software'],
  },
  {
    name: 'Digital Marketing',
    subcategories: ['Email Marketing', 'SEO Services', 'Social Media Marketing'],
  },
  {
    name: 'Advertising',
    subcategories: [],
  },
  {
    name: 'Business',
    subcategories: [],
  },
  {
    name: 'Writing & Translation',
    subcategories: [
      'Blog Posts & Articles',
      'Transcription',
      'Translation',
      'Technical Writing',
      'Academic & Research Writing',
      'Ghost-Writing',
    ],
  },
  {
    name: 'Graphics & Design',
    subcategories: [
      'Logo & Identity Branding',
      'Packaging & Labels',
      'Art & Illustration',
      'Visual Design',
      'Print Design',
    ],
  },
  {
    name: 'Music, Audio & Videos',
    subcategories: [
      'Voice-over',
      'Video Editing',
      '2-D Animations',
      '3-D Animations',
      'Explainer Videos',
    ],
  },
];








  return (
    <div className={active || pathname !=="/" ? "navbar active" : "navbar"}>
        <div className='container'>
        <div className='logo'>
           <Link to="/" className='logo-img'> 
         
             {/* //<img src= "https://drive.google.com/uc?export=view&id=1jIYDtuhpH5u5IT0sbAHFjCThox27rxjE" alt="" /> */}
             <img  src='img/logo_png.png'/>
             
          </Link> 
          
          
        </div>
        <div className="search">
                    <div className="searchInput">
                        <img src= 'img/search.png' alt=''/>
                        <input type="text" placeholder='search any service' onChange={(e) => setInput(e.target.value)}/>
                    </div>
                    <button onClick={handleSearch}>Search</button>

                 </div>
       <div className='links'> 
              
               <span className="link"><Link to="/blog" className='link'>Blog</Link></span>
               <span className="link">
                 <Link to="/mycart" className='link position-relative'>
          
                    <ShoppingCartIcon sx={{ fontSize: 30 }} /> 
                    {cartCount > 0 && ( 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                        {cartCount}
                        <span className="visually-hidden">Checkout</span>
                      </span>
                     )} 
                 
                
                
                 </Link>
               </span>
                <span className="link"><Link to="/gigs" className='link'>Gigs</Link></span>
                           
                {<CurrencySwitch />}
                {/* <span>Become a Seller</span> */}
               
        </div>
        {currentUser ? (
                  <div className='user' onClick={() =>setOpen(!open)}>
                    <img src={currentUser.img || "/img/noavatar.jpg"} alt=''/>
                    <span>{currentUser.userName}</span>
                          {open && <div className="options">
                                 {currentUser.isSeller &&(
                                     <>
                                      <Link className="link" to="/mygigs">My Gigs</Link>
                                       <Link className='link' to="/Add">Add New Gig</Link>
                      
                                     </>
                                    )}
                            <Link className="link" to="/orders">Orders</Link>
                            <Link className="link" to="/Messages">Messages</Link>
                          
                            <Link className="link" onClick={handleLogout}>Logout</Link>
                         </div>
                        }

                  </div>
                 ): (
                  <>
                  <div className='user'>
                     <Link to="/login" className="link"><span>Sign in</span></Link>
                    <Link className="link" to="/register">
                      <button>Join</button>
                    </Link>

                  </div>
                   
                  </>
                )
                }
        </div>
            {/* className container ended here. so I can stack this other menu down*/}
            {/* am also going to make this menu disapper when navbar is active */}
       
       { (active || pathname !=="/") && (
       <>
        <hr />
        <div className="menu">
           <nav className="popup-menu">
              <ul className="menu-items">
            {categories.map((category, index) => (
              <li className="menu-item" key={index}>
                <Link className="link menuLink" to={encodeCategory(category.name)}>
                  {category.name}
                </Link>
               
                <ul className="submenu">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <Link className="link" to={`/gigs?cat=${encodeURIComponent(subcategory)}`}>
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
             </ul>
          </nav>
        </div>

        <hr />
        </>)}

        </div>
        
  )
}

export default Navbar
//Become a seller page should be hidden 



// import { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import { ReactComponent as Hamburger } from '../../public/images/hamburger.png'
// import { ReactComponent as Brand } from '../../public/images/logo_web1.svg'
// import './Navbar.css'

// const Navbar = () => {
//   const [showNavbar, setShowNavbar] = useState(false)

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar)
//   }

//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">
//           <Brand />
//         </div>
//         <div className="menu-icon" onClick={handleShowNavbar}>
//           <Hamburger />
//         </div>
//         <div className={`nav-elements  ${showNavbar && 'active'}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Business Page</NavLink>
//             </li>
//             <li>
//               <NavLink to="/blog">Explore</NavLink>
//             </li>
//             <li>
//               <NavLink to="/projects">English</NavLink>
//             </li>
//             <li>
//               <NavLink to="/about">Sign In</NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact">Join</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar



// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Navbar.scss";

// function Navbar() {
//   const [active, setActive] = useState(false);
//   const [open, setOpen] = useState(false);

//   const { pathname } = useLocation();

//   const isActive = () => {
//     window.scrollY > 0 ? setActive(true) : setActive(false);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isActive);
//     return () => {
//       window.removeEventListener("scroll", isActive);
//     };
//   }, []);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await newRequest.post("/auth/logout");
//       localStorage.setItem("currentUser", null);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
//       <div className="container">
//         <div className="logo">
//           <Link className="link" to="/">
//             <span className="text">fiverr</span>
//           </Link>
//           <span className="dot">.</span>
//         </div>
//         <div className="links">
//           <span>Fiverr Business</span>
//           <span>Explore</span>
//           <span>English</span>
//           {!currentUser?.isSeller && <span>Become a Seller</span>}
//           {currentUser ? (
//             <div className="user" onClick={() => setOpen(!open)}>
//               <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
//               <span>{currentUser?.username}</span>
//               {open && (
//                 <div className="options">
//                   {currentUser.isSeller && (
//                     <>
//                       <Link className="link" to="/mygigs">
//                         Gigs
//                       </Link>
//                       <Link className="link" to="/add">
//                         Add New Gig
//                       </Link>
//                     </>
//                   )}
//                   <Link className="link" to="/orders">
//                     Orders
//                   </Link>
//                   <Link className="link" to="/messages">
//                     Messages
//                   </Link>
//                   <Link className="link" onClick={handleLogout}>
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="link">Sign in</Link>
//               <Link className="link" to="/register">
//                 <button>Join</button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//       {(active || pathname !== "/") && (
//         <>
//           <hr />
//           <div className="menu">
//             <Link className="link menuLink" to="/">
//               Graphics & Design
//             </Link>
//             <Link className="link menuLink" to="/">
//               Video & Animation
//             </Link>
//             <Link className="link menuLink" to="/">
//               Writing & Translation
//             </Link>
//             <Link className="link menuLink" to="/">
//               AI Services
//             </Link>
//             <Link className="link menuLink" to="/">
//               Digital Marketing
//             </Link>
//             <Link className="link menuLink" to="/">
//               Music & Audio
//             </Link>
//             <Link className="link menuLink" to="/">
//               Programming & Tech
//             </Link>
//             <Link className="link menuLink" to="/">
//               Business
//             </Link>
//             <Link className="link menuLink" to="/">
//               Lifestyle
//             </Link>
//           </div>
//           <hr />
//         </>
//       )}
//     </div>
//   );
// }

// export default Navbar;