// In your ForgotPassword.js file
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import "./ForgotPassword.scss";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(''); // Add a state variable for success message


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await newRequest.post('/auth/reset-password', { email });
      // Display a success message to the user or redirect to a confirmation page
      if(response.status == 200){
      setSuccessMessage('Password reset email sent. Please check your inbox.'); // Set the success message
      setLoading(false);
      }
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      {successMessage && <p className="success">{successMessage}</p>} {/* Display the success message */}
      <form onSubmit={handleForgotPassword}> {/* Changed here */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending Email...' : 'Reset Password'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
