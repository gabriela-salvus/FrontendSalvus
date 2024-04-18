/* eslint-disable */
import React, { useState } from 'react';
import { Form, FormField, Button, ButtonContent, Icon, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const categoriasGenero = [
  { key: 'Ficção', text: 'Ficção', value: 'Ficção' },
  { key: 'Romance', text: 'Romance', value: 'Romance' },
  { key: 'Mistério', text: 'Mistério', value: 'Mistério' },
  { key: 'Fantasia', text: 'Fantasia', value: 'Fantasia' },
  { key: 'Não-ficção', text: 'Não-ficção', value: 'Não-ficção' },
  { key: 'Terror', text: 'Terror', value: 'Terror' }
];

const api = axios.create({
    baseURL: 'http://localhost:8080'
  });

const BookForm = ({carregarLivros}) => {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showFutureErrorMessage, setShowFutureErrorMessage] = useState(false); // Variável de estado para controlar a exibição da mensagem de erro de ano futuro
  
  const handleNovoLivro = async () => {
    try {
      if (!titulo || !ano || !genero) {
        setErrorMessage('Por favor, preencha todos os campos.');
        return;
      }
      
      const currentYear = new Date().getFullYear(); // Obtém o ano atual
      if (parseInt(ano) > currentYear) { // Verifica se o ano é maior que o ano atual
        setShowFutureErrorMessage(true); // Define a variável de estado para mostrar a mensagem de erro de ano futuro
        return;
      }
      
      const status = 'EM ESTOQUE'; // Definindo o status padrão
      const statusValue = status === 'EM ESTOQUE' ? 1 : 0;
  
      const response = await api.post('/livros', {
        titulo,
        ano,
        genero,
        status: statusValue
      });

      if (response.status === 200) {
        setErrorMessage('');
        carregarLivros(); // Chama a função para carregar os livros novamente após adicionar um novo
        setTitulo('');
        setAno('');
        setGenero('');
        setShowFutureErrorMessage(false); // Reinicia a variável de estado para esconder a mensagem de erro de ano futuro
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
            if (/^\d*$/.test(input)) { // Verifica se o valor digitado contém apenas números
              setAno(input); // Define o estado do ano apenas se contiver apenas números
              setShowFutureErrorMessage(false); // Reinicia a variável de estado para esconder a mensagem de erro de ano futuro
            }
          }} 
        />
        {showFutureErrorMessage && <p className="error-message">Não é possível adicionar livros do futuro.</p>} {/* Exibe a mensagem de erro de ano futuro */}
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
