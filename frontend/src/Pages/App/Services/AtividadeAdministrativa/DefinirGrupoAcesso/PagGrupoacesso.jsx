import React from 'react';
import Titulo from '../../../../../Components/Titulo/Titulo';
import CabecalhoHome from '../../../../../Components/Cabecalho/CabecalhoHome';
import { useNavigate } from 'react-router-dom';

function PagGrupoacesso() {

  const navigate = useNavigate();
  
  return (
    <div className="PagPerfil">
      <CabecalhoHome />
      <Titulo tituloMsg='Gerenciar Grupos de Acesso' />

      <button className="voltar" onClick={() => {navigate("/PagHome");}}>Voltar</button>
      
    </div>
  );
}

export default PagGrupoacesso;
