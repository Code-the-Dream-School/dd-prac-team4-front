import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../apis/axiosClient'; // axios instance
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const AddToWishlistButton = ({ album, wishListId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { status } = useAuth();
  const navigate = useNavigate();
  const isUserLoggedIn = status === AuthStatus.LoggedIn;

  const wishlistEndpoint = '/wishlist';

  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem('wishlistAlbums')) || {};
    const storedAddedStatus = album._id in storedWishlist;
    setIsAdded(storedAddedStatus);
  }, [album._id]);

  const addToWishlist = async () => {
    try {
      await axiosInstance.patch(
        `${wishlistEndpoint}/${wishListId}/add_album/${album._id}`
      );
      //get wishlist albums form local storage object
      const wishlistAlbums = JSON.parse(localStorage.getItem('wishlistAlbums'));
      //add the album id to object
      wishlistAlbums[album._id] = album;
      // re save the object to local storage
      localStorage.setItem('wishlistAlbums', JSON.stringify(wishlistAlbums));
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding album to wishlist:', error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      await axiosInstance.patch(
        `${wishlistEndpoint}/${wishListId}/remove_album/${album._id}`
      );
      //get wishlist albums form local storage object
      const wishlistAlbums = JSON.parse(localStorage.getItem('wishlistAlbums'));
      //remove album id from object
      delete wishlistAlbums[album._id];
      //re save the object to local storage
      localStorage.setItem('wishlistAlbums', JSON.stringify(wishlistAlbums));
      setIsAdded(false);
      // refresh the page so that album no longer display in the page -- only if we're on the wishlist page, not on the album list page
      if (window.location.pathname === '/wishlist') {
        navigate(0);
      }
    } catch (error) {
      console.error('Error removing album from wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = () => {
    if (!isUserLoggedIn) {
      navigate('/signIn');
    } else {
      removeFromWishlist();
    }
  };

  const handleaddToWishlist = () => {
    if (!isUserLoggedIn) {
      navigate('/signIn');
    } else {
      addToWishlist();
    }
  };

  return (
    <>
      <Tooltip title={isAdded ? 'Remove from wishlist' : 'Add to wishlist'}>
        <IconButton
          color="error"
          aria-label={isAdded ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={isAdded ? handleRemoveFromWishlist : handleaddToWishlist}
        >
          {isAdded ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AddToWishlistButton;
