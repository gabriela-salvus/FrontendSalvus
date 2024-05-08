/* eslint-disable */
const initialState = {
    currentPage: 'home' // Página inicial
  };
  
  const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NAVIGATE_TO_LOGIN_PAGE':
        return {
          ...state,
          currentPage: 'login'
        };
      case 'NAVIGATE_TO_SIGNUP_PAGE':
        return {
          ...state,
          currentPage: 'cadastro'
        };
      case 'USER_LOGIN_SUCCESS':
        return {
          ...state,
          currentPage: 'biblioteca'
        };
    case 'USER_SIGNUP_SUCCESS': 
    return {
        ...state,
        currentPage: 'login'
      }; 
      default:
        return state;
    }
  };
  
  export default navigationReducer;