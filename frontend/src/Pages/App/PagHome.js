import React, { useState, useLayoutEffect, useEffect } from "react";
import "../../Styles/App/PagHome.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.js";
import { handleLogOut } from "../../Functions/Functions.js";
import Cabecalho from "../../Components/CabecalhoHome.js";
import Redirect from "../../Functions/Redirect.js";
import ImageCaixa from '../../Assets/caixa.png';
import ImageABC from '../../Assets/curvaABC.png';
import ImageLote from '../../Assets/loteEconomico.png';
import ImagePEPS from '../../Assets/PEPS.png';
import ImagePedido from '../../Assets/pontodePedido.png';
import ImageMedio from '../../Assets/custoMedio.png';

function PagHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....

  Redirect(User)

  return (
    <div className="PagHome">

      <div className="CabecalhoHome">
        <Cabecalho />
        {/*<NavegacaoHorizontal /> */} {/*Possui navMenu... nao sei qual fica melhor...*/}
      </div>

      <div className="conteudoPaginaMaster">
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PagEscolhaProdutos") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">Estoque</span>
                  <img className="Imagem1" src={ImageCaixa} alt="Caixaimg" />
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PagEscolhaCurvaABC") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">Curva ABC</span>
                  <img className="Imagem1" src={ImageABC} alt="Caixaimg" />
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PagPontoPedido") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">Ponto de pedido</span>
                  <img className="Imagem1" src={ImagePedido} alt="Caixaimg" />
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PEPS") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">PEPS</span>
                  <img className="Imagem1" src={ImagePEPS} alt="Caixaimg" />
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PagLoteEconomico") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">Lote Econômico</span>
                  <img className="Imagem1" src={ImageLote} alt="Caixaimg" />
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/pagInicial") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  <span className="title-text">Custo Médio</span>
                  <img className="Imagem1" src={ImageMedio} alt="Caixaimg" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagHome;
