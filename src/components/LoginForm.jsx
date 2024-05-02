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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        onSuccess();
        navigate('/dashboard'); // Exemplo de redirecionamento após login
      }
    } catch (error) {
      const message = error.response && error.response.status === 401
        ? 'Email ou senha incorretos. Por favor, tente novamente.'
        : 'Ocorreu um erro ao fazer login. Por favor, tente novamente.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <label>Email</label>
        <input
          placeholder='Digite o seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <label>Senha</label>
        <input
          placeholder='Digite a sua senha'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <Button type="submit" animated disabled={loading}>
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
