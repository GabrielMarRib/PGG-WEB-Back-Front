import React, { Component, useContext, useState, useEffect } from "react";
import "../Styles/App/Service/BtnAjuda.css";
import NotificacaoIcon from "../Assets/SinoWhite.png";
import OptionIcon from "../Assets/OptionsWhite.png";
import { UserContext } from "../Context/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import { NotificacaoPontoPedido, handleLogOut } from "../Functions/Functions.js";
import IconLogOut from "../Assets/LogOutIconWhite.png";
import Notificacao from "./Notificacao.js";

const BtnAjuda = () => {

const togglePopup = () => {
    setShowPopup(!showPopup);
};
const popupInfo = `teste`;
const [showPopup, setShowPopup] = useState(false);


  const navigate = useNavigate();
  return (
    <div className="BtnAjuda">
      {showPopup && (
        <div className="popup">
        <div className="popup-conteudo">
        <button className="fechar-popup" onClick={togglePopup}>Fechar</button>
          {popupInfo.split('\n').map((line, index) => {
            if (line.startsWith('Guia de Ajuda') || line.startsWith('Visão Geral') || line.startsWith('Como Usar') || line.startsWith('Dicas Finais')) {
              return <h1 key={index}>{line}</h1>;  // Títulos em h1
            } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.')) {
              return <h2 key={index}>{line}</h2>;  // Subtítulos em h2
            } else if (line.includes('ID:') || line.includes('Nome do Arquivo:') || line.includes('Dados:') || line.includes('Data de Importação:') || line.includes('Ações:')) {
              return <p key={index}><strong>{line}</strong></p>;  // Negrito para itens específicos
            } else {
              return <p key={index}>{line}</p>;  // Linhas normais
            }
          })}
        </div>
      </div>      
      )}
    </div>
  );
};

export default BtnAjuda;