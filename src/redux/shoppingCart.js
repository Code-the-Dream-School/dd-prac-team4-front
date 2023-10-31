import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from './../apis/axiosClient';

// Helper function to save cart state to localStorage
const saveCartToLocalStorage = (cartState) => {
  localStorage.setItem('cartState', JSON.stringify(cartState));
};

// Helper function to load cart state from localStorage
const loadCartFromLocalStorage = () => {
  const savedState = localStorage.getItem('cartState');
  return savedState ? JSON.parse(savedState) : undefined;
};

const initialState = loadCartFromLocalStorage() || {
  items: {},
  subtotal: 0,
  tax: 0.15,
  totalQuantity: 0,
  totalAmount: 0,
};

const shoppingCartReducer = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { album, quantity } = action.payload;
      const albumId = album.id;

      if (!state.items[albumId]) {
        state.items[albumId] = { album, quantity: 0 };
      }

      state.items[albumId].quantity += quantity;
      state.totalQuantity += quantity;
      state.subtotal += album.price * quantity;
      state.totalAmount = state.subtotal + state.subtotal * state.tax;

      saveCartToLocalStorage(state);
    },
    reduceItem(state, action) {
      const { album, quantity } = action.payload;
      const albumId = album.id;

      if (state.items[albumId]) {
        const remainingQuantity = Math.max(
          state.items[albumId].quantity - quantity,
          0
        );
        state.totalQuantity -=
          state.items[albumId].quantity - remainingQuantity;
        state.subtotal -=
          album.price * (state.items[albumId].quantity - remainingQuantity);
        state.totalAmount = state.subtotal + state.subtotal * state.tax;
        state.items[albumId].quantity = remainingQuantity;

        if (remainingQuantity === 0) {
          delete state.items[albumId];
        }

        saveCartToLocalStorage(state);
      }
    },
    clearCart(state) {
      state.items = {};
      state.subtotal = 0;
      state.totalQuantity = 0;
      state.totalAmount = 0;

      saveCartToLocalStorage(state);
    },
    addToWishlist(state, action) {
      const { album } = action.payload;
      console.log('Album ID to add to wishlist:', album.id);
      axiosInstance
        .post('/wishlist/', { albumId: album.id })
        .then((response) => {
          console.log('Album added to wishlist:', response.data);
        })
        .catch((error) => {
          console.error('Error adding album to wishlist:', error);
        });
    },
  },
});

export const { addItem, reduceItem, clearCart, addToWishlist } =
  shoppingCartReducer.actions;
export default shoppingCartReducer.reducer;
