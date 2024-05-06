/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUsuario from '../components/LoginForm';
import { ButtonContent, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { list } from '../redux/actions/login';
import { swap } from '../redux/actions/navigation'; 
import axios from 'axios'; 

const LoginPage = () => {
  const dispatch = useDispatch(); 
  const loginStore = useSelector((state) => state.login);
  const navigationState = useSelector((state) => state.navigation); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleHomeClick = () => {
    console.log('clicando no home')
    dispatch(swap("Home"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        dispatch(swap("Biblioteca"));
      } else {
        throw new Error('Ocorreu um erro durante o login.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Ocorreu um erro durante o login.');
    } finally {
      setLoading(false); 
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
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        loading={loading} 
      />
      <div>
       <Button onClick={handleHomeClick}>Voltar</Button>
      </div>
    </div>
  );
};

export default LoginPage;
