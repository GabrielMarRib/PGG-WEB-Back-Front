import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/PagProdutos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { UserContext } from "../../../Context/UserContext.js";
import Titulo from "../../../Components/Titulo.jsx";
import FiltragemFornecedor from '../../../Components/FiltragemFornecedor';
import FiltragemCategoria from "../../../Components/FiltragemCategoria";

// Componente Modal
function Modal({ show, handleClose, produto, onConfirm }) {
    const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade do produto
    const dataAtual = new Date().toLocaleDateString(); // Data atual formatada

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmar Pedido</h2>
                <p>Produto: {produto.nome}</p>
                <p>Código: {produto.id_produtos}</p>
                <p>Data do Pedido: {dataAtual}</p> {/* Exibe a data atual */}
                
                {/* Campo de input para a quantidade */}
                <div>
                    <label>Quantidade: </label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)} // Atualiza a quantidade
                        min="1"
                    />
                </div>
                
                <button onClick={handleClose}>Fechar</button>
                <button onClick={() => onConfirm(quantidade, dataAtual)}>Confirmar Pedido</button> {/* Confirma o pedido */}
            </div>
        </div>
    );
}

function PagPesquisaFornecedor() {
    const { Alerta } = useAlerta(); // Usa o hook useAlerta
    const UserOBJ = useContext(UserContext); 
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
        produtos.forEach(produto => {
            const fornecedor = fornecedores.find(f => f.id_fornecedor === produto.fornecedor);
            if (fornecedor) {
                if (!agrupados[fornecedor.nome]) {
                    agrupados[fornecedor.nome] = [];
                }
                agrupados[fornecedor.nome].push(produto);
            }
        });
        return agrupados;
    };

    useEffect(() => {
        pegaProdutos();
    }, []);

    const pegaProdutos = async () => {
        try {
            const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                funcao: 'pegaDadosComCatFornecedor', 
                senha: '@7h$Pz!q2X^vR1&K' 
            });
            setProdutos(response.data);
            console.log(response.data);
            setCarregando(false);
        } catch (error) {
            console.log("deu ruim: " + error);
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
                ? produto.categoria === FiltroCategoria.id_categorias
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

    const handleConfirmarPedido = (quantidade, dataAtual) => {
        console.log(`Pedido confirmado: Produto ${produtoSelecionado.nome}, Quantidade: ${quantidade}, Data: ${dataAtual}`);
        Alerta(2, "Pedido confirmado");
        handleModal(false);
    };

    return (
        <div className="Produtos">
            <div className="DivForms">
                <div className="CabecalhoHome">
                    <CabecalhoHome />
                </div>

                <Titulo tituloMsg="Pesquisa de Produtos" />
                <AlertaNotificação />
                <button className="voltar" onClick={() => { navigate("/PagEscolhaProdutos"); }}>
                    Voltar
                </button>

                <div className="telaInteira">
                    <div className="TelaConteudo">
                        <div className="terminal">
                            <div className="barra-pesquisa">

                                <div className="teste">
                                    <FiltragemFornecedor setFiltroSelecionado={setFiltroFornecedorSelecionado} FiltroSelecionado={FiltroFornecedor} />
                                </div>
                                <div className="teste">
                                    <FiltragemCategoria setFiltroSelecionado={setFiltroCategoriaSelecionada} FiltroSelecionado={FiltroCategoria} />
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
                                                                Pedir produto
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

            <Modal
                show={showModal}
                handleClose={() => handleModal(false)}
                produto={produtoSelecionado}
                onConfirm={handleConfirmarPedido}
            />
        </div>
    );
}

export default PagPesquisaFornecedor;
