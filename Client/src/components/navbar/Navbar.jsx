import React, {Component, useEffect, useState} from 'react';
import "./Navbar.scss";
import { Link, useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';


const Navbar = () => {
//Here we make the navbar to have some animation effect, color change when scrolled
const [active, setActive] = useState(false);
const isActive = () => { window.scrollY >0 ? setActive(true) : setActive(false)}
const [open, setOpen] = useState(false);

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
}





  return (
    <div className={active || pathname !=="/" ? "navbar active" : "navbar"}>
        <div className='container'>
        <div className='logo'>
           <Link to="/" className='logo-img'> 
         
             <img src= "https://drive.google.com/uc?export=view&id=1jIYDtuhpH5u5IT0sbAHFjCThox27rxjE" alt="" />
             
          </Link> 
          
          
        </div>
       <div className='links'>
               <span className="link">Business Page</span> 
               <span className="link"><Link to="/blog" className='link'>Blog</Link></span>
                <span className="link">Explore</span>
                <span className="link">English </span>
                {/* <span>Become a Seller</span> */}
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
                    <Link to="/login" className="link">Sign in</Link>
                    <Link className="link" to="/register">
                      <button>Join</button>
                    </Link>
                  </>
                )
                }
        </div>
        </div>
            {/* className container ended here. so I can stack this other menu down*/}
            {/* am also going to make this menu disapper when navbar is active */}
       
       { (active || pathname !=="/") && (
       <>
        <hr />
        <div className="menu">
                <nav className="popup-menu">
                  <ul className="menu-items">
                    <li className="menu-item">
                      <Link to="/"  className="menu-link" >Programming & Tech</Link>
                      <ul className="submenu">
                        <li>
                          <Link className='link'>Web Design</Link></li>
                        <li> 
                           <Link className='link'>Web Development</Link></li>
                        <li>  
                        <Link className='link'>Software</Link></li>      
                      </ul>
                    </li>
                    <li className="menu-item">
                      <Link to="/category2" className="menu-link">Digital Marketing</Link>
                      <ul className="submenu">
                        <li>
                          <Link className='link'>Email Marketing</Link></li>
                        <li> 
                           <Link className='link'>SEO Services</Link></li>
                        <li> 
                            <Link className='link'>SOCIAL MEDIA MARKETING</Link></li>                 
                      </ul>
                    </li>
                    <li className="menu-item">
                      <Link to="/category2" className="menu-link">Advertising</Link>
                      
                    </li>
                    <li className="menu-item">
                      <Link to="/category2" className="menu-link">Business</Link>
                    
                    </li>
                    <li className="menu-item">
                      <Link to="/category2" className="menu-link">Writing & Translation</Link>
                      <ul className="submenu"> 
                        <li>   <Link className='link'>Blog Posts & Articles</Link></li>
                        <li>
                         <Link className='link'>Transcription</Link> </li>
                        <li>   <Link className='link'>Translation</Link> </li>
                        <li>
                         <Link className='link'>Technical Writing</Link>  </li>
                        <li>  <Link className='link'>Academic & Research Writing</Link> </li>
                        <li>  
                         <Link className='link'>Ghost-Writing</Link>  </li>             
                      </ul>
                     </li>
                      <li className="menu-item">
                      <Link to="/category2" className="menu-link">Graphics & Design</Link>
                      <ul className="submenu"> 
                        
                          <li>
                            <Link className='link'>Logo & Identity Branding</Link>
                          </li>
                          <li>
                            <Link className='link'>Packaging & Labels</Link> 
                          </li>
                          <li>                           
                             <Link className='link'>Art & Illustration</Link>
                          </li>
                          <li>
                             <Link className='link'>Visual Design</Link> 
                          </li>
                          <li>
                              <Link className='link'>Print Design</Link>   
                          </li>    
                      </ul>
                    </li>
                     <li className="menu-item" >
                      <Link to="/gigs?cat=music, audio & videos" className="menu-link">Music, Audio & Videos</Link>
                      <ul className="submenu"> 
                          <li>
                            <Link className='link'>Voice-over</Link>                            
                          </li>
                          <li>
                              <Link className='link'>Video Editing</Link>                             
                          </li>
                          <li>
                              <Link className='link'>2-D Animations</Link>                             
                          </li>
                          <li>                               
                            <Link className='link'>3-D Animations</Link>                             
                          </li>
                          <li>                          
                             <Link className='link'>Explainer Videos</Link>                                
                          </li>
                          
                      </ul>
                    </li>
                  
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