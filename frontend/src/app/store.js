import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
   auth : authReducer
  },
});
//We bring the reducer from the slice and add it to our store