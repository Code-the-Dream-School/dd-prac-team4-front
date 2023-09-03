import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCart';

const store = configureStore({
  reducer: {
    cart: shoppingCartReducer,
    // ...other reducers
  },
});

export default store;
