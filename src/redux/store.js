import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCart';

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});