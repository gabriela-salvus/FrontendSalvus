import { setToken } from "../../storage/auth";

const initialState = {
  id: 0,
  name: "Unknow",
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      const message = action.payload.message;

      if (!("error" in message)) {
        setToken(message.token);

        return {
          ...state,
          id: message.account.id,
          name: message.account.name,
        };
      } else {
        return state;
      }
    }
    case "LOGIN_TOKEN": {
      const message = action.payload.message;

      if (!("error" in message)) {
        return {
          ...state,
          id: message.id,
          name: message.name,
        };
      } else {
        return initialState;
      }
        
    }
    default:
      return state;
  }
};

export default reducerAuth;

