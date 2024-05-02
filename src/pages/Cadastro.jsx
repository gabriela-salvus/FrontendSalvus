/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userSignup } from '../redux/actions/USER_SIGNUP';
import CadastroUsuarioForm from '../components/CadastroUsuarioForm';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { navigateToLoginPage } from '../redux/actions/NAVIGATE_TO_LOGIN_PAGE'; 

const CadastroUsuarioPage = ({ userSignup, navigateToLoginPage }) => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      await userSignup(name, email, password); 

      alert('Usuário cadastrado com sucesso. Faça login para continuar.');
      navigateToLoginPage();
    } catch (error) {
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
      <CadastroUsuarioForm
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

const mapDispatchToProps = {
  userSignup,
  navigateToLoginPage
};

export default connect(null, mapDispatchToProps)(CadastroUsuarioPage);
