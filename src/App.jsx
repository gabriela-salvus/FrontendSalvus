/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroUsuario from './pages/Cadastro';
import Biblioteca from './pages/Biblioteca';
import PageNotFound from './pages/PageNotFound'; 


const isUserAuthenticated = () => {
  return localStorage.getItem('token') !== null; 
};

const PrivateRoute = ({ element }) => {
  return isUserAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" replace /> 
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/biblioteca" element={<PrivateRoute element={<Biblioteca />} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
