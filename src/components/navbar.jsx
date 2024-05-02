/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux'; // Importa o hook useSelector do React Redux

const Navbar = () => {
  // Obtém o estado de autenticação do Redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Menu inverted color='black' size='large' fixed='top'>
      <Menu.Item header>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        {!isAuthenticated && ( // Exibe os itens de menu apenas se o usuário não estiver autenticado
          <>
            <Menu.Item>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/cadastro">Cadastro</Link>
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;

