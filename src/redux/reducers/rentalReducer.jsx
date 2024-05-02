
import {
    RENT_BOOK,
    RETURN_BOOK
  } from '../actions/libraryActions';
  
  const rentalReducer = (state = {}, action) => {
    switch (action.type) {
      case RENT_BOOK:
       
        return state;
      case RETURN_BOOK:
        
        return state;
      default:
        return state;
    }
  };
  
  export default rentalReducer;
  