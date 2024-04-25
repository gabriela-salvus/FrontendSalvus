/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormField, Button, ButtonContent, Icon } from 'semantic-ui-react';

const LoginUsuario = ({ onSuccess }) => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //olha se os campos de email e senha estão vazios
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return; //para a execução da função se os campos estiverem vazios
    }

    try {
      //enviando os dados de login para o backend
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      //o login sendo bem-sucedido, exibe o token de acesso
      if (response.status === 200) {
        localStorage.setItem('token',response.data.token);
        onSuccess();
      }
    } catch (error) {
      //se ocorrer um erro ao fazer login, exiba uma mensagem de erro
      if (error.response && error.response.status === 401) {
        setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.');
      } else {
        setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      }
    }
  };

  return (
    <Form>
      <FormField>
        <label>Email</label>
        <input 
          placeholder='Digite o seu email' 
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <FormField>
        <label>Password</label>
        <input 
          placeholder='Digite a sua senha: ' 
          value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
      </FormField>
      <Button animated onClick={handleSubmit}>
        <ButtonContent visible>Login</ButtonContent>
        <ButtonContent hidden>
          <Icon name='arrow right'/>
        </ButtonContent>
      </Button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Form>
  );
};

export default LoginUsuario; 
