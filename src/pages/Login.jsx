/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginUsuario from '../components/LoginForm';
import { ButtonContent, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log('Enviando dados de login...');
      // Envie os dados de login para o backend
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      // Se o login for bem-sucedido, exiba o token de acesso
      if (response.status === 200 && response.data.token) {
        console.log('Login bem-sucedido!');
        // Armazenar o token no armazenamento local
        localStorage.setItem('token', response.data.token);

        // Redirecionar para a página de biblioteca
        navigate('/biblioteca');
      } else {
        console.log('Resposta do servidor:', response);
        setErrorMessage('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      // Se ocorrer um erro ao fazer login, exiba uma mensagem de erro
      console.error('Erro ao fazer login:', error);
      console.log('Resposta do servidor:', error.response);
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
