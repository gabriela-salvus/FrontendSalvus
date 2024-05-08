import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { trocar } from '../redux/actions/navigation';
import { useNavigate } from 'react-router';
import './Home.css'

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
      <Menu fixed='top'>
        <Menu.Item header>Bem Vindo</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={handleLoginClick}>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleCadastroClick}>Cadastro</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div className='container'>
          <div className='child'>
            <h1 className='titulo'>Biblioteca Online</h1>
          </div>
          <div className='imagem'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTqL7GfYjJK6DFEpJCZ1WAvfzws666_ET2iosd16L2A&s" alt="Imagem de perfil" />
          </div>
      </div>
    </div>
   
  );
};

export default Home;
