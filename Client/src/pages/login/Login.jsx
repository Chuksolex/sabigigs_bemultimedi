import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import {useNavigate} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
    
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {email, password}
        const res = await newRequest.post("/auth/login", {email, password });
   
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        if (currentUser.isEmailVerified === true) {
          if (requestedPage) {
            navigate(requestedPage);
          } else {
            navigate('/');
          }
        } else {
          navigate('/verify-email');       }
      
        // Rest of your component code
      

      } catch (err) {
      setError(err.respond.data);
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
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}
export default Login;