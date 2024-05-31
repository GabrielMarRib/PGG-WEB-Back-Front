import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagVenderProduto.css';

function PagVenderProduto() {
    const navigate = useNavigate();
    
    const [produto, setProduto] = useState('');
    const [custoUnitario, setCustoUnitario] = useState(0);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
    const [quantidadeVenda, setQuantidadeVenda] = useState(0);
    const [receitaEstimada, setReceitaEstimada] = useState(0);

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
                                <select className="controle-formulario" value={produto} onChange={(e) => setProduto(e.target.value)}>
                                    <option value="">Selecione um produto</option>
                                </select>
                            </div>
                            <div className="grupo-input">
                                <label>Custo unitário</label>
                                <input className="controle-formulario" type="number" value={custoUnitario} readOnly />
                            </div>
                            <div className="grupo-input">
                                <label>Quantidade disponível</label>
                                <input className="controle-formulario" type="number" value={quantidadeDisponivel} readOnly />
                            </div>
                            <div className="grupo-input">
                                <label>Quantidade de venda</label>
                                <input className="controle-formulario" type="number" value={quantidadeVenda} onChange={(e) => setQuantidadeVenda(parseFloat(e.target.value))} />
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
