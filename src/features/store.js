// src/features/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice'; // adjust the path if needed

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
