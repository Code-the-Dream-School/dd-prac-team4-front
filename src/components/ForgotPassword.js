import React, { useState } from 'react';
import axiosInstance from '../apis/axiosClient';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Send a POST request to the backend to request a password reset email
      await axiosInstance.post('/api/v1/auth/forgot_password', { email });
      setMessage('An email will be sent to your address.'); // Show success message
      setError(''); // Clear any previous error message
    } catch (error) {
      setError('An error occurred. Please try again.'); // Show error message
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Reset Email</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
