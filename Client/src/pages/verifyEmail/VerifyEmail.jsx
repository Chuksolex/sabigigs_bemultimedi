import { useEffect, useState } from "react";
import {  useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./VerifyEmail.scss";
import { useQuery } from "@tanstack/react-query";


const VerifyEmail = () => {
    
    
  
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [err, setErr] =useState(false);
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  //const emailToken = searchParams;
  const search = new URLSearchParams(window.location.search);
const emailToken = search.get("emailToken");
  //const params = useParams()
  //console.log("emailToken", emailToken);




  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await newRequest.patch(`/auth/verify-email?emailToken=${emailToken}`);
        console.log(response.data); // Handle the response as needed


        if (response.status === 201|| response.data.isVerified === true) {
          // Redirect to the email verification page
          setVerificationStatus("Verified. You can login now!")
          navigate("/login", {replace: true});
        } else{
          setVerificationStatus("Something went wrong! Try again.")
        }
        
       
      
        
      } catch (error) {
        console.log(error);
        setErr(error.message);

        
      }
    };

    if (emailToken) {
      verifyEmail();

     

    
      
    } 
  }, [emailToken]);

 

  return (
    <div className="verifypage-container">
      <h1>Email Verification</h1>
      
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;


