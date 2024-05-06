/* eslint-disable */
import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { list } from '../redux/actions/usuarios';  
import { swap } from "../redux/actions/navigation";

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
});

const CadastroUsuario = () => {
  const dispatch = useDispatch(); 
  const navigationState = useSelector((state) => state.navigation); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name || !email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      const response = await api.post('/usuarios', { name, email, password });

      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso. Faça login para continuar.');
        dispatch(swap("Login"));
        dispatch(list()); 
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Este email já está em uso.');
      } else {
        setErrorMessage(error.message || 'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    }
  };

  return (
    <Form>
      <FormField>
        <label>Nome</label>
        <input placeholder='Digite o seu nome' value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>
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
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>
      <Button animated onClick={handleSubmit}>
        <ButtonContent visible>Cadastrar</ButtonContent>
        <ButtonContent hidden>
          <Icon name='plus' />
        </ButtonContent>
      </Button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Form>
  );
};

export default CadastroUsuario;
