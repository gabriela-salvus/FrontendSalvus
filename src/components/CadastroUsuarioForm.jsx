/* eslint-disable */
import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'; // Importa o hook useDispatch do React Redux
import { registerUser } from '../redux/actions/authActions'; // Importa a action para registrar um usuário

const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validação de entrada
      if (!name || !email || !password) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      // Dispatch da action para registrar um novo usuário
      dispatch(registerUser({ name, email, password }));

      // Limpa os campos e reinicia as mensagens de erro
      setName('');
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      // Tratando erros
      setErrorMessage(error.message || 'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente.');
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
          value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
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
