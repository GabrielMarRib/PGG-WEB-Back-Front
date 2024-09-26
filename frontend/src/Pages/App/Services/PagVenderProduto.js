import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import "../../../Styles/App/Service/PagVenderProduto.css";
import axios from "axios";
import { CheckCamposNulos } from "../../../Functions/Functions.js";
import { UserContext } from "../../../Context/UserContext";
import AlertaNotificação from "./../../../Components/AlertaNotificação.js";
import { useAlerta } from ".././../../Context/AlertaContext.js";
import { json, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Titulo from "../../../Components/Titulo";

function PagVenderProduto() {
  const [carregando, setCarregando] = useState(true);
  const [custoUnitario, setCustoUnitario] = useState(0);
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [quantidadeVenda, setQuantidadeVenda] = useState(0);
  const [receitaEstimada, setReceitaEstimada] = useState(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState([]);
  const [cliente, setcliente] = useState([]);
  const [produtosCats, setProdutosCats] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [dadosPP, setDadosPP] = useState([]);
  const [buscarPP, setBuscarPP] = useState(false);
  const [PrimeiraOpcaoSelection, setPrimeiraOpcaoSelection] = useState(true);

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();
  console.log(User.userData.Nome)

  const pegaCategorias = async () => {
    try {
      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
        funcao: 'pegacategorias',
        senha: '@7h$Pz!q2X^vR1&K',
      });
      
      setCategorias(response.data || []);
      setCarregando(false);
    } catch (error) {
      console.log("Erro ao pegar Produtos: " + error);
    }
  };

  useEffect(() => {
    pegaCategorias();
  }, []);

  useEffect(() => {
    const pegaProdutin = async () => {
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "obterProdutosPorCategoriaComLote",
            senha: "@7h$Pz!q2X^vR1&K",
            categoria: categoriaSelecionada,
          }
        );
        setProdutosCats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    pegaProdutin();
  }, [categoriaSelecionada]);

  const handleChangeCategoria = (e) => {
    const valor = e.target.value; // basicamente o valor do filho do select (option)
    console.log("VALOR" + valor)
    setProdutosCats([])
    if(valor == 'Nada'){
      setCategoriaSelecionada(null)  
      setPrimeiraOpcaoSelection(true)
      return
    }
    setPrimeiraOpcaoSelection(false)
    if (isNaN(valor) || valor.length === 0) // aquela jogadinha la embaixo...

      setCategoriaSelecionada(null)   // se o valor pouco importa para o bd, manda null
    else                                // caso contrário
      setCategoriaSelecionada(valor)  // manda o valor pra variável de categoria selecionada
  };

  const handleChangeProduto = (event) => {
    
    try {
      const produtoId = event.target.value;
      

      const produto = produtosCats.find((prod) => prod.id == produtoId)
      setProdutoSelecionado(produto);
      setQuantidadeDisponivel(produto.qtde);
      setCustoUnitario(produto.custoUnitario);
      if (produto?.qtde === 0) {
        Alerta(3, "Produto esgotado");
      } else {
        setProdutoSelecionado(produto);
        setQuantidadeDisponivel(produto.qtde);
        setCustoUnitario(produto.custoUnitario);
      }
    } catch (error) {
      console.log("Erro ao selecionar produto: " + error);
    }
  };

  const handleReceita = (e) => {
    const qtdeVenda = parseInt(e.target.value);
    if (qtdeVenda > quantidadeDisponivel) return;
    setQuantidadeVenda(qtdeVenda);
    const receitaEst = qtdeVenda * custoUnitario;
    setReceitaEstimada(receitaEst);
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
    handleInsercaoVendas();

  };

  const teste = (e) => {
    setcliente(e.target.value)
  }




  const handleInsercaoVendas = async () => {

    const nowMySQL = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (User && User.userData && User.userData.Nome) {
      try {
     
         await axios.post("http://pggzettav3.mooo.com/api/index.php", {
          funcao: "insereMovimento",
          senha: "@7h$Pz!q2X^vR1&K",
          id: produtoSelecionado.id,
          quantidade: quantidadeVenda,
          vlr_compra: receitaEstimada,
          Mov: "S",
          data_movimento: nowMySQL,
          id_usuario: User.id,
          NomeCliente: cliente,
          vlr_venda: custoUnitario
        });


        handleGerarRelatorioVenda(
          produtoSelecionado.id,
          produtoSelecionado.nome,
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
        setProdutoSelecionado([]);
        setcliente("");

      } catch (error) {
        console.log(error);
      }
    }
  };
  const PegaDadosPP = async () => {
    try {
      if (!produtoSelecionado || produtoSelecionado.length === 0)
        return
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "PegaPPpeloProdutoId",
          senha: "@7h$Pz!q2X^vR1&K",
          idProduto: produtoSelecionado.id
        }
      );
      return response.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    PegaDadosPP();
  }, []);



  const handleGerarRelatorioPP = async (produto) => {
    const dados = await PegaDadosPP()
    if (dados) {
      const PP = dados.ponto_pedido;
      const QV = dados.quantidade_vendida;
      const TR = dados.tempo_reposicao;
      const ES = dados.estoque_seguranca;

      const qtdeSobra = quantidadeDisponivel - quantidadeVenda;
      if (qtdeSobra > PP) {
        // se ainda pode vender, manda pra casa do krl
        return;
      }

      const msg = `URGENTE!! O Produto '${produtoSelecionado.nome}' de id: '${produtoSelecionado.id}', atingiu o nível de ponto de pedido!!! O produto se encontra com APENAS ${qtdeSobra}/${PP} (PP) UNIDADES`;
      const response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "geraRelatorioPP",
        senha: "@7h$Pz!q2X^vR1&K",
        pp: PP,
        QV: QV,
        TR: TR,
        ES: ES,
        MSG: msg,
        Qtd_At: qtdeSobra,
        Produto_ID: produtoSelecionado.id,
        nome_produto:produtoSelecionado.nome
      });
    }
  };

  const handleGerarRelatorioVenda = async (
  ) => {
    if (User && User.userData && User.userData.Nome) {
      const qtdeSobra = quantidadeDisponivel - quantidadeVenda;
      const qtdeSeiLaNumSei = Number(quantidadeDisponivel)+Number(quantidadeVenda)

      try {
        await axios.post("http://pggzettav3.mooo.com/api/index.php", {
          funcao: "geraRelatorioVenda",
          senha: "@7h$Pz!q2X^vR1&K",
          produtoVendidoId: produtoSelecionado.id,
          QtdeVendida: quantidadeVenda,
          Autor: User.id,
          ReceitaProd: receitaEstimada,
          QtdeDisponivel: qtdeSobra,
          custoUnitario: custoUnitario,
          nome_produto: produtoSelecionado.nome,
          Autor_nome: User.userData.Nome,
          Qtd_Old: quantidadeDisponivel
        });
      } catch (eee) {
        console.log("deu merda");
      }
    }
  };
  // heeheheh testesinho
  return (
    <div className="PagVenderProduto">
      <div className="DivForms">
        <div className="CabecalhoHome">
          <CabecalhoHome />
        </div>
        <Titulo
          tituloMsg='Processamento de Vendas'
        />
        <AlertaNotificação />
      

        <div className="enquadramento">
          <button
            className="voltar"
            onClick={() => {
              navigate("/PagEscolhaProdutos");
            }}
          >
            Voltar
          </button>

          <div className="container-tela-produtos">
            <form className="formulario" onSubmit={handleForm}>
              <div className="grupo-input-produto">
                <div className="grupo-input">
                  <label>Selecione a Categoria:</label>
                  <div className="grupo-select">
                    <select className="Select-Produto" value={categoriaSelecionada} onChange={handleChangeCategoria}>
                      <option value="Nada">Categorias</option>
                      {categorias?.map((categoria) => (
                        <option key={categoria.id_categorias} value={categoria.id_categorias}>
                          {categoria.id_categorias} - {categoria.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {produtosCats.length > 0 ? (
                    <>
                      <label>Selecione um produto:</label>
                      <select className="Select-Produto" value={produtoSelecionado.id} onChange={handleChangeProduto}>
                        <option value="">Selecione um produto</option>
                        {produtosCats?.map((produtos) => (
                          <option key={produtos.id} value={produtos.id}>
                            {produtos.nome}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (

                    PrimeiraOpcaoSelection == true ? (
                        <p></p>
                    ) : (
                        <p>Categoria sem produto</p>
                    )
                    
                  )}
                </div>

                <div className="Resultado-select">
                  {produtoSelecionado.nome && (
                    <p>Produto Selecionado: {produtoSelecionado.nome}</p>
                  )}
                  {produtoSelecionado.id && (
                    <p>Produto id: {produtoSelecionado.id}</p>
                  )}
                </div>
                {produtosCats.length > 0 && (
                  <>
                    <div className="grupo-input">
                      <label>Cliente:</label>
                      <input
                        className="controle-formulario"
                        type="text"
                        value={cliente}
                        onChange={teste}
                      />
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
                  </>
                )}
                <div className="grupo-input">
                  <label>Quantidade de venda</label>
                  <input
                    className="controle-formulario"
                    type="number"
                    value={quantidadeVenda === 0 ? "" : quantidadeVenda}
                    onChange={handleReceita}
                    placeholder="0"
                  />
                </div>
                <div className="grupo-input">
                  <label>Receita desta venda</label>
                  <input
                    className="controle-formulario"
                    type="number"
                    value={receitaEstimada}
                    readOnly
                    placeholder="0"
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
    </div>
  );
}

export default PagVenderProduto;