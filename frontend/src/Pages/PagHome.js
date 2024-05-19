import React, { useState, useEffect } from "react";
import "../Styles/PagHome.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cabecalho from '../PartesDoSite/Cabecalho.js'

function PagHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  useEffect(() => {
    if (!user) {
      navigate("/PagLogin");
    }
  }, [user, navigate]);
  // user.userData['Email']
  // user.userData['Nome']

  return (
    <div className="PagHome">
      {user ? (

        <div>    
            <Cabecalho />
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
