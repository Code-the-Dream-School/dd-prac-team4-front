import React from 'react';
import { useSelector } from 'react-redux';
import { selectAlbumsInCart } from '../redux/selectors'; //return albums from the state
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const OrderSidebar = () => {
  //path to env variable
  const envPath = process.env.REACT_APP_API_BASE_PATH;
  const navigate = useNavigate();
  const albumsInCart = useSelector(selectAlbumsInCart);

  // Calculate subtotal, tax, and total based on the albumsInCart array
  const subtotal = albumsInCart.reduce(
    (total, album) => total + album.price,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${envPath}/orders`);
      const clientSecret = response.data.clientSecret;
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
          <ListItemText primary={`Subtotal: $${subtotal.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Tax: $${tax.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Total: $${total.toFixed(2)}`} />
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
