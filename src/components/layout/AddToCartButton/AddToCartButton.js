import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, reduceItem } from '../../../redux/shoppingCart';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const AddToCartButton = ({ album }) => {
  const dispatch = useDispatch();
  const { status } = useAuth();
  const navigate = useNavigate();
  const isUserLoggedIn = status === AuthStatus.LoggedIn;
  const itemsInCart = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      navigate('/signIn');
      return;
    }

    if (itemsInCart[album.id]) {
      // Album is already in the cart, so remove it
      dispatch(reduceItem({ album: album, quantity: 1 }));
    } else {
      // Album is not in the cart, so add it
      dispatch(addItem({ album: album, quantity: 1 }));
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className="buy-button"
      aria-label={itemsInCart[album.id] ? 'Remove from cart' : 'Add to Cart'}
      onClick={handleAddToCart}
    >
      {itemsInCart[album.id] ? 'Remove from Cart' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;
