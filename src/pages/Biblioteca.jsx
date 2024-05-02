/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RENT_BOOK, RETURN_BOOK, DELETE_BOOK} from '../redux/actions/libraryActions';
import BookForm from '../components/cadastro';
import { ButtonGroup, Button, ButtonOr, Input } from 'semantic-ui-react';
import LogoutButton from '../components/LogoutButton';

const Biblioteca = ({ livros, errorMessage, RENT_BOOK, RETURN_BOOK, DELETE_BOOK, carregarLivros }) => {
  const [termoBusca, setTermoBusca] = React.useState('');

  const handleBusca = (e) => {
    setTermoBusca(e.target.value);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const filtrarLivros = (termo) => {
    return livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo.toLowerCase())
    );
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
              <LogoutButton/>
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
                      <Button onClick={() => RENT_BOOK(livro.id)} disabled={livro.status === 'ALUGADO'}>Alugar</Button>
                      <ButtonOr text='ou' />
                      <Button positive onClick={() => RETURN_BOOK(livro.id)} disabled={livro.status === 'EM ESTOQUE'}>Devolver</Button>
                    </ButtonGroup>
                    <Button content='Excluir' icon='trash' labelPosition='right' onClick={() => DELETE_BOOK(livro.id)}/>
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
};

const mapStateToProps = state => ({
  livros: state.book.livros,
  errorMessage: state.book.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  RENT_BOOK,
  RETURN_BOOK,
  DELETE_BOOK,
  carregarLivros
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Biblioteca);

