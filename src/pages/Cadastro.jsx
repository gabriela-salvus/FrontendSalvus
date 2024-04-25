/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CadastroUsuario from '../components/CadastroUsuarioForm'; 
import { Link } from 'react-router-dom';
import { ButtonContent, Button, Icon } from 'semantic-ui-react';



const CadastroUsuarioPage = () => {
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

      // enviando os dados de cadastro para o backend
      const response = await axios.post('http://localhost:3000/usuarios', { name, email, password });

      // se o cadastro for bem-sucedido, redirecione para a página de login
      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso. Faça login para continuar.');
        // Redirecionar para a página de login
        navigate('/login'); 
      }
    } catch (error) {
      // Tratamento de erros
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
    <div>
      <h1>Cadastro de Usuários</h1>
      <CadastroUsuario
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
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

export default CadastroUsuarioPage;
