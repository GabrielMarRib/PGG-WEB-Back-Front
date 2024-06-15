import React, { useState, useEffect, useCallback, memo } from 'react';
import TesteNavBar2 from '../../../Components/Cabecalho';
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/PagProdutos.css';
import axios from 'axios';
import { apagarCampos, CheckCamposNulos, CheckCamposVazios } from '../../../Functions/Functions';
import { PegaDadosGeralDB } from '../../../Functions/Functions';
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";



const ProdutoItem = memo(({ item }) => ( //evita de rerenderizar essa porra
    <div key={item.id}>
        <li>{item.data.Nome}</li>
        <button>Editar item</button>
        <li>--------------</li>
    </div>
));

const ProdutoList = memo(({ produtos, pegaProdutos }) => ( //evita de rerenderizar essa porra
    <ul className="lista-produtos">
        {produtos.map(pegaProdutos)}
    </ul>
));

function PagProdutos() {

    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate();
    Redirect(User);

    const { Alerta } = useAlerta();
    const [nome, setNome] = useState('');
    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [custoUnit, setCustoUnit] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState('');

    // CurvaAbc
    const [quantidadeConsumo, setQuantidadeConsumo] = useState(0);

    //PontoDePedido
    const [demandaDiaria, setDemandaDiaria] = useState(0);
    const [tempoEntrega, setTempoEntrega] = useState(0);
    const [tempoReposicao, setTempoReposicao] = useState(0);
    const [produtosMensais, setProdutosMensais] = useState(0);

    const [restricao, setRestricao] = useState('');

    useEffect(() => {
        PegaDadosGeralDB(setDadosEstoqueGeral);
    }, []);

    const pegaProdutos = useCallback(
        (item) => {
            console.log('rerenderizando o produto:', item.data.Nome);
            if (
                restricao === '' ||
                item.data.Nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(restricao.toLowerCase()) ||
                item.data.Nome.toLowerCase().includes(restricao.toLowerCase())
            ) {
                return <ProdutoItem key={item.id} item={item} />;
            }
            return null;
        },
        [restricao]
    );

    const pesquisaProduto = async (pesquisa) => {
        setRestricao(pesquisa);
    };

    const AddProduto = async () => {
        if (CheckCamposNulos([custoUnit, quantidade, quantidadeConsumo, demandaDiaria, tempoEntrega, tempoReposicao, produtosMensais]) || CheckCamposVazios([nome, descricao])) {
            Alerta(1, "Campos não preenchidos")
            return;
        }
        try {
            // Estoque

            const ProdutoId = await axios.post('http://localhost:4000/insereProdutos', {
                descricao: descricao,
                nome: nome,
                custoUnit: custoUnit,
                quantidade: quantidade,
            });

            // CurvaAbc
            await axios.post('http://localhost:4000/insereCurvaAbc', {
                produtoId: ProdutoId.data.response,
                qdeCon: quantidadeConsumo,
            });

            // PontoDePedido
            const EstoqueSeg = parseInt(demandaDiaria) * parseInt(tempoEntrega);
            const consumoMedio = parseFloat((produtosMensais / 30).toFixed(2))
            const PontoDePedido = Math.ceil(consumoMedio * tempoReposicao) + EstoqueSeg

            await axios.post('http://localhost:4000/inserePontoDePedido', {
                produtoId: ProdutoId.data.response,
                DM: demandaDiaria,
                ES: EstoqueSeg,
                PP: PontoDePedido,
                QV: produtosMensais,
                TE: tempoEntrega,
                TR: tempoReposicao
            });

            console.log(PontoDePedido)
            Alerta(2, "Produto inserido");
            PegaDadosGeralDB(setDadosEstoqueGeral);
        } catch (erro) {
            console.log(erro);
        } finally {
            apagarCampos([setNome, setCustoUnit, setQuantidade, setDescricao, setQuantidadeConsumo, setDemandaDiaria, setTempoEntrega, setTempoReposicao, setProdutosMensais]);
        }
    };

    return (
        <div className="Produtos">
            <div id="DivForms">
                <div className="CabecalhoHome">
                    <CabecalhoHome />
                </div>
                <AlertaNotificação />
                <button className='voltar' onClick={() => { navigate("/PagEscolhaProdutos") }}>
                Voltar
                </button>
                <div className="container-tela-produtos">
                    
                    <div className="grupo-input-produto">
                        <h2>Adicione um produto:</h2>
                        <div className="grupo-input">
                            <label htmlFor="nomeProduto">Nome:</label>
                            <input
                                type="text"
                                id="nomeProduto"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="precoProduto">Custo Unitário:</label>
                            <input
                                id="precoProduto"
                                value={custoUnit}
                                onChange={(e) => setCustoUnit(parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="quantidadeProduto">Quantidade:</label>
                            <input
                                id="quantidadeProduto"
                                value={quantidade}
                                onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="descricaoProduto">Descrição:</label>
                            <input
                                id="descricaoProduto"
                                rows="3"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Quantidade de consumo:</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={quantidadeConsumo}
                                onChange={(e) => setQuantidadeConsumo(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Demanda média de vendas diárias (DM):</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={demandaDiaria}
                                onChange={(e) => setDemandaDiaria(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Tempo Estimado (TE):</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={tempoEntrega}
                                onChange={(e) => setTempoEntrega(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Tempo de reposição (TR):</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={tempoReposicao}
                                onChange={(e) => setTempoReposicao(parseInt(e.target.value) || 0)}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Quantidade de produtos vendidos no mês (QV):</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={produtosMensais}
                                onChange={(e) => setProdutosMensais(parseInt(e.target.value) || 0)
                                }
                            />
                        </div>

                        <button onClick={() => AddProduto()}>Inserir Produto</button>
                    </div>
                </div>
                <div className="terminal">
                    <div className="barra-pesquisa">
                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
                            onChange={(e) => pesquisaProduto(e.target.value)}
                        />
                    </div>
                    <ProdutoList produtos={dadosEstoqueGeral} pegaProdutos={pegaProdutos} />
                </div>
            </div>
        </div>
    );
}

export default PagProdutos;
