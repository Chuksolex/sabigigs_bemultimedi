// In your ResetPassword.js file
import React, { useState } from 'react';
import "./ResetPassword.scss"
import { useParams, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

export default function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await newRequest.patch(`/auth/reset-password/${resetToken}`, {
        password,
      });
      setLoading(false);
      navigate('/login'); // Redirect to the login page after password reset
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}


