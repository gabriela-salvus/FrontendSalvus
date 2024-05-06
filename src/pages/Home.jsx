import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { trocar } from '../redux/actions/navigation';
import { useNavigate } from 'react-router';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(trocar("Login"));
    navigate('/login');
  };

  const handleCadastroClick = () => {
    dispatch(trocar("Cadastro"));
    navigate('/cadastro');
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