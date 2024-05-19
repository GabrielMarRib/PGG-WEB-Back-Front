import React, { useState, useEffect } from 'react';
import "../Styles/PagHome.css";
import { useLocation, useNavigate } from 'react-router-dom';

function PagHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  useEffect(() => {
    if (!user) {
      navigate('/PagLogin');
    }
  }, [user, navigate]);

  return (
    <div className='PagHome'>
      {user ? (
        <div>
          <h1>Bem-vindo, {user.name}</h1>
          <p>Seu email é: {user.email}</p>
        </div>
      ) : (
        <div>
          <h1>Redirecionando para a página de login...</h1>
        </div>
      )}
    </div>
  );
}

export default PagHome;
