import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody, // Import TableBody
  TableRow,
  TableCell,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useAuth } from '@akosasante/react-auth-context';

export default function PersonalProfile() {
  // const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [showCreditCardInfo, setShowCreditCardInfo] = useState(false);

  const handleSeeMoreClick = () => {
    setShowCreditCardInfo(!showCreditCardInfo);
  };

  return (
    <Card
      style={{
        marginTop: '2rem',
        border: 'none',
        borderRadius: '0',
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <h3 style={{ textTransform: 'uppercase' }}>My Profile</h3>
        <div style={{ textAlign: 'center' }}>
          <Avatar
            src={
              authUser.user?.profileImage?.url ||
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
        <Table style={{ marginTop: '5rem' }}>
          <TableBody>
            {' '}
            {/* Use TableBody */}
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>{authUser.user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>{authUser.user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>{authUser.user?.email}</TableCell>
            </TableRow>
            {showCreditCardInfo && (
              <>
                <TableRow>
                  <TableCell>Credit Card Number</TableCell>
                  <TableCell>{authUser.user?.creditCard?.cardNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expiration</TableCell>
                  <TableCell>{authUser.user?.creditCard?.expiration}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CVV</TableCell>
                  <TableCell>{authUser.user?.creditCard?.cvv}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        {/* Add "See More" button */}
        <Button onClick={handleSeeMoreClick} color="primary">
          {showCreditCardInfo ? 'Hide Credit Card Info' : 'See More'}
        </Button>
      </CardContent>
    </Card>
  );
}

// {
/* {userData?.id === user?.id && (
        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */
// }
