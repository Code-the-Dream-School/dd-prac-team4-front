// ForgotPassword.js
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { resetPassword } from '../apis/authApi'; // Make sure to import your API call function

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await resetPassword({ token, password });

      // Redirect to sign in page on success
      history.push('/signin');
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <label>New Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
