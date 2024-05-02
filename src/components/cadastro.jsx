/* eslint-disable */
import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon, Dropdown } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'; 
import { addBook } from '../redux/actions/libraryActions'; 

const categoriasGenero = [
  { key: 'Ficção', text: 'Ficção', value: 'Ficção' },
  { key: 'Romance', text: 'Romance', value: 'Romance' },
  { key: 'Mistério', text: 'Mistério', value: 'Mistério' },
  { key: 'Fantasia', text: 'Fantasia', value: 'Fantasia' },
  { key: 'Não-ficção', text: 'Não-ficção', value: 'Não-ficção' },
  { key: 'Terror', text: 'Terror', value: 'Terror' }
];

const BookForm = ({ carregarLivros }) => {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showFutureErrorMessage, setShowFutureErrorMessage] = useState(false);
  const dispatch = useDispatch(); // Obtém a função dispatch do Redux

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

      // Dispatch da action para adicionar um novo livro
      dispatch(addBook({ titulo, ano, genero, status: statusValue }));

      // Limpa os campos e reinicia as mensagens de erro
      setErrorMessage('');
      setTitulo('');
      setAno('');
      setGenero('');
      setShowFutureErrorMessage(false);

      // Atualiza a lista de livros
      carregarLivros();
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
