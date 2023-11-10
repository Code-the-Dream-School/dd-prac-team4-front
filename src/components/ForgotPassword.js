import React, { useState } from 'react';
import axiosInstance from '../apis/axiosClient';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('auth/forgot_password', { email });
      setMessage('An email will be sent to your address.');
      setError('');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Forgot your Password</h2>
      <p>
        Please enter your email below and will send you a reset password email
      </p>
      <input
        type="email"
        placeholder="johnDoe@example.com"
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
