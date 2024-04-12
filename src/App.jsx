/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";


const api = axios.create({
  baseURL: 'http://localhost:8080'
});

const categoriasGenero = ['Ficção', 'Romance', 'Mistério', 'Fantasia', 'Não-ficção','Terror'];

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [status, setStatus] = useState('EM ESTOQUE');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      const response = await api.get('/livros');
      const livrosData = response.data.map(livro => ({
        ...livro,
        status: livro.status === 0 ? 'ALUGADO' : 'EM ESTOQUE'
      }));
      setLivros(livrosData);
    } catch (error) {
      setErrorMessage('Erro ao carregar livros: ' + error.message);
    }
  };

  const novoLivro = async () => {
    try {
      if (!genero) {
        setErrorMessage('Por favor, selecione uma categoria.');
        return;
      }
      if (!titulo) {
        setErrorMessage('Por favor, coloque o título do seu livro.');
        return;
      }
      if (!ano) {
        setErrorMessage('Por favor, coloque o ano do seu livro.');
        return;
      }
    
      const statusValue = status === 'EM ESTOQUE' ? 1 : 0;
  
      const response = await api.post('/livros', {
        titulo,
        ano,
        genero,
        status: statusValue
      });
      console.log(response);
      carregarLivros();
    } catch (error) {
      setErrorMessage('Erro ao adicionar livro: esse livro já foi cadastrado!!' + error.message);
    }
  };

  const alugarLivro = async (livroId) => {
    try {
      const response = await api.put(`/livros/${livroId}`, { status: 0 });
      console.log(response);
      carregarLivros();
    } catch (error) {
      setErrorMessage('Erro ao alugar livro: ' + error.message);
    }
  };

  const devolverLivro = async (livroId) => {
    try {
      const response = await api.put(`/livros/${livroId}`, { status: 1 });
      console.log(response);
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
      <div className="titulo-container">
        <h1>Biblioteca</h1>
      </div>
      <div className="subtitulo">
        <h2>Lista de livros</h2>
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
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.ano}</td>
              <td>{livro.genero}</td>
              <td>{livro.status}</td>
              <td>
                <button onClick={() => alugarLivro(livro.id)} disabled={livro.status === 'ALUGADO'}>Alugar</button>
                <button onClick={() => devolverLivro(livro.id)} disabled={livro.status === 'EM ESTOQUE'}>Devolver</button>
                <button onClick={() => handleExcluirLivro(livro.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="subtitulo-container">
      <h2>Cadastrar novo livro</h2>
      </div>
      <div className="input-container">
        <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input type="number" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Selecione o Gênero</option>
          {categoriasGenero.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        <button onClick={novoLivro}>
        <MdOutlineAddCircle />
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default App;