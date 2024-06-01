import React, { useState, useEffect } from 'react'
import TesteNavBar2 from '../../../Components/Cabecalho';
import '../../../Styles/PagProdutos.css'
import lupa from '../../../Assets/lupa.png';
import axios from 'axios';
import { apagarCampos, CheckCamposNulos, CheckCamposVazios } from '../../../Functions/Functions';
import { camposNaoPreenchidos } from '../../../Messages/Msg';

function PagProdutos() {
    //genérico
    const [nome, setNome] = useState('');
    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [custoUnit, setCustoUnit] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState('');

    //curva ABC
    const [quantidadeConsumo, setQuantidadeConsumo] = useState(0);

    //Ponto de Pedido
    const [demandaDiaria, setDemandaDiaria] = useState(0);
    const [tempoEntrega, setTempoEntrega] = useState(0);
    const [tempoReposicao,setTempoReposicao] = useState(0);

    const [restricao, setRestricao] = useState('');
    let vezes = 1;


    const PegaDadosGeralDB = async () => {
        try {
            const response = await axios.get('http://localhost:4000/PegaProdutos');
            console.log(response.data);
            const estoqueData = response.data.map(item => ({ id: item.id, ...item.data }));
            setDadosEstoqueGeral(estoqueData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        console.log(vezes++);
        PegaDadosGeralDB(); // Fetch data when the component mounts
    }, []);

    const pegaProdutos = (item) => {// sem nenhum acento                                                                                     // com acentos      
        if (restricao === '' || item.Nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(restricao.toLowerCase()) || item.Nome.toLowerCase().includes(restricao.toLowerCase())) {
            return (
                <div key={item.id}>
                    <li>{item.Nome}</li>
                    <button>Editar item</button>
                    <li>--------------</li>
                </div>
            )
        }
    }

    const pesquisaProduto = async (pesquisa) => {
        setRestricao(pesquisa);
    }

    const AddProduto = async () => {
        if (CheckCamposNulos([custoUnit, quantidade, quantidadeConsumo]) || CheckCamposVazios([nome, descricao])) {
            alert(camposNaoPreenchidos(true));
            return;
        }
        try {
            //const 
            await axios.post('http://localhost:4000/insereProdutos', {
                descricao: descricao,
                nome: nome,
                custoUnit: custoUnit,
                quantidade: quantidade,
                qdeCon: quantidadeConsumo
            });



            alert("inseriu o produto mlk kakakakak")
            PegaDadosGeralDB();
        } catch (erro) {
            console.log(erro);
        } finally {
            apagarCampos([setNome, setCustoUnit, setQuantidade, setDescricao, setQuantidadeConsumo])
        }
    };


    return (
        <div className='Produtos'>
            <div id="DivForms">
                <div className='Cabecalho'>
                    <TesteNavBar2 />
                </div>
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
                                type="number"
                                id="precoProduto"
                                value={custoUnit}
                                onChange={(e) => setCustoUnit(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="quantidadeProduto">Quantidade:</label>
                            <input
                                type="number"
                                id="quantidadeProduto"
                                value={quantidade}
                                onChange={(e) => setQuantidade(parseInt(e.target.value))}
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
                                onChange={(e) => setQuantidadeConsumo(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Demanda média de vendas diárias:</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={demandaDiaria}
                                onChange={(e) => setDemandaDiaria(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Tempo estimado de entrega:</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={tempoEntrega}
                                onChange={(e) => setTempoEntrega(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="grupo-input">
                            <label htmlFor="qtdeConsumo">Tempo de reposição:</label>
                            <input
                                id="qtdeConsumo"
                                rows="3"
                                value={tempoReposicao}
                                onChange={(e) => setTempoReposicao(parseInt(e.target.value))}
                            />
                        </div>

                        <button onClick={() => { AddProduto() }} >Inserir Produto</button>
                    </div>
                </div>
                <div className="terminal">
                    <div className="barra-pesquisa">
                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
                            onChange={(e) => pesquisaProduto(e.target.value)}
                        />
                        <button className="botao-pesquisa">
                            <img src={lupa} alt="Descrição da imagem" className="imagem-botao" />
                        </button>
                    </div>
                    <ul className="lista-produtos">
                        {dadosEstoqueGeral.map(pegaProdutos)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PagProdutos