import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import carSlice from './slices/carSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    car: carSlice,
  },
});

export default store;
