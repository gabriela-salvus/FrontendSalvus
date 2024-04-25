
/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CadastroUsuarioPage from './Cadastro';
import LoginUsuario from '../components/LoginForm';
import { ButtonContent, Button, Icon } from 'semantic-ui-react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bem Vindo a Biblioteca online!</h1>
      <div>
        {/* Botão de Login */}
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        {/* Botão de Cadastro */}
        <Link to="/cadastro">
          <Button>Cadastro</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;


