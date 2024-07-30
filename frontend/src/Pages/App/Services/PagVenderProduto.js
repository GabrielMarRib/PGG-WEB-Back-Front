import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import "../../../Styles/App/Service/PagVenderProduto.css";
import axios from "axios";
import {
  PegaDadosGeralDB,
  CheckCamposNulos,
  pegaDadosPP,
} from "../../../Functions/Functions";
import Redirect from "../../../Functions/Redirect";
import { UserContext } from "../../../Context/UserContext";
import { useContext } from "react";
import AlertaNotificação from "./../../../Components/AlertaNotificação.js";
import { useAlerta } from ".././../../Context/AlertaContext.js";
import { useNavigate } from "react-router-dom";
import BuscarCategoria from "../../../Components/BuscaCategoria";

function PagVenderProduto() {
  const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
  const [dadosPP, setDadosPP] = useState([]);

  const [custoUnitario, setCustoUnitario] = useState(0);
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [quantidadeVenda, setQuantidadeVenda] = useState(0);
  const [receitaEstimada, setReceitaEstimada] = useState(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState([]);

  const [produtosCats, setProdutosCats] = useState(null);
  const [SubCategoriaSelecionado, setSubCategoriaSelecionado] = useState(null);
  const [produtosFiltrados, setprodutosFiltrados] = useState(null);
  

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....
  const { Alerta } = useAlerta();
  Redirect(User);

  function pegaDadosUnicosEmVenda(item) {
    console.log("Item>" + JSON.stringify( item))
 

    return (
      <option
        key={item.id}
        value={JSON.stringify({ id: item.id, data: item.data })}
      >
        {item.data.Nome}
      </option>
    );
    // if (!CodigoPontoPedido.includes(item.id))
    //   return (<option key={item.id} value={JSON.stringify({ id: item.id, Nome: item.Nome })}>{item.Nome}</option>)
    // else
    //   return null;
  }
  useEffect(() => {
    if(SubCategoriaSelecionado == null ){
        return;
    }
    const selectedIds = SubCategoriaSelecionado.data.map(item => item.id);
    const produtosFiltradoss = dadosEstoqueGeral.filter(produto => selectedIds.includes(produto.id));
    setprodutosFiltrados(produtosFiltradoss)
    console.log("ProdutosFiltrados: " + JSON.stringify(produtosFiltrados))
}, [SubCategoriaSelecionado]);

  useEffect(() => {
    PegaDadosGeralDB(setDadosEstoqueGeral); // Fetch data when the component mounts
    pegaDadosPP(setDadosPP); // pega os dados de ponto de pedido
  }, []);

  const handleChange = (event) => {
    //codigo do git mt modificado
    try {
      setReceitaEstimada(0);
      setQuantidadeVenda(0);
      setQuantidadeDisponivel(0);
      setCustoUnitario(0);
      setProdutoSelecionado("");

      const produtoSelecJSON = JSON.parse(event.target.value);
      if (produtoSelecJSON.data.Quantidade === 0) {
        // alert("produto esgotado") // fazer notificação mais bonita dps
        Alerta(3, "Produto esgotado");
      }
      setQuantidadeDisponivel(produtoSelecJSON.data.Quantidade);
      setProdutoSelecionado(produtoSelecJSON);
      setCustoUnitario(produtoSelecJSON.data.Custo_Unitario);
    } catch (error) {}
  };
  const handleChangeSub = (event) => {
    //codigo do git mt modificado
    try {
        const val = event.target.value;
    if (val === "null") {
        setprodutosFiltrados(null);
        setSubCategoriaSelecionado(null);
        setProdutoSelecionado("");
    }
      
      const SubprodutoSelecJSON = JSON.parse(event.target.value);
      console.log("ProdutosSelecionado" + SubprodutoSelecJSON);
      setSubCategoriaSelecionado(SubprodutoSelecJSON);
    } catch (error) {
        console.log("ERRO")
    }
  };

  const handleReceita = (e) => {
    const qtdeVenda = parseInt(e.target.value);

    if (qtdeVenda > quantidadeDisponivel) return;

    setQuantidadeVenda(qtdeVenda);
    const receitaEst = qtdeVenda * custoUnitario;
    setReceitaEstimada(receitaEst);
  };

  const handleInsercaoVendas = async () => {
    if (User && User.userData && User.userData.Nome) {
      try {
        await axios.post("http://localhost:4000/insereVendas", {
          quantidadeVenda: quantidadeVenda,
          quantidadeAtual: quantidadeDisponivel,
          receita: receitaEstimada,
          itemId: produtoSelecionado.id,
        });

        handleGerarRelatorioVenda(
          produtoSelecionado.id,
          produtoSelecionado.data.Nome,
          quantidadeVenda,
          receitaEstimada,
          quantidadeDisponivel,
          custoUnitario
        );
        handleGerarRelatorioPP(produtoSelecionado);
        // alert("inserção OK")
        Alerta(2, "Venda concluida!");

        setReceitaEstimada(0);
        setQuantidadeVenda(0);
        setQuantidadeDisponivel(0);
        setCustoUnitario(0);
        setProdutoSelecionado("");

        PegaDadosGeralDB(setDadosEstoqueGeral); //rePesquisa
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGerarRelatorioPP = async (produto) => {
    if (Array.isArray(dadosPP)) {
      const infoComumEmPP = dadosPP.find((obj) => obj.id === produto.id);

      const PP = infoComumEmPP.data.PP;
      const QV = infoComumEmPP.data.QV;
      const TR = infoComumEmPP.data.TR;
      const ES = infoComumEmPP.data.ES;
      const qtdeSobra = quantidadeDisponivel - quantidadeVenda;
      if (qtdeSobra > PP)
        // se ainda pode vender, manda pra casa do krl
        return;

      const msg = `URGENTE!! O Produto '${produto.data.Nome}' de id: '${produto.id}', atingiu o nível de ponto de pedido!!! O produto se encontra com APENAS ${qtdeSobra}/${PP} (PP) UNIDADES`;
      await axios.post("http://localhost:4000/geraRelatorioPP", {
        PP: PP,
        QV: QV,
        TR: TR,
        ES: ES,
        msg: msg,
        QtdeAtual: qtdeSobra,
        produtoID: produto.id,
        produtoNome: produto.data.Nome,
      });
    }
  };

  const handleGerarRelatorioVenda = async (
    produtoId,
    produtoNome,
    quantidadeVenda,
    receita,
    quantidadeOld,
    custoUnit
  ) => {
    if (User && User.userData && User.userData.Nome) {
      const qtdeSobra = quantidadeOld - quantidadeVenda;
      try {
        await axios.post("http://localhost:4000/geraRelatorioVendas", {
          produtoVendidoId: produtoId,
          QtdeVendida: quantidadeVenda,
          pessoaId: User.id,
          PessoaNome: User.userData.Nome,
          produtoVendidoNome: produtoNome,
          ReceitaProd: receita,
          QtdeDisponivel: qtdeSobra,
          QtdeOld: quantidadeOld,
          Produtopreco: custoUnit,
        });
      } catch (eee) {
        console.log("deu merda");
      }
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (
      CheckCamposNulos([
        custoUnitario,
        quantidadeDisponivel,
        quantidadeVenda,
        receitaEstimada,
      ])
    ) {
      Alerta(3, "Campos não preenchidos");
      return;
    }

    //alert(`Custo unitário: ${custoUnitario}\nQtde Disp: ${quantidadeDisponivel}\nQtde Venda: ${quantidadeVenda}\nReceita: ${receitaEstimada}`)
    handleInsercaoVendas();
  };
  const pegaProdutosComCat = (obj) => {
    console.log("OBJ: " + JSON.stringify(obj))
    if(obj == "" || obj == null){
        setSubCategoriaSelecionado(null);
        setProdutosCats(null);
        setProdutoSelecionado("");
        setprodutosFiltrados(null);
        return;
    }
    setProdutosCats(obj);
    console.log("ProdutoCats>" + obj);
  };
  const OptionsSubCategoria = (item) => {
   
    return (
        <option key={item.id} value={JSON.stringify({ id: item.id, Nome: item.subCatNome, data: item.produtos})}
        >
          {item.id} - {item.subCatNome}
        </option>
      );

  }


    
  return (
    <div className="PagVenderProduto">
      <div id="DivForms">
        <div className="CabecalhoHome">
          <CabecalhoHome />
        </div>
        <AlertaNotificação />

        
        
        <button
          className="voltar"
          onClick={() => {
            navigate("/PagEscolhaProdutos");
          }}
        >
          Voltar
        </button>

        <div className="container-tela-produtos">
          <div className="enquadramento">
            <form className="formulario" onSubmit={(e) => handleForm(e)}>
              <div className="grupo-input-produto">
                <div className="grupo-input">

                  <label>Selecione a Categoria:</label>
                  <div className="SelectCategorias">
                    <BuscarCategoria funcaoReturn={pegaProdutosComCat} />
                  </div>

                  {produtosCats != null ? (
                    <>
                      <label>Selecione a SubCategoria:</label>
                      <select className="Select-Produto" value={JSON.stringify(SubCategoriaSelecionado)} onChange={handleChangeSub}>
                        <option value="null">Selecione a SubCategoria</option>
                        {produtosCats != null
                          ? produtosCats.map(OptionsSubCategoria)
                          : null}
                      </select>
                    </>
                  ) : null}

                {produtosFiltrados != null && produtosCats != null ? (
                <>
                
                  <label>Selecione um produto:</label>
                  <select className="Select-Produto" value={JSON.stringify(produtoSelecionado)} onChange={handleChange}>
                    <option value="">Selecione um produto</option>
                    {produtosFiltrados != null && produtosCats != null ?
                    produtosFiltrados.map(pegaDadosUnicosEmVenda)
                    : null}
                  </select>
                  </>
                ) : (null)}


                </div>

                <div className="Resultado-select">
                  {produtoSelecionado.data && produtoSelecionado.data.Nome && (
                    <p>Produto Selecionado: {produtoSelecionado.data.Nome}</p>
                  )}
                  {produtoSelecionado.id && (
                    <p> Produto id: {produtoSelecionado.id}</p>
                  )}
                </div>
                <div className="grupo-input">
                  <label>Custo unitário</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={custoUnitario}
                    readOnly
                  />
                </div>
                <div className="grupo-input">
                  <label>Quantidade disponível</label>
                  <input
                    className="controle-formulario"
                    type="number"
                    value={quantidadeDisponivel}
                    readOnly
                  />
                </div>
                <div className="grupo-input">
                  <label>Quantidade de venda</label>
                  <input
                    className="controle-formulario"
                    type="number"
                    value={quantidadeVenda}
                    onChange={(e) => handleReceita(e)}
                  />
                </div>
                <div className="grupo-input">
                  <label>Receita estimada</label>
                  <input
                    className="controle-formulario"
                    type="number"
                    value={receitaEstimada}
                    readOnly
                  />
                </div>
                <button className="botao" type="submit">
                  Efetuar venda
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
        <div className="terminal">{/* Porra pra pesquisa aqui */}</div>
      </div>
  
  );
}

export default PagVenderProduto;
