import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import "../../../Styles/App/Service/PagLoteEconomico.css";
import lupa from "../../../Assets/lupa.png";
import axios from "axios";
import Titulo from '../../../Components/Titulo.jsx';
import AlertaNotificação from "../../../Components/AlertaNotificação";
import { useAlerta } from "../../../Context/AlertaContext";
import { useNavigate } from "react-router-dom";
import Tooltip from '../../../Components/Dica.js'; // Importando o componente Tooltip

function PagLoteEconomico() {
  const [DadosLoteEconomico, setDadosLoteEconomico] = useState([]);
  const navigate = useNavigate();
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const { Alerta } = useAlerta();

  const [respostaPesquisa, setRespostaPesquisa] = useState({});
  const [isVisibleForms, setIsVisibleForms] = useState(false);
  const [ItemAtual, setItemAtual] = useState(null);
  const [idProduto, setIdProduto] = useState(null);
  const [repescarInfo, setRepescarInfo] = useState(false);

  const [Valor_despesas_Anuais, setValor_despesas_Anuais] = useState("");
  const [Quantia_Produtos_Estocados, setQuantia_Produtos_Estocados] = useState("");
  const [Numero_Pedidos_Anuais, setNumero_Pedidos_Anuais] = useState("");
  const [demanda_anual, setdemanda_anual] = useState("");

  const CalcularLoteEconomico = async () => {
    if (Valor_despesas_Anuais === "" || Quantia_Produtos_Estocados === "" || Numero_Pedidos_Anuais === "" || demanda_anual === "") {
      Alerta(1, "Campos não preenchidos");
      return;
    }

    try {
      const response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "atualizaLoteEconomico",
        senha: "@7h$Pz!q2X^vR1&K",
        Valor_despesas_Anuais,
        demanda_anual,
        Quantia_Produtos_Estocados,
        Numero_Pedidos_Anuais,
        idProduto,
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

  const mostrarForms = (item, hashAtual, Existe) => {
    if (ItemAtual === item) {
      setIsVisibleForms(!isVisibleForms);
    }
    setItemAtual(item);
    setIdProduto(hashAtual);
  };
  
const FecharJanela = () => {
    setIsVisibleForms(!isVisibleForms);
}

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
            {respostaPesquisa[item.idProduto]?.RespostaExiste === true ? (
              <button onClick={() => mostrarForms(item.produtoNome, item.idProduto)}>
                Editar item
              </button>
            ) : (
              <button onClick={() => mostrarForms(item.produtoNome, item.idProduto, false)}>
                Editar Valor  
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const pegaDadosLoteEconomico = async () => {
    try {
      const response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "pegaDadosLoteEconomico",
        senha: "@7h$Pz!q2X^vR1&K",
      });
      if (response.status === 200) {
        setDadosLoteEconomico(response.data);
        console.log(response);
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
      <div className="CabecalhoHome">
        <CabecalhoHome />
      </div>
      <Titulo
        tituloMsg='Gestão do Lote Econômico'
      />
      <div className="btn">
        <button className="Voltar" onClick={() => navigate("/PagHome")}>
          Voltar
        </button>
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

        <div
          className={isVisibleForms
            ? "ContainerFormularioLoteEconomicoShow"
            : "ContainerFormularioLoteEconomico"
          }
        >
          <div className="container-tela-produtos">
            <div className="grupo-input-produto">
              <center>
                <h2>Lote Economico: {ItemAtual}</h2>
              </center>
              <div className="grupo-input">
                <label htmlFor="ValorDespeza">Valor de despesas anuais</label>
                <input
                  type="number"
                  id="InputValorDespeza"
                  value={Valor_despesas_Anuais}
                  onChange={(e) => setValor_despesas_Anuais(e.target.value)}
                />
              </div>
              <div className="grupo-input">
                <label htmlFor="QtdProdutoEstocado">
                  Quantia de produtos estocados anuais
                </label>
                <input
                  type="number"
                  id="InputQtdProdutoEstocado"
                  value={Quantia_Produtos_Estocados}
                  onChange={(e) => setQuantia_Produtos_Estocados(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="NumeroPedidos">Número de pedidos anuais</label>
                <input
                  type="number"
                  id="InputNumeroPedidos"
                  value={Numero_Pedidos_Anuais}
                  onChange={(e) => setNumero_Pedidos_Anuais(e.target.value)}
                />
              </div>
              <div className="grupo-input">
                <label htmlFor="demanda_anual">Demanda Anual</label>
                <input
                  type="number"
                  id="Inputdemanda_anual"
                  value={demanda_anual}
                  onChange={(e) => setdemanda_anual(e.target.value)}
                />
              </div>
              <did className="">
              <button onClick={CalcularLoteEconomico}>Atualizar</button>
              <button onClick={() => FecharJanela()} >fechar</button>
              </did>
            </div>
          </div>
        </div>
      </div>
      <AlertaNotificação />
    </div>
  );
}

export default PagLoteEconomico;
