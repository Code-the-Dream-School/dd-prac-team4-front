import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from '../../../apis/axiosClient'; // axios instance
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';

const wishlistEndpoint = '/wishlist';

const AddToWishlistButton = ({ album, wishListId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { status } = useAuth();
  const navigate = useNavigate();
  const isUserLoggedIn = status === AuthStatus.LoggedIn;

  useEffect(() => {
    const storedAddedStatus =
      JSON.parse(localStorage.getItem(`wishListAlbums-${album._id}`)) || false;
    setIsAdded(storedAddedStatus);
  }, [album._id]);

  const addToWishlist = async () => {
    try {
      await axiosInstance.patch(
        `${wishlistEndpoint}/${wishListId}/add_album/${album._id}`
      );
      localStorage.setItem(`wishListAlbums-${album._id}`, JSON.stringify(true));
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
      localStorage.setItem(
        `wishListAlbums-${album._id}`,
        JSON.stringify(false)
      );
      setIsAdded(false);
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
      {isAdded ? (
        <Button
          variant="contained"
          color="secondary"
          className="wishlist-button"
          aria-label="Remove from Wishlist"
          onClick={handleRemoveFromWishlist}
        >
          Remove from Wishlist
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          className="wishlist-button"
          aria-label="Add to Wishlist"
          onClick={handleaddToWishlist}
        >
          Add to Wishlist
        </Button>
      )}
    </>
  );
};

export default AddToWishlistButton;
