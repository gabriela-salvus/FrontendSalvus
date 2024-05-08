
import React, { useState, useEffect } from 'react';
import './Biblioteca.css';
import BookForm from '../components/cadastro';
import { ButtonGroup, Button, ButtonOr, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { list } from '../redux/actions/livros';
import api from '../api/index';


const categoriasGenero = ['Ficção', 'Romance', 'Mistério', 'Fantasia', 'Não-ficção', 'Terror'];

function Biblioteca() {
  const dispatch = useDispatch();
  const livrosStore = useSelector((state) => state.livros);
  const [termoBusca, setTermoBusca] = useState('');

  const filtrarLivros = (termo) => {
    return livrosStore.data.filter(livro =>
      livro && livro.titulo && livro.titulo.toLowerCase().includes(termo.toLowerCase())
    );
  };
  
  const handleBusca = (e) => {
    setTermoBusca(e.target.value);
  };

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  const alugarLivro = async (livroId) => {
    try {
      await api.put(`/livros/${livroId}`, { status: 0,});
      dispatch(list()); 
    } catch (error) {
      console.error('Erro ao alugar livro:', error.message);
    }
  };

  const devolverLivro = async (livroId) => {
    try {
      await api.put(`/livros/${livroId}`, { status: 1 });
      dispatch(list()); 
    } catch (error) {
      console.error('Erro ao devolver livro:', error.message);
    }
  };

  const handleExcluirLivro = async (livroId) => {
    try {
      await api.delete(`/livros/${livroId}`);
      dispatch(list()); 
    } catch (error) {
      console.error('Erro ao excluir livro:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="conteudo-container">
        <div className="tabela-container">
          <div className="subtitulo-lista-livros"> 
            <h1>Lista de livros</h1>
            <div className="pesquisar">
              <Input 
                icon='search' 
                placeholder='Pesquisar...' 
                value={termoBusca}
                onChange={handleBusca}
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
          />
        </div>
      </div>
    </div>
  );
}

export default Biblioteca;
