/* eslint-disable */
/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import LoginUsuario from '../components/LoginForm';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await dispatch(loginUser(email, password));
      dispatch({ type: 'USER_LOGIN_SUCCESS' });
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginUsuario
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      <div>
        <Link to="/">
          <Button>Voltar</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
