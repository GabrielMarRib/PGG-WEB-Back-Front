import React, { useState, useEffect , useContext} from "react";
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
import { handleLogOut } from "../../../src/Functions/Functions.js";
import GraficoTeste from "../../Components/GraficoTeste.jsx";
import { UserContext } from "../../Context/UserContext";

function PagHome() {

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showEstoqueOptions, setShowEstoqueOptions] = useState(false);
  const [showABCOptions, setShowABCOptions] = useState(false);
  const [isSelectEstoque, setisSelectEstoque] = useState(false);
  const [isSelectCurvaAbc, setisSelectCurvaAbc] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null); 

  const sections = [
    { title: "Faturamento", content: "Informação sobre faturamento" },
    { title: "Ticket Médio", content: "Informação sobre ticket médio" },
    { title: "Positividade", content: "Informação sobre positividade" },
    { title: "Ticket Médio por Produto", content: "Informação sobre ticket médio por produto" },
    { title: "Positividade por Produto", content: "Informação sobre positividade por produto" },
    { title: "Gerente Faturamento Sei Lá O Que", content: "Informação gerencial" },
    { title: "Evolução de Vendas", content: "Análise Mensal da Evolução de Vendas", isChart: true },
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

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setUserAvatar(imageUrl);
        localStorage.setItem('userAvatar', imageUrl); 
      };
      reader.readAsDataURL(file);
    }
  };

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
          <div className="user-avatar" onClick={() => document.getElementById('avatarUpload').click()}>
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" className="avatar-image" />
            ) : (
              <div className="default-avatar">Upload</div>
            )}
          </div>
          <input
            type="file"
            id="avatarUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <span className="user-name">{User?.userData.Nome}</span>
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
              <button className="option-button" onClick={() => navigate("/PagGerirLotes")}>Gerir lotes</button>
              <button className="option-button" onClick={() => navigate("/PagMovimentos")}>Mostrar Movimentos</button>
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
              {section.isChart && <div className="chart-placeholder"><GraficoTeste></GraficoTeste></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PagHome;
