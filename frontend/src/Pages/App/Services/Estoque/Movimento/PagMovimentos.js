import React, { useState, useEffect } from 'react';
import CabecalhoHome from '../../../../../Components/Cabecalho/CabecalhoHome.js';
import './PagMovimentos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import PEPS from '../../../../../Components/PEPS/PEPS.jsx';
import NavBar from '../../../../../Components/NavBar/NavBar.js';

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
  const [peps, setPeps] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState([]);
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

  const handleSelectVisualizacao = (e) => {
    setMostrarCustoMedio(e.target.value === 'custoMedio');
    setPeps(e.target.value === 'peps')
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
  let ValorTotal = 0
  let QuantidadeTotal = 0
  let idProduto = 0
  let CustoMedio = 0

  const MapearCustoMedio = (Movimento, index) => {
    if (index == 0) {
      QuantidadeTotal = Movimento.qtde
      ValorTotal = Movimento.qtde * Movimento.valor
      idProduto = Movimento.produto
      CustoMedio = ValorTotal / QuantidadeTotal

      return (
        <tr key={Movimento.id_mov}>
          <td>{Movimento.data}</td>
          <td>{Movimento.produtosNome}</td>
          <td>{Movimento.Autor}</td>
          <td>{Movimento.mov}</td>
          <td>{Movimento.qtde}</td>
          <td>{Movimento.valor}</td> {/* Custo unitario */}
          <td>{Movimento.qtde * Movimento.valor}</td>  {/* VALOR */}
          <td>{QuantidadeTotal}</td>
          <td>{ValorTotal}</td>
          <td>{CustoMedio.toFixed(2)}</td>
        </tr>
      )
    } else {
      if (idProduto == Movimento.produto) {

        if (Movimento.mov == 'E') {
          QuantidadeTotal = parseInt(QuantidadeTotal) + parseInt(Movimento.qtde)
          ValorTotal = parseInt(ValorTotal) + parseInt((Movimento.qtde * Movimento.valor))
          CustoMedio = parseInt(ValorTotal) / parseInt(QuantidadeTotal)
        } else if (Movimento.mov == 'S') {
          QuantidadeTotal = parseInt(QuantidadeTotal) - parseInt(Movimento.qtde)
          ValorTotal = parseInt(ValorTotal) - parseInt((Movimento.qtde * Movimento.valor))
          CustoMedio = parseInt(ValorTotal) / parseInt(QuantidadeTotal)
        }

        return (
          <tr key={Movimento.id_mov}>
            <td>{Movimento.data}</td>
            <td>{Movimento.produtosNome}</td>
            <td>{Movimento.Autor}</td>
            <td>{Movimento.mov}</td>
            <td>{Movimento.qtde}</td>
            <td>{Movimento.valor}</td> {/* Custo unitario */}
            <td>{Movimento.qtde * Movimento.valor}</td>  {/* VALOR */}
            <td>{QuantidadeTotal}</td>
            <td>{ValorTotal}</td>
            <td>{CustoMedio.toFixed(2)}</td>
          </tr>
        )
      } else {
        QuantidadeTotal = Movimento.qtde
        ValorTotal = Movimento.qtde * Movimento.valor
        idProduto = Movimento.produto

        return (
          <tr key={Movimento.id_mov}>
            <td>{Movimento.data}</td>
            <td>{Movimento.produtosNome}</td>
            <td>{Movimento.Autor}</td>
            <td>{Movimento.mov}</td>
            <td>{Movimento.qtde}</td>
            <td>{Movimento.valor}</td> {/* Custo unitario */}
            <td>{Movimento.qtde * Movimento.valor}</td>  {/* VALOR */}
            <td>{QuantidadeTotal}</td>
            <td>{ValorTotal}</td>
            <td>{(Movimento.qtde * Movimento.valor) / Movimento.qtde}</td>
          </tr>
        )
      }
    }
  } 
  const CustoMedio2 = () => {
    //contagem de loops:
    movimentosFiltrados.map((mov) => ( // 1 loop
      movimentos.filter(mov2 => mov2.produto === mov.produto).sort((a, b) => new Date(a.data) - new Date(b.data))
    ))          // 2 loops                                    // 3 LOOPS!???

    return (
      movimentosFiltrados.map((Movimento, index) => ( // 4 LOOPS
        MapearCustoMedio(Movimento, index, ValorTotal, QuantidadeTotal, idProduto)
      ))  // 5 LOOOPSSS

    )
  }


  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

  //aula para pedro henrique ramos carrion:
  const montaTabela = (chave, movimento) => {
    let movTraduzido = []
    if (movimento) {
      movTraduzido = JSON.parse(movimento);
    }
    switch (chave) {
      case "custoMedio": return {
        head:
          <>
            <th>Data</th>
            <th>Produto Nome</th>
            <th>Autor</th>
            <th>Movimento</th>
            <th>Quantidade</th>
            <th>Custo Unitario</th>
            <th>valor</th>
            <th>Quantidade Total</th>
            <th>Valor Total</th>
            <th>Custo Médio</th>
          </>,
        body: (
            CustoMedio2()
        )
      }
      case "peps": return {
        head: (
          <>
            {/* {valorFiltro} */}
          </>
        ), body: (
          filtro === "codigo" ?
            <>
              <PEPS produto={movimentos.find(mov => mov.produto === valorFiltro)}/>
            </> :
            <>
              Selecione um produto para consultar o PEPS
            </>
        )
      }
      default: return {
        head: (
          <>
            <th>Código do Produto</th>
            <th>Produto Nome</th>
            <th>Data</th>
            <th>Quantidade</th>
            <th>Custo</th>
            <th>Movimento</th>
            <th>Cliente</th>
            <th>Autor</th>
          </>),
        body: (
          <>
            <td>{movTraduzido.produto}</td>
            <td>{movTraduzido.produtosNome}</td>
            <td>{movTraduzido.data}</td>
            <td>{movTraduzido.qtde}</td>
            <td>{movTraduzido.valor}</td>
            <td>{movTraduzido.mov}</td>
            <td>{movTraduzido.cliente}</td>
            <td>{movTraduzido.Autor}</td>
          </>
        )
      }
    }
  }

  return (
    <div className='PagMovimentos'>

      <NavBar />
      <Titulo tituloMsg='Visualização de Movimentos (Ficha de estoque)' />
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div className="marginNavbar">
      <header className="cabecalhoBtnAjuda">
        <div className="Botaoajuda" onClick={() => { setShowPopup(true) }}> {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
          Ajuda
        </div>
      </header>

      <div className="BtnAjuda">
        {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
          <BtnAjuda /* chama o btnAjuda */
            fechar={() => { setShowPopup(false) }} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
            msgChave={"BAIXASPRODUTOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
          />
        )}
      </div>
      <div className='flex'>

        <div className="btn">
          <button className="Voltar" onClick={() => navigate("/PagEscolhaProdutos")}>
            Voltar
          </button>
        </div>


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
          <select id="selectVisu" onChange={handleSelectVisualizacao}>
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
              {mostrarCustoMedio && montaTabela('custoMedio').head}
              {!mostrarCustoMedio && !peps && montaTabela('default').head}
              {peps && montaTabela('peps').head}
            </tr>
          </thead>
          <tbody>
            {movimentosFiltrados.map(movimento => (
              <tr key={movimento.id_mov}>
                {!mostrarCustoMedio && !peps && montaTabela('default', JSON.stringify(movimento)).body}
              </tr>
            ))}
            {mostrarCustoMedio && montaTabela('custoMedio').body}
            {peps && montaTabela('peps').body}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PagMovimentos;
