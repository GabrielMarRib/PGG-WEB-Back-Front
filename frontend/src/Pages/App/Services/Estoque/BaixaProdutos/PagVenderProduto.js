import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagVenderProduto.css";
import axios from "axios";
import { CheckCamposNulos } from "../../../../../Functions/Functions.js";
import { UserContext } from "../../../../../Context/UserContext.js";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import { json, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import BuscaCategoriasComponentes from "../../../../../Components/BuscaCategoria/BuscaCategoriasComponente.js";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import NavBar from "../../../../../Components/NavBar/NavBar.js";


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
  const [DescricaoBaixa, setDescricaoBaixa] = useState(null);
  const [QtdeBaixa, setQtdeBaixa] = useState(null);

  const [categorias, setCategorias] = useState([]);
  
  const [buscarPP, setBuscarPP] = useState(false);
  const [PrimeiraOpcaoSelection, setPrimeiraOpcaoSelection] = useState(true);
  const [MotivoBaixa, setMotivoBaixa] = useState(null);

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();


  const pegaCategorias = async () => {
    try {
      const response = await axios.post('http://discordia.com.br/', {
        funcao: 'pegacategorias',
        senha: '@7h$Pz!q2X^vR1&K',
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
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
          "http://discordia.com.br/",
          {
            funcao: "obterProdutosPorCategoriaComLote",
            senha: "@7h$Pz!q2X^vR1&K",
            categoria: categoriaSelecionada.id_categorias,
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
          }
        );
        console.log(response.data)
        setProdutosCats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    pegaProdutin();
  }, [categoriaSelecionada]);

  const handleChangeCategoria = (e) => {
    const valor = e; // basicamente o valor do filho do select (option)
    console.log("VALOR" + JSON.stringify(valor))
    setProdutosCats([])
    if(valor == null){
      setCategoriaSelecionada(null)  
      setPrimeiraOpcaoSelection(true)
      setProdutoSelecionado("") 
      return
    }
    setPrimeiraOpcaoSelection(false)
    // if (isNaN(valor) || valor.length === 0) // aquela jogadinha la embaixo...
    //   setCategoriaSelecionada(null)   // se o valor pouco importa para o bd, manda null
    // else                                // caso contrário
    //   setCategoriaSelecionada(valor)  // manda o valor pra variável de categoria selecionada
  };
  


  useEffect(() => {
    handleChangeCategoria(categoriaSelecionada);
 
  }, [categoriaSelecionada]);



  const handleChangeProduto = (event) => {
    const produtoId = event.target.value;
    if(produtoId == ''){
      setProdutoSelecionado('');
      setQuantidadeDisponivel('');
      setCustoUnitario('');
      return
    }
    try {
      
      
      const produto = produtosCats.find((prod) => prod.id == produtoId)
      setProdutoSelecionado(produto);
      console.log("produto selecionado: " + JSON.stringify(produto))
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
    if(MotivoBaixa == 5){ //Dar baixa do produto inteiro
      handleBaixaDoProduto();
      return
    }
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

    console.log(produtoSelecionado.id)
    console.log(quantidadeVenda)
    console.log(DescricaoBaixa)

    if(MotivoBaixa == 1){ // venda
      handleInsercaoVendas();
    }else if(MotivoBaixa == 2){ //Perda/Quebra

      handleBaixaqtdeEstoque();
    }else if(MotivoBaixa == 3){ //Expiração/vecimento 
      handleBaixaqtdeEstoque();
    }else if(MotivoBaixa == 4){ //DevoluçãoFornecedor
      handleBaixaqtdeEstoque();
    }

  };

  const teste = (e) => {
    setcliente(e.target.value)
  }

  const handleBaixaDoProduto = async () => {
    try {
  
      await axios.post("http://discordia.com.br/", {
       funcao: "DeletarProduto",
       senha: "@7h$Pz!q2X^vR1&K",
       produtoid: produtoSelecionado.id,
     },
     {
       headers: {
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
         "Accept": "application/json, text/plain, */*",
         "Connection": "keep-alive",
       },
     });

     Alerta(2, "Baixa concluida!");
     setReceitaEstimada(0);
     setQuantidadeVenda(0);
     setQuantidadeDisponivel(0);
     setCustoUnitario(0);
     setProdutoSelecionado([]);
     setcliente("");
     setMotivoBaixa('')
     setCategoriaSelecionada(null)
   } catch (error) {
     console.log(error);
   }
  }

  const handleBaixaqtdeEstoque = async () => {
    try {
  
      await axios.post("http://discordia.com.br/", {
       funcao: "BaixaQtedProduto",
       senha: "@7h$Pz!q2X^vR1&K",
       produtoid: produtoSelecionado.id,
       quantidade: quantidadeVenda,
       motivo: DescricaoBaixa,
       autorId: User.id
     },
     {
       headers: {
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
         "Accept": "application/json, text/plain, */*",
         "Connection": "keep-alive",
       },
     });

     Alerta(2, "Baixa concluida!");
     setReceitaEstimada(0);
     setQuantidadeDisponivel(quantidadeDisponivel - quantidadeVenda);
     setcliente("");
     setMotivoBaixa('');
     setDescricaoBaixa('');
     setQuantidadeVenda(0);
   } catch (error) {
     console.log(error);
     Alerta(3, "Erro");
   }

  }
  const handleInsercaoVendas = async () => {
    const nowMySQL = new Date().toISOString().slice(0, 19).replace('T', ' ');


    console.log("Valores: " 
      + produtoSelecionado.id + " /"
      +  quantidadeVenda + " /"
      +  receitaEstimada + " /" 
      +  nowMySQL + " /" 
      +  User.id + " /" 
      +  cliente + " /" 
      + custoUnitario 
    )
    if (User && User.userData && User.userData.Nome) {
      try {
     
         await axios.post("http://discordia.com.br/", {
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
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
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
        "http://discordia.com.br/",
        {
          funcao: "PegaPPpeloProdutoId",
          senha: "@7h$Pz!q2X^vR1&K",
          idProduto: produtoSelecionado.id
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
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

  useEffect(() => {
    if(!categoriaSelecionada){
      setProdutoSelecionado(null)
    }
  }, [categoriaSelecionada]);

  const handleMotivoBaixa = (e) => {
    const MotivoSelecionado = e.target.value;
    setMotivoBaixa(MotivoSelecionado)
  }

  const handleGerarRelatorioPP = async (produto) => { //N ta querendo, AINDA
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
      
  

      const nowMySQL = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const msg = `URGENTE!! O Produto '${produtoSelecionado.nome}' de id: '${produtoSelecionado.id}', atingiu o nível de ponto de pedido!!! O produto se encontra com APENAS ${qtdeSobra}/${PP} (PP) UNIDADES`;
      console.log("Valores: " 
        + PP + " /"
        +  QV + " /"
        +  TR + " /" 
        +  ES + " /" 
        +  msg + " /" 
        +  cliente + " /" 
        + qtdeSobra + " /" 
        + produtoSelecionado.id + " /" 
        + produtoSelecionado.nome + " /" 
      )
      await axios.post("http://discordia.com.br/", {
        funcao: "geraRelatorioPP",
        senha: "@7h$Pz!q2X^vR1&K",
        pp: PP,
        QV: QV,
        TR: TR,
        ES: ES,
        MSG: msg,
        Qtd_At: qtdeSobra,
        Produto_ID: produtoSelecionado.id,
        nome_produto: produtoSelecionado.nome,
        Data: nowMySQL
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
      });
    }
  };

  const handleGerarRelatorioVenda = async (
  ) => {
    if (User && User.userData && User.userData.Nome) {
      const qtdeSobra = quantidadeDisponivel - quantidadeVenda;
      const qtdeSeiLaNumSei = Number(quantidadeDisponivel)+Number(quantidadeVenda)

      const nowMySQL = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("Valores: " 
      + produtoSelecionado.id + " /"
      +  quantidadeVenda + " /"
      +  receitaEstimada + " /" 
      +  User.id + " /" 
      + qtdeSobra + " /"
      + custoUnitario + " /" 
      + produtoSelecionado.nome + " /" 
      +  User.userData.Nome + " /" 
      +  quantidadeDisponivel + " /" 
      + nowMySQL
    )


      try {
        const response = await axios.post("http://discordia.com.br/", {
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
          Qtd_Old: quantidadeDisponivel,
          Data_Venda: nowMySQL
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
      } catch (eee) {
        console.log("deu merda");
      }
    }
  };
  // heeheheh testesinho

  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

  return (
    <div className="PagVenderProduto">
      
      <div className="DivForms">
        <NavBar />
        <Titulo
          tituloMsg='Baixa de Produtos'
        />
        <AlertaNotificação />

        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
            Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"BAIXASPRODUTOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div>

        <div className="enquadramento">
          <div className="container-tela-produtos">
            <form className="formulario" onSubmit={handleForm}>
              <div className="grupo-input-produto">
                <div className="grupo-input">
                  <center><h4>Selecione um Produto</h4></center>
                 
                  
                  <div className="grupo-select">

                    {/* <select className="Select-Produto" value={categoriaSelecionada} onChange={handleChangeCategoria}>
                      <option value="Nada">Categorias</option>
                      {categorias?.map((categoria) => (
                        <option key={categoria.id_categorias} value={categoria.id_categorias}>
                          {categoria.id_categorias} - {categoria.nome}
                        </option>
                      ))}
                    </select> */}

                    <div className="grupo-select">
                    <BuscaCategoriasComponentes setCategoriaSelecionada={setCategoriaSelecionada} categoriaSelecionada={categoriaSelecionada} />
                    </div>

                  </div>
                  <br></br>

                  {produtosCats.length > 0 ? (
                    <>
                      <label>Produtos da categoria acima:</label>
                      <select className="Select-Produto" value={produtoSelecionado ? produtoSelecionado.id : null} onChange={handleChangeProduto}>
                        <option value="">Selecione um produto</option>
                        {produtosCats.map((produtos) => (
                          <option key={produtos.id} value={produtos.id}>
                            {produtos.nome}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (

                      <center><h7>Categoria sem produto</h7></center>                    
                    

                  )}
                </div>
              


                {produtoSelecionado ? (
                  <>
                  <center>
                <div className="Resultado-select">
                  {produtoSelecionado.nome && (
                    <p>Produto Selecionado: {produtoSelecionado.nome}</p>
                  )}
                  {produtoSelecionado.id && (
                    <p>Produto id: {produtoSelecionado.id}</p>
                  )}
                </div>
                  </center>
                    <center><label>-----------------------</label></center>
                    <div className="grupo-input">
                      <label>Quantidade disponível do produto</label>
                      <input
                        className="controle-formulario"
                        type="number"
                        value={quantidadeDisponivel}
                        readOnly
                      />
                    </div>
                    <label>Motivo da Baixa</label>
                    <select className="Select-Produto" value={MotivoBaixa} onChange={handleMotivoBaixa}>
                          <option value="">Selecione o motivo da baixa</option>
                          <option value={1}>Venda</option>
                          <option value={2}>Perda/Quebra</option>
                          <option value={3}>Expiração/Vencimento</option>
                          <option value={4}>Devolução ao Fornecedor</option>
                          <option value={5}>Do produto todo</option>
                      </select>

                  </>
                ) : (
                  null
                )}

                     

                {produtosCats.length > 0 && MotivoBaixa == 1 &&(
                  <>
                    <div className="grupo-input">
                      <br></br>
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
                </>
                )}


                {produtosCats.length > 0 && produtoSelecionado && MotivoBaixa == 2 && (
                <>
                  <div className="grupo-input">
                    <br></br>
                    <label>Quantidade da Baixa</label>
                    <input
                      className="controle-formulario"
                      type="number"
                      value={quantidadeVenda === 0 ? "" : quantidadeVenda}
                      onChange={handleReceita}
                      placeholder="0"
                      />
                    </div>

                  <div className="grupo-input">
                   <label>Motivo da perda/quebra do produto</label>
                      <input
                        className="controle-formulario"
                        type="text"
                        value={DescricaoBaixa}
                        onChange={(e) => setDescricaoBaixa(e.target.value)}
                      />  
                  </div>
                  

                  <button className="botao" type="submit">
                   Efetuar Baixa
                 </button>

                </>
                  )}

            {produtosCats.length > 0 && produtoSelecionado && MotivoBaixa == 3 && (
                <>
                  <div className="grupo-input">
                    <br></br>
                    <label>Quantidade da Baixa</label>
                    <input
                      className="controle-formulario"
                      type="number"
                      value={quantidadeVenda === 0 ? "" : quantidadeVenda}
                      onChange={handleReceita}
                      placeholder="0"
                      />
                    </div>

                  <div className="grupo-input">
                   <label>Motivo da expiração/vencimento do produto</label>
                      <input
                        className="controle-formulario"
                        type="text"
                        value={DescricaoBaixa}
                        onChange={(e) => setDescricaoBaixa(e.target.value)}
                        
                      />  
                  </div>
                  

                  <button className="botao" type="submit">
                   Efetuar Baixa
                 </button>

                </>
                  )}

              {produtosCats.length > 0 && produtoSelecionado && MotivoBaixa == 4 && (
                <>
                  <div className="grupo-input">
                    <br></br>
                    <label>Quantidade da Baixa</label>
                    <input
                      className="controle-formulario"
                      type="number"
                      value={quantidadeVenda === 0 ? "" : quantidadeVenda}
                      onChange={handleReceita}
                      placeholder="0"
                      />
                    </div>

                  <div className="grupo-input">
                   <label>Motivo da devolução do produto</label>
                      <input
                        className="controle-formulario"
                        type="text"
                        value={DescricaoBaixa}
                        onChange={(e) => setDescricaoBaixa(e.target.value)}
                      />  
                  </div>
                  

                  <button className="botao" type="submit">
                   Efetuar Baixa
                 </button>

                </>
                  )}

              {produtosCats.length > 0 && produtoSelecionado && MotivoBaixa == 5 && (
                <>
                  <button className="botao" type="submit">
                   Efetuar Baixa do produto
                 </button>

                </>
                  )}



              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagVenderProduto;