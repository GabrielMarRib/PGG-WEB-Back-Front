import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../Components/Cabecalho';
import "../../Styles/App/PagVenderProduto.css"

function PagVenderProduto() {
    const navigate = useNavigate();
    
    const [produto, setProduto] = useState('');
    const [custoUnitario, setCustoUnitario] = useState(0);
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
    const [quantidadeVenda, setQuantidadeVenda] = useState(0);
    const [receitaEstimada, setReceitaEstimada] = useState(0);

    const handleQuantidadeVendaChange = (e) => {
        const vendaQty = parseFloat(e.target.value);
        setQuantidadeVenda(vendaQty);
        setReceitaEstimada(custoUnitario * vendaQty);
    };

    return (
        <div className="PagVenderProduto">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <h1>Vender Produto</h1>
            <form>
                <div>
                    <label>Selecione um produto:</label>
                    <select value={produto} onChange={(e) => setProduto(e.target.value)}>
                        <option value="">Selecione um produto</option>
                    </select>
                </div>

                <div>
                    <label>Custo unitário (campo imutável)</label>
                    <input type="number" value={custoUnitario} readOnly />
                </div>

                <div>
                    <label>Quantidade disponível (campo imutável)</label>
                    <input type="number" value={quantidadeDisponivel} readOnly />
                </div>

                <div>
                    <label>Quantidade de venda</label>
                    <input type="number" value={quantidadeVenda} onChange={handleQuantidadeVendaChange} />
                </div>

                <div>
                    <label>Receita estimada (campo imutável)</label>
                    <input type="number" value={receitaEstimada} readOnly />
                </div>

                <button type="button" onClick={() => {}}>
                   Verder Produto
                </button>
            </form>
        </div>
    );
}

export default PagVenderProduto;
