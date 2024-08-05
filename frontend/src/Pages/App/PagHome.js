import React, { useContext } from "react";
import "../../Styles/App/PagHome.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.js";
import Cabecalho from "../../Components/CabecalhoHome.js";
import Redirect from "../../Functions/Redirect.js";
import ImageCaixa from '../../Assets/caixa.png';
import ImageABC from '../../Assets/curvaABC.png';
import ImageLote from '../../Assets/loteEconomico.png';
import ImagePEPS from '../../Assets/PEPS.png';
import ImagePedido from '../../Assets/pontodePedido.png';
import ImageMedio from '../../Assets/custoMedio.png';
//import Dashboard from "./Services/TesteDashboard.js";  // Importando o novo componente

function PagHome() {
  
  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;

  Redirect(User);

  const buttons = [
    { title: "Estoque", img: ImageCaixa, link: "/PagEscolhaProdutos" },
    { title: "Curva ABC", img: ImageABC, link: "/PagEscolhaCurvaABC", access: 1 },
    { title: "Ponto de Pedido", img: ImagePedido, link: "/PagPontoPedido" },
    { title: "PEPS", img: ImagePEPS, link: "/PEPS" },
    { title: "Lote Econômico", img: ImageLote, link: "/PagLoteEconomico" },
    { title: "Custo Médio", img: ImageMedio, link: "/pagInicial" },
  ];

  return (
    <div className="PagHome">
      <div className="CabecalhoHome">
        <Cabecalho />
      </div>
      <div className="DashBoardCss">
       {/*  <Dashboard />   Adicionando o Dashboard aqui */}
      </div>
      <div className="conteudoPaginaMaster">
        <div className="button-grid">
          {buttons.map((button, index) => {
            if (button.access && User && User.userData.Nivel_acesso < button.access) {
              return null;
            }
            return (
              <div key={index} className="button-item" onClick={() => navigate(button.link)}>
                <img src={button.img} alt={button.title} className="button-image" />
                <span className="button-title">{button.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PagHome;