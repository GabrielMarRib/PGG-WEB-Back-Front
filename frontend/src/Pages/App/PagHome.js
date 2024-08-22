import React, { useState, useEffect } from "react";
import "../../Styles/App/PagHome.css";
import { useNavigate } from "react-router-dom";
import ImageABC from '../../Assets/curvaABC.png';
import ImageLote from '../../Assets/loteEconomico.png';
import ImagePEPS from '../../Assets/PEPS.png';
import ImagePedido from '../../Assets/pontodePedido.png';
import ImageMedio from '../../Assets/custoMedio.png';
import ImageCaixa from '../../Assets/caixa.png';
import IconLogOut from "../../Assets/LogOutIconWhite.png";
import Notificacao from "../../Components/Notificacao";
import {handleLogOut } from "../../../src/Functions/Functions.js";

function PagHome() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showEstoqueOptions, setShowEstoqueOptions] = useState(false);
  const [showABCOptions, setShowABCOptions] = useState(false);
  const [isSelectEstoque, setisSelectEstoque] = useState(false);
  const [isSelectCurvaAbc, setisSelectCurvaAbc] = useState(false);


  const sections = [
    { title: "Faturamento", content: "Informação sobre faturamento" },
    { title: "Ticket Médio", content: "Informação sobre ticket médio" },
    { title: "Positividade", content: "Informação sobre positividade" },
    { title: "Ticket Médio por Produto", content: "Informação sobre ticket médio por produto" },
    { title: "Positividade por Produto", content: "Informação sobre positividade por produto" },
    { title: "Gerente Faturamento Sei Lá O Que", content: "Informação gerencial" },
    { title: "Evolução de Vendas", content: "Gráfico de vendas vai aqui", isChart: true },
    { title: "Linha de Produto", content: "Informação sobre linha de produto", isSameHeight: true },
  ];

  const buttons = [
    { title: "Estoque", img: ImageCaixa, link: "/PagEscolhaProdutos" },
    { title: "Curva ABC", img: ImageABC, link: "/PagEscolhaCurvaABC", access: 1 },
    { title: "Ponto de Pedido", img: ImagePedido, link: "/PagPontoPedido" },
    { title: "PEPS", img: ImagePEPS, link: "/PEPS" },
    { title: "Lote Econômico", img: ImageLote, link: "/PagLoteEconomico" },
    { title: "Custo Médio", img: ImageMedio, link: "/pagInicial" },
  ];

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
    if (window.innerWidth > 1000) {
      setSidebarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleEstoqueClick = () => {
    setisSelectEstoque(prevState => !prevState)
    setShowEstoqueOptions(!showEstoqueOptions);
  };

  const handleABCClick = () => {
    setisSelectCurvaAbc(prevState => !prevState)
    setShowABCOptions(!showABCOptions);
  };

  useEffect(() => {
    if (sidebarVisible && isMobile) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }, [sidebarVisible, isMobile]);

  return (
    <div className="PagHome">
      {isMobile && (
        <div className="toggle-text" onClick={toggleSidebar}>
          NavBar
        </div>
      )}

      <div className={`sidebar ${!sidebarVisible ? "hidden" : isMobile ? "overlay" : ""}`}>
        <div className="sidebar-top-buttons">
          <div className="btnNotificacao">
            <Notificacao />
          </div>
          <div className="btnSair" 
              onClick={() => {
                handleLogOut(navigate);
              }}
            >
              <div id="DivNotificação">
                <img src={IconLogOut} />
              </div>
          </div>
        </div>
        <div className="user-info">
          <div className="user-avatar"></div>
          <span className="user-name">Marcos Vinicius</span>
        </div>
        <div className="menu">
          <button className={isSelectEstoque ? "menu-button-Select" : "menu-button"} onClick={handleEstoqueClick}>
            <img src={buttons[0].img} alt={buttons[0].title} className="button-image" />
            <span className="button-title">{buttons[0].title}</span>
          </button>
          {showEstoqueOptions && (
            <div className="estoque-options">
              <button className="option-button" onClick={() => navigate("/PagProdutos")}>Adicionar Produtos</button>
              <button className="option-button" onClick={() => navigate("/PagVenderProduto")}>Vender Produtos</button>
              <button className="option-button" onClick={() => navigate("/PagAddCategoria")}>Gerir Categorias</button>
            </div>
          )}

          <button className={isSelectCurvaAbc ? "menu-button-Select" : "menu-button"} onClick={handleABCClick}>
            <img src={buttons[1].img} alt={buttons[1].title} className="button-image" />
            <span className="button-title">{buttons[1].title}</span>
          </button>
          {showABCOptions && (
            <div className="abc-options">
              <button className="option-button" onClick={() => navigate("/PagCurvaABC")}>Por Frequência</button>
              <button className="option-button" onClick={() => navigate("/PagCurvaABCPorValor")}>Por Valor</button>
              {/* Adicione mais opções conforme necessário */}
            </div>
          )}

          {buttons.slice(2).map((button, index) => (
            <button key={index} className="menu-button" onClick={() => navigate(button.link)}>
              <img src={button.img} alt={button.title} className="button-image" />
              <span className="button-title">{button.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="header">
          <div className="date-box">
            <p>- Zetta -</p>
          </div>
        </div>

        <div className="grid-container">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`grid-item ${
                section.title === "Evolução de Vendas" ? "evolucao-vendas" :
                section.title === "Linha de Produto" ? "linha-produto" : ""
              }`}
            >
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.isChart && <div className="chart-placeholder">[Gráfico]</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PagHome;
