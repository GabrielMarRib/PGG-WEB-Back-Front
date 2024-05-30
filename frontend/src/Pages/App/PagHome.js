import React, { useState, useLayoutEffect, useEffect } from "react";
import "../../Styles/PagHome.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.js";
import { handleLogOut } from "../../Functions/Functions.js";
import TesteNavBar from "../../Components/TesteNavBar.js";
import Redirect from "../../Functions/Redirect.js";
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
      <div className="Cabecalho">
        <TesteNavBar />
        {/*<NavegacaoHorizontal /> */} {/*Possui navMenu... nao sei qual fica melhor...*/}
      </div>

      <div className="conteudoPaginaMaster">
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <a onClick={() => { navigate("/Produtos") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  Produtos
                </div>

              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/EscolhaCurvaABC") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  Curva ABC
                </div>

              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PontoPedido") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  Ponto de pedido
                </div>

              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/PEPS") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  PEPS
                </div>

              </a>
            </div>

            <div className="ag-courses_item">
              <a onClick={() => { navigate("/LoteEco") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  Lote Econômico
                </div>

              </a>
            </div>
            <div className="ag-courses_item">
              <a onClick={() => { navigate("/pagInicial") }} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  Sei lá
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