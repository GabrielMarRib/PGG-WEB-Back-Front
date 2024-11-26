import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../Assets/logoRigelTech.png";
import OptionIcon from "../../Assets/OptionsWhite.png";
import IconLogOut from "../../Assets/LogOutIconWhite.png";
import Notificacao from "../FuncionalidadeSininho/Notificacao";
import "./NavBar.css";
import Notificacaodois from "../FuncionalidadeSininho/Notificacao2";
import { handleLogOut } from "../../Functions/Functions";


const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [TermoPesquisa, setTermoPesquisa] = useState("");
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
      title: "Outros Serviços",
      submenu: true,
      submenuItems: [
        { title: "Adicionar Funcionário", path: "/PagAddFunc" },
        { title: "Lista de Funcionários", path: "/PagFuncionarios" },
        { title: "Relatórios", path: "/PagRelatorios" },
        { title: "Gerenciar Grupos de Acessos", path: "/DefGrupoAcesso" },
      ],
    },
    { title: "Ajuda da Página", spacing: true },
  ];

  const toggleSubmenu = (index) => {
    if (open) {
      setSubmenuOpen(submenuOpen === index ? null : index);
    }
  };

  const toggleSidebar = () => {
    if (open) {
      setSubmenuOpen(null);
    }
    setOpen(!open);
  };

  const filteredMenus = Menus.filter((menu) => {
    if (menu.title.toLowerCase().includes(TermoPesquisa.toLowerCase())) return true;
    if (menu.submenu) {
      return menu.submenuItems.some((submenuItem) =>
        submenuItem.title.toLowerCase().includes(TermoPesquisa.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div className="nav-container">
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
          {filteredMenus.map((menu, index) => (
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
                  {menu.submenuItems
                    .filter((submenuItem) =>
                      submenuItem.title.toLowerCase().includes(TermoPesquisa.toLowerCase())
                    )
                    .map((submenuItem, subIndex) => (
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

        <div className="footer-btns">
          <div className="btnSair" onClick={() => navigate("/PagPerfil")}>
            <img src={OptionIcon} alt="Option Icon" />
          </div>
          <div className="btnNotificacao">
            <Notificacaodois />
          </div>
          <div className="btnSair" onClick={() => handleLogOut(navigate)}>
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
