/* eslint-disable */
import React, { useState } from 'react';
import LoginUsuario from '../components/LoginForm';
import { Button, Menu, Message, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { trocar } from '../redux/actions/navigation'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/loginAuth';

const LoginPage = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleHomeClick = () => { 
    dispatch(trocar("Home"));
    navigate('/');
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
        dispatch(login);
        dispatch(trocar("Biblioteca"));
        navigate('/biblioteca');
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
      <Menu fixed='top'>
        <Menu.Item header>Página de Login</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={handleHomeClick}>Home</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h1>Faça seu Login</h1>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      {errorMessage && <Message negative>{errorMessage}</Message>}
      <LoginUsuario
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading} 
      />
    </div>
  );
};

export default LoginPage;
