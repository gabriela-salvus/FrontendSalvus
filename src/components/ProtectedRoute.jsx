/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Você precisa estar logado para acessar esta página.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/cadastro" />;
  }

  return children;
}



