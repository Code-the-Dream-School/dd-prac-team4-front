import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/shoppingCart';

const OrderSidebar = () => {
  //path to env variable
  const envPath = process.env.REACT_APP_API_BASE_PATH;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // values come from Redux store
  const itemsInCart = useSelector((state) => state.cart);
  const subtotal = useSelector((state) => state.cart.subtotal); //total price of all items
  const tax = useSelector((state) => state.cart.tax);
  const total = useSelector((state) => state.cart.totalAmount); //total amount after tax

  const handleCheckout = () => {
    // Create the order data object
    const orderData = {
      orderItems: Object.values(itemsInCart.items).map((item) => ({
        album: item.album.id,
        quantity: item.quantity,
      })),
      subtotal,
      tax,
      total,
    };
    //clear the cart
    dispatch(clearCart());
    //navigate to checkout page and send order data as state
    navigate('/checkout', { state: { orderData } });
  };

  return (
    <Box
      sx={{
        width: 300,
        border: '1px solid grey',
        padding: 2,
      }}
    >
      <List>
        <Typography variant="h6">Order Summery</Typography>
        {Object.values(itemsInCart.items).map((item) => {
          return (
            <>
              <ListItem key={item.album.id}>
                <ListItemText
                  primary={item.album.albumName}
                  secondary={`Artist: ${item.album.artistName}, Price: $${item.album.price}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Quantity: ${item.quantity}`} />
              </ListItem>
            </>
          );
        })}
        <ListItem>
          <ListItemText
            primary={`Subtotal: ${subtotal.toLocaleString('en-US', {
              //display the amount as string with $
              style: 'currency',
              currency: 'USD',
            })}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Tax: ${tax.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Total: ${total.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`}
          />
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default OrderSidebar;
