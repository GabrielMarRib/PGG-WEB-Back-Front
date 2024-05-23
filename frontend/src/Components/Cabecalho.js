import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Cabecalho.css";
import ImageProfile from "../Assets/User_Icon.png";
import ImageAddUser from "../Assets/add-user.svg";

function Cabecalho() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="Cabecalho">
      <header>
        <div className="PGGTextDiv">
          <div className="texto-anima-wrapper">
            <svg>
              <text
                x="25%"
                y="10%"
                dy=".50em"
                className="animated-text-PPG"
                onClick={() => {
                  navigate("/PagHome");
                }}
              >
                PGG
              </text>
              <text
                x="0%"
                y="35%"
                dy=".50em"
                className="animated-text-PGGLonger"
                onClick={() => {
                  navigate("/PagHome");
                }}
              >
                Pequeno Grande Gestor
              </text>
            </svg>
          </div>
        </div>

        <div className="EmpresaDiv">
          <div className="texto-anima-wrapper">
            <svg>
              <text
                x="5.5%"
                y="20%"
                dy=".50em"
                className="animated-text-PPG"
                onClick={() => {
                  navigate("/PagHome");
                }}
              >
                - Zetta -
              </text>
            </svg>
          </div>
        </div>

        <div className="DivUser">
          <div className="nomeUser">
            <h2>Olá, Guilherme Henrique</h2>
          </div>

          <div id="DivBtnsUser">
            <div className="DivImg">
              <img src={ImageProfile} alt="Userimg" />
            </div>

            <div className="DivAddFunc">
              <img src={ImageAddUser} alt="addFuncimg" />
            </div>
          </div>
        </div>
      </header>

      <nav>
        <div className="dot"></div>
        <div className="navMenu">
          <a
            onClick={() => {
              navigate("/Produtos");
            }}
            className={location.pathname === "/Produtos" ? "selecionado" : ""}
          >
            Produtos
          </a>

          <a
            onClick={() => {
              navigate("/CurvaABC");
            }}
            className={location.pathname === "/CurvaABC" ? "selecionado" : ""}
          >
            Curva ABC
          </a>
          <a
            onClick={() => {
              navigate("/PontoPedido");
            }}
            className={
              location.pathname === "/PontoPedido" ? "selecionado" : ""
            }
          >
            Ponto de Pedido
          </a>
          <a
            onClick={() => {
              navigate("/PEPS");
            }}
            className={location.pathname === "/PEPS" ? "selecionado" : ""}
          >
            PEPS
          </a>
          <a
            onClick={() => {
              navigate("/LoteEco");
            }}
            className={location.pathname === "/LoteEco" ? "selecionado" : ""}
          >
            Lote Econômico
          </a>
        </div>
      </nav>
    </div>
  );
}
export default Cabecalho;
