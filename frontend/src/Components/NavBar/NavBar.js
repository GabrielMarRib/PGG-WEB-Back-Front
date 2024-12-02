import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../Assets/logoRigelTech.png";
import OptionIcon from "../../Assets/OptionsWhite.png";
import IconLogOut from "../../Assets/LogOutIconWhite.png";
import "./NavBar.css";
import Notificacaodois from "../FuncionalidadeSininho/Notificacao2";
import { handleLogOut } from "../../Functions/Functions";
import PrivateButton from "../../Config/PrivateButton";
import PrivateButtonPai from "../../Config/PrivateButtonPai";
import PrivateButtonSolo from "../../Config/PrivateButtonSolo";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [TermoPesquisa, setTermoPesquisa] = useState("");
  const navigate = useNavigate();

  const [showEstoqueOptions, setShowEstoqueOptions] = useState(false);
  const [isSelectEstoque, setisSelectEstoque] = useState(false);


  const [showABCOptions, setShowABCOptions] = useState(false);
  const [isSelectCurvaAbc, setisSelectCurvaAbc] = useState(false);

  const [showPontoPedido, setshowPontoPedido] = useState(false);
  const [isSelectPontoPedido, setisSelectPontoPedido] = useState(false);

  const [showAdmin, setshowAdmin] = useState(false);
  const [isSelectAdmin, setisSelectAdmin] = useState(false);

  

  const toggleSidebar = () => {
    if (open) {
      setSubmenuOpen(null);
    }
    setOpen(!open);
  };

  const handleEstoqueClick = () => {
    if (!open) return;  // Impede que o submenu seja aberto se a navbar estiver fechada
    setisSelectEstoque(prevState => !prevState);
    setShowEstoqueOptions(!showEstoqueOptions);
  };
  
  const handleABCClick = () => {
    if (!open) return;  // Impede que o submenu seja aberto se a navbar estiver fechada
    setisSelectCurvaAbc(prevState => !prevState);
    setShowABCOptions(!showABCOptions);
  };
  
  const handlePontoPedidoClick = () => {
    if (!open) return;  // Impede que o submenu seja aberto se a navbar estiver fechada
    setisSelectPontoPedido(prevState => !prevState);
    setshowPontoPedido(!showPontoPedido);
  };
  
  const handleAdminClick = () => {
    if (!open) return;  // Impede que o submenu seja aberto se a navbar estiver fechada
    setisSelectAdmin(prevState => !prevState);
    setshowAdmin(!showAdmin);
  };


  return (
    <div className="nav-container">
      <div className={open ? "principalOpen" : "principalClosed"}>
        <div className={`sidebar ${open ? "open" : "collapsed"}`}>
          <BsArrowLeftShort
            className={`toggle-btn ${!open ? "rotate" : ""}`}
            onClick={toggleSidebar}
          />
          <div className="logo-section">
            <img
              src={LogoIcon}
              alt="Logo"
              className={`logo ${!open ? "rotate-logo" : ""}`}
            />
            {open && <h1 className="logo-text">PGG</h1>}
          </div>
          <div className={`search-box ${!open ? "collapsed-search" : ""}`}>
            <BsSearch className="search-icon" />
            {open && (
              <input
                type="text"
                placeholder="Pesquisa"
                value={TermoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
              />
            )}
          </div>
          <ul className="menu-list">

          <PrivateButtonSolo 
            className={`menu-button ${open ? "center" : "left"}`} // Condicionalmente adicionando as classes "center" ou "left" 
            route={'/PagHome'} 
            intent={{ class: 'Dashboard', intentPage: 'Página Dashboard' }}  
          >
            {open ? <span className="button-title">Home</span> : <RiDashboardFill />}
          </PrivateButtonSolo>

          <PrivateButtonPai classe={"Estoque"} className={""} onClick={handleEstoqueClick}>
          {open ? <span className="button-title">Estoque</span> : <RiDashboardFill />}
            <BsChevronDown
              className={`submenu-icon ${isSelectEstoque ? "rotated" : ""}`}
            />
          </PrivateButtonPai>

            {showEstoqueOptions && (
              <div className="estoque-options">
                <PrivateButton className="option-button" nome="Inventário" route={'/PagInventario'} intent={{ class: 'Estoque', intentPage: 'Inventário' }} />
                <PrivateButton className="option-button" nome="Gerir/Add Produtos" route={'/PagProdutos'} intent={{ class: 'Estoque', intentPage: 'Adicionar Produtos' }} />
                <PrivateButton className="option-button" nome="Baixa Produtos" route={'/PagVenderProduto'} intent={{ class: 'Estoque', intentPage: 'Página de Baixa' }} />
                <PrivateButton className="option-button" nome="Gerir Categorias" route={'/PagGerirCategoria'} intent={{ class: 'Estoque', intentPage: 'Gerenciar Categorias' }} />
                <PrivateButton className="option-button" nome="Gerir Lotes" route={'/PagGerirLotes'} intent={{ class: 'Estoque', intentPage: 'Gerenciar Lotes' }} />
                <PrivateButton className="option-button" nome="Movimentos" route={'/PagMovimentos'} intent={{ class: 'Estoque', intentPage: 'Movimento' }} />
                <PrivateButton className="option-button" nome="Importar Planilha" route={'/PagUploadExcel'} intent={{ class: 'Estoque', intentPage: 'Upload de Excel ao estoque' }} />

                {/* not sure pq isso tá aqui, mas ok */}
                <PrivateButton className="option-button" nome="Cadastro de Fornecedor" route={'/PagCadFornecedor'} intent={{ class: 'Fornecedor', intentPage: 'Cadastrar Fornecedor' }} />
                <PrivateButton className="option-button" nome="Encomenda de Produtos" route={'/PagPesquisaFornecedor'} intent={{ class: 'Fornecedor', intentPage: 'Pesquisar Fornecedor' }} />

              </div>
            )}


            {/*Curva ABC: */}
            <PrivateButtonPai classe={"Curva ABC"} className={""} onClick={handleABCClick}>
            {open ? <span className="button-title">Curva ABC</span> : <RiDashboardFill />}
              <BsChevronDown
                className={`submenu-icon ${isSelectCurvaAbc ? "rotated" : ""}`}
              />
            </PrivateButtonPai>

            {showABCOptions && (
              <div className="abc-options">
                <PrivateButton className="option-button" nome="Por Frequência" route={'/PagCurvaABC'} intent={{ class: 'Curva ABC', intentPage: 'Curva ABC Por Frequencia' }} />
                <PrivateButton className="option-button" nome="Por Valor" route={'/PagCurvaABCPorValor'} intent={{ class: 'Curva ABC', intentPage: 'Curva ABC Por Valor' }} />
              </div>
            )}
          </ul>


          {/*Ponto de Pedido: */}
          <PrivateButtonPai classe={"Ponto de Pedido"} className={""} onClick={handlePontoPedidoClick}>
          {open ? <span className="button-title">Ponto de Pedido</span> : <RiDashboardFill />}
            <BsChevronDown
              className={`submenu-icon ${isSelectPontoPedido ? "rotated" : ""}`}
            />
          </PrivateButtonPai>


          {showPontoPedido && (
            <div className="abc-options">
              <PrivateButton className="option-button" nome="Página de Ponto de Pedido" route={'/PagPontoPedido'} intent={{ class: 'Ponto de Pedido', intentPage: 'Página de Ponto de Pedido' }} />
            </div>
          )}



          {/* botoes sem pai: */}
          {/* Botões sem pai */}
          <PrivateButtonSolo className={`menu-button ${open ? "center" : "left"}`} route={'/PagMovimentos'} intent={{ class: 'Estoque', intentPage: 'Movimento' }} >
            {open ? <span className="button-title">PEPS</span> : <RiDashboardFill />}
          </PrivateButtonSolo>

          <PrivateButtonSolo className={`menu-button ${open ? "center" : "left"}`} route={'/PagLoteEconomico'} intent={{ class: 'Estoque', intentPage: 'Lote econômico' }} >
            {open ? <span className="button-title">Lote Economico</span> : <RiDashboardFill />}
          </PrivateButtonSolo>

          <PrivateButtonSolo className={`menu-button ${open ? "center" : "left"}`} route={'/PagHistorico'} intent={{ class: 'Atividade Administrativa', intentPage: 'Histórico' }} >
            {open ? <span className="button-title">Logs</span> : <RiDashboardFill />}
          </PrivateButtonSolo>

          <PrivateButtonSolo className={`menu-button ${open ? "center" : "left"}`} route={'/PagPerfil'} intent={{ class: 'Perfil', intentPage: 'Página de Perfil' }}>
            {open ? <span className="button-title">Suas Informações</span> : <RiDashboardFill />}
          </PrivateButtonSolo>



          {/*Atividade Admin: */}
          <PrivateButtonPai classe={"Atividade Administrativa"} className={""} onClick={handleAdminClick}>
          {open ? <span className="button-title">Atividade Administrativa</span> : <RiDashboardFill />}
            <BsChevronDown
              className={`submenu-icon ${isSelectAdmin ? "rotated" : ""}`}
            />
          </PrivateButtonPai>

          {showAdmin && (
            <div className="abc-options">
              <PrivateButton className="option-button" nome="Relatórios" route={'/PagRelatorios'} intent={{ class: 'Atividade Administrativa', intentPage: 'Relatórios' }} />
              <PrivateButton className="option-button" nome="Adicionar Funcionário" route={'/PagAddFunc'} intent={{ class: 'Atividade Administrativa', intentPage: 'Adicionar Funcionário' }} />
              <PrivateButton className="option-button" nome="Lista de Funcionarios" route={'/PagFuncionarios'} intent={{ class: 'Atividade Administrativa', intentPage: 'Lista de Funcionarios' }} />
              <PrivateButton className="option-button" nome="Gerenciar Grupos de Acesso" route={'/DefGrupoAcesso'} intent={{ class: 'Atividade Administrativa', intentPage: 'Gerenciar Grupos de Acesso' }} />
            </div>
          )}








          <div className="footer-btns">
            <div className="btnSair" style={{ cursor: 'pointer' }} onClick={() => navigate("/PagPerfil")}>
              <img src={OptionIcon} alt="Option Icon" />
            </div>
            <div className="btnNotificacao">
              <Notificacaodois />
            </div>
            <div className="btnSair" style={{ cursor: 'pointer' }} onClick={() => handleLogOut(navigate)}>
              <div id="DivNotificação">
                <img src={IconLogOut} alt="Logout Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
