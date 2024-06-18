import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Container,
  Avatar,
} from '@mui/material';
import  useCart  from '../redux/customHooks/useCart';

const CartItems = () => {
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
console.log(itemsInCart); //info about the cart array(tax, total..+items (id+album model info)) 


  return (
    <div>
      <Container
        fixed
        sx={{
          width: 500,
          color: 'success.dark',
          border: '1px dashed grey',
        }}
      >
        <Typography variant="h6">Cart Items</Typography>
        <List>
          {Object.values(itemsInCart.items).map((item) => (
            <React.Fragment key={item.album.id}>
              <ListItem>
                <Avatar
                  alt="Album Image"
                  src={item.album.image}
                  style={{ marginRight: '50px' }}
                />
                <ListItemText
                  primary={item.album.albumName}
                  secondary={`Artist: ${item.album.artistName}, Price: $${item.album.price}`}
                />
              </ListItem>
              <div>
                <ListItemText primary={`Quantity: ${item.quantity}`} />
                <Button onClick={() => handleMoveToWishlist(item.album)}>
                  Wishlist
                </Button>
                <Button onClick={() => handleAdd(item.album)}>+</Button>
                <Button onClick={() => handleReduce(item.album)}>-</Button>
                <Button onClick={() => handleRemove(item.album)}>Remove</Button>
              </div>
            </React.Fragment>
          ))}
          <ListItem>
            <ListItemText
              primary={`Subtotal: ${subtotal.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default CartItems;
