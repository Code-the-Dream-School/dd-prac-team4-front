import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, reduceItem } from '../../../redux/shoppingCart';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Tooltip from '@mui/material/IconButton';

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
    <IconButton
      color="primary"
      aria-label={itemsInCart[album.id] ? 'Remove from cart' : 'Add to Cart'}
      onClick={handleAddToCart}
    >
      {itemsInCart[album.id] ? (
        <Tooltip title="Remove from cart">
          <RemoveShoppingCartIcon color="primary" />
        </Tooltip>
      ) : (
        <Tooltip title="Add to cart">
          <AddShoppingCartIcon color="primary" />
        </Tooltip>
      )}
    </IconButton>
  );
};

export default AddToCartButton;
