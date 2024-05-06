/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormField, Button, ButtonContent, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'; 
import { trocar } from '../redux/actions/navigation';
import { useNavigate } from 'react-router';

const LoginUsuario = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const usuariosStore = useSelector((state) => state.usuarios); 
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return; 
    }

    try {
      
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.message.token);
        console.log('bem bom');
        dispatch(trocar("Biblioteca"));
        navigate('/biblioteca')

      
        dispatch({ type: 'USUARIOS_LIST' });
      }
    } catch (error) {
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
