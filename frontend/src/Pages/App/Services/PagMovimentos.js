import React, { useState, useEffect } from 'react';
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/App/Service/PagPontoPedido.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Titulo from "../../../Components/Titulo.jsx";

const PagMovimentos = () => {
  const navigate = useNavigate(); // Manja? É pra navegar entre páginas, estilo chefão!
  const [carregando, setCarregando] = useState(true);
  const [msg, setMsg] = useState('');
  const [movimentos, setMovimentos] = useState([]);
  const [filtro, setFiltro] = useState(''); // Aqui é onde você escolhe o filtro. Aí você manda ver!
  const [valorFiltro, setValorFiltro] = useState(''); // Valor do filtro, tipo código do produto, tá ligado?
  const [ordem, setOrdem] = useState('maior'); // Ordem, se vai ser do maior pro menor ou o contrário
  const [movimentosFiltrados, setMovimentosFiltrados] = useState([]); // Só os movimentos filtrados, o resto é passado
  const [erro, setErro] = useState('');
  const [codigosUnicos, setCodigosUnicos] = useState([]); // Só códigos únicos de produto, porque repetição é coisa de amador
  const [autoresUnicos, setAutoresUnicos] = useState([]); // Autores sem repetição, quem não gosta é porque não entende nada


  useEffect(() => {
    const fetchMovimentos = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'pegaDadosMovimentos', // Função que manda os dados, o segredo do sucesso
          senha: '@7h$Pz!q2X^vR1&K' // Senha, porque não se revela, né?
        });

        const movimentosData = response.data;
        setMovimentos(movimentosData);
        setMovimentosFiltrados(movimentosData); // No começo, tá tudo liberado, sem filtro

        // Extrair códigos únicos de produtos
        const codigos = [...new Set(movimentosData.map(mov => mov.produto))];
        setCodigosUnicos(codigos);

        // Extrair autores únicos
        const autores = [...new Set(movimentosData.map(mov => mov.Autor))];
        setAutoresUnicos(autores);

      } catch (error) {
        console.error("Erro ao buscar movimentos: ", error);
        setErro("Houve um erro ao buscar os movimentos. Por favor, tente novamente mais tarde.");
      }
    };

    fetchMovimentos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value); // Escolheu o filtro? Agora é só mexer nos dados
    setValorFiltro(''); // Reseta o valor do filtro, pra começar do zero
    setOrdem('maior');  // Reseta a ordem, assim tudo fica no esquema
  };

  const handleValorFiltroChange = (e) => {
    setValorFiltro(e.target.value); // Atualiza o valor do filtro, tipo quando escolhe o produto
  };

  const handleOrdemChange = (e) => {
    setOrdem(e.target.value); // Muda a ordem, de maior pra menor ou o contrário
  };

  const handleAutorChange = (e) => {
    setValorFiltro(e.target.value); // Atualiza o valor do filtro para autor
  };

  useEffect(() => {
    if (valorFiltro || filtro === 'data' || filtro === 'quantidade' || filtro === 'valor') {
      let movimentosFiltrados = movimentos;

      if (filtro === 'codigo') {
        movimentosFiltrados = movimentos.filter(mov => mov.produto === valorFiltro);
      } else if (filtro === 'data') {
        // Filtrar por data, da mais recente pra mais antiga
        movimentosFiltrados = [...movimentos].sort((a, b) => {
          const dataA = new Date(a.data);
          const dataB = new Date(b.data);
          return dataB - dataA;
        });
      } else if (filtro === 'quantidade') {
        // Filtrar por quantidade, maior pra menor ou o contrário
        movimentosFiltrados = [...movimentos].sort((a, b) => {
          if (ordem === 'maior') {
            return b.qtde - a.qtde; // Maior pra menor, estilo chefão
          } else {
            return a.qtde - b.qtde; // Menor pra maior, pro pessoal que prefere assim
          }
        });
      } else if (filtro === 'valor') {
        // Filtrar por valor, mesma coisa que quantidade, só muda o valor
        movimentosFiltrados = [...movimentos].sort((a, b) => {
          if (ordem === 'maior') {
            return b.valor - a.valor;
          } else {
            return a.valor - b.valor;
          }
        });
      } else if (filtro === 'cliente') {
        // Filtrar por cliente, sem ligar se o texto é maiúsculo ou minúsculo
        const valorFiltroLower = valorFiltro.toLowerCase();
        movimentosFiltrados = movimentos.filter(mov => 
          mov.cliente.toLowerCase().includes(valorFiltroLower)
        );
      } else if (filtro === 'autor') {
        movimentosFiltrados = movimentos.filter(mov => mov.Autor === valorFiltro);
      }

      setMovimentosFiltrados(movimentosFiltrados);
    } else {
      setMovimentosFiltrados(movimentos); // Sem filtro, mostra tudo
    }
  }, [valorFiltro, filtro, ordem, movimentos]);

  return (
    <div className='geral'>
      <div className="CabecalhoHome">
        <CabecalhoHome />
      </div>
      <Titulo
          tituloMsg='Visualização de Movimentos'
        />
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      {/* Filtro principal */}
      <div className="filtro-section">
        <label htmlFor="filtro">Filtrar por: </label>
        <select id="filtro" value={filtro} onChange={handleFiltroChange}>
          <option value="">Selecione um filtro</option>
          <option value="codigo">Código do Produto</option>
          <option value="data">Data</option>
          <option value="quantidade">Quantidade</option>
          <option value="valor">Valor</option>
          <option value="cliente">Cliente</option>
          <option value="autor">Autor</option>
        </select>
      </div>

      {/* Select ou input de acordo com o filtro selecionado */}
      {filtro === 'codigo' && (
        <div className="select-produto-section">
          <label htmlFor="produto">Selecione um Produto: </label>
          <select id="produto" value={valorFiltro} onChange={handleValorFiltroChange}>
            <option value="">Selecione um produto</option>
            {codigosUnicos.map(codigo => (
              <option key={codigo} value={codigo}>
                {codigo} - {movimentos.find(mov => mov.produto === codigo)?.produtosNome || 'Nome não encontrado'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Select para autores */}
      {filtro === 'autor' && (
        <div className="select-autor-section">
          <label htmlFor="autor">Selecione um Autor: </label>
          <select id="autor" value={valorFiltro} onChange={handleAutorChange}>
            <option value="">Selecione um autor</option>
            {autoresUnicos.map(autor => (
              <option key={autor} value={autor}>
                {autor}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Ordenação de Quantidade ou Valor */}
      {(filtro === 'quantidade' || filtro === 'valor') && (
        <div className="ordem-section">
          <label htmlFor="ordem">Ordenar por: </label>
          <select id="ordem" value={ordem} onChange={handleOrdemChange}>
            <option value="maior">Maior para Menor</option>
            <option value="menor">Menor para Maior</option>
          </select>
        </div>
      )}

      {/* Input para clientes */}
      {(filtro === 'cliente') && (
        <div className="input-filtro-section">
          <label htmlFor="valorFiltro">Nome do Cliente: </label>
          <input
            id="valorFiltro"
            type="text"
            value={valorFiltro}
            onChange={handleValorFiltroChange}
            placeholder="Digite o nome do cliente"
          />
        </div>
      )}

      {/* Renderiza a tabela */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código do Produto</th>
            <th>Produto Nome</th>
            <th>Data</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Movimento</th>
            <th>Cliente</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {movimentosFiltrados.map(movimento => (
            <tr key={movimento.id_mov}>
              <td>{movimento.id_mov}</td>
              <td>{movimento.produto}</td>
              <td>{movimento.produtosNome}</td>
              <td>{movimento.data}</td>
              <td>{movimento.qtde}</td>
              <td>{movimento.valor}</td>
              <td>{movimento.mov}</td>
              <td>{movimento.cliente}</td>
              <td>{movimento.Autor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagMovimentos;