import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormField, Button, ButtonContent, Icon, Message, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'; 
import { trocar } from '../redux/actions/navigation';
import { useNavigate } from 'react-router';
import { login } from '../redux/actions/loginAuth';

const LoginUsuario = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setLoading(false); 
      return; 
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      
      if (response.status === 200) {
        dispatch(login);
        console.log('login deu certo');
        console.log(dispatch(login));
        dispatch(trocar("Biblioteca"));
        navigate('/biblioteca')
        setErrorMessage(''); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.');
      } else {
        setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false); 
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
      <Button animated onClick={handleSubmit} disabled={loading}>
        <ButtonContent visible>Login</ButtonContent>
        <ButtonContent hidden>
          <Icon name='arrow right'/>
        </ButtonContent>
      </Button>
      
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
     
      {errorMessage && <Message negative>{errorMessage}</Message>}
    </Form>
  );
};

export default LoginUsuario; 
