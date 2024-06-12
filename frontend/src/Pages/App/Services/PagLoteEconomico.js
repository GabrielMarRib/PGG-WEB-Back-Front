import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagLoteEconomico.css";
import lupa from "../../../Assets/lupa.png";
import axios from "axios";
//import {Alerta} from "../../../Components/AlertaNotificação.js";
import {apagarCampos} from './../../../Functions/Functions.js'
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";


//Funcçoes
const PesquisaLoteEconomico = async (HashProduto, setRespostaPesqusia) => {
  try {
    const response = await axios.post("http://localhost:4000/LoteEconomico", {
      HashProduto: HashProduto,
    });

    if (response.data.Resposta === "Documento não encontrado") {
      setRespostaPesqusia((prev) => ({
        ...prev,
        [HashProduto]: { RespostaExiste: false, DadosLoteEconomico: null },
      }));
    } else {


      setRespostaPesqusia((prev) => ({
        ...prev,
        [HashProduto]: {
          RespostaExiste: true,
          DadosLoteEconomico: response.data.Resposta,
        },
      }));
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

function PagLoteEconomico() {
  const { Alerta } = useAlerta();
  const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
  const [restricao, setRestricao] = useState("");
  const [respostaPesquisa, setRespostaPesquisa] = useState({}); // Inicializando como objeto vazio
  const [isVisibleForms, setisVisibleForms] = useState(false);
  const [ItemAtual, setItemAtual] = useState(null);
  const [HashAtual, setHashAtual] = useState(null);
  const [ExisteCalculoBD, setExisteCalculoBD] = useState(null);

  const [valorDespezas, setValorDespezas] = useState("");
  const [qtdProdutosEstocados, setQtdProdutosEstocados] = useState("");
  const [numPedidos, setNumPedidos] = useState("");
  const [demandaAnual, setDemandaAnual] = useState("");

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....

  Redirect(User);

  const CalcularLoteEconomico = async () => {
    console.log("AA" + valorDespezas)
    if(valorDespezas === ""  || qtdProdutosEstocados === "" || numPedidos === ""  || demandaAnual === ""){
      // alert("Campos não preenchidos");
      Alerta(1, "Campos não preenchidos");
      return;
    }
    const CPCalculo = valorDespezas / numPedidos;
    const CACalculo = valorDespezas / qtdProdutosEstocados;
    const LECCalculo = (2 * CPCalculo * demandaAnual) / CACalculo;
    
try{

  await axios.post('http://localhost:4000/InsereCalculosLote', {
      Hash: HashAtual,
      CP: CPCalculo,
      CA: CACalculo,
      LEC: LECCalculo,
      Existe: ExisteCalculoBD,
  });
  Alerta(2, "Dados Atualizados");
    
  PegaDadosGeralDB();
  PesquisaLoteEconomico(HashAtual, setRespostaPesquisa)




} catch (erro) {
    console.log(erro);
} finally {
    apagarCampos([setValorDespezas, setQtdProdutosEstocados, setNumPedidos, setDemandaAnual])
}

  



  }





  useEffect(() => {
   
    PegaDadosGeralDB(); // Fetch data when the component mounts
  }, []);

  const mostrarforms = (item, hashAtual, Existe) => {
    if (ItemAtual === item) {
      if (isVisibleForms) {
        setisVisibleForms(false);
      } else {
        setisVisibleForms(true);
      }
    }
    setItemAtual(item);
    setHashAtual(hashAtual);
    setExisteCalculoBD(Existe);
  };

  useEffect(() => {
   
    Promise.all(
      dadosEstoqueGeral.map((item) => {
        if (
          item.data.Nome.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            ?.includes(restricao.toLowerCase()) ||
          item.data.Nome.toLowerCase().includes(restricao.toLowerCase())
        ) {
          if (!respostaPesquisa[item.id]) {
     
            return PesquisaLoteEconomico(item.id, setRespostaPesquisa);
          }
        }
        return null;
      })
    );
  }, [restricao, dadosEstoqueGeral, respostaPesquisa]);

  const pegaProdutos = (item) => {
    // sem nenhum acento                                                                                     // com acentos
    if (
      restricao === "" ||
      item.data?.Nome?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(restricao.toLowerCase()) ||
      item.data?.Nome?.toLowerCase().includes(restricao.toLowerCase())
    ) {
      let CP = "Nenhum valor ainda";
      let CA = "Nenhum valor ainda";
      let LE = "Nenhum valor ainda";
      let RespostaExiste = false;


      const produtoLoteEconomico =
        respostaPesquisa[item.id]?.DadosLoteEconomico;


      if (respostaPesquisa[item.id]?.RespostaExiste === true) {
        RespostaExiste = true;
        CP = JSON.parse(produtoLoteEconomico)["CustoPedido"];
        CA = JSON.parse(produtoLoteEconomico)["CustoArmazem"];
        LE = JSON.parse(produtoLoteEconomico)["CalculoLoteEconomico"];
      }

      return (
        
        <div key={item.id} className="DivsItens">
          <li>{item.data.Nome}</li>
          <div className="DivsResutlados">
            CP:<label>{CP}</label>
            <div class="tooltip">Custo total de pedidos</div>
          </div>
          <div className="DivsResutlados">
            CA:<label>{CA}</label>
            <div class="tooltip">Custo de armazenagem</div>
          </div>
          <div className="DivsResutlados">
            LEC:<label>{LE}</label>
            <div class="tooltip">Lote Economico</div>
          </div>
          <br />
          {respostaPesquisa[item.id]?.RespostaExiste === true ? (
            <button onClick={() => mostrarforms(item.data.Nome, item.id)}>
              Editar item
            </button>
          ) : (
            <button onClick={() => mostrarforms(item.data.Nome, item.id, RespostaExiste)}>
              Adicionar Valor
            </button>
          )}
          <br />
          --------------------
        </div>
      );
    }
  };

  const PegaDadosGeralDB = async () => {
    try {
    
      const response = await axios.get("http://localhost:4000/PegaProdutos");
     
      const estoqueData = response.data.map((item) => ({
        id: item.id,
        ...item,
      })); // mapeia os itens
      setDadosEstoqueGeral(estoqueData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const pesquisaProduto = async (pesquisa) => {
    setRestricao(pesquisa);
  };

  



  return (
    <div className="LoteEconomico">
      <div className="CabecalhoHome">
        <CabecalhoHome />
      </div>
   
      <div className="ConteudoDaPagina">
        <div className={isVisibleForms ? "terminalShow" : "terminal"}>
          <div className="barra-pesquisa">
            <div className="botao-pesquisa">
              <img
                src={lupa}
                alt="Descrição da imagem"
                className="imagem-botao"
              />
            </div>
            <input
              type="text"
              placeholder="Pesquisar produto..."
              onChange={(e) => pesquisaProduto(e.target.value)}
            ></input>
          </div>
          <ul className="lista-produtos">
            {dadosEstoqueGeral.map(pegaProdutos)}
          </ul>
        </div>

        <div
          className={
            isVisibleForms
              ? "ContainerFormularioLoteEconomicoShow"
              : "ContainerFormularioLoteEconomico"
          }
        >
      

          <div className="container-tela-produtos">
            <div className="grupo-input-produto">
              <center>
                {" "}
                <h2>Lote Economico: {ItemAtual}</h2>
              </center>
              <div className="grupo-input">
                <label htmlFor="ValorDespeza">Valor de despesas anuais</label>
                <input
                  type="number"
                  id="InputValorDespeza"
                  value={valorDespezas}
                  onChange={(e) => setValorDespezas(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="QtdProdutoEstocado">
                  Quantia de produtos estocados anuais
                </label>
                <input
                  type="number"
                  id="InputQtdProdutoEstocado"
                  value={qtdProdutosEstocados}
                  onChange={(e) => setQtdProdutosEstocados(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="NumeroPedidos">Número de pedidos anuais</label>
                <input
                  type="number"
                  id="InputNumeroPedidos"
                  value={numPedidos}
                  onChange={(e) => setNumPedidos(e.target.value)}
                />
              </div>

              <div className="grupo-input">
                <label htmlFor="DemandaAnual">Demanda Anual</label>
                <input
                  type="number"
                  id="InputDemandaAnual"
                  value={demandaAnual}
                  onChange={(e) => setDemandaAnual(e.target.value)}
                />
              </div>

              <button onClick={() => CalcularLoteEconomico()}>Atualizar</button>
            </div>
          </div>
        </div>
      </div>
      <AlertaNotificação /> 
    </div>
  );
}
export default PagLoteEconomico;
