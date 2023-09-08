import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Table,
  TableRow,
  TableCell,
  getImageListItemBarUtilityClass,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { getUserProfile } from './api';
import { Avatar } from '@mui/material';
import axios from 'axios';

export default function PersonalProfile() {
  const navigate = useNavigate();
  const { user, status } = useAuth();
  const [userData, setUserData] = useState(null); 
  const [showCreditCardInfo, setShowCreditCardInfo] = useState(false);

  
  const handleSeeMoreClick = () => {
    setShowCreditCardInfo(!showCreditCardInfo);
  };

  useEffect(() => {
    if (status === AuthStatus.LoggedIn) {

      axios.get('http://localhost:8000/api/v1/user') 
      .then((response) => {
          setUserData(response.data); // Update user data in state
        })
        .catch((error) => {
          // Handle errors, e.g., display an error message
          console.error('Error fetching user data:', error);
        });
    }
  }, 
  [status]);


  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <Avatar
            src={
              userData?.profileImage?.url ||
              'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
            }
            alt="user profile"
            className="img-fluid rounded-circle"
            sx={{
              width: '200px',
              height: '200px',
              maxWidth: '200px',
              maxHeight: '200px',
            }}
          />
        </div>
        <Table responsive striped hover className="text-center mt-5">
        <tbody>
  <TableRow>
    <TableCell>USERNAME</TableCell>
    <TableCell>{userData?.name}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>NAME</TableCell>
    <TableCell>{userData?.name}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>EMAIL</TableCell>
    <TableCell>{userData?.email}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell>Password</TableCell>
    <TableCell>{userData?.password}</TableCell>
  </TableRow>
  {showCreditCardInfo && (
    <>
      <TableRow>
        <TableCell>Credit Card Number</TableCell>
        <TableCell>{userData?.creditCard?.cardNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Expiration</TableCell>
        <TableCell>{userData?.creditCard?.expiration}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>CVV</TableCell>
        <TableCell>{userData?.creditCard?.cvv}</TableCell>
      </TableRow>
    </>
  )}
</tbody>
        </Table>
        {/* Add "See More" button */}
        <Button onClick={handleSeeMoreClick} color="primary">
          {showCreditCardInfo ? 'Hide Credit Card Info' : 'See More'}
      
          </Button>
      </CardContent>
    </Card>
  );
}








 {/* {userData?.id === user?.id && (
        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */}