import React, { useState, useEffect } from "react";
import CabecalhoHome from "../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagLoteEconomico.css";
import lupa from "../../../../Assets/lupa.png";
import axios from "axios";
import Titulo from '../../../../Components/Titulo/Titulo.jsx';
import AlertaNotificação from "../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import { useAlerta } from "../../../../Context/AlertaContext.js";
import { useNavigate } from "react-router-dom";
import Tooltip from '../../../../Components/Dica(MouseHover)/Dica.js'; // Importando o componente Tooltip
import BtnAjuda from "../../../../Components/BotaoAjuda/BtnAjuda.js";
import NavBar from "../../../../Components/NavBar/NavBar.js";

function PagLoteEconomico() {
  const [DadosLoteEconomico, setDadosLoteEconomico] = useState([]);
  const navigate = useNavigate();
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const { Alerta } = useAlerta();
  const [periodoSelecionado, setPeriodoSelecionado] = useState("anual");

  const [respostaPesquisa, setRespostaPesquisa] = useState({});
  const [isVisibleForms, setIsVisibleForms] = useState(false);
  const [ItemAtual, setItemAtual] = useState(null);
  const [idProduto, setIdProduto] = useState(null);
  const [repescarInfo, setRepescarInfo] = useState(false);

  const [Valor_despesas_Anuais, setValor_despesas_Anuais] = useState("");
  const [Quantia_Produtos_Estocados, setQuantia_Produtos_Estocados] = useState("");
  const [Numero_Pedidos_Anuais, setNumero_Pedidos_Anuais] = useState("");
  const [demanda_anual, setdemanda_anual] = useState("");

  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

  const [periodo, setPeriodo] = useState("anual"); // Adicionando estado para o período

  const periodos = [
    { id: "semanal", nome: "Semanal" },
    { id: "mensal", nome: "Mensal" },
    { id: "anual", nome: "Anual" }
  ];

  const converterParaAnual = (valor) => {
    switch (periodo) {
      case "semanal":
        return valor * 52;
      case "mensal":
        return valor * 12;
      default:
        return valor;
    }
  };

  const CalcularLoteEconomico = async () => {
    if (Valor_despesas_Anuais === "" || Quantia_Produtos_Estocados === "" || Numero_Pedidos_Anuais === "" || demanda_anual === "") {
      Alerta(1, "Campos não preenchidos");
      return;
    }

    // Convertendo os valores para formato anual
    const despesasAnuaisConvertidas = converterParaAnual(Valor_despesas_Anuais);
    const quantiaEstocadaConvertida = converterParaAnual(Quantia_Produtos_Estocados);
    const pedidosAnuaisConvertidos = converterParaAnual(Numero_Pedidos_Anuais);
    const demandaAnualConvertida = converterParaAnual(demanda_anual);

    try {
      const response = await axios.post("http://discordia.com.br/", {
        funcao: "atualizaLoteEconomico",
        senha: "@7h$Pz!q2X^vR1&K",
        Valor_despesas_Anuais: despesasAnuaisConvertidas,
        demanda_anual: demandaAnualConvertida,
        Quantia_Produtos_Estocados: quantiaEstocadaConvertida,
        Numero_Pedidos_Anuais: pedidosAnuaisConvertidos,
        periodo: periodo,
        idProduto,
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
      });

      Alerta(2, "Dados Atualizados");
      setValor_despesas_Anuais('');
      setdemanda_anual('');
      setQuantia_Produtos_Estocados('');
      setNumero_Pedidos_Anuais('');
      setIdProduto('');
      setRepescarInfo(prevState => !prevState);

    } catch (error) {
      console.log("Erro ao atualizar dados: ", error);
    }
  };

  const mostrarForms = (item, hashAtual) => {
    if (ItemAtual === item) {
      setIsVisibleForms(!isVisibleForms);
    }
    setItemAtual(item);
    setIdProduto(hashAtual);
  };
  
  const FecharJanela = () => {
    setIsVisibleForms(!isVisibleForms);
  };

  const pegaProdutos = (item) => {
    let CP = item.custoPedido === null ? "Nenhum valor ainda" : Math.sqrt(item.custoPedido).toFixed(2);
    let CA = item.custoArmazem === null ? "Nenhum valor ainda" : Math.sqrt(item.custoArmazem).toFixed(2);
    let LE = item.calculoLote === null ? "Nenhum valor ainda" : Math.sqrt(item.calculoLote).toFixed(2); 

    return (
      <div key={item.idProduto} className="DivsItens">
        <div className="alinhamento">
          <div className="colunamento">
            <li>{item.produtoNome}</li>
            <div className="DivsResutlados">
              <Tooltip text="Custo do Pedido">
                CP:<label>{CP}</label>
              </Tooltip>
            </div>
            <div className="DivsResutlados">
              <Tooltip text="Custo de Armazém">
                CA:<label>{CA}</label>
              </Tooltip>
            </div>
            <div className="DivsResutlados">
              <Tooltip text="Cálculo do Lote Econômico">
                LEC:<label>{LE}</label>
              </Tooltip>
            </div>
            <br />
            <button onClick={() => mostrarForms(item.produtoNome, item.idProduto)}>
              Editar Valor
            </button>
          </div>
        </div>
      </div>
    );
  };

  const pegaDadosLoteEconomico = async () => {
    try {
      const response = await axios.post("http://discordia.com.br/", {
        funcao: "pegaDadosLoteEconomico",
        senha: "@7h$Pz!q2X^vR1&K",
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
      });
      if (response.status === 200) {
        setDadosLoteEconomico(response.data);
      } else {
        console.log("Erro 500: deu ruim");
      }
    } catch (error) {
      console.log("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    pegaDadosLoteEconomico();
  }, [repescarInfo]);

  const produtosFiltrados = DadosLoteEconomico.filter((produto) =>
    produto.produtoNome.toLowerCase().includes(pesquisaProduto.toLowerCase())
  );

  return (
    <div className="LoteEconomico">
      <NavBar />
      <Titulo tituloMsg='Gestão do Lote Econômico' />

      <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true */}
          Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"GESTAOLOTEECONOMICO"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div> 
      <div className="btn">
      </div>
      <div className="ConteudoDaPagina">
        <div className={isVisibleForms ? "terminalShow" : "terminal"}>
          <div className="barra-pesquisa">
            <div className="botao-pesquisa">
              <img src={lupa} alt="Lupa" className="imagem-botao" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={pesquisaProduto}
              onChange={(e) => setPesquisaProduto(e.target.value)}
            />
          </div>

          <ul className="lista-produtos">
            {produtosFiltrados.map(pegaProdutos)}
          </ul>
        </div>

        <div className={isVisibleForms ? "ContainerFormularioLoteEconomicoShow" : "ContainerFormularioLoteEconomico"}>
          <div className="container-tela-produtos">
            <div className="grupo-input-produto">
              <center>
                <h2>Lote Economico: {ItemAtual}</h2>
              </center>

              <div className="grupo-input">
                <label htmlFor="periodo">Período:</label>
                <select className="Select-loteEconomico" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                  {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                      {periodo.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grupo-input">
                <label htmlFor="ValorDespeza">Valor de despesas ({periodo})</label>
                <input
                  type="number"
                  id="InputValorDespeza"
                  value={Valor_despesas_Anuais}
                  onChange={(e) => setValor_despesas_Anuais(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="ValorEstoque">Quantia de produtos estocados ({periodo})</label>
                <input
                  type="number"
                  id="InputQuantiaProdutos"
                  value={Quantia_Produtos_Estocados}
                  onChange={(e) => setQuantia_Produtos_Estocados(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="ValorPedidos">Número de pedidos ({periodo})</label>
                <input
                  type="number"
                  id="InputNumeroPedidos"
                  value={Numero_Pedidos_Anuais}
                  onChange={(e) => setNumero_Pedidos_Anuais(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="demanda_anual">Demanda ({periodo})</label>
                <input
                  type="number"
                  id="Inputdemanda_anual"
                  value={demanda_anual}
                  onChange={(e) => setdemanda_anual(e.target.value)}
                />
              </div>
              <div className="AtuaFechar">
              <button onClick={CalcularLoteEconomico}>Atualizar</button>
              <button onClick={() => FecharJanela()} >fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertaNotificação />
    </div>
  );
}

export default PagLoteEconomico;
