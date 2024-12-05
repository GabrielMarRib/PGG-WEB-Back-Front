import React, { useState, useEffect } from 'react';
import CabecalhoHome from '../../../../Components/CabecalhoHome.js';
import '../../../Styles/App/Service/PagMovimentos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Titulo from "../../../../Components/Titulo/Titulo.jsx";
import BtnAjuda from "../../../../Components/BtnAjuda.js";

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
        const response = await axios.post('http://localhost:80/php/', {
          funcao: 'pegaDadosMovimentos',
          senha: '@7h$Pz!q2X^vR1&K'
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });

        const movimentosData = response.data;
        setMovimentos(movimentosData);
        setMovimentosFiltrados(movimentosData);

        const codigos = [...new Set(movimentosData.map(mov => mov.produto))];
        setCodigosUnicos(codigos);
        console.log(response.data)
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
    const value = e.target.value;
    setMostrarCustoMedio(value === 'custoMedio');
    
    // Se "Custo Médio" for selecionado, mudar o filtro
    if (value === 'custoMedio') {
      setFiltro('codigo'); // Mantenha apenas o código do produto
    } else {
      setFiltro(''); // Limpa o filtro caso outra opção seja selecionada
    }
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
  
  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda
  
  
  let ValorTotal = 0 
  let QuantidadeTotal = 0 
  let idProduto = 0
  let CustoMedio = 0
  
  const MapearCustoMedio = (Movimento, index) => {
    if(index == 0 ){
      QuantidadeTotal = Movimento.qtde
      ValorTotal = Movimento.qtde * Movimento.valor
      idProduto = Movimento.produto
      CustoMedio = ValorTotal / QuantidadeTotal
      return(
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
    }else{
      

      if(idProduto == Movimento.produto){
        
        if(Movimento.mov == 'E'){
          QuantidadeTotal = parseInt(QuantidadeTotal) + parseInt(Movimento.qtde)
          ValorTotal = parseInt(ValorTotal) + parseInt((Movimento.qtde * Movimento.valor))
          CustoMedio = parseInt(ValorTotal) / parseInt(QuantidadeTotal)
        }else if(Movimento.mov == 'S'){
          QuantidadeTotal = parseInt(QuantidadeTotal) - parseInt(Movimento.qtde)
          ValorTotal = parseInt(ValorTotal) - parseInt((Movimento.qtde * Movimento.valor))
          CustoMedio = parseInt(ValorTotal) / parseInt(QuantidadeTotal)
        }

        return(
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
      }else{
        QuantidadeTotal = Movimento.qtde
        ValorTotal = Movimento.qtde * Movimento.valor
        idProduto = Movimento.produto
        
        return(
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
          <td>{(Movimento.qtde * Movimento.valor)/Movimento.qtde}</td>
         </tr>
        )
      }
      }


    }
    

  

  const CustoMedio2 = () => {

    movimentosFiltrados.map((mov) => (
        movimentos.filter(mov2 => mov2.produto === mov.produto).sort((a, b) => new Date(a.data) - new Date(b.data))
    ))
    
    return(
    movimentosFiltrados.map((Movimento, index) => (
       MapearCustoMedio(Movimento, index, ValorTotal, QuantidadeTotal, idProduto)
    ))

  )



  }



  return (
    <div className='PagMovimentos'>

      <div className="CabecalhoHome">
        <CabecalhoHome />
      </div>
      <Titulo tituloMsg='Visualização de Movimentos (Ficha de estoque)' />
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

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
            {/* Mantém apenas a opção "Código do Produto" quando "Custo Médio" é selecionado */}
            {mostrarCustoMedio ? (
              <option value="codigo">Código do Produto</option>
            ) : (
              <>
                <option value="codigo">Código do Produto</option>
                <option value="data">Data</option>
                <option value="quantidade">Quantidade</option>
                <option value="valor">Valor</option>
                <option value="cliente">Cliente</option>
              </>
            )}
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

            {mostrarCustoMedio ? (
              CustoMedio2()         
            ) : (
            <>
              {movimentosFiltrados.map(movimento => (
              
                  <>
                   <tr key={movimento.id_mov}>

                  <td>{movimento.produto}</td>
                  <td>{movimento.produtosNome}</td>
                  <td>{movimento.data}</td>
                  <td>{movimento.qtde}</td>
                  <td>{movimento.valor}</td>
                  <td>{movimento.mov}</td>
                  <td>{movimento.cliente}</td>
                  <td>{movimento.Autor}</td>
                   </tr>
                  </>
                  
                  ))}

                  </>
            )}

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagMovimentos;