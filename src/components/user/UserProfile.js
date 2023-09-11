import React, { useState } from 'react';
import { Card, CardContent, Table, TableRow, TableCell } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { getUserProfile } from './api';
import { Avatar } from '@mui/material';

export default function PersonalProfile() {
  const [userData, _setUserData] = useState({
    name: 'John',
    email: 'john@hotmail.com',
    password: 'hello',
  });

  // useEffect(() => {
  //   getUserProfile()
  //     .then(response => {
  //       setUserData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user profile:', error);
  //     });
  // }, []);

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
          </tbody>
        </Table>
      </CardContent>
      {/* {userData?.id === user?.id && (
        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */}
    </Card>
  );
}
