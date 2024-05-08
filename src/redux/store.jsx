/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import libraryReducer from './reducers/libraryReducer';
import rentalReducer from './reducers/rentalReducer';
import feedbackReducer from './reducers/feedbackReducer';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
    rental: rentalReducer,
    feedback: feedbackReducer  
  }
});

export default store;


