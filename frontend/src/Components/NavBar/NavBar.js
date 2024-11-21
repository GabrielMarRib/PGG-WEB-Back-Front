import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../Assets/logoRigelTech.png";
import "./NavBar.css";

const NavBar = () => {
  const [open, setOpen] = useState(true);
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
    { title: "Ponto de Pedido", path: "/PagPontoPedido" },
    { title: "PEPS", path: "/PagMovimentos" },
    { title: "Lote Econômico", path: "/PagLoteEconomico" },
    { title: "LOGS", path: "/PagHistorico" },
    { title: "Logout", spacing: true },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  return (
    <div className="nav-container">
      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : "collapsed"}`}>
        <BsArrowLeftShort
          className={`toggle-btn ${!open ? "rotate" : ""}`}
          onClick={() => setOpen(!open)}
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
                    className={`submenu-icon ${
                      submenuOpen === index ? "rotated" : ""
                    }`}
                  />
                )}
              </div>
              {menu.submenu && (
                <ul
                  className={`submenu-list ${
                    submenuOpen === index ? "open" : ""
                  }`}
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
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Main Content</h1>
      </div>
    </div>
  );
};

export default NavBar;
