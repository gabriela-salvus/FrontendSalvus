/* eslint-disable */
import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validação de entrada
      if (!name || !email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      // Envie os dados de cadastro para o backend
      const response = await axios.post('http://localhost:3000/usuarios', { name, email, password });

      // Se o cadastro for bem-sucedido, redirecione para a página de login
      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso. Faça login para continuar.');
        navigate('/login'); 
      }
    } catch (error) {
      // Tratando erros 
      if (error.response && error.response.status === 409) {
        setErrorMessage('Este email já está em uso.');
      } else {
        setErrorMessage(error.message || 'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
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
