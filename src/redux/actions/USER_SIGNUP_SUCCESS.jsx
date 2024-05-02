/* eslint-disable */

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const userSignupSuccess = (userData) => {
    return {
      type: USER_SIGNUP_SUCCESS,
      payload: userData
    };
  };