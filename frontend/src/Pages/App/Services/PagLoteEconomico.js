import React, { useState, useEffect, useRef } from "react";
import { getDocs, collection, addDoc,onSnapshot,deleteDoc,query,where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { camposNaoPreenchidos } from "../../../Messages/Msg";
import { CheckCamposNulos, apagarCampos } from "../../../Functions/Functions";
import Cabecalho from '../../../Components/Cabecalho';
import '../../../Styles/App/Service/PagLoteEconomico.css'


function PagLoteEconomico() {
  const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
  const [CodigoPontoPedido, setCodigoPontoPedido] = useState([]);
  const [DadosPontoPedido, SetDadosPontoPedido] = useState({});

  const [produtoSelecionado, setProdutoSelecionado] = useState({ id: '', Nome: '' });
  const [estoqueSeguranca, setEstoqueSeguranca] = useState(0);
  const [tempoDeReposicao, setTempoDeReposicao] = useState(0);
  const [consumoMedio, setConsumoMedio] = useState(0);
  const [pontoPedidoCalculado, setPontoPedidoCalculado] = useState(0);
  const fetchCountRef = useRef(0);
  let vezes = 1;

//   useEffect(() => {
//     const PegaDadosGeralDB = async () => {
//       try {
//         const unsubscribeEstoque = onSnapshot(collection(db, 'Estoque'), (snapshot) => {
//           const estoqueData = snapshot.docs.map(pegaDadosGeral);
//           setDadosEstoqueGeral(estoqueData);
//         });

//         const unsubscribePontoPedido = onSnapshot(collection(db, 'PontoDePedido'), (snapshot) => {
//           const pontoPedidoData = snapshot.docs.reduce((acc, doc) => {
//             acc[doc.data().Codigo] = doc.data();
//             return acc;
//           }, {});
//           SetDadosPontoPedido(pontoPedidoData);
//           const codigoPontoPedido = Object.keys(pontoPedidoData);
//           setCodigoPontoPedido(codigoPontoPedido);
//         });

//         return () => {
//           unsubscribeEstoque();
//           unsubscribePontoPedido();
//         };

//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     if (fetchCountRef.current === 0) {
//       console.log(vezes++);
//       PegaDadosGeralDB();
//       fetchCountRef.current++;
//     }
//   }, []);

  function pegaDadosGeral(item) {
    return { id: item.id, ...item.data() };
  }

  function pegaDadosUnicosEmPP(item) {
    if (!CodigoPontoPedido.includes(item.id))
      return (<option key={item.id} value={JSON.stringify({ id: item.id, Nome: item.Nome })}>{item.Nome}</option>)
    else
      return null;
  }

  function pegaDadosComunsEmPP(item) {
    if (CodigoPontoPedido.includes(item.id)) {
      const dadosCabiveisPP = DadosPontoPedido[item.id] || {}; // pega os dados de ponto de pedido onde o item.id existe lá, só funfa pq o gepeto gerou aquele where bem louco via javascript... rlx ta td mt louco, ass:Thiago
      return (
        <li key={item.id}>
          <p>--Produto--</p>
          <p>Id: {item.id}</p>
          <p>Nome: {item.Nome}</p>
          <p>Descricao: {item.Descricao}</p>
          <p>Custo Unitário: {item.Custo_Unitario}</p>
          <p>Quantidade: {item.Quantidade}</p>
          <p>Data de adição ao estoque: {item.Data_Entrada.toDate().toLocaleString('pt-BR')}</p>
          <p>--Ponto de Pedido--</p>
          <p>Consumo Médio: {dadosCabiveisPP.ConsumoMedio}</p>
          <p>Estoque de Segurança: {dadosCabiveisPP.EstoqueSeguranca}</p>
          <p>Tempo de Reposição (dias): {dadosCabiveisPP.TempoReposicao}</p>
          <p>Ponto de Pedido: {dadosCabiveisPP.ValorCalculo}</p>
          <p>Data de cálculo: {dadosCabiveisPP.DataCalculo}</p>
          {/* <button onClick={() => deletarItem(item.id)}>Deletar Item</button> */}
          <button onClick={() => alert("TODO")}>Alterar Item</button> {/* TODO */}
          <br />
        </li>
      );
    } else {
      return null;
    } 
  }

//   const deletarItem = async (itemId) => {
//     try {
//       const q = query(collection(db, 'PontoDePedido'), where("Codigo", "==", itemId));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach(async (doc) => {
//         await deleteDoc(doc.ref);
//         alert("Item deletado com sucesso")
//       });
//     }catch(erro){
//       console.log("Error deleting item:", erro);
//     }
//   }

  const calcularPontoPedido = async () => {
    if (CheckCamposNulos([estoqueSeguranca, tempoDeReposicao, consumoMedio])) {
      alert(camposNaoPreenchidos(true));
      return;
    }
    console.log(produtoSelecionado.Nome);
    if (produtoSelecionado.Nome === '' || produtoSelecionado.Nome === undefined) {
      alert(camposNaoPreenchidos(false));
      return;
    }

    const pontoPedido = estoqueSeguranca + (consumoMedio * tempoDeReposicao); // conta do ponto de pedido
    setPontoPedidoCalculado(pontoPedido);

    // try {
    //   const data = new Date();
    //   await addDoc(collection(db, 'PontoDePedido'), { //insere na tabela PontoDePedido
    //     Codigo: produtoSelecionado.id,
    //     ConsumoMedio: consumoMedio,
    //     EstoqueSeguranca: estoqueSeguranca,
    //     TempoReposicao: tempoDeReposicao,
    //     ValorCalculo: pontoPedido,
    //     DataCalculo: data.toLocaleString('pt-BR')  
    //   });
    //   alert("Ponto de pedido calculado e adicionado a lista abaixo...")
    // } catch (erro) {
    //   console.log(erro);
    // }finally{
    //   apagarCampos([setProdutoSelecionado,setConsumoMedio,setEstoqueSeguranca,setTempoDeReposicao])
    // }
  };

  const handleChange = (event) => { //codigo do git mt modificado
    try {
      const selectedValue = JSON.parse(event.target.value);
      setProdutoSelecionado(selectedValue);
    } catch (error) {
      setProdutoSelecionado('');
    }
  };

  const navigate = useNavigate();

  return (

    
    <div className="LoteEconomico">
      <div className="Cabecalho">
          <Cabecalho/>
      </div>
      <div class="container-main">
        <div className="container-tela-ponto-pedido">
          <h2>Calcular Lote Econômico</h2>
          <div className="grupo-input-produto">
            <div className="Div-Select">
              <p>Selecione um produto:</p>
                  <select value={JSON.stringify(produtoSelecionado)} onChange={handleChange}>
                    <option value="">Selecione um produto</option>
                    {dadosEstoqueGeral.map(pegaDadosUnicosEmPP)}
                </select>
            </div>
            <div className="Resultado-select">
                {produtoSelecionado.Nome && <p>Produto Selecionado: {produtoSelecionado.Nome}</p>}
                {produtoSelecionado.id && <p>Produto id: {produtoSelecionado.id}</p>}
            </div>

            <div className="grupo-input-estoque-seguranca">
              <label htmlFor="estoqueSeguranca">Estoque de Segurança:</label>
              <input
                type="number"
                id="estoqueSeguranca"
                value={estoqueSeguranca}
                onChange={(e) => setEstoqueSeguranca(parseInt(e.target.value))}
              />
            </div>

            <div className="grupo-input-tempo-de-reposicao">
              <label htmlFor="tempoDeReposicao">Tempo de Reposição (dias):</label>
              <input
                type="number"
                id="tempoDeReposicao"
                value={tempoDeReposicao}
                onChange={(e) => setTempoDeReposicao(parseInt(e.target.value))}
              />
            </div>

            <div className="grupo-input-consumo-medio">
              <label htmlFor="consumoMedio">Consumo Médio Diário:</label>
              <input
                type="number"
                id="consumoMedio"
                value={consumoMedio}
                onChange={(e) => setConsumoMedio(parseInt(e.target.value))}
              />
            </div>
            <button onClick={() => calcularPontoPedido()}>Calcular Ponto de Pedido</button>
          </div>
        </div>
        <div className="Conteudo-Resultado">
          <h2 className="titulo-pontos-pedido">Itens Adicionados:</h2>
          <ul className="lista-pontos-pedido"> {/*Marcao/Gustavo/Qm caralhos for fazer o design; É necessário isso aqui estar visivel pro cliente, entao NAO DELETA, ja q vai ter manipulação dos itens aqui... tmj, ass:Thiago*/}
            {dadosEstoqueGeral.map(pegaDadosComunsEmPP)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PagLoteEconomico;
