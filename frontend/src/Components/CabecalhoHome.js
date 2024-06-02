import React, { Component, useContext, useState, useEffect } from "react";
import "../Styles/Components/CabecalhoHome.css";
import NotificacaoIcon from "../Assets/SinoWhite.png";
import OptionIcon from "../Assets/OptionsWhite.png";
import { UserContext } from "../Context/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import { NotificacaoPontoPedido, handleLogOut } from "../Functions/Functions.js";
import IconLogOut from "../Assets/LogOutIconWhite.png";
import Notificacao from "./Notificacao.js";
const CabecalhoHome = () => {
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleNomeUltimoNome = () => {
    if (User && User.userData && User.userData.Nome) {
      const primeiroNome = User.userData.Nome.split(" ")[0];
      const len = User.userData.Nome.split(" ").length;
      const ultimoNome = User.userData.Nome.split(" ")[len - 1];
      return primeiroNome + " " + ultimoNome;
    }
  };

  const navigate = useNavigate();
  return (
    <div className="CabecalhoHome">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      ></link>

      <nav>
        <a id="logo">
          PGG
          <br />
          Pequeno Grande Gestor
        </a>

        <a id="NomeEmpresa">- Zetta - </a>

        <div className="DivInfoUser">
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            <li>
              <a href="">Olá, {handleNomeUltimoNome()}</a>
            </li>
          </ul>

          <div id="DivImg">
            <Link to="/PagPerfil">
              <div id="DivImg">
                <img src={OptionIcon} />
              </div>
            </Link>
          </div>

          <Notificacao />

          <div id="DivImg">
            <a
              onClick={() => {
                handleLogOut(navigate);
              }}
            >
              <div id="DivImg">
                <img src={IconLogOut} />
              </div>
            </a>
          </div>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>

     
    </div>
  );
};

export default CabecalhoHome;
