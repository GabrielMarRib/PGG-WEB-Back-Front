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
import PrivateButton from "../../../../Config/PrivateButton.jsx";
import PrivateButtonPai from "../../../../Config/PrivateButtonPai.jsx";
import PrivateButtonSolo from "../../../../Config/PrivateButtonSolo.jsx";
import PrivateComponent from "../../../../Config/PrivateComponent.jsx";
import PrivateComponentEspecifico from "../../../../Config/PrivateComponentEspecifico.jsx";
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
        const response = await axios.post('http://localhost:80/php/', {  // acessa via post (SEMPRE SERÁ POST)                
          funcao: 'pegacategorias', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
          senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
        },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
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
        const response = await axios.post('http://localhost:80/php/', {
          funcao: 'ObterTotaisComprasEVendas',
          senha: '@7h$Pz!q2X^vR1&K'
        },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
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
        const response = await axios.post('http://localhost:80/php/', {
          funcao: 'verificaProdutosProximosVencimento',
          senha: '@7h$Pz!q2X^vR1&K'
        },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
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
        <PrivateComponentEspecifico intent={{ class: "Estoque", intentPage: "Upload de Excel ao estoque" }}>
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
        </PrivateComponentEspecifico>
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
        <PrivateComponentEspecifico intent={{ class: "Estoque", intentPage: "Movimento" }}>
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
        </PrivateComponentEspecifico>
      )
    },
    {
      title: <PrivateComponentEspecifico intent={{ class: "Ponto de Pedido", intentPage: "Página de Ponto de Pedido" }}>Ponto de Pedido</PrivateComponentEspecifico>,
      content: <PrivateComponentEspecifico intent={{ class: "Ponto de Pedido", intentPage: "Página de Ponto de Pedido" }}><DashboardPP /></PrivateComponentEspecifico>
    },
    {
      title: "",
      content: (
        <PrivateComponentEspecifico intent={{ class: "Estoque", intentPage: "Movimento" }}>
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
        </PrivateComponentEspecifico>
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
          <div className="btnSair" style={{ cursor: 'pointer' }} onClick={() => navigate("/PagPerfil")}>
            <img src={OptionIcon} />
          </div>
          <div className="btnNotificacao">
            <Notificacao />
          </div>

          <div className="btnSair" style={{ cursor: 'pointer' }} onClick={() => { handleLogOut(navigate); }}>
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
          <PrivateButtonPai classe={"Estoque"} className={isSelectEstoque ? "menu-button-Select" : "menu-button"} onClick={handleEstoqueClick}>
            <img src={ImageCaixa} alt={"Estoque"} className="button-image" />
            <span className="button-title">Estoque</span>
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
          <PrivateButtonPai classe={"Curva ABC"} className={isSelectCurvaAbc ? "menu-button-Select" : "menu-button"} onClick={handleABCClick}>
            <img src={ImageABC} alt={"Curva ABC"} className="button-image" />
            <span className="button-title">Curva ABC</span>
          </PrivateButtonPai>

          {showABCOptions && (
            <div className="abc-options">
              <PrivateButton className="option-button" nome="Por Frequência" route={'/PagCurvaABC'} intent={{ class: 'Curva ABC', intentPage: 'Curva ABC Por Frequencia' }} />
              <PrivateButton className="option-button" nome="Por Valor" route={'/PagCurvaABCPorValor'} intent={{ class: 'Curva ABC', intentPage: 'Curva ABC Por Valor' }} />
            </div>
          )}

          <PrivateButtonPai classe={"Ponto de Pedido"} className={isSelectPontoPedido ? "menu-button-Select" : "menu-button"} onClick={handlePontoPedidoClick}>
            <img src={ImagePedido} alt={"Ponto de Pedido"} className="button-image" />
            <span className="button-title">Ponto de Pedido</span>
          </PrivateButtonPai>

          {showPontoPedido && (
            <div className="abc-options">
              <PrivateButton className="option-button" nome="Página de Ponto de Pedido" route={'/PagPontoPedido'} intent={{ class: 'Ponto de Pedido', intentPage: 'Página de Ponto de Pedido' }} />
            </div>
          )}

          <PrivateButtonSolo className={"menu-button"} route={'/PagMovimentos'} intent={{ class: 'Estoque', intentPage: 'Movimento' }}  >
            <img src={PEPS} alt={"PEPS"} className="button-image" />
            <span className="button-title">PEPS</span>
          </PrivateButtonSolo>

          <PrivateButtonSolo className={"menu-button"} route={'/PagLoteEconomico'} intent={{ class: 'Estoque', intentPage: 'Lote econômico' }}  >
            <img src={ImageLote} alt={"Lote Economico"} className="button-image" />
            <span className="button-title">Lote Economico</span>
          </PrivateButtonSolo>

          <PrivateButtonSolo className={"menu-button"} route={'/PagHistorico'} intent={{ class: 'Atividade Administrativa', intentPage: 'Histórico' }}  >
            <img src={historia} alt={"Logs"} className="button-image" />
            <span className="button-title">Logs</span>
          </PrivateButtonSolo>

          <button className={"menu-button"} onClick={() => { navigate('/PagPerfil') }}>
            <img src={OptionIcon} alt={"Logs"} className="button-image" />
            <span className="button-title">Options</span>
          </button>
        </div>
      </div>

      <div className="content">
        <div className="header">
          <div className="date-box">
            <p>- Pequeno Grande Gestor -</p>
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
