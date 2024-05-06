/* eslint-disable */
import React, { useState } from 'react';
import LoginUsuario from '../components/LoginForm';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { trocar } from '../redux/actions/navigation'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch(); 
  const loginStore = useSelector((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 

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
        localStorage.setItem('token', response.data.token);
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
