import React, { useState, useEffect, useCallback, memo } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import BuscaCategoriasComponentes from "../../../Components/BuscaCategoriasComponente.js";
import FiltragemComponente from "../../../Components/FiltragemComponente.js";
import "../../../Styles/PagProdutos.css";
import axios from "axios";
import { CheckCamposVazios } from "../../../Functions/Functions.js";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext.js";
import Redirect from "../../../Functions/Redirect.js";
import ProdutosModal from "../../../Components/ProdutosModal.js";
import Titulo from "../../../Components/Titulo.jsx";

function PagProdutos() {
  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....
  const navigate = useNavigate();
  Redirect(User);

  const { Alerta } = useAlerta();
  const [codigo, setCodigo] = useState(null);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [codigoDeBarras, setCodigoDeBarras] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [valorCompra, setValorCompra] = useState(0);
  const [valorVenda, setValorVenda] = useState(0);


  //Pesquisa
  const [carregando, setCarregando] = useState(true);

  //Produtos
  const [produtos, setProdutos] = useState([]);
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState([]);
  const [repescarInfo, setRepescarInfo] = useState(false);
  const [produtoSelecId, setProdutoSelecId] = useState(null);

  //Categoria:
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [FiltroSelecionado, setFiltroSelecionado] = useState(null);
  const [filtragem, setFiltragem] = useState("");
  const [mensagemVazia, setMensagemVazia] = useState(false); // Estado para controlar a mensagem

  const [NaoTemProduto, setNaoTemProduto] = useState(false);

  //Fornecedor:
  const [fornecedor, setFornecedor] = useState("");
  const [showModal, setShowModal] = useState(false);

  const pegaProdutos = async (dataFRESH) => {
    try {
      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
        funcao: 'pegadadoscomcat', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
        senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
      });
      setProdutos(response.data); // coloca a LISTA de categorias em uma useState
      console.log(response.data) // log para sabermos o que foi pego.
      setCarregando(false);
      if (dataFRESH)
        return response.data
    } catch (error) {
      console.log("deu ruim: " + error) // log para sabermos qual foi o erro
    }
  };
  

  useEffect(() => {
    pegaProdutos(false);
  }, [repescarInfo])


  const insertDados = async (e) => { // e = evento, basicamente algumas informações/propriedades que o formulário tem
    e.preventDefault(); // não deixa a página recarregar (Sim, por default ele faz isso...)
    console.log(categoriaSelecionada, codigo, nome, descricao, codigoDeBarras, dataCompra, dataValidade, quantidade, valorCompra, valorVenda)
    if (CheckCamposVazios([codigo, nome, dataCompra, quantidade, valorCompra, valorVenda])) {
      Alerta(1, "Campos não preenchidos");
      return;
    }

    //inserção de produtos com mtas procedures...
    try {
      const diaDeHj = new Date();
      const diaOK = diaDeHj.toLocaleString('sv-SE').replace('T', ' ');

      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
        //parâmetros da consulta... SÃO necessários.
        funcao: 'inserirProdutoLoteEMovimento', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
        senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)

        id: codigo, //nome da esquerda (id), nome que você está mandando pro backend. Nome da direita (codigo), o código q o usuario digitou (o valor)
        nome: nome,
        descricao: descricao,
        codigoBarras: codigoDeBarras, // na api, referenciamos como 'codigoBarras' não 'codigoDeBarras'... Regra: o da esquerda é oq vc manda pra gente do backend
        categoria: categoriaSelecionada?.id_categorias ? categoriaSelecionada.id_categorias : null, //categoria q é selecionada pelo usuario no select...
        dt_compra: dataCompra,
        dt_validade: dataValidade, // na api, referenciamos como 'codigoBarras' não 'codigoDeBarras'... Regra: o da esquerda é oq vc manda pra gente do backend
        quantidade: quantidade, //categoria q é selecionada pelo usuario no select...
        vlr_compra: valorCompra,
        vlr_venda: valorVenda,
        id_usuario: User.id,
        data_movimento: diaOK,
        Mov: "E",
        NomeCliente: fornecedor
      });

      // se a inserção deu OK, ele vai executar os códigos abaixo... (Se deu ruim, vai pro catch direto... Sim, existe uma linha de continuídade, só é bem tênue)
      console.log(response.data) // manda a resposta pro console.log pra gente saber o que ta acontecendo...
      Alerta(2, "Inserção realizada");
      //zera os campos
      setCategoriaSelecionada(null);
      setCodigo('');
      setDescricao('');
      setNome('');
      setCodigoDeBarras('');
      setDataCompra('');
      setDataValidade('');
      setQuantidade('');
      setValorCompra('');
      setValorVenda('');

      //REPESCAR INFORMAÇÕES (ATUALIZAR TABELA)
      setRepescarInfo(prevState => !prevState); // variável fica na dependency array do useEffect que busca as informações da tabela. Quando o valor é mudado,
      // o useEffect é triggered de novo, pois ESSA variável está na dependency array.
      // prevState => !prevState inverte um valor booleano. Se era false, vira true, se era true, vira false. Isso só para repescarmos a informação.
    } catch (error) {
      console.log("deu ruim: " + error) // log para sabermos qual foi o erro
    }
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisaProduto.toLowerCase())
  );

  const atualizaProd = async () => {
    console.log("passou no restrito")
    const produtosFresh = await pegaProdutos(true);
    const produtofiltrado = produtosFresh.find((produto) => produto.id_produtos === produtoSelecId);
    console.log(produtofiltrado)
    setProdutoSelecionado(produtofiltrado)
  }


  const handleModal = (bool) => {
    setShowModal(bool);
  }


  const buscarProdutosPorCategoria = async () => {
    try {
      setCarregando(true);
      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
        funcao: 'PegaProdutosECategoriaPorCategoria',
        codcategoria: FiltroSelecionado ? FiltroSelecionado.id_categorias : "todos", //null.id_categorias -> null
        senha: '@7h$Pz!q2X^vR1&K'
      });

      setProdutos(response.data);
      setCarregando(false);
  
      // Exibe a mensagem se não houver produtos na categoria
      console.log(response.data)
      if (response.data.length === 0) {
        setMensagemVazia(true);
      } else {
        setMensagemVazia(false);
      }
    } catch (error) {
      console.log("Erro ao buscar produtos por categoria: " + error);
      setMensagemVazia(true);
      setCarregando(false); // Adiciona aqui também para evitar carregamento infinito em caso de erro
    }
  };

  useEffect(() => {
    // if (FiltroSelecionado) {
    //   buscarProdutosPorCategoria();
    // } else {
    //   setMensagemVazia(true);
    // }
    buscarProdutosPorCategoria();
  }, [FiltroSelecionado]);
  

  const handleSelecionarProd = (produto) => {
    setProdutoSelecId(produto.id_produtos);
    setProdutoSelecionado(produto);
  }


  useEffect(() => {
    console.log("Categoria Selecionada pelo componente" + JSON.stringify(categoriaSelecionada))
  }, [categoriaSelecionada])



  return (
    <div className="Produtos">
      <div className="DivForms">
        <div className="CabecalhoHome">
          <CabecalhoHome />
        </div>

        <Titulo
          tituloMsg='Gerenciamento de Produtos'
        />
        <AlertaNotificação />
        <button
          className="voltar"
          onClick={() => {
            navigate("/PagEscolhaProdutos");
          }}
        >
          Voltar
        </button>

        {showModal &&
          <ProdutosModal
            fechar={() => handleModal(false)}
            produtoOBJ={produtoSelecionado}
            opcao={'Gerais'}
            atualiza={() => atualizaProd()}
          />
        }

        <div className="telaInteira">
          <div className="TelaConteudo">
            <div className="container-tela-produtos">
              <div className="grupo-input-produto">
                <h2>Adicione um produto:</h2>
                <form onSubmit={(e) => insertDados(e)}> {/* IMPORTANTE!! quando o botão é acionado, o onSubmit é ativado, por isso que não tem onClick no botao...  */}

                  <div className="grupo-select">
                    <BuscaCategoriasComponentes setCategoriaSelecionada={setCategoriaSelecionada} categoriaSelecionada={categoriaSelecionada} />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="codigo">Código: <span style={{ color: "red" }}> *</span> </label>
                    <input
                      type="int"
                      id="codigo"
                      required value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="nomeProduto">Nome: <span style={{ color: "red" }}> *</span> </label>
                    <input
                      type="text"
                      id="nomeProduto"
                      required value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="descricaoProduto">Descrição:</label>
                    <input
                      id="descricaoProduto"
                      rows="3"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                  <div className="grupo-input">
                    <label htmlFor="codigoBarras">Código de Barras:</label>
                    <input
                      type="int"
                      id="codigoBarras"
                      value={codigoDeBarras}
                      onChange={(e) => {
                        const valor = e.target.value.slice(0, 13); // Limita a 13 caracteres
                        setCodigoDeBarras((valor).toString() || null);
                      }}
                      maxLength="13"
                    />
                  </div>

                  <hr />
                  Informações sobre o lote:
                  <hr />

                  <div className="grupo-input">
                    <label htmlFor="dataCompra">Fornecedor: </label>
                    <select
                      onChange={(e) => setFornecedor(e.target.value)}
                      value={fornecedor}
                    >
                      <option value={"não conhecido"}>Não conhecido</option>
                      <option value={"zezinho da esquina"}>zezinho da esquina</option>
                      <option value={"logitech"}>logitech</option>
                    </select>
                  </div>
                  <div className="grupo-input">
                    <label htmlFor="dataCompra">Data de Compra: <span style={{ color: "red" }}> *</span></label>
                    <input
                      type="date"
                      id="dataCompra"
                      rows="3"
                      required value={dataCompra}
                      onChange={(e) => setDataCompra(e.target.value)}
                    />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="dataVenda">Data de Validade:</label>
                    <input
                      type="date"
                      id="dataVenda"
                      rows="3"
                      value={dataValidade}
                      onChange={(e) => setDataValidade(e.target.value)}
                    />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="quantidadeProduto">Quantidade: <span style={{ color: "red" }}> *</span></label>
                    <input
                      type="int"
                      id="quantidadeProduto"
                      required value={quantidade}
                      onChange={(e) => setQuantidade(parseInt(e.target.value))}
                    />
                  </div>


                  <div className="grupo-input">
                    <label htmlFor="valorCompra">Valor da Compra: <span style={{ color: "red" }}> *</span></label>
                    <input
                      type="number"
                      id="valorCompra"
                      required value={valorCompra}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                            setValorCompra(value);
                        }
                      }}
                      />
                  </div>

                  <div className="grupo-input">
                    <label htmlFor="valorVenda">
                      Valor da Venda: <span style={{ color: "red" }}> *</span>
                    </label>
                    <input
                      type="number"
                      id="valorVenda"
                      required value={valorVenda}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                            setValorVenda(value);
                        }
                      }}
                      />
                  </div>

                  <button className="btnInserir">
                    Inserir Produto
                  </button>
                </form>

              </div>
            </div>
           
          
            <div className="terminal">
              <div className="barra-pesquisa">
              <div className="teste">
                    <FiltragemComponente setFiltroSelecionado={setFiltroSelecionado} FiltroSelecionado={FiltroSelecionado} />
                  </div>
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={pesquisaProduto}
                  onChange={(e) => setPesquisaProduto(e.target.value)}
                />
                 </div>

                 {carregando ? (
                  <div>Carregando...</div>
                ) : (
                  mensagemVazia ? (
                    <div>Nenhum produto encontrado na categoria selecionada.</div>
                  ) : (
                    produtosFiltrados.length > 0 ? (
                      produtosFiltrados.map((produto) => (
                        <ul key={produto.id_produtos} className="produtoGerado">
                          <div className="conteudoProdutoGerado">
                            <li className="liGerado">{produto.nome}</li>
                            <button onClick={() => {
                              handleSelecionarProd(produto);
                              handleModal(true);
                            }}>Editar produto</button>
                          </div>
                        </ul>
                      ))
                    ) : (
                      <div>Nenhum produto encontrado com o termo pesquisado.</div>
                    )
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PagProdutos)