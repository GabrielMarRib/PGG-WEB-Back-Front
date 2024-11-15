import React, { useState, useEffect, useContext } from "react";
import "./PagHome.css";
import { useNavigate, Link } from "react-router-dom";
import ImageABC from '../../../../Assets/curvaABC.png';
import ImageLote from '../../../../Assets/loteEconomico.png';
import ImagePEPS from '../../../../Assets/PEPS.png';
import ImagePedido from '../../../../Assets/pontodePedido.png';
import ExcelIcon from '../../../../Assets/exceliconcolor.png';
import custoMedio from '../../../../Assets/custoMedio.png';
import PEPS from '../../../../Assets/PEPS.png';
import ImageMedio from '../../../../Assets/custoMedio.png';
import ImageCaixa from '../../../../Assets/caixa.png';
import historia from '../../../../Assets/historia.png';
import IconLogOut from "../../../../Assets/LogOutIconWhite.png";
import Notificacao from "../../../../Components/FuncionalidadeSininho/Notificacao.js";
import DashboardPP from "../../../../Components/PontoDePedidoDashboard/DashboardPP.js";
import { handleLogOut } from "../../../../Functions/Functions.js";
import GraficoTeste from "../../../../Components/Graficos/GraficoVendaMensal/GraficoTeste.jsx";
import { UserContext } from "../../../../Context/UserContext.js";
import OptionIcon from "../../../../Assets/OptionsWhite.png";
import axios from "axios";


function PagHome() {

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showEstoqueOptions, setShowEstoqueOptions] = useState(false);
  const [showPontoPedido, setshowPontoPedido] = useState(false);
  const [showABCOptions, setShowABCOptions] = useState(false);
  const [isSelectEstoque, setisSelectEstoque] = useState(false);
  const [isSelectPontoPedido, setisSelectPontoPedido] = useState(false);
  const [isSelectCurvaAbc, setisSelectCurvaAbc] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [categorias, setCategorias] = useState([])
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVendas, setTotalVendas] = useState(0);
  const [produtosProximosVencimento, setProdutosProximosVencimento] = useState([]);

  // ()=> {}
  // function() {}

  useEffect(function () {
    const pegaCategorias = async () => { // função existe para separar async do useEffect...
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
          funcao: 'pegacategorias', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
          senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
        });
        console.log(response.data) // log para sabermos o que foi pego.
        setCategorias(response.data)
      } catch (error) {
        console.log("deu ruim: " + error) // log para sabermos qual foi o erro
      }
    };
    pegaCategorias(); //chama a função
  }, [])

  useEffect(() => {
    const obterTotais = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'ObterTotaisComprasEVendas',
          senha: '@7h$Pz!q2X^vR1&K'
        });

        setTotalCompras(response.data.total_compras);
        setTotalVendas(response.data.total_vendas);
      } catch (error) {
        console.log("Erro ao obter totais: " + error);
      }
    };

    obterTotais();
  }, []);

  useEffect(() => {
    const obterProdutosProximosVencimento = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'verificaProdutosProximosVencimento',
          senha: '@7h$Pz!q2X^vR1&K'
        });

        if (response.data.message) {
          setProdutosProximosVencimento(response.data.message);
        }
      } catch (error) {
        console.log("Erro ao obter produtos próximos ao vencimento: " + error);
      }
    };

    obterProdutosProximosVencimento();
  }, []);

  const sections = [
    {
      title: "",
      content: (
        <div className="card">
          <h3 className="card-title">Importar Planilha Excel</h3>
          <p className="card-text">
            <span className="destaque-texto">Novo!</span> Importe seus dados do excel de maneira fácil e rápida.
          </p>
          <center>
            <center><img src={ExcelIcon} className="button-image" style={{ height: '50px', width: '50px' }} /> </center>
            <button
              onClick={() => navigate("/PagUploadExcel")}
              className="btn-padrao"
            >
              Iniciar Importação
            </button>
          </center>
        </div>
      )
    },
    {
      title: "Valores dos Itens no Armazém",
      content: (
        <div>
          <p>Total de Compras: <br />R$ {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(totalCompras)}</p>
          <p>Total de Vendas: <br />R$ {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(totalVendas)}</p>
        </div>
      ),
    },
    {
      title: "",
      content: (
        <div className="card">
          <h3 className="card-title">Cálculo do Custo Médio</h3>
          <p className="card-text">
            Selecione "Custo Médio" no filtro e o produto para ver o cálculo com base nos movimentos.
          </p>
          <center><img src={custoMedio} className="button-image" style={{ height: '50px', width: '50px' }} /> </center>
          <center>
            <button
              onClick={() => navigate("/PagMovimentos")}
              className="btn-padrao"
            >
              Ir para Movimentos
            </button>
          </center>
        </div>
      )
    },
    { title: "Ponto de Pedido", content: <DashboardPP /> },
    {
      title: "",
      content: (
        <div className="card">
          <h3 className="card-title">Cálculo PEPS</h3>
          <p className="card-text">
            Selecione "PEPS" no filtro e o produto para ver o cálculo baseado no método de Primeiro a Entrar, Primeiro a Sair.
          </p>
          <center><img src={PEPS} className="button-image" style={{ height: '50px', width: '50px' }} /> </center>
          <center>
            <button
              onClick={() => navigate("/PagMovimentos")}
              className="btn-padrao"
            >
              Ir para Movimentos
            </button>
          </center>
        </div>
      )
    },
    {
      title: "Produtos Próximos ao Vencimento",
      content: (
        <div>
          <p className="card-title">Produtos que Vencem em Até 30 Dias.</p>
          <p className="contador">
            {produtosProximosVencimento.filter(produto => new Date(produto.dt_validade) < new Date()).length} Produtos Vencidos.
          </p>
          {produtosProximosVencimento.length > 0 ? (
            <div className="produtos-vencimento">
              <ul>
                {produtosProximosVencimento.map(produto => {
                  const produtoVencido = new Date(produto.dt_validade) < new Date();
                  return (
                    <li key={produto.numerolote} className="produto-item">
                      <div className="produto-nome">{produto.nome}</div>
                      <div className="produto-detalhes">
                        <span className={produtoVencido ? "produto-vencido" : ""}>
                          Vencimento em: <strong>{new Intl.DateTimeFormat('pt-BR').format(new Date(produto.dt_validade))}</strong>
                        </span>
                        <span> Lote: <strong>{produto.numerolote}</strong></span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="alerta">Não há produtos próximos ao vencimento.</p>
          )}
        </div>
      )
    },
    { title: "Evolução de Vendas", content: "Análise Mensal da Evolução de Vendas", isChart: true },

  ];

  const buttons = [
    { title: "Estoque", img: ImageCaixa, link: "/PagEscolhaProdutos" },
    { title: "Curva ABC", img: ImageABC, link: "/PagEscolhaCurvaABC", access: 1 },
    { title: "Ponto de Pedido", img: ImagePedido, link: "/PagPontoPedido" },
    { title: "PEPS", img: ImagePEPS, link: "/PagMovimentos" },
    { title: "Lote Econômico", img: ImageLote, link: "/PagLoteEconomico" },
    { title: "Logs", img: historia, link: "/PagHistorico" },
    { title: "Options", img: OptionIcon, link: "/PagPerfil" }
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
  const handlePontoPedidoClick = () => {
    setisSelectPontoPedido(prevState => !prevState)
    setshowPontoPedido(!showPontoPedido);
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





          <div className="btnSair" onClick={() => navigate("/PagPerfil")}>
            <img src={OptionIcon} />
          </div>

          <div className="btnNotificacao">
            <Notificacao />
          </div>



          <div className="btnSair" onClick={() => { handleLogOut(navigate); }}>
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
              <button className="option-button" onClick={() => navigate("/PagInventario")}>Inventário</button>
              <button className="option-button" onClick={() => navigate("/PagProdutos")}>Gerir/Add Produtos</button>
              <button className="option-button" onClick={() => navigate("/PagVenderProduto")}>Dar Baixa Produtos</button>
              <button className="option-button" onClick={() => navigate("/PagGerirCategoria")}>Gerir Categorias</button>
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


          <button className={isSelectPontoPedido ? "menu-button-Select" : "menu-button"} onClick={handlePontoPedidoClick}>
            <img src={buttons[2].img} alt={buttons[2].title} className="button-image" />
            <span className="button-title">{buttons[2].title}</span>
          </button>
          {showPontoPedido && (
            <div className="estoque-options">
              <button className="option-button" onClick={() => navigate("/PagPontoPedido")}>Ponto de pedido</button>
              <button className="option-button" onClick={() => navigate("/PagCadFornecedor")}>Cadastro de fornecedor</button>
              <button className="option-button" onClick={() => navigate("/PagPesquisaFornecedor")}>Pesquisa de produtos</button>
            </div>
          )}

          {buttons.slice(3).map((button, index) => (
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
              className={`grid-item ${section.title === "Evolução de Vendas" ? "evolucao-vendas" :
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
