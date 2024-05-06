const initialState = {
    data: [],
    filter: {
      term: "",
      data: [],
    },
  };
  
  const reducerLogin = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_LIST": {
        return {
          ...state,
          data: action.payload, 
          filter: {
            ...state.filter,
            data: action.payload,
          },
        };
      }
  
      case "LOGIN_CREATE": {
        return {
          ...state,
          data: [...state.data, action.payload], 
          filter: {
            ...state.filter,
            data: [...state.data, action.payload], 
          },
        };
      }

      case "LOGIN_DELETE": {
        const deletedLoginId = action.payload;
        const updatedData = state.data.filter((login) => login.id !== deletedLoginId);
        return {
          ...state,
          data: updatedData,
          filter: {
            ...state.filter,
            data: updatedData, 
          },
        };
      }
      default:
        return state;
    }
  };
  
  export default reducerLogin;
  