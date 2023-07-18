import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import {useNavigate, Link} from 'react-router-dom';
import Checkinbox from "../checkInbox/CheckInbox";
import * as ReactBootStrap from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading]= useState(false)

  const navigate = useNavigate();
  
    
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = {email, password}
        const res = await newRequest.post("/auth/login", {email, password });       

        if (res.data.isVerified === true) { 
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          setLoading(false);    
        
            navigate('/');
          }
         else {
          setLoading(false)
          navigate('/checkinbox'); 
              }   
          

      } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} >
        <h1>Sign in</h1>
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="text"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loading ? 'Trying login..' : 'Login'}</button>
        <div>
        <Link to="/forgot-password">Forgot Password?</Link> 
        {error && error}
        </div>
     
      </form>
    </div>
  );
}
export default Login;