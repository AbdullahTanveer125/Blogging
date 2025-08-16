import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slices/userSlice'; // or adjust path

export const store = configureStore({
  reducer: {
    user: userReducer,// global state.user
  },
});
