import React, { useState, memo, useEffect } from 'react';
import '../Styles/Components/ProdutosModal.css';
import axios from 'axios';
import { useAlerta } from "../Context/AlertaContext.js";
import AlertaNotificação from "./AlertaNotificação.js";
import ConfirmaModal from './ConfirmaModal.js';
import { Link } from 'react-router-dom';
const produtoMemo = memo(function ProdutosModal({ fechar, produtoOBJ, opcao, atualiza }) { // teoricamente faria não ter reRender, mas ta tendo, ou seja, fds



  // Genérico
  const [abaAtiva, setAbaAtiva] = useState(opcao);
  const { Alerta } = useAlerta();

  //TODAS AS INFORMAÇÕES DO BANCO: (PERIGOSÍSSIMO :( )
  const [tudoOLD, setTudoOLD] = useState([]);
  const [refreshTUDO, setRefreshTudo] = useState(false);

  // modalConfirma
  const [showConfirma, setShowConfirma] = useState(false);
  const [msg, setMsg] = useState({});
  const [tamanho, setTamanho] = useState('');

  // Categoria
  const [cat, setCat] = useState('')
  const [produtosEmCat, setProdutosEmCat] = useState([]);
  const [refreshProdCat, SetRefreshProdCat] = useState(false);

  // Gerais
  const [nomeProd, setNomeProd] = useState('');
  const [descProd, setDescProd] = useState('');
  const [codBarras, setCodBarras] = useState('');

  //Lote (NÃO É ECONOMICO POHA)
  const [dataCompra, setDataCompra] = useState(null);
  const [dataValidade, setDataValidade] = useState(null);
  const [valorVenda, setValorVenda] = useState(null);
  const [valorCompra, setValorCompra] = useState(null);

  //Curva ABC
  const [qtConsumo, setQtConsumo] = useState(null);

  useEffect(() => {
    const pegaProdutosCat = async () => {
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "pegaprodutosporcategoria",
            senha: "@7h$Pz!q2X^vR1&K",
            codcategoria: produtoOBJ.categoria,
          }
        );
        setProdutosEmCat(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("deu ruim: " + error);
      }
    };
    pegaProdutosCat();
  }, [refreshProdCat])

  useEffect(() => {
    const pegaTUDO_old = async () => {
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "obterDadosProduto",
            senha: "@7h$Pz!q2X^vR1&K",
            id_produto: produtoOBJ.id_produtos
          }
        );
        setTudoOLD(response.data)
        console.log("TUDO:" + JSON.stringify(tudoOLD))
        console.log(response.data)
      } catch (error) {
        console.log("deu PÉSSIMO: " + error)
      }
    };
    pegaTUDO_old();
  }, [refreshTUDO])

  const handleClickAba = (nomeAba) => {
    setAbaAtiva(nomeAba);
  };

  const formaObj = (array, chaves, chavesBD, NOVA) => {
    let obj = []
    array.forEach((valor, index) => {
      if (valor !== '') {
        obj.push({ chave: chaves[index], chaveBD: chavesBD[index], novos: NOVA[index], valor });
      }
    });
    console.log(obj)
    return obj;
  }

  const preparaMSG_ALTERAR = (obj) => {
    setTamanho('P')
    console.log(obj.length)
    if (obj.length === 0)
      return 'Por favor, informe pelo menos um campo para alteração'
    let msgFormada = 'Tem certeza que deseja alterar ';

    if (obj.length > 1) {
      setTamanho('G')
    }
    if (obj.length > 2) {
      setTamanho('GG')
    }

    let i = obj.length;

    //formar msg:
    obj.forEach((element, index) => {
      msgFormada += (index === 0 ? "" : " E ") + element.chave.toUpperCase() + (index === obj.length - 1 ? " do produto? " : "")
    });
    let msgOBJ = []

    msgOBJ.push(msgFormada)

    while (i > 0) {
      msgOBJ.push(obj[i - 1].chave + " anterior: ");
      msgOBJ.push("STYLE1'" + (tudoOLD[obj[i - 1].chaveBD] ? tudoOLD[obj[i - 1].chaveBD] : "Não possui") + "'")
      msgOBJ.push(obj[i - 1].novos + " " + obj[i - 1].chave + ":")
      msgOBJ.push("STYLE2'" + obj[i - 1].valor + "'")
      i--
    }

    return msgOBJ
  }

  const InfoCatPertencentes = () => {

    if (produtoOBJ.categoria === null) {
      return (
        <div className='erro'>
          Produto não possui categoria. Veja a próxima aba <u onClick={() => setAbaAtiva('InfoCatProduto')} style={{ cursor: 'pointer', color: 'blue' }}>Alterar Categoria do Produto</u> para referenciar o produto à uma categoria existente
          <br />
          <br />
          Não achou a categoria que queria? Clique <Link to="/PagGerirCategoria">AQUI</Link> para criar uma nova categoria
        </div>
      );
    }

    const handleForm = async (e) => {
      e.preventDefault();
      setShowConfirma(true);
    }

    const atualizaDados = async () => {
      const funcao = {
        funcao: "UpdNomeCategoria",
        senha: "@7h$Pz!q2X^vR1&K",
        codcategoria: produtoOBJ.categoria,
        newname: cat
      }
      await atualizaDadosUniversal(funcao)
      setCat('');
      atualiza();
      setShowConfirma(false)
    }

    return (
      <div className="divSub" style={{ height: '95%' }}>
        {showConfirma &&
          <ConfirmaModal
            message="Esta ação irá alterar o nome da CATEGORIA, que afetará TODOS os produtos incluídos nela. Deseja continuar?"
            onConfirm={() => atualizaDados()}
            onCancel={() => setShowConfirma(false)}
            BoolMultiplaEscolha={true}
          />
        }

        <h2 className='Titulo'> Alterando Categoria <u>{produtoOBJ.nomeCat}</u> pertencente à (entre outros):</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
        <div className='divConteudo'>
          <span>Produtos pertencentes a categoria <u>{produtoOBJ.nomeCat}</u>:</span>
          <ul>
            {produtosEmCat.map((produto) => (
              <li
                key={produto.id_produtos}
                style={{
                  color: produto.id_produtos === produtoOBJ.id_produtos ? '#e04d18' : 'inherit'
                }}
              >
                {produto.id_produtos === produtoOBJ.id_produtos ? produto.nome + " (produto selecionado)" : produto.nome}
              </li>
            ))}
          </ul>
          <form className="formCat" onSubmit={(e) => handleForm(e)}>
            <label>
              Código da Categoria:
              <input
                style={{
                  cursor: 'not-allowed',
                  opacity: 0.5,
                  filter: 'grayscale(100%)',
                }}
                placeholder={produtoOBJ.categoria}
                readOnly
              />
            </label>

            <label>
              Categoria Nome:
              <input
                placeholder={produtoOBJ.nomeCat}
                required value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
            </label>

            <button className='botao-testar'>Alterar</button>
          </form>
        </div>
      </div>
    )
  }

  const InfoCatProduto = () => {
    return (
      <div className="divSub" style={{ height: '95%' }}>
        <h2 className='Titulo'> Alterando <u>Categoria</u> do item:</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
        <div className='divConteudo'>
          Quando o Gabriel fizer o select separado, eu coloco aqui, ASS. thiago
        </div>
      </div>
    )
  }

  const atualizaDadosUniversal = async (funcao, setRefresh) => {
    try {
      const response = await axios.post("http://pggzettav3.mooo.com/api/index.php", funcao);

      if (response.status === 200) {
        Alerta(2, "Alterado com Sucesso");
        if (setRefresh) {
          setRefresh(prevState => !prevState)
        }
      } else {
        Alerta(3, "Erro na alteração");
      }
    } catch (error) {
      console.log(error)
      Alerta(1, error);
      setShowConfirma(false)
    }

  }

  const InfoProduto = () => {

    const handleForm = (e) => {
      e.preventDefault();
      const obj = formaObj([nomeProd, descProd, codBarras], ['Nome', 'Descrição', 'Código de Barras'], ['nome', 'descricao', 'codigodebarras'], ['Novo', 'Nova', 'Novo'])
      const msgOBJ = preparaMSG_ALTERAR(obj)

      console.log(msgOBJ)
      setMsg(msgOBJ)
      setShowConfirma(true)
    }

    const atualizaDados = async () => {
      const funcao = {
        funcao: "AtualizarProdutoExistenteNoBancoDeDadosComBaseNoIdFornecidoAlterandoNomeProdutoEDescricaoDoProdutoSeNecessario",
        senha: "@7h$Pz!q2X^vR1&K",
        nomeProduto: nomeProd === '' ? null : nomeProd,
        descricao: descProd === '' ? null : descProd,
        codigodebarras: codBarras === '' ? null : codBarras,
        id_produtos: produtoOBJ.id_produtos
      }
      await atualizaDadosUniversal(funcao, SetRefreshProdCat)
      setNomeProd('');
      setDescProd('')
      setCodBarras('');
      atualiza();
      setShowConfirma(false)
    }

    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando informações <u>Gerais</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message={msg}
              onConfirm={() => atualizaDados()}
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha={msg == 'Por favor, informe pelo menos um campo para alteração' ? false : true}
              styles={{ 'STYLE1': { color: '#da0f0f' }, 'STYLE2': { color: '#00aef3' } }}
              tamanho={tamanho}
            />
          }
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat' onSubmit={(e) => handleForm(e)}>
              <label>
                Código:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={produtoOBJ.id_produtos}
                  readOnly
                />
              </label>
              <label>
                Nome:
                <input
                  placeholder={produtoOBJ.nome}
                  value={nomeProd}
                  onChange={(e) => setNomeProd(e.target.value)}
                />
              </label>
              <label>
                Descrição:
                <input placeholder={produtoOBJ.descricao}
                  value={descProd}
                  onChange={(e) => setDescProd(e.target.value)} />
              </label>

              <label>
                Código de Barras:
                <input placeholder={produtoOBJ.codigodebarras ? produtoOBJ.codigodebarras : "Não possui"}
                  value={codBarras}
                  onChange={(e) => setCodBarras(e.target.value)} />
              </label>

              <button className='botao-testar'>Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const infoLote = () => {
    const handleForm = (e) => {
      e.preventDefault();
      const obj = formaObj([dataCompra, dataValidade, valorCompra, valorVenda], ['Data de Compra', 'Data de Validade', 'Valor de Compra', 'Valor de Venda'], ['dt_compra', 'dt_validade', 'vlr_compra', 'vlr_venda'], ['Nova', 'Nova', 'Novo', 'Novo'])
      const msgOBJ = preparaMSG_ALTERAR(obj)

      setMsg(msgOBJ)
      setShowConfirma(true)
    }

    const atualizaDados = async () => {

    }

    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando informações de <u>Lote</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message={msg}
              onConfirm={() => atualizaDados()}
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha={msg == 'Por favor, informe pelo menos um campo para alteração' ? false : true}
              styles={{ 'STYLE1': { color: '#da0f0f' }, 'STYLE2': { color: '#00aef3' } }}
              tamanho={tamanho}
            />
          }
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat' onSubmit={(e) => handleForm(e)}>
              <label>
                Data de compra:
                <input
                  value={dataCompra}
                  onChange={(e) => setDataCompra(e.target.value)}
                  placeholder={tudoOLD.dt_compra ? tudoOLD.dt_compra : "Não possui"}
                />
              </label>

              <label>
                Data de validade:
                <input
                  placeholder={tudoOLD.dt_validade ? tudoOLD.dt_validade : "Não possui/Não se aplica"}
                  value={dataValidade}
                  onChange={(e) => setDataValidade(e.target.value)}
                />
              </label>

              <label>
                Quantidade:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.qtde ? tudoOLD.qtde : "0"}
                  readOnly
                />
              </label>
              Deseja alterar a quantidade do produto? Clique <Link to="/PagGerirCategoria">AQUI</Link> e vá para a página de gereciamento de LOTE para um controle mais detalhado
              <label>
                Valor de compra:
                <input placeholder={tudoOLD.vlr_compra ? tudoOLD.vlr_compra : "Não possui"}
                  value={valorCompra}
                  onChange={(e) => setValorCompra(e.target.value)} />
              </label>

              <label>
                Valor de venda:
                <input placeholder={tudoOLD.vlr_venda ? tudoOLD.vlr_venda : "Não possui"}
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)} />
              </label>


              <button className='botao-testar'>Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  const infoPP = () => {
    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando <u>Ponto de Pedido</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message={msg}
              onConfirm={null/*() => atualizaDados() */}
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha={msg == 'Por favor, informe pelo menos um campo para alteração' ? false : true}
              styles={{ 'STYLE1': { color: '#da0f0f' }, 'STYLE2': { color: '#00aef3' } }}
              tamanho={tamanho}
            />
          }
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat' /*onSubmit={(e) => handleForm(e)   }*/>
              <label>
                Demanda média de vendas diárias:
                <input placeholder={tudoOLD.demanda_media ? tudoOLD.demanda_media : "Não possui"}
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)} />
              </label>

              <label>
                Tempo de Reposição:
                <input placeholder={tudoOLD.tempo_reposicao ? tudoOLD.tempo_reposicao : "Não possui"}
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)} />
              </label>

              <label>
                Tempo Estimado de Entrega:
                <input placeholder={tudoOLD.tempo_entrega ? tudoOLD.tempo_entrega : "Não possui"}
                  value={valorCompra}
                  onChange={(e) => setValorCompra(e.target.value)} />
              </label>

              <label>
                Quantidade de produtos vendidos no mês:
                <input placeholder={tudoOLD.quantidade_vendida ? tudoOLD.quantidade_vendida : "Não possui"}
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)} />
              </label>

              <label>
                Consumo Médio:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.consumo_medio ? tudoOLD.consumo_medio : "0"}
                  readOnly
                />
              </label>
              <label>
                Estoque de Segurança:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.estoque_seguranca ? tudoOLD.estoque_seguranca : "0"}
                  readOnly
                />
              </label>
              <label>
                Ponto de Pedido:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.ponto_pedido ? tudoOLD.ponto_pedido : "0"}
                  readOnly
                />
              </label>
              <button className='botao-testar'>Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  const infoCurva = () => {

    const handleForm = (e) => {
      e.preventDefault();
      const obj = formaObj([qtConsumo], ['Quantidade de Consumo'], ['qt_consumo'], ['Nova'])
      const msgOBJ = preparaMSG_ALTERAR(obj)

      console.log(msgOBJ)
      setMsg(msgOBJ)
      setShowConfirma(true)
    }

    const atualizaDados = async () => {
      const funcao = {
        funcao: "insereOuAtualizaCurvaABC",
        senha: "@7h$Pz!q2X^vR1&K",
        idProduto: produtoOBJ.id_produtos,
        qtConsumo: qtConsumo
      }
      await atualizaDadosUniversal(funcao, setRefreshTudo)
      setQtConsumo('');
      atualiza();
      setShowConfirma(false)
    }

    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando informações de <u>Curva ABC</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message={msg}
              onConfirm={() => atualizaDados()}
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha={msg == 'Por favor, informe pelo menos um campo para alteração' ? false : true}
              styles={{ 'STYLE1': { color: '#da0f0f' }, 'STYLE2': { color: '#00aef3' } }}
              tamanho={tamanho}
            />
          }
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat' onSubmit={(e) => handleForm(e)}>
              <label>
                Quantidade de consumo:
                <input
                  placeholder={tudoOLD.qt_consumo ? tudoOLD.qt_consumo : "Não possui"}
                  value={qtConsumo}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setQtConsumo(value);
                    }
                  }}
                  numeric
                />
              </label>
              <button className='botao-testar'>Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  const infoLoteEco = () => {
    return (
      <div>
        <h2 className='Titulo'> Editando <u>Lote Econômico</u> do item</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
      </div>
    )
  }

  return (
    <div className='ProdutosModal'>
      <AlertaNotificação />
      <div className='conteudo-modal'>
        <div className='cabecalho-modal'>
          <button
            className={`botao-aba ${abaAtiva === 'Gerais' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Gerais')}
          >
            Info Gerais
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Lote' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Lote')}
          >
            Lote
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Ponto De Pedido' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Ponto De Pedido')}
          >
            Ponto De Pedido
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Curva ABC' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Curva ABC')}
          >
            Curva ABC
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Lote Econômico' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Lote Econômico')}
          >
            Lote Econômico
          </button>

          <button
            className={`botao-aba ${abaAtiva === 'InfoCatPertencentes' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('InfoCatPertencentes')}
          >
            Alterar Categoria Pertencente
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'InfoCatProduto' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('InfoCatProduto')}
          >
            Alterar Categoria do Produto
          </button>

          <button onClick={fechar} className='botao-fechar'>X</button>
        </div>
        <div className='corpo-modal'>

          {(() => {
            switch (abaAtiva) {
              case 'Gerais': return InfoProduto();
              case 'Ponto De Pedido': return infoPP();
              case 'Curva ABC': return infoCurva();
              case 'Lote Econômico': return infoLoteEco();
              case 'Lote': return infoLote();
              case 'InfoCatPertencentes': return InfoCatPertencentes();
              case 'InfoCatProduto': return InfoCatProduto();
              default: return "erro nos props... veja se o parametro opcao está correto";
            }
          }
          )()}
        </div>
      </div>
    </div>
  )
});

export default produtoMemo;
