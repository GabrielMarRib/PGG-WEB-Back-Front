import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
//import "../../../Styles/PagProdutos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import { UserContext } from "../../../../../Context/UserContext.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import FiltragemFornecedor from '../../../../../Components/BuscaFornecedor/FiltragemFornecedor.js';
import BuscaCategoriasComponenteCopia from "../../../../../Components/BuscaCategoria/BuscaCategoriasComponenteCopia.js";
import ProdutosModal from "../../../../../Components/Modais/ProdutosModal/ProdutosModal.js";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import { PermissoesContext } from "../../../../../Context/PermissoesContext.js";
import { checaPermissaoVisualizacao } from "../../../../../Config/Permissoes.js";
// Componente Modal

function PagInventario() {
    const { Alerta } = useAlerta(); // Usa o hook useAlerta
    const UserOBJ = useContext(UserContext);
    const Permissoes = useContext(PermissoesContext);
    const User = UserOBJ.User;
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtosAgrupados, setProdutosAgrupados] = useState({});
    const [pesquisaProduto, setPesquisaProduto] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [repescarInfo, setRepescarInfo] = useState(false);
    const [produtoSelecId, setProdutoSelecId] = useState(null);
    const [FiltroFornecedor, setFiltroFornecedorSelecionado] = useState('sem filtro');
    const [FiltroCategoria, setFiltroCategoriaSelecionada] = useState('sem filtro');
    const [mensagemVazia, setMensagemVazia] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Função para agrupar produtos por fornecedor
    const agruparProdutosPorFornecedores = (produtos, fornecedores) => {
        const agrupados = {};
        const semFornecedor = [];

        produtos.forEach(produto => {
            const fornecedor = fornecedores.find(f => f.id_fornecedor === produto.fornecedor);
            if (fornecedor) {
                if (!agrupados[fornecedor.nome]) {
                    agrupados[fornecedor.nome] = [];
                }
                agrupados[fornecedor.nome].push(produto);
            } else {
                semFornecedor.push(produto);
            }
        });
        if (semFornecedor.length > 0) {
            agrupados["Sem Fornecedor"] = semFornecedor;
        }
    
        return agrupados;
    };

    useEffect(() => {
        pegaProdutos();
    }, []);

    const pegaProdutos = async (dataFRESH) => {
        try {
          const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
            funcao: 'pegaDadosComCatFornecedor', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
            senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
          });
          setProdutos(response.data); // coloca a LISTA de categorias em uma useState
          console.log(response.data) // log para sabermos o que foi pego.
          setCarregando(false);
          if (dataFRESH)
            return response.data
        } catch (error) {
          console.log("deu ruim: " + error) // log para sabermos qual foi o erro
        }
      };

    const ColhendoFornecedor = async (setOBJ) => {
        try {
            const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                funcao: 'pegarTodosFornecedores',
                senha: '@7h$Pz!q2X^vR1&K'
            });
            setOBJ(response.data.fornecedores);
            console.log(response.data.fornecedores);
        } catch (error) {
            console.log("Falha na coleta: " + error);
        }
    };

    const pegaFornecedor = async () => {
        await ColhendoFornecedor(setFornecedores);
    };

    useEffect(() => {
        pegaFornecedor();
    }, []);

    // Função para aplicar filtros e pesquisa antes de agrupar
    const filtrarProdutos = () => {
        return produtos.filter((produto) => {
            const nomeProdutoMatch = isNaN(pesquisaProduto)
                ? produto.nome.toLowerCase().includes(pesquisaProduto.toLowerCase())
                : produto.id_produtos.includes(pesquisaProduto);

            const fornecedorMatch = FiltroFornecedor !== 'sem filtro'
                ? produto.fornecedor === FiltroFornecedor.id_fornecedor
                : true;

            const categoriaMatch = FiltroCategoria !== 'sem filtro'
                ? !FiltroCategoria
                    ? true
                    : produto.categoria === FiltroCategoria.id_categorias
                : true;

            return nomeProdutoMatch && fornecedorMatch && categoriaMatch;
        });
    };

    useEffect(() => {
        if (produtos.length > 0 && fornecedores.length > 0) {
            // Aplica as filtragens antes de agrupar os produtos
            const produtosFiltrados = filtrarProdutos();
            const agrupados = agruparProdutosPorFornecedores(produtosFiltrados, fornecedores);
            setProdutosAgrupados(agrupados);
        }
    }, [produtos, fornecedores, pesquisaProduto, FiltroFornecedor, FiltroCategoria]);

    const handleModal = (bool) => {
        setShowModal(bool);
    };

    const handleSelecionarProd = (produto) => {
        setProdutoSelecId(produto.id_produtos);
        setProdutoSelecionado(produto);
        handleModal(true);
    };

    const atualizaProd = async () => {
        console.log("passou no restrito")
        const produtosFresh = await pegaProdutos(true);
        const produtofiltrado = produtosFresh.find((produto) => produto.id_produtos === produtoSelecId);
        console.log(produtofiltrado)
        setProdutoSelecionado(produtofiltrado)
      }


    const [showPopup, setShowPopup] = useState(false); 


    return (
        <div className="Produtos">
            <div className="DivForms">
                <div className="CabecalhoHome">
                    <CabecalhoHome />
                </div>

                {showModal &&
                    <ProdutosModal
                        fechar={() => handleModal(false)}
                        produtoOBJ={produtoSelecionado}
                        opcao={'Gerais'}
                        atualiza={() => atualizaProd()}
                    />
                }

                <Titulo tituloMsg="Inventário" />

                <header className="cabecalhoBtnAjuda">
                    <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
                        Ajuda
                    </div>
                </header>

                <div className="BtnAjuda">
                    {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
                        <BtnAjuda /* chama o btnAjuda */
                        fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
                        msgChave={"INVENTARIO"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
                        />
                    )}
                </div>
                
                <AlertaNotificação />
                <button className="voltar" onClick={() => { navigate("/PagHome"); }}>
                    Voltar
                </button>

                
                {/* <button onClick={()=>{checaPermissaoVisualizacao(Permissoes.Permissoes.data, Permissoes.Permissoes.nome, 'PagAddFunc' )}}>aa</button> */}
                <div className="telaInteira">
                    <div className="TelaConteudo">
                        <div className="terminal">
                            <div className="barra-pesquisa">

                                <div className="teste">
                                    <FiltragemFornecedor setFiltroSelecionado={setFiltroFornecedorSelecionado} FiltroSelecionado={FiltroFornecedor} />
                                </div>
                                <div className="teste">
                                    <BuscaCategoriasComponenteCopia setFiltroSelecionado={setFiltroCategoriaSelecionada} FiltroSelecionado={FiltroCategoria} />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Pesquisar produto..."
                                    value={pesquisaProduto}
                                    onChange={(e) => setPesquisaProduto(e.target.value)}
                                />
                            </div>

                            {carregando ? (
                                <div>Carregando...</div>
                            ) : (
                                mensagemVazia ? (
                                    <div>Nenhum produto encontrado na categoria selecionada.</div>
                                ) : (
                                    Object.keys(produtosAgrupados).length > 0 ? (
                                        Object.keys(produtosAgrupados).map((fornecedor, index) => (
                                            <div key={index}>
                                                <h3>{fornecedor}</h3>
                                                {produtosAgrupados[fornecedor].map((produto, idx) => (
                                                    <ul key={idx} className="produtoGerado">
                                                        <div className="conteudoProdutoGerado">
                                                            <li className="liGerado">{produto.nome}</li>
                                                            <li className="liGerado">Código: {produto.id_produtos}</li>
                                                            <button onClick={() => handleSelecionarProd(produto)}>
                                                                Editar Produto
                                                            </button>
                                                        </div>
                                                    </ul>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        <div>Nenhum produto encontrado com o termo pesquisado.</div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PagInventario;