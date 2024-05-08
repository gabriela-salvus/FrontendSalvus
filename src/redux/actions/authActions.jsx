// authActions.js
/* eslint-disable */
// Action creator para o registro de usuário
import { userSignupSuccess } from './USER_SIGNUP_SUCCESS'; 
import { setFeedbackMessage } from './feedbackActions'; 

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário.');
      }

      const registeredUserData = await response.json();
      dispatch(setFeedbackMessage('Cadastro realizado com sucesso!'));
      return registeredUserData;
    } catch (error) {
      dispatch(setFeedbackMessage('Erro ao cadastrar usuário.'));
      throw error;
    }
  };
};
  
  // Action creator para o login do usuário
  export const loginUser = (userData) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          throw new Error('Email ou senha incorretos. Por favor, tente novamente.');
        }
  
        const loggedInUserData = await response.json(); // Alterado para evitar reuso de nome
  
        dispatch(userLoginSuccess(loggedInUserData));
        return loggedInUserData;
      } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.message);
      }
    };
  };
  
