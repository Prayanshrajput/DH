// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/formSlice'; // Import the reducer we just created

export const store = configureStore({ // <-- Ensure 'export const store'
  reducer: {
    form: formReducer,
  },
});