import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './UserProfile.module.css';

function Profile() {
  const navigate = useNavigate();

  // Mock user data
  const mockUserData = {
    1: {
      name: 'John Smith',
      username: 'john123',
      email: 'john@example.com',
      bio: 'The song I am loving this week is Munekita.',
      avatar: 'https://via.placeholder.com/150',
    },
  };

  const [user, setUser] = useState(mockUserData[1]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={classes.profilePage}>
      <Card className={classes.profileCard}>
        <CardHeader
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          }}
          avatar={<Avatar src={user.avatar} />}
          title={user.name}
          subheader={`@${user.username}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.bio}
          </Typography>
          <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
