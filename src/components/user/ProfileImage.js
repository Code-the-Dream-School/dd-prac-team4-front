import React from 'react';
import { Avatar } from '@mui/material';

const ProfileImage = ({ user }) => {
  if (user && user.profileImage && user.profileImage.url) {
    return (
      <Avatar
        src={user.profileImage.url + `?cachebust=${Math.random()}`}
        alt={user.profileImage.altText || 'user profile image'}
        className="img-fluid rounded-circle"
        sx={{
          width: '100px',
          height: '100px',
          maxWidth: '100px',
          maxHeight: '100px',
        }}
      />
    );
  }
  return null;
};

export default ProfileImage;
