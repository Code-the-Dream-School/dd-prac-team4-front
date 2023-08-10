import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  profilePage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  profileCard: {
    maxWidth: 400,
    width: '100%',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  logoutButton: {
    marginTop: theme.spacing(2),
  },
}));

function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Mock user data
  const mockUserData = {
    1: {
      name: 'John Smith',
      username: 'john123',
      email: 'john@example.com',
      bio: 'The song I am loveing this week is Munekita.',
      avatar: 'https://via.placeholder.com/150',
    },
  };

  const [user, setUser] = useState(mockUserData[userId]);

  useEffect(() => {
    setUser(mockUserData[userId]);
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={classes.profilePage}>
      <Card className={classes.profileCard}>
        <CardHeader
          className={classes.cardHeader}
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
            className={classes.logoutButton}
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
