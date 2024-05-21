import React from 'react';

const ProfileImage = ({ user }) => {
  if (user && user.profileImage && user.profileImage.url) {
    return (
      <img
        src={user.profileImage.url + `?cachebust=${Math.random()}`}
        alt={user.profileImage.altText || 'user profile image'}
        className="img-fluid rounded-circle"
        style={{
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
