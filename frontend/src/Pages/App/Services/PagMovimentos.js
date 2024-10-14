import React, { useState, useEffect } from 'react';
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/App/Service/PagMovimentos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Titulo from "../../../Components/Titulo.jsx";

const PagMovimentos = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [msg, setMsg] = useState('');
  const [movimentos, setMovimentos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [valorFiltro, setValorFiltro] = useState('');
  const [ordem, setOrdem] = useState('maior');
  const [movimentosFiltrados, setMovimentosFiltrados] = useState([]);
  const [mostrarCustoMedio, setMostrarCustoMedio] = useState(false);
  const [erro, setErro] = useState('');
  const [codigosUnicos, setCodigosUnicos] = useState([]);
  const [autoresUnicos, setAutoresUnicos] = useState([]);

  useEffect(() => {
    const fetchMovimentos = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'pegaDadosMovimentos',
          senha: '@7h$Pz!q2X^vR1&K'
        });

        const movimentosData = response.data;
        setMovimentos(movimentosData);
        setMovimentosFiltrados(movimentosData);

        const codigos = [...new Set(movimentosData.map(mov => mov.produto))];
        setCodigosUnicos(codigos);
      } catch (error) {
        console.error("Erro ao buscar movimentos: ", error);
        setErro("Houve um erro ao buscar os movimentos. Por favor, tente novamente mais tarde.");
      }
    };

    fetchMovimentos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
    setValorFiltro('');
    setOrdem('maior');
  };

  const handleValorFiltroChange = (e) => {
    setValorFiltro(e.target.value);
  };

  const handleCustoMedioChange = (e) => {
    setMostrarCustoMedio(e.target.value === 'custoMedio');
  };

  useEffect(() => {
    let movimentosFiltrados = movimentos;

    if (valorFiltro || filtro === 'data' || filtro === 'quantidade' || filtro === 'valor') {
      if (filtro === 'codigo') {
        movimentosFiltrados = movimentos.filter(mov => mov.produto === valorFiltro);
      } else if (filtro === 'data') {
        movimentosFiltrados = [...movimentos].sort((a, b) => new Date(b.data) - new Date(a.data));
      } else if (filtro === 'quantidade') {
        movimentosFiltrados = [...movimentos].sort((a, b) => {
          return ordem === 'maior' ? b.qtde - a.qtde : a.qtde - b.qtde;
        });
      } else if (filtro === 'valor') {
        movimentosFiltrados = [...movimentos].sort((a, b) => {
          return ordem === 'maior' ? b.valor - a.valor : a.valor - b.valor;
        });
      } else if (filtro === 'cliente') {
        const valorFiltroLower = valorFiltro.toLowerCase();
        movimentosFiltrados = movimentos.filter(mov =>
          mov.cliente.toLowerCase().includes(valorFiltroLower)
        );
      }
    }

    setMovimentosFiltrados(movimentosFiltrados);
  }, [valorFiltro, filtro, ordem, movimentos]);

  const calcularCustoMedio = (movimentoAtual) => {
    const totalValor = CalcularValorTotal(movimentoAtual);
    const totalQuantidade = CalcularQuantidadeTotal(movimentoAtual);
  
    if (totalQuantidade > 0) {
      return (totalValor / totalQuantidade).toFixed(2);
    }
    return '0.00';
  };

  const CalcularValorTotal = (movimentoAtual) => {
    let totalValorlet = 0;
    let produtoId = movimentoAtual.produto;
  
    const movimentacoesProduto = movimentos
      .filter(mov => mov.produto === produtoId)
      .sort((a, b) => new Date(a.data) - new Date(b.data));
  
    movimentacoesProduto.forEach((movimento) => {
      const valor = parseFloat(movimento.valor);  
      const quantidade = parseInt(movimento.qtde);
  
      if (movimento.mov === 'E') { 
        totalValorlet += quantidade * valor;
      } else if (movimento.mov === 'S') { 
        totalValorlet -= quantidade * valor;
      }
    });
    return totalValorlet;
  };

  const CalcularQuantidadeTotal = (movimentoAtual) => {
    let totalQuantidadelet = 0;
    let produtoId = movimentoAtual.produto;
  
    const movimentacoesProduto = movimentos
      .filter(mov => mov.produto === produtoId)
      .sort((a, b) => new Date(a.data) - new Date(b.data));
  
    movimentacoesProduto.forEach((movimento) => {
      const quantidade = parseInt(movimento.qtde, 10);
      if (movimento.mov === 'E') {
        totalQuantidadelet += quantidade;
      } else if (movimento.mov === 'S') {
        totalQuantidadelet -= quantidade;
      }
    });
    return totalQuantidadelet;
  };

  return (
    <div className='PagMovimentos'>
      <div className="CabecalhoHome">
        <CabecalhoHome />
      </div>
      <Titulo tituloMsg='Visualização de Movimentos (Ficha de estoque)' />
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div className="filtro-section">
        <label htmlFor="filtro">Filtrar por: </label>
        <select id="filtro" value={filtro} onChange={handleFiltroChange}>
          <option value="">Selecione um filtro</option>
          <option value="codigo">Código do Produto</option>
          <option value="data">Data</option>
          <option value="quantidade">Quantidade</option>
          <option value="valor">Valor</option>
          <option value="cliente">Cliente</option>
        </select>

        <label htmlFor="custoMedio"></label>
        <select id="custoMedio" onChange={handleCustoMedioChange}>
          <option value="">Selecione</option>
          <option value="custoMedio">Custo Médio</option>
          <option value="peps">PEPS</option>
        </select>
      </div>

      {filtro === 'codigo' && (
        <div className="select-produto-section">
          <label htmlFor="produto">Selecione um Produto: </label>
          <select id="produto" value={valorFiltro} onChange={handleValorFiltroChange}>
            <option value="">Selecione um produto</option>
            {codigosUnicos.map(codigo => (
              <option key={codigo} value={codigo}>
                {codigo} - {movimentos.find(mov => mov.produto === codigo)?.produtosNome}
              </option>
            ))}
          </select>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {mostrarCustoMedio ? (
              <>
                <th>Produto Nome</th>
                <th>Autor</th>
                <th>Custo Médio</th>
              </>
            ) : (
              <>
                <th>Código do Produto</th>
                <th>Produto Nome</th>
                <th>Data</th>
                <th>Quantidade</th>
                <th>Custo</th>
                <th>Movimento</th>
                <th>Cliente</th>
                <th>Autor</th>                
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {movimentosFiltrados.map(movimento => (
            <tr key={movimento.id_mov}>
              {mostrarCustoMedio ? (
                <>
                  <td>{movimento.produtosNome}</td>
                  <td>{movimento.Autor}</td>
                  <td>R$ {calcularCustoMedio(movimento)}</td>
                </>
              ) : (
                <>
                  <td>{movimento.produto}</td>
                  <td>{movimento.produtosNome}</td>
                  <td>{movimento.data}</td>
                  <td>{movimento.qtde}</td>
                  <td>{movimento.valor}</td>
                  <td>{movimento.mov}</td>
                  <td>{movimento.cliente}</td>
                  <td>{movimento.Autor}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagMovimentos;
