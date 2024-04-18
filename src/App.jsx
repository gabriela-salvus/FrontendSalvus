/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import BookForm from './formulario/cadastro';
import { ButtonGroup, Button, ButtonOr, Icon } from 'semantic-ui-react';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

const categoriasGenero = ['Ficção', 'Romance', 'Mistério', 'Fantasia', 'Não-ficção', 'Terror'];

function App() {
  const [livros, setLivros] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [termoBusca, setTermoBusca] = useState('');

  // Função para filtrar os livros com base no termo de busca
  const filtrarLivros = (termo) => {
    return livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo.toLowerCase())
    );
  };

  // Função para lidar com a mudança no termo de busca
  const handleBusca = (e) => {
    setTermoBusca(e.target.value);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    console.log('entrei');
    try {
      const response = await api.get('/livros');
      const livrosData = response.data.message.map(livro => ({
        ...livro,
        status: livro.status === 0 ? 'ALUGADO' : 'EM ESTOQUE'
      }));
      setLivros(livrosData);
    } catch (error) {
      setErrorMessage('Erro ao carregar livros: ' + error.message);
    }
  };

  const alugarLivro = async (livroId) => {
    try {
      await api.put(`/livros/${livroId}`, { status: 0 });
      carregarLivros();
    } catch (error) {
      setErrorMessage('Erro ao alugar livro: ' + error.message);
    }
  };

  const devolverLivro = async (livroId) => {
    try {
      await api.put(`/livros/${livroId}`, { status: 1 });
      carregarLivros();
    } catch (error) {
      setErrorMessage('Erro ao devolver livro: ' + error.message);
    }
  };

  const handleExcluirLivro = async (livroId) => {
    try {
      await api.delete(`/livros/${livroId}`);
      carregarLivros();
    } catch (error) {
      setErrorMessage('Erro ao excluir livro: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="conteudo-container">
        <div className="tabela-container">
          <div className="subtitulo-lista-livros"> 
            <h1>Lista de livros</h1>
            <div className="pesquisar">
            <input 
              type="text" 
              value={termoBusca} 
              onChange={handleBusca} 
              placeholder="Pesquisar livro..." 
            />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ano</th>
                <th>Gênero</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrarLivros(termoBusca).map((livro) => (
                <tr key={livro.id}>
                  <td>{livro.titulo}</td>
                  <td>{livro.ano}</td>
                  <td>{livro.genero}</td>
                  <td>{livro.status}</td>
                  <td>
                    <ButtonGroup>
                      <Button onClick={() => alugarLivro(livro.id)} disabled={livro.status === 'ALUGADO'}>Alugar</Button>
                      <ButtonOr text='ou' />
                      <Button positive onClick={() => devolverLivro(livro.id)} disabled={livro.status === 'EM ESTOQUE'}>Devolver</Button>
                    </ButtonGroup>
                    <Button content='Excluir' icon='trash' labelPosition='right' onClick={() => handleExcluirLivro(livro.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="formulario-container">
          <div className="subtitulo-container-cadastro">
            <h2>Cadastrar novo livro</h2>
          </div>
          <BookForm
            categoriasGenero={categoriasGenero}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            carregarLivros={carregarLivros}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
