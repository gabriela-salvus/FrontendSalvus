/* eslint-disable */
const USER_LOGIN = 'USER_LOGIN';


const userLogin = (email, password) => {
    return {
      type: USER_LOGIN,
      email: email,
      password: password
    };
  };
  