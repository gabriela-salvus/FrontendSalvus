const initialState = {
    item: "Home",
  };
  
  const reducerPage = (state = initialState, action) => {
    switch (action.type) {
      case "TROCAR": {
        return {
          ...state,
          item: action.payload.item,
        };
      }
      default:
        return state;
    }
  };
  
  export default reducerPage;
  
