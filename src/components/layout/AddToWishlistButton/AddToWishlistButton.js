import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';

const AddToWishlistButton = ({ album }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { status } = useAuth();
  const navigate = useNavigate();
  const isUserLoggedIn = status === AuthStatus.LoggedIn;

  const fetchOrCreateWishlist = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/wishlist',
        { albumId: album._id },
        {
          withCredentials: true,
        }
      );
      return response.data.wishlist._id; // Return the wishlist ID
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  useEffect(() => {
    const storedAddedStatus =
      JSON.parse(localStorage.getItem(`addedStatus-${album._id}`)) || false;
    setIsAdded(storedAddedStatus);
  }, [album._id]);

  const addToWishlist = async () => {
    const wishlistId = await fetchOrCreateWishlist(); // Fetch the wishlist ID
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/wishlist/${wishlistId}/add_album/${album._id}`,
        null,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem(`addedStatus-${album._id}`, JSON.stringify(true));
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding album to wishlist:', error);
    }
  };

  const removeFromWishlist = async () => {
    const wishlistId = await fetchOrCreateWishlist(); // Fetch the wishlist ID
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/wishlist/${wishlistId}/remove_album/${album._id}`,
        null,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem(`addedStatus-${album._id}`, JSON.stringify(false));
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
