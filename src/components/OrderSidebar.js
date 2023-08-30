import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlbumsInCart } from '../redux/selectors'; //return albums from the state
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/shoppingCart';

import axios from 'axios';

const OrderSidebar = () => {
  //path to env variable
  const envPath = process.env.REACT_APP_API_BASE_PATH;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // values come from Redux store
  const albumsInCart = useSelector(selectAlbumsInCart);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const tax = useSelector((state) => state.cart.tax);
  const total = useSelector((state) => state.cart.totalAmount);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${envPath}/orders`);
      const clientSecret = response.data.clientSecret;
      //clear the cart
      dispatch(clearCart());
      //navigate to checkout page
      navigate('/checkout', { state: { clientSecret } });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <Drawer anchor="right" open={true}>
      <List>
        <ListItem>
          <ListItemText primary="Order Summary" />
        </ListItem>
        {albumsInCart.map((item) => (
          <ListItem key={item.albumId}>
            <ListItemText
              primary={item.albumName}
              secondary={`Artist: ${item.artistName}, Price: $${item.price}`}
            />
            <ListItemText primary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary={`Subtotal: $${subtotal}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Tax: $${tax * 100}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Total: $${total}`} />
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default OrderSidebar;
