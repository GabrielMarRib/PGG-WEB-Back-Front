// import { useState } from 'react';
// import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
// import { AiFillEnvironment } from "react-icons/ai";
// import { RiDashboardFill } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import LogoIcon from '../../Assets/logoRigelTech.png';
// import './NavBar.css';

// const NavBar = () => {
//   const [open, setOpen] = useState(true);
//   const [submenuOpen, setSubmenuOpen] = useState(null); // Controla qual submenu está aberto
//   const navigate = useNavigate();
//   const Menus = [
//     { title: "Dashboard", path: "/dashboard" },
//     {
//       title: "Estoque",
//       submenu: true,
//       submenuItems: [
//         { title: "Inventário", path: "/PagInventario" },
//         { title: "Gerir/Add produtos", path: "/PagProdutos" },
//         { title: "Dar Baixa Produtos", path: "/PagVenderProduto" },
//         { title: "Gerir Categorias", path: "/PagGerirCategoria" },
//         { title: "Gerir lotes", path: "/PagGerirLotes" },
//         { title: "Mostrar Movimentos", path: "/PagMovimentos" },
//         { title: "Importar Planilha", path: "/PagUploadExcel" },
//         { title: "Cadastro de Fornecedor", path: "/PagCadFornecedor" },
//         { title: "Pesquisa de Produtos", path: "/PagPesquisaFornecedor" },
//       ],
//     },
//     { title: "Ponto de Pedido", path: "/PagPontoPedido" },
//     { title: "PEPS", path: "/PagMovimentos" },
//     { title: "Lote Econômico", path: "/PagLoteEconomico" },
//     { title: "LOGS", path: "/PagHistorico" },
//     { title: "Logout", spacing: true },
//   ];

//   const handleSubmenuToggle = (index) => {
//     setSubmenuOpen(submenuOpen === index ? null : index); // Alterna entre abrir e fechar o submenu
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className={`bg-slate-800 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative sidebar`}>
//         <BsArrowLeftShort
//           className={`bg-transparent text-white text-3xl absolute -right-3 top-9 cursor-pointer ${!open && "rotate-180"}`}
//           onClick={() => setOpen(!open)}
//         />
//         <div className="inline-flex">
//           <img src={LogoIcon} className={`text-4xl rounded cursor-pointer block float-left mr-3 duration-500 ${!open && "rotate-[360deg]"}`} />
//           <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>
//             PGG
//           </h1>
//         </div>

//         {/* Search */}
//         <div className={`flex items-center rounded-md bg-slate-700 mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
//           <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`} />
//           <input
//             type={"search"}
//             placeholder="Pesquisa"
//             className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}
//           />
//         </div>

//         {/* Menu */}
//         <ul className="pt-2 h-full overflow-y-auto submenu">
//           {Menus.map((menu, index) => (
//             <div key={index}>
//               <li
//                 onClick={() => menu.submenu ? handleSubmenuToggle(index) : navigate(menu.path || "#")}
//                 className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-orange-950 rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
//               >
//                 <span className="text-2xl block float-left">
//                   <RiDashboardFill />
//                 </span>
//                 <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
//                   {menu.title}
//                 </span>
//                 {menu.submenu && open && (
//                   <BsChevronDown className={`${submenuOpen === index && "rotate-180"} duration-200`} />
//                 )}
//               </li>

//               {/* Submenu */}
//               <ul
//                 className={`overflow-hidden transition-all duration-500 ${submenuOpen === index && open ? "max-h-100" : "max-h-0"}`}
//               >
//                 {menu.submenu &&
//                   menu.submenuItems.map((submenuItem, subIndex) => (
//                     <li
//                       key={subIndex}
//                       onClick={() => navigate(submenuItem.path)}
//                       className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-orange-950 rounded-md`}
//                     >
//                       {submenuItem.title}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           ))}
//         </ul>
//       </div>

//       {/* Content Area */}
//       <div className="p-7">

//       </div>
//     </div>
//   );
// };

// export default NavBar;
