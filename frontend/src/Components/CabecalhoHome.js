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

      <nav className="nav1">
        <a id="logo">
          PGG
          <br />
          Pequeno Grande Gestor
        </a>

        <a id="NomeEmpresa">- Zetta - </a>


        <div className="DivInfoUser">
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>

          </ul>

          <div className="NomeUserId">
            <a className="NomeUserIdLabel">Olá, {handleNomeUltimoNome()}</a>
        </div>
        
          <div id="DivImg">
            <Link to="/PagPerfil">
              <div id="DivImg">
                <img src={OptionIcon} />
              </div>
            </Link>
          </div>
          <div id="DivImg">
            <Notificacao />
          </div>
          <div id="DivImg">
            <a
              onClick={() => {
                handleLogOut(navigate);
              }}
            >
              <div id="DivNotificação">
                <img src={IconLogOut} />
              </div>
            </a>
          </div>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>

      <nav className="nav2">  
          <a onClick={() => { navigate("PagEscolhaProdutos") }}  
          className="paginas"> Produtos </a> 
          <a onClick={() => { navigate("/PagEscolhaCurvaABC") }} className="paginas"> Curva ABC </a>
          <a onClick={() => { navigate("/PagPontoPedido") }}  
          className="paginas"> Ponto de Pedido </a>
          <a onClick={() => { navigate("/PEPS") }} 
          className="paginas"> PEPS </a>
          <a onClick={() => { navigate("/PagLoteEconomico") }}  
          className="paginas"> Lote Econômico </a>
          <a onClick={() => { navigate("/pagInicial") }} 
          className="paginas"> Custo Médio </a>
      </nav>

    </div>
  );
};

export default CabecalhoHome;
