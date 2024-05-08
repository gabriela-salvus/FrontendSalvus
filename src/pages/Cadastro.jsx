import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import axios from 'axios';
import CadastroUsuario from '../components/CadastroUsuarioForm'; 
import { useSelector } from 'react-redux';
import { list } from '../redux/actions/usuarios';
import { trocar } from '../redux/actions/navigation'; 
import { useNavigate } from 'react-router-dom'; 

const CadastroUsuarioPage = () => {
  const dispatch = useDispatch(); 
  const usuariosStore = useSelector((state) => state.usuarios); 
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleHomeClick = () => {
    dispatch(trocar("Home"));
    navigate('/');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      const response = await axios.post('http://localhost:3000/usuarios', { name, email, password });

      if (response.status === 200) {
        alert('Usuário cadastrado com sucesso. Faça login para continuar.');
        dispatch(trocar("Login"));
        navigate('/login'); 
        dispatch(list()); 
      }
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
      <Menu fixed='top'>
        <Menu.Item header>Página de Cadastro</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={handleHomeClick}>Home</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h1>Faça seu cadastro</h1>
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
    </div>
  );
};

export default CadastroUsuarioPage;
