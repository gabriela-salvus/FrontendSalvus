
import { SET_FEEDBACK_MESSAGE } from '../actions/feedbackActions';

const initialState = {
  message: ''
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDBACK_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export default feedbackReducer;
