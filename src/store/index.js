import { configureStore } from '@reduxjs/toolkit';
import wishesReducer from './wishesSlice';

export const store = configureStore({
  reducer: {
    wishes: wishesReducer,
  },
});
