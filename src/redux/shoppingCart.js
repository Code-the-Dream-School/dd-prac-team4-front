import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: {},
  subtotal: 0,
  tax: 0.15,
  totalQuantity: 0,
  totalAmount: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialCartState,
  reducers: {
    addItem: (state, action) => {
      const { album, quantity } = action.payload;
      const existingItem = state.items[album.id];

      if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        existingItem.quantity += quantity;
      } else {
        // Otherwise, add a new item
        state.items[album.id] = {
          album,
          quantity,
        };
      }

      // Update the other cart fields
      state.subtotal += album.price * quantity;
      state.totalQuantity += quantity;
      state.totalAmount += album.price * quantity;
    },
    // ... Other reducers ...
  },
});

// Initialize the cart state
const savedCartState = localStorage.getItem('shoppingCartState');
if (savedCartState) {
  // If there is saved state, merge it with the initial state
  const parsedCartState = JSON.parse(savedCartState);
  shoppingCartSlice.actions.addItem({ album: parsedCartState.album, quantity: parsedCartState.quantity });
}

export const { addItem, reduceItem, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;