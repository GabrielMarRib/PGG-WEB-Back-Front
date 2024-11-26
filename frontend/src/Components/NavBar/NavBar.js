import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../Assets/logoRigelTech.png";
import OptionIcon from "../../Assets/OptionsWhite.png"; // Imagem para o botão de sair
import IconLogOut from "../../Assets/LogOutIconWhite.png"; // Imagem para o ícone de logout
import Notificacao from "../FuncionalidadeSininho/Notificacao"; // Importe o componente de Notificação
import "./NavBar.css";
import Notificacaodois from "../FuncionalidadeSininho/Notificacao2";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const navigate = useNavigate();

  const Menus = [
    { title: "Dashboard", path: "/dashboard" },
    {
      title: "Estoque",
      submenu: true,
      submenuItems: [
        { title: "Inventário", path: "/PagInventario" },
        { title: "Gerir/Add produtos", path: "/PagProdutos" },
        { title: "Dar Baixa Produtos", path: "/PagVenderProduto" },
        { title: "Gerir Categorias", path: "/PagGerirCategoria" },
        { title: "Gerir lotes", path: "/PagGerirLotes" },
        { title: "Mostrar Movimentos", path: "/PagMovimentos" },
        { title: "Importar Planilha", path: "/PagUploadExcel" },
        { title: "Cadastro de Fornecedor", path: "/PagCadFornecedor" },
        { title: "Pesquisa de Produtos", path: "/PagPesquisaFornecedor" },
      ],
    },
    {
      title: "Curva Abc",
      submenu: true,
      submenuItems: [
        { title: "Por frequência", path: "/PagCurvaABC" },
        { title: "Por valor", path: "/PagCurvaABCPorValor" },
      ],
    },
    { title: "Ponto de Pedido", path: "/PagPontoPedido" },
    { title: "PEPS", path: "/PagMovimentos" },
    { title: "Lote Econômico", path: "/PagLoteEconomico" },
    { title: "LOGS", path: "/PagHistorico" },
    { title: "Suas Informações", path: "/PagPerfil" },
    {
      title: "outros serviços",
      submenu: true,
      submenuItems: [
        { title: "Adicionar Funcionário", path: "/PagAddFunc" },
        { title: "Lista de Funcionários", path: "/PagFuncionarios" },
        { title: "Relatórios", path: "/PagRelatorios" },
        { title: "Gerenciar Grupos de Acessos", path: "/DefGrupoAcesso" },
      ],
    },
    { title: "Logout", spacing: true },
    { title: "Ajuda da Página", spacing: true },
  ];

  const toggleSubmenu = (index) => {
    if (open) {
      setSubmenuOpen(submenuOpen === index ? null : index);
    }
  };

  const toggleSidebar = () => {
    if (open) {
      setSubmenuOpen(null); // Fecha todos os submenus ao fechar a sidebar
    }
    setOpen(!open);
  };

  const handleLogOut = (navigate) => {
    // Função de logout
    console.log("Logout");
    // Após o logout, redireciona para a página inicial ou de login
    navigate("/login");
  };

  return (
    <div className="nav-container">
      {/* Sidebar */}
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
          {open && <input type="text" placeholder="Pesquisa" />}
        </div>
        <ul className="menu-list">
          {Menus.map((menu, index) => (
            <li key={index}>
              <div
                className={`menu-item ${menu.spacing ? "spaced" : ""}`}
                onClick={() =>
                  menu.submenu ? toggleSubmenu(index) : navigate(menu.path)
                }
              >
                <RiDashboardFill className="menu-icon" />
                {open && <span>{menu.title}</span>}
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`submenu-icon ${submenuOpen === index ? "rotated" : ""}`}
                  />
                )}
              </div>
              {menu.submenu && (
                <ul
                  className={`submenu-list ${submenuOpen === index && open ? "open" : ""}`}
                >
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="submenu-item"
                      onClick={() => navigate(submenuItem.path)}
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Footer buttons */}
        <div className="footer-btns">
          <div className="btnSair" onClick={() => navigate("/PagPerfil")}>
            <img src={OptionIcon} alt="Option Icon" />
          </div>

          <div className="btnNotificacao">
            <Notificacaodois />
          </div>

          <div className="btnSair" onClick={() => { handleLogOut(navigate); }}>
            <div id="DivNotificação">
              <img src={IconLogOut} alt="Logout Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
