import React from 'react';

import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import { useAuth } from '@akosasante/react-auth-context';

export default function PersonalProfile() {
  const { user } = useAuth();

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <ProfileImage user={user} />
        </div>
        <Table className="text-center mt-5">
          <tbody>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>{user?.username || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>{user?.name || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>{user?.email || 'N/A'}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>{user?.password}</TableCell>
            </TableRow> */}
          </tbody>
        </Table>
      </CardContent>
      <Link to="/updateUserInfo">
        {' '}
        {/* Specify the path where you want to redirect */}
        <Button color="success" style={{ backgroundColor: 'lightgrey' }}>
          Update Profile
        </Button>
      </Link>
      {/* {user?.id === user?.id && (

        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */}
      <Link to="/profile/recommendations">
        <Button color="primary" style={{ margin: '10px' }}>
          View Recommendations
        </Button>
      </Link>
    </Card>
  );
}
