import React, { useEffect, useState } from 'react';
import { Card, CardContent, Table, TableRow, TableCell, TextField, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import axiosInstance from '../../apis/axiosClient';

export default function PersonalProfile() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessagePassword, setSuccessMessagePassword] = useState('');

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('/users/showMe');
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching current user', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      // Check if either name or email is empty
      setErrors({
        name: !formData.name ? "Name is required" : "",
        email: !formData.email ? "Email is required" : "",
      });
    } else {
      try {
        // Call the backend API to update the user's name and email
        const response = await axiosInstance.patch('/users/updateCurrentUser', {
          name: formData.name,
          email: formData.email,
        });
        // Handle success (e.g., show a success message)
        console.log('User profile updated:', response.data);
        setErrors({}); // Clear any previous errors
        setSuccessMessage('User profile saved successfully.'); // Set success message
        setFormData({ // Clear the form
          name: '',
          email: '',
          oldPassword: '',
          newPassword: '',
        });
      } catch (error) {
        // Handle errors and update the state with validation errors
        setErrors(error.response.data.errors);
        setSuccessMessage(''); // Clear any previous success message
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.newPassword) {
      // Check if either oldPassword or newPassword is empty
      setErrors({
        oldPassword: !formData.oldPassword ? "Old Password is required" : "",
        newPassword: !formData.newPassword ? "New Password is required" : "",
      });
    } else {
      try {
        // Call the backend API to update the user's password
        const response = await axiosInstance.patch('/users/updateUserPassword', {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
        // Handle success (e.g., show a success message)
        console.log('Password updated:', response.data);
        setSuccessMessagePassword('Password changed successfully.'); // Set success message for password change
        setErrors({}); // Clear any previous errors
        setSuccessMessage(''); // Clear any previous success message for profile update
        setFormData({ // Clear the form
          name: '',
          email: '',
          oldPassword: '',
          newPassword: '',
        });
      } catch (error) {
        // Handle errors and update the state with validation errors
        setErrors(error.response.data.errors);
        setSuccessMessagePassword(''); // Clear any previous success message for password change
      }
    }
  };

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <Avatar
            src={require('../../images/customer.png')}
            alt="user profile"
            className="img-fluid rounded-circle"
            sx={{
              width: '100px',
              height: '100px',
              maxWidth: '100px',
              maxHeight: '100px',
            }}
          />
        </div>
        {successMessage && (
          <div className="text-success">{successMessage}</div>
        )}
        {successMessagePassword && (
          <div className="text-success" >{successMessagePassword}</div>
        )}
        <form onSubmit={handleProfileSubmit}>
          <Table responsive striped hover className="text-center mt-5">
            <tbody>
              <TableRow>
                <TableCell>USERNAME</TableCell>
                <TableCell>{userData?.username || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EMAIL</TableCell>
                <TableCell>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                  />
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
        <form onSubmit={handlePasswordSubmit}>
          <Table responsive striped hover className="text-center mt-5">
            <tbody>
              <TableRow>
                <TableCell>OLD PASSWORD</TableCell>
                <TableCell>
                  <TextField
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    error={errors.oldPassword ? true : false}
                    helperText={errors.oldPassword}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NEW PASSWORD</TableCell>
                <TableCell>
                  <TextField
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    error={errors.newPassword ? true : false}
                    helperText={errors.newPassword}
                  />
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
