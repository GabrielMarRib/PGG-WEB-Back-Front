import React, { useState, useEffect, useCallback, memo } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import BuscaCategoriasComponentes from "../../../Components/BuscaCategoriasComponente.js";
import FiltragemComponente from "../../../Components/FiltragemComponente.js";
import FiltragemFornecedor from "../../../Components/FiltragemFornecedor.js";
import "../../../Styles/PagProdutos.css";
import axios from "axios";
import { CheckCamposVazios } from "../../../Functions/Functions.js";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext.js";

import ProdutosModal from "../../../Components/ProdutosModal.js";
import Titulo from "../../../Components/Titulo.jsx";

function PagTeste() {
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate();

    const { Alerta } = useAlerta();
    const [codigo, setCodigo] = useState(null);
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [valorCompra, setValorCompra] = useState('');
    const [valorVenda, setValorVenda] = useState('');


    //Pesquisa
    const [carregando, setCarregando] = useState(true);

    //Produtos
    const [produtos, setProdutos] = useState([]);
    const [pesquisaProduto, setPesquisaProduto] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);
    const [repescarInfo, setRepescarInfo] = useState(false);
    const [produtoSelecId, setProdutoSelecId] = useState(null);

    //Categoria:
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [FiltroSelecionado, setFiltroSelecionado] = useState(null);
    const [FiltroFornecedor, setFiltroFornecedorSelecionado] = useState('sem filtro');
    const [mensagemVazia, setMensagemVazia] = useState(false); // Estado para controlar a mensagem

    //Fornecedor:
    const [fornecedor, setFornecedor] = useState("");
    const [FornecedorSelect, setFornecedorSelect] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        pegaProdutos();
    }, []);

    const pegaProdutos = async (dataFRESH) => {
        try {
            const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
                funcao: 'pegaDadosComCatFornecedor', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
                senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
            });
            setProdutos(response.data); //
            console.log(response.data) // 
            setCarregando(false);
            if (dataFRESH)
                return response.data
        } catch (error) {
            console.log("deu ruim: " + error) // log para sabermos qual foi o erro
        }
    };

    const produtosFiltrados = produtos.filter((produto) => {
        const pesquisa = isNaN(pesquisaProduto)
            ? produto.nome.toLowerCase().includes(pesquisaProduto.toLowerCase())
            : produto.id_produtos.includes(pesquisaProduto)

        const fornecedor = FiltroFornecedor === 'sem filtro'
            ? true
            : produto.fornecedor === FiltroFornecedor?.id_fornecedor

        return pesquisa && fornecedor
    });

    const handleModal = (bool) => {
        setShowModal(bool);
    }

    const handleSelecionarProd = (produto) => {
        setProdutoSelecId(produto.id_produtos);
        setProdutoSelecionado(produto);
    }


    useEffect(() => {
        console.log("Categoria Selecionada pelo componente" + JSON.stringify(categoriaSelecionada))
    }, [categoriaSelecionada])

    return (
        <div className="Produtos">
            <div className="DivForms">
                <div className="CabecalhoHome">
                    <CabecalhoHome />
                </div>

                <Titulo
                    tituloMsg='Gerenciamento de Produtos'
                />
                <AlertaNotificação />
                <button
                    className="voltar"
                    onClick={() => {
                        navigate("/PagEscolhaProdutos");
                    }}
                >
                    Voltar
                </button>
                <button onClick={() => { console.log(FiltroFornecedor) }}>testar</button>
                {showModal &&
                    null
                }

                <div className="telaInteira">
                    <div className="TelaConteudo">
                        <div className="terminal">
                            <div className="barra-pesquisa">

                                <div className="teste">
                                    <FiltragemFornecedor setFiltroSelecionado={setFiltroFornecedorSelecionado} FiltroSelecionado={FiltroFornecedor} />
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
                                    produtosFiltrados.length > 0 ? (
                                        produtosFiltrados.map((produto, index) => (
                                            <ul key={index} className="produtoGerado">
                                                <div className="conteudoProdutoGerado">
                                                    <li className="liGerado">{produto.nome}</li>
                                                    <li className="liGerado">Código: {produto.id_produtos}</li>
                                                    <button onClick={() => {
                                                        handleSelecionarProd(produto);
                                                        handleModal(true);
                                                    }}>Editar produto</button>
                                                </div>
                                            </ul>
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

export default PagTeste