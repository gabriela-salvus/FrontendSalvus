/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroUsuario from './pages/Cadastro';
import Biblioteca from './pages/Biblioteca';
import PageNotFound from './pages/PageNotFound'; 

function isUserAuthenticated() {
  console.log(localStorage.getItem('token') )
  return localStorage.getItem('token');
}


const PrivateBibliotecaRoute = ({ element }) => {
  return isUserAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" replace /> 
  );
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/biblioteca" element={<PrivateBibliotecaRoute element={<Biblioteca />} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





