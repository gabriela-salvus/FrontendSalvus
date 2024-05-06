import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon, Dropdown } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { list } from '../redux/actions/livros'; 

const categoriasGenero = [
  { key: 'Ficção', text: 'Ficção', value: 'Ficção' },
  { key: 'Romance', text: 'Romance', value: 'Romance' },
  { key: 'Mistério', text: 'Mistério', value: 'Mistério' },
  { key: 'Fantasia', text: 'Fantasia', value: 'Fantasia' },
  { key: 'Não-ficção', text: 'Não-ficção', value: 'Não-ficção' },
  { key: 'Terror', text: 'Terror', value: 'Terror' }
];

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
});

const BookForm = () => {
  const dispatch = useDispatch(); 
  const livrosStore = useSelector((state) => state.livros); 
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showFutureErrorMessage, setShowFutureErrorMessage] = useState(false); 
  
  const carregarLivros = () => {
    dispatch(list()); 
  };

  const handleNovoLivro = async () => {
    try {
      if (!titulo || !ano || !genero) {
        setErrorMessage('Por favor, preencha todos os campos.');
        return;
      }
      
      const currentYear = new Date().getFullYear(); 
      if (parseInt(ano) > currentYear) { 
        setShowFutureErrorMessage(true); 
        return;
      }
      
      const status = 'EM ESTOQUE'; 
      const statusValue = status === 'EM ESTOQUE' ? 1 : 0;
  
      const response = await api.post('/livros', {
        titulo,
        ano,
        genero,
        status: statusValue
      });

      if (response.status === 200) {
        setErrorMessage('');
        carregarLivros();
        setTitulo('');
        setAno('');
        setGenero('');
        setShowFutureErrorMessage(false); 
      } else {
        setErrorMessage('Erro ao adicionar o livro. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      setErrorMessage('Erro ao adicionar livro, ele já foi cadastrado: ' + error.message);
    }
  };

  return (
    <Form>
      <FormField>
        <label>Título</label>
        <input placeholder='Digite o título do livro' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </FormField>
      <FormField>
        <label>Ano</label>
        <input 
          placeholder='Digite o ano do livro' 
          value={ano} 
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input)) { 
              setAno(input); 
              setShowFutureErrorMessage(false); 
            }
          }} 
        />
        {showFutureErrorMessage && <p className="error-message">Não é possível adicionar livros do futuro.</p>} 
      </FormField>
      <FormField>
        <label>Gênero</label>
        <Dropdown
          placeholder='Selecione o gênero'
          fluid
          selection
          options={categoriasGenero}
          value={genero}
          onChange={(e, { value }) => setGenero(value)}
        />
      </FormField>
      <Button animated onClick={handleNovoLivro}>
        <ButtonContent visible>Adicionar livro</ButtonContent>
        <ButtonContent hidden>
          <Icon name='plus' />
        </ButtonContent>
      </Button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Form>
  );
};

export default BookForm;
