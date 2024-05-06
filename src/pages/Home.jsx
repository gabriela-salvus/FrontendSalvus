import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { swap } from '../redux/actions/navigation';

const Home = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    console.log('clicando login')
    dispatch(swap("Login"));
  };

  const handleCadastroClick = () => {
    console.log('clicando cadastro')
    dispatch(swap("Cadastro"));
  };

  return (
    <div>
      <h1>Bem Vindo a Biblioteca online!</h1>
      <div>
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleCadastroClick}>Cadastro</Button>
      </div>
    </div>
  );
};

export default Home;