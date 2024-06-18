import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
} from '@mui/material';
import  useCart  from '../redux/customHooks/useCart';


const OrderSidebar = () => {
  const [
    {  itemsInCart, subtotal, tax, total },
    {
      handleMoveToWishlist,
      handleAdd,
      handleReduce,
      handleRemove,
      handleClearCart,
      handleCheckout,
    },
  ] = useCart();
  //console.log(itemsInCart); //info about the cart array(tax, total..+items(id+album model info)) ) 



  return (
    <Box
      sx={{
        width: 300,
        border: '1px dashed #393E46',
        borderRadius: '10px',
        padding: 2,
        backgroundColor: '#12372A',
        color: '#fff',
      }}
    >
      <List>
        <Typography variant="h6">Order Summery</Typography>
        {Object.values(itemsInCart.items).map((item) => {
          return (
            <React.Fragment key={item.album.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <span style={{ color: 'white' }}>
                      {item.album.albumName}
                    </span>
                  }
                  secondary={
                    <span style={{ color: 'white' }}>
                      Artist: {item.album.artistName}, Price: $
                      {item.album.price}
                    </span>
                  }
                />
              </ListItem>

              <div>
                <ListItemText primary={`Quantity: ${item.quantity}`} />
                <Button
                  onClick={() => handleMoveToWishlist(item.album)}
                  style={{ color: '#fff' }}
                >
                  Wishlist
                </Button>
                <Button
                  onClick={() => handleAdd(item.album)}
                  style={{ color: '#fff' }}
                >
                  +
                </Button>
                <Button
                  onClick={() => handleReduce(item.album)}
                  style={{ color: '#fff' }}
                >
                  -
                </Button>
                <Button
                  onClick={() => handleRemove(item.album)}
                  style={{ color: '#fff' }}
                >
                  Remove
                </Button>
              </div>
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
          <Button variant="contained" color="primary" onClick={handleClearCart}>
            Clear Cart
          </Button>
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
