/* eslint-disable */
import axios from 'axios';
import { USER_SIGNUP_SUCCESS } from '../actions/USER_SIGNUP_SUCCESS';

const userSignup = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/usuarios', { name, email, password });
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
    }
  };
};

export { userSignup };

