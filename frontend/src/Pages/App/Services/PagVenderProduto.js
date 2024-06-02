import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagVenderProduto.css';
import axios from 'axios';
import { PegaDadosGeralDB, CheckCamposNulos, pegaDadosPP } from '../../../Functions/Functions';
import { camposNaoPreenchidos } from '../../../Messages/Msg';
import Redirect from '../../../Functions/Redirect';
import { UserContext } from '../../../Context/UserContext';
import { useContext } from 'react';

import AlertaNotificação from './../../../Components/AlertaNotificação.js';
import { useAlerta } from ".././../../Context/AlertaContext.js";

function PagVenderProduto() {

    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [dadosPP, setDadosPP] = useState([]);

    const [custoUnitario, setCustoUnitario] = useState(0);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
    const [quantidadeVenda, setQuantidadeVenda] = useState(0);
    const [receitaEstimada, setReceitaEstimada] = useState(0);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);

    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const { Alerta } = useAlerta();


    Redirect(User)


    function pegaDadosUnicosEmVenda(item) {
        return (<option key={item.id} value={JSON.stringify({ id: item.id, data: item.data })}>{item.data.Nome}</option>)
        // if (!CodigoPontoPedido.includes(item.id))
        //   return (<option key={item.id} value={JSON.stringify({ id: item.id, Nome: item.Nome })}>{item.Nome}</option>)
        // else
        //   return null;
    }


    useEffect(() => {
        PegaDadosGeralDB(setDadosEstoqueGeral); // Fetch data when the component mounts
        pegaDadosPP(setDadosPP) // pega os dados de ponto de pedido
    }, []);

    const handleChange = (event) => { //codigo do git mt modificado
        try {
            setReceitaEstimada(0);
            setQuantidadeVenda(0);
            setQuantidadeDisponivel(0)
            setCustoUnitario(0);
            setProdutoSelecionado('');

            const produtoSelecJSON = JSON.parse(event.target.value);
            if (produtoSelecJSON.data.Quantidade === 0) {
                // alert("produto esgotado") // fazer notificação mais bonita dps
                Alerta(3, "Produto esgotado");
            }
            setQuantidadeDisponivel(produtoSelecJSON.data.Quantidade)
            setProdutoSelecionado(produtoSelecJSON);
            setCustoUnitario(produtoSelecJSON.data.Custo_Unitario)
        } catch (error) {

        }
    };

    const handleReceita = (e) => {

        const qtdeVenda = parseInt(e.target.value)

        if (qtdeVenda > quantidadeDisponivel) return;

        setQuantidadeVenda(qtdeVenda)
        const receitaEst = (qtdeVenda * custoUnitario)
        setReceitaEstimada(receitaEst)
    }

    const handleInsercaoVendas = async () => {
        if (User && User.userData && User.userData.Nome) {
            try {
                await axios.post('http://localhost:4000/insereVendas', {
                    quantidadeVenda: quantidadeVenda,
                    quantidadeAtual: quantidadeDisponivel,
                    receita: receitaEstimada,
                    itemId: produtoSelecionado.id
                });

                handleGerarRelatorioVenda(produtoSelecionado.id, produtoSelecionado.data.Nome, quantidadeVenda)
                handleGerarRelatorioPP(produtoSelecionado);
                // alert("inserção OK")
                Alerta(2, "Venda concluida!");

                setReceitaEstimada(0);
                setQuantidadeVenda(0);
                setQuantidadeDisponivel(0);
                setCustoUnitario(0);
                setProdutoSelecionado('');

                PegaDadosGeralDB(setDadosEstoqueGeral); //rePesquisa

            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleGerarRelatorioPP = async (produto) => {
        const infoComumEmPP = dadosPP.find(obj => obj.id === produto.id);
        const PP = infoComumEmPP.data.PP;
        const qtdeSobra = (quantidadeDisponivel-quantidadeVenda)
        console.log(qtdeSobra >= PP)
        if (qtdeSobra >= PP)  // se ainda pode vender, manda pra casa do krl
            return;
            console.log("ta entrando aki")
        const data = new Date();
        const msg = `URGENTE!!!! O Produto '${produto.data.Nome}' de id: '${produto.id}', atingiu o nível de ponto de pedido!!! Na data de: ${data.toLocaleString('pt-BR')}\nO produto se encontra com APENAS ${qtdeSobra}/${PP} (PP) UNIDADES`;
        await axios.post('http://localhost:4000/geraRelatorioPP', {
            PP: PP,
            msg: msg,
            QtdeAtual: quantidadeDisponivel,
            produtoID: produto.id,
            produtoNome: produto.data.Nome
        });
    }

    const handleGerarRelatorioVenda = async (produtoId, produtoNome, quantidadeVenda) => {
        if (User && User.userData && User.userData.Nome) {
            try {
                await axios.post('http://localhost:4000/geraRelatorioVendas', {
                    produtoVendidoId: produtoId,
                    QtdeVendida: quantidadeVenda,
                    pessoaId: User.id,
                    PessoaNome: User.userData.Nome,
                    produtoVendidoNome: produtoNome
                });
                

            } catch (eee) {
                console.log("deu merda")
            }
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (CheckCamposNulos([custoUnitario, quantidadeDisponivel, quantidadeVenda, receitaEstimada])) {
            Alerta(3, "Campos não preenchidos");
            return
        }

        //alert(`Custo unitário: ${custoUnitario}\nQtde Disp: ${quantidadeDisponivel}\nQtde Venda: ${quantidadeVenda}\nReceita: ${receitaEstimada}`)
        handleInsercaoVendas();
    }
    return (
        <div className="PagVenderProduto">
            <div id="DivForms">
                <div className='Cabecalho'>
                    <Cabecalho />
                </div>
                <AlertaNotificação />
                <div className="container-tela-produtos">
                    <div className="enquadramento">
                        <form className="formulario" onSubmit={(e) => handleForm(e)}>
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
                                        type="text"
                                        value={custoUnitario} readOnly
                                    />
                                </div>
                                <div className="grupo-input">
                                    <label>Quantidade disponível</label>
                                    <input className="controle-formulario"
                                        type="number"
                                        value={quantidadeDisponivel} readOnly
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
                                <button className="botao" type="submit">
                                    Efetuar venda
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="terminal">
                    {/* Porra pra pesquisa aqui */}
                </div>
            </div>
        </div>
    );
}

export default PagVenderProduto;
