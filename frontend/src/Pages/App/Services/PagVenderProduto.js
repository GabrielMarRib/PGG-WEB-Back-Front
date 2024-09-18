import React, { useState, useEffect, useContext } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import "../../../Styles/App/Service/PagVenderProduto.css";
import axios from "axios";
import { CheckCamposNulos } from "../../../Functions/Functions.js";
import Redirect from "../../../Functions/Redirect";
import { UserContext } from "../../../Context/UserContext";
import AlertaNotificação from "./../../../Components/AlertaNotificação.js";
import { useAlerta } from ".././../../Context/AlertaContext.js";
import { json, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Titulo from "../../../Components/Titulo.jsx";

function PagVenderProduto() {
  const [carregando, setCarregando] = useState(true);
  const [custoUnitario, setCustoUnitario] = useState(0);
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [quantidadeVenda, setQuantidadeVenda] = useState(0);
  const [receitaEstimada, setReceitaEstimada] = useState(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState([]);
  const [cliente, setcliete] = useState([]);
  const [produtosCats, setProdutosCats] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [dadosPP, setDadosPP] = useState([]);

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();
  Redirect(User);

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

  useEffect(() =>{
    const pegaProdutin = async () => {
      try{
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "obterProdutosPorCategoriaComLote",
            senha: "@7h$Pz!q2X^vR1&K",
            categoria: categoriaSelecionada,
          }
        );
        setProdutosCats(response.data)
      }catch (error){
      console.log(error)  
      }
    } 
    pegaProdutin();
  }, [categoriaSelecionada]);

  const handleChangeCategoria = (e) => {
    const valor = e.target.value; // basicamente o valor do filho do select (option)
    console.log(valor)
    setProdutosCats([])
    if (isNaN(valor)|| valor.length === 0) // aquela jogadinha la embaixo...
    
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
  console.log("Custo Unitario:"+custoUnitario,
    "Qauntidade Disponivel:"+quantidadeDisponivel,
    "Quantidade de Venda:"+quantidadeVenda,
    "Receita Estimada:"+receitaEstimada,
    "PRoduto Selecionado"+ produtoSelecionado
    )
    const teste = (e) => {
        setcliete(e.target.value)
    }

  const handleInsercaoVendas = async () => {
    console.log(User.userData.Nivel_acesso,User.id,User.userData.Nome,produtoSelecionado,quantidadeVenda,receitaEstimada,11)
   
    if (User && User.userData && User.userData.Nome) {
      try {
        console.log("Rodou aqui")
        console.log(JSON.stringify(User))
        console.log(JSON.stringify(produtoSelecionado))
        //INSERT INTO `movimento`(`produto`, `data`, `qtde`, `valor`, `mov`, `cliente`, `Autor`, `Autor_id`, `Autor_Acesso`) VALUES ('[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]')
        const response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
          funcao: "insereMovimento",
          senha: "@7h$Pz!q2X^vR1&K",
          produto: produtoSelecionado.id,
          qtde: quantidadeVenda,
          valor: receitaEstimada,
          mov: "S",
          Autor: User.userData.Nome,
          Autor_id: User.id,
          Autor_Acesso: User.userData.Nivel_acesso,
          cliente: cliente,
        });
        console.log(response)
        // INSERT INTO `movimento`(`produto`, `qtde`, `valor`, `mov`, `cliente`, `Autor`, `Autor_id`, `Autor_Acesso`) 
        // VALUES (1,1,1,"E","Sergio","SErgio2","ADSA",2)
        
    handleGerarRelatorioVenda(
      produtoSelecionado.id, //pd ser q eu esteja chamando errado mas eu duvido
      produtoSelecionado.nome, //pd ser q eu esteja chamando errado mas eu duvido
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

  } catch (error) {
    console.log(error);
  }
}
};
const handleGerarRelatorioPP = async (produto) => {
  if (Array.isArray(dadosPP)) {
    const infoComumEmPP = dadosPP.find((obj) => obj.id === produto.id);

    if (infoComumEmPP) {
      const PP = infoComumEmPP.data.PP;
      const QV = infoComumEmPP.data.QV;
      const TR = infoComumEmPP.data.TR;
      const ES = infoComumEmPP.data.ES;
      const qtdeSobra = quantidadeDisponivel - quantidadeVenda;
      if (qtdeSobra > PP) {
        // se ainda pode vender, manda pra casa do krl
        return;
      }

      const msg = `URGENTE!! O Produto '${produto.data.nome}' de id: '${produto.id}', atingiu o nível de ponto de pedido!!! O produto se encontra com APENAS ${qtdeSobra}/${PP} (PP) UNIDADES`;
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
                      <option value="salve">Categorias</option>
                      {categorias?.map((categoria) => (
                        <option key={categoria.id_categorias} value={categoria.id_categorias}>
                          {categoria.id_categorias} - {categoria.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {produtosCats.length > 0 && (
                    <>
                      <label>Selecione um produto:</label>
                      <select className="Select-Produto" value={produtoSelecionado.id} onChange={handleChangeProduto}>
                        <option value="">Selecione um produto</option>
                        {produtosCats?.map((produtos) => (
                          <option key={produtos.id} value={produtos.id}>
                            {produtos.nome || "Produto não existe"}
                          </option>
                        ))}
                      </select>
                    </>
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