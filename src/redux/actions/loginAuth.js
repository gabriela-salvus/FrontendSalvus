import Auth from "../../api/loginAuth";

export const login = (loginParams) => (dispatch) => {
  Auth.login(loginParams)
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        type: "LOGIN",
        payload: response,
      });
    });
};

export const loginToken = () => (dispatch) => {
  Auth.loginToken()
    .then((response) => response.json())
    .then((loginTokenBody) => {
      dispatch({
        type: "LOGIN_TOKEN",
        payload: loginTokenBody,
      });
    });
};


