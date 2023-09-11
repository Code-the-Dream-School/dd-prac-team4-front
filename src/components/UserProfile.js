import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useAuth } from '@akosasante/react-auth-context';
import axios from 'axios';

export default function PersonalProfile() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [showCreditCardInfo, setShowCreditCardInfo] = useState(false);
  const [editedName, setEditedName] = useState(authUser.user?.name || '');
  const [editedEmail, setEditedEmail] = useState(authUser.user?.email || '');
  const [editedCardNumber, setEditedCardNumber] = useState(
    authUser.user?.creditCard?.cardNumber || ''
  );
  const [editedExpiration, setEditedExpiration] = useState(
    authUser.user?.creditCard?.expiration || ''
  );
  const [editedCVV, setEditedCVV] = useState(authUser.user?.creditCard?.cvv || '');

  const handleSeeMoreClick = () => {
    setShowCreditCardInfo(!showCreditCardInfo);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name: editedName,
        email: editedEmail,
        creditCard: {
          cardNumber: editedCardNumber,
          expiration: editedExpiration,
          cvv: editedCVV,
        },
      };

      
      await axios.put('http://your-backend-api-url/update-user', updatedData, {
      });


      // Notify the user that changes were saved
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Card style={{ marginTop: '2rem', border: 'none', borderRadius: '0', boxShadow: 'none' }}>
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
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>
                {authUser.user?.name}
                <Button onClick={() => setEditedName(authUser.user?.name)}>Reset</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>
                {showCreditCardInfo ? (
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  authUser.user?.name
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>
                {showCreditCardInfo ? (
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  authUser.user?.email
                )}
              </TableCell>
            </TableRow>
            {showCreditCardInfo && (
              <>
                <TableRow>
                  <TableCell>Credit Card Number</TableCell>
                  <TableCell>
                    <TextField
                      label="Credit Card"
                      variant="outlined"
                      fullWidth
                      value={editedCardNumber}
                      onChange={(e) => setEditedCardNumber(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expiration</TableCell>
                  <TableCell>
                    <TextField
                      label="Expiration Date"
                      variant="outlined"
                      fullWidth
                      value={editedExpiration}
                      onChange={(e) => setEditedExpiration(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CVV</TableCell>
                  <TableCell>
                    <TextField
                      label="CVV"
                      variant="outlined"
                      fullWidth
                      value={editedCVV}
                      onChange={(e) => setEditedCVV(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <Button onClick={handleSeeMoreClick} color="primary">
          {showCreditCardInfo ? 'Hide Credit Card Info' : 'See More'}
        </Button>
        {showCreditCardInfo && (
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
