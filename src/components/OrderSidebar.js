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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function to round number to 2 decimal digits
  const roundedNumber = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
  // values come from Redux store
  const itemsInCart = useSelector((state) => state.cart);
  const subtotal = roundedNumber(useSelector((state) => state.cart.subtotal)); //total price of all items
  const tax = useSelector((state) => state.cart.tax);
  const total = roundedNumber(useSelector((state) => state.cart.totalAmount)); //total amount after tax

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
            <React.Fragment key={item.album.id}>
              <ListItem>
                <ListItemText
                  primary={item.album.albumName}
                  secondary={`Artist: ${item.album.artistName}, Price: $${item.album.price}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Quantity: ${item.quantity}`} />
              </ListItem>
            </React.Fragment>
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
            // display the $ amount of tax instead of %
            primary={`Tax: ${(tax * subtotal).toLocaleString('en-US', {
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
