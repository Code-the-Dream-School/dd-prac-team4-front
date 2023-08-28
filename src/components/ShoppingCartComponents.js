import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/shoppingCart';
//Simple ShoppingCart component for testing purposes
const ShoppingCart = () => {
  const itemsInCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {Object.keys(itemsInCart.items).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {Object.values(itemsInCart.items).map((cartItem) => (
              <li key={cartItem.album.id}>
                {cartItem.album.albumName} - Quantity: {cartItem.quantity}
              </li>
            ))}
          </ul>
          <p>
            Subtotal: {itemsInCart.subtotal}
            <br />
            Total Quantity: {itemsInCart.totalQuantity}
            <br />
            Total Amount: {itemsInCart.totalAmount.toFixed(2)}
          </p>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
