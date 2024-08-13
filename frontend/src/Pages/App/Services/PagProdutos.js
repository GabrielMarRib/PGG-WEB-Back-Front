import React, { useState, useEffect, useCallback, memo } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import "../../../Styles/PagProdutos.css";
import axios from "axios";
import {
  apagarCampos,
  CheckCamposNulos,
  CheckCamposVazios,
} from "../../../Functions/Functions";
import { PegaDadosGeralDB } from "../../../Functions/Functions";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import { pegaCategorias } from "../../../Functions/Functions";

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
  const [repescarInfo, setRepescarInfo] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  //Pesquisa
  const [restricao, setRestricao] = useState("");

  //Produtos
  const [produtos, setProdutos] = useState([]);
  const [pesquisaProduto, setPesquisaProduto] = useState("");

  useEffect(() => {
    const pegaProdutos = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
          funcao: 'pegadadoscomcat', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
          senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
        });
        setProdutos(response.data); // coloca a LISTA de categorias em uma useState
        console.log(response.data) // log para sabermos o que foi pego.
      } catch (error) {
        console.log("deu ruim: " + error) // log para sabermos qual foi o erro
      }
    }; pegaProdutos();
  }, [])

  const insertDados = async (e) => { // e = evento, basicamente algumas informações/propriedades que o formulário tem
    e.preventDefault(); // não deixa a página recarregar (Sim, por default ele faz isso...)
    console.log(categoriaSelecionada, codigo, nome, descricao, codigoDeBarras, dataCompra, dataValidade, quantidade, valorCompra, valorVenda)
    if(CheckCamposVazios([ codigo, nome, dataCompra, quantidade, valorCompra, valorVenda]))
    {
        Alerta(1, "Campos não preenchidos");
        return;
    }

    //inserção de produtos...
    try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
            //parâmetros da consulta... SÃO necessários.
            funcao: 'insereProduto', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
            senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)

            id: codigo, //nome da esquerda (id), nome que você está mandando pro backend. Nome da direita (codigo), o código q o usuario digitou (o valor)
            nome: nome,
            descricao: descricao,
            codigoBarras: codigoDeBarras, // na api, referenciamos como 'codigoBarras' não 'codigoDeBarras'... Regra: o da esquerda é oq vc manda pra gente do backend
            categoria: categoriaSelecionada //categoria q é selecionada pelo usuario no select...
        });
        if(response.status === 200){
          const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
            //parâmetros da consulta... SÃO necessários.
            funcao: 'inserelote', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
            senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
            dt_compra: dataCompra,
            dt_validade: dataValidade, // na api, referenciamos como 'codigoBarras' não 'codigoDeBarras'... Regra: o da esquerda é oq vc manda pra gente do backend
            qtde: quantidade, //categoria q é selecionada pelo usuario no select...
            vlr_compra: valorCompra,
            vlr_venda: valorVenda,
            produto: codigo
        });
        }
        
        // se a inserção deu OK, ele vai executar os códigos abaixo... (Se deu ruim, vai pro catch direto... Sim, existe uma linha de continuídade, só é bem tênue)
        console.log("resposta da inserção> "+response) // manda a resposta pro console.log pra gente saber o que ta acontecendo...

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

const handleChangeCategoria = (e) => { // e significa 'evento' que no caso, é o valor de um 'filho' do select, no caso, na ordem de hierarquia, a única coisa abaixo de select é option.
  const valor = e.target.value; // basicamente o valor do filho do select (option)
  console.log(valor)
  if (isNaN(valor)) // aquela jogadinha la embaixo...
      setCategoriaSelecionada(null)   // se o valor pouco importa para o bd, manda null
  else                                // caso contrário
      setCategoriaSelecionada(valor)  // manda o valor pra variável de categoria selecionada
}

useEffect(() => { // useEffect para pegar informações da LISTA de categorias...
  const pegaCategorias = async () => { // função existe para separar async do useEffect...
      try {
          const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
              funcao: 'pegacategorias', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
              senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
          });
          setCategorias(response.data); // coloca a LISTA de categorias em uma useState
          console.log(response.data) // log para sabermos o que foi pego.
      } catch (error) {
          console.log("deu ruim: " + error) // log para sabermos qual foi o erro
      }
  };
  pegaCategorias(); //chama a função
}, [])

const produtosFiltrados = produtos.filter((produto) =>
  produto.nome.toLowerCase().includes(pesquisaProduto.toLowerCase())
);

  return (
    <div className="Produtos">
      <div className="DivForms">
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
        <div className="telaInteira">
          <div className="TelaConteudo">
            <div className="container-tela-produtos">
              <div className="grupo-input-produto">
                <h2>Adicione um produto:</h2>
               <form onSubmit={(e) => insertDados(e)}> {/* IMPORTANTE!! quando o botão é acionado, o onSubmit é ativado, por isso que não tem onClick no botao...  */}
                
                  <div className="grupo-select">
                    <select value={categoriaSelecionada} onChange={handleChangeCategoria}>
                      <option value="Vazio">Categorias</option>
                      <option value="SemCategoria">Não possui categoria</option> {/* Nova opção */}
                      {categorias?.map((categoria) => ( // para cada cadegoria no objeto de categorias.... (sim quando você faz variavel.map(item) => ...) você quer dizer um foreach, então imaginem que isso quer dizer: Para cada categoria em categorias, faça:  )
                            <option key={categoria.id_categorias} value={categoria.id_categorias}> {categoria.id_categorias} - {categoria.nome}</option> // exibe o id e o nome da categoria (de cada uma)
                        ))}
                    </select>
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
                      onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                    />
                  </div>


                  <div className="grupo-input">
                    <label htmlFor="valorCompra">Valor da Compra: <span style={{ color: "red" }}> *</span></label>
                    <input
                      type="number"
                      id="valorCompra"
                      required value={valorCompra}
                      onChange={(e) =>
                        setValorCompra(parseInt(e.target.value) || 0)
                      }
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
                      onChange={(e) =>
                        setValorVenda(parseInt(e.target.value) || 0)
                      }
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
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={pesquisaProduto}
                  onChange={(e) => setPesquisaProduto(e.target.value)}
                />
              </div>
              {produtosFiltrados.map((produto) => (
                <ul key={produto.id_produtos}>
                  <hr />
                  <li>{produto.nome}</li>
                  <button>Editar produto</button>
                </ul>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PagProdutos;