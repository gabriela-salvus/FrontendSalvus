/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import CadastroUsuarioPage from '../pages/Cadastro';
import ListaLivrosPage from '../pages/ListaLivros';
import CadastroLivroPage from '../pages/CadastroLivro';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuarioPage />} />
          <Route path="/lista-livros" element={
            <ProtectedRoute>
              <ListaLivrosPage />
            </ProtectedRoute>
          } />
          <Route path="/cadastro-livro" element={
            <ProtectedRoute>
              <CadastroLivroPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;



