import React, { useState, useEffect } from "react";
import upload from "../../utils/upload.js";
import "./Register.scss";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import VerifyEmail from "../verifyEmail/VerifyEmail.jsx";




function Register() {
  const [file, setFile] = useState(null);
  const [error, setError] =useState(null);
  const [loading, setLoading] = useState(false);
  

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
    token: ""
  });

  console.log(user);

  const navigate = useNavigate();


  
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

     
      //navigate("/emailverificationpage");
    } catch (err) {
      console.log(err);
      setError(err.response.data)
      
    }
  };

  useEffect(() => {
    handleSubmit;

    
  }, [])


  return (
    <div className="register">
      <form onSubmit={handleSubmit }>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Phone</label>
          <input
            name="phone"
            type="number"
            placeholder="Phone"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register  {(loading === false)? "" : (loading === true)? handleSubmit: <ReactBootStrap.Spinner animation="border" />}  </button>
        
          {(loading && !error) ?  <ReactBootStrap.Spinner animation="border" /> : error  }       
          
        </div>
      
     
      </form>
    </div>
  );
}

export default Register;
