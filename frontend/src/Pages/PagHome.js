import React, { useState } from 'react';
import "../Styles/PagHome.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PagHome(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const nome = searchParams.get('nome');

    return(
       <div>
         <h1>Bem-vindo, {nome}</h1>
         <p>Seu email é: {email}</p>
       </div>
    );
}
export default PagHome;