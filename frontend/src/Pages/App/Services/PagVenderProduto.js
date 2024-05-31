import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagVenderProduto.css';
import axios from 'axios';
import { PegaDadosGeralDB } from '../../../Functions/Functions';

function PagVenderProduto() {
    const navigate = useNavigate();

    const [produto, setProduto] = useState('');
    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [custoUnitario, setCustoUnitario] = useState(0);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
    const [quantidadeVenda, setQuantidadeVenda] = useState(0);
    const [receitaEstimada, setReceitaEstimada] = useState(0);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);

    function pegaDadosUnicosEmVenda(item) {
        return (<option key={item.id} value={JSON.stringify({ id: item.id, data: item.data })}>{item.data.Nome}</option>)
        // if (!CodigoPontoPedido.includes(item.id))
        //   return (<option key={item.id} value={JSON.stringify({ id: item.id, Nome: item.Nome })}>{item.Nome}</option>)
        // else
        //   return null;
    }

    useEffect(() => {
        PegaDadosGeralDB(setDadosEstoqueGeral); // Fetch data when the component mounts
    }, []);

    const handleChange = (event) => { //codigo do git mt modificado
        try {
            const produtoSelec = JSON.parse(event.target.value);
            console.log(produtoSelec)
            setProdutoSelecionado(produtoSelec);
        } catch (error) {
            setProdutoSelecionado('');
        }
    };

    const handleReceita = (e) =>{
        const qtdeVenda = parseFloat(e.target.value)

        setQuantidadeVenda(qtdeVenda)

        
    } 
    return (
        <div className="PagVenderProduto">
            <div id="DivForms">
                <div className='Cabecalho'>
                    <Cabecalho />
                </div>
                <div className="container-tela-produtos">
                    <form className="formulario">
                        <div className="grupo-input-produto">
                            <div className="grupo-input">
                                <label>Selecione um produto:</label>
                                <select className="controle-formulario" value={JSON.stringify(produtoSelecionado)} onChange={handleChange}>
                                    <option value="">Selecione um produto</option>
                                    {dadosEstoqueGeral.map(pegaDadosUnicosEmVenda)}
                                </select>
                            </div>
                            <div className="Resultado-select">
                                {produtoSelecionado.data && produtoSelecionado.data.Nome && <p>Produto Selecionado: {produtoSelecionado.data.Nome}</p>}
                                {produtoSelecionado.id && <p> Produto id: {produtoSelecionado.id}</p>}
                            </div>
                            <div className="grupo-input">
                                <label>Custo unitário</label>
                                <input className="controle-formulario"
                                    type="number"
                                    value={produtoSelecionado.data && produtoSelecionado.data.Custo_Unitario ? produtoSelecionado.data.Custo_Unitario : 0} readOnly
                                />
                            </div>
                            <div className="grupo-input">
                                <label>Quantidade disponível</label>
                                <input className="controle-formulario"
                                    type="number"
                                    value={produtoSelecionado.data && produtoSelecionado.data.Quantidade ? produtoSelecionado.data.Quantidade : 0} readOnly
                                />
                            </div>
                            <div className="grupo-input">
                                <label>Quantidade de venda</label>
                                <input className="controle-formulario" type="number" value={quantidadeVenda} onChange={(e) => handleReceita(e)} />
                            </div>
                            <div className="grupo-input">
                                <label>Receita estimada</label>
                                <input className="controle-formulario" type="number" value={receitaEstimada} readOnly />
                            </div>
                            <button className="botao" type="button">
                                Calcular Ponto de Pedido
                            </button>
                        </div>
                    </form>
                </div>
                <div className="terminal">
                    {/* Porra pra pesquisa aqui */}
                </div>
            </div>
        </div>
    );
}

export default PagVenderProduto;
