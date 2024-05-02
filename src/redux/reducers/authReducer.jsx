/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  currentPage: 'login'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoginSuccess(state) {
      state.isAuthenticated = true;
      state.currentPage = 'biblioteca';
    },
    userSignupSuccess(state) {
      state.isAuthenticated = true;
      state.currentPage = 'biblioteca';
    }
  }
});

export const { userLoginSuccess, userSignupSuccess } = authSlice.actions;
export default authSlice.reducer;

  
  