/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Solicitar logout ao backend para invalidar o token
      await axios.post('http://localhost:3000/logout');

      // Redirecionar para a página de login
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return ( 
    <Button content='Sair' onClick={handleLogout} />
  );
};

export default LogoutButton;
