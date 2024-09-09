import React, { useState, memo, useEffect } from 'react';
import '../Styles/Components/ProdutosModal.css';
import axios from 'axios';
import { useAlerta } from "../Context/AlertaContext.js";
import AlertaNotificação from "./AlertaNotificação.js";
import ConfirmaModal from './ConfirmaModal.js';
import { Link } from 'react-router-dom';
import BuscaCategoriasComponentes from "../Components/BuscaCategoriasComponente.js";

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

  //Ponto de Pedido
  const [DM, setDM] = useState('');
  const [TR, setTR] = useState('');
  const [TE, setTE] = useState('');
  const [QV, setQV] = useState('');

  //Curva ABC
  const [qtConsumo, setQtConsumo] = useState('');

  //Categoria select
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);

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
  }, [refreshTUDO]) // false MUDOU pra true, como MUDOU, chama esse useEffect dnv

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
    if(obj.length > 3){
      setTamanho('XGG')
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

        <h2 className='Titulo'> Alterando Categoria <u>{produtoOBJ.nomeCat}</u> pertencente à{produtosEmCat?.length > 1 ? " (entre outros)" : null}:</h2>
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
          SELECT do gabriel

        
          <div className="grupo-select">
                    <BuscaCategoriasComponentes setCategoriaSelecionada={setCategoriaSelecionada} categoriaSelecionada={categoriaSelecionada} />
                  </div>
          <button onClick={() => console.log(categoriaSelecionada)}>atualizar</button>
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
    return (
      <div className='divSub'>
        <h2 className='Titulo'> Visualizando informações de <u>Lote</u> do item</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat'>
              <label>
                Data de compra:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.dt_compra ? tudoOLD.dt_compra : 'Não possui'}
                />
              </label>
              <label>
                Data de validade:
                <input
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}
                  placeholder={tudoOLD.dt_validade ? tudoOLD.dt_validade : "Não possui/Não se aplica"}
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
              <label>
                Valor de compra:
                <input placeholder={tudoOLD.vlr_compra ? tudoOLD.vlr_compra : "Não possui"}
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }}/>
              </label>
              <label>
                Valor de venda:
                <input placeholder={tudoOLD.vlr_venda ? tudoOLD.vlr_venda : "Não possui"}
                  style={{
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    filter: 'grayscale(100%)',
                  }} />
              </label>
              Deseja alterar as informações de lote? Clique <Link to="/PagGerirCategoria">AQUI</Link> e vá para a página de gereciamento de LOTE para um controle mais detalhado
            </form>
          </div>
        </div>
      </div>
    )
  }
  const infoPP = () => {
    const handleForm = (e) => {
      e.preventDefault();
      const obj = formaObj([DM, TR, TE, QV], ['Demanda média diária', 'Tempo de Reposição', 'Tempo de Entrega', 'Quantidade de produtos vendida no mês'], ['demanda_media', 'tempo_reposicao', 'tempo_entrega', 'quantidade_vendida'], ['Nova', 'Novo', 'Novo', 'Nova'])
      const msgOBJ = preparaMSG_ALTERAR(obj)

      console.log(msgOBJ)
      setMsg(msgOBJ)
      if(!tudoOLD.demanda_media && !tudoOLD.tempo_reposicao && !tudoOLD.quantidade_vendida && !tudoOLD.tempo_entrega){
        if(DM === '' || TR === '' || QV === '' || TE === '') 
          setMsg("Por favor, preencha todos os campos")
      }
      setShowConfirma(true)
    }

    const atualizaDados = async () => {
      const funcao = {
        funcao: "insereOuAtualizaPontoDePedido",
        senha: "@7h$Pz!q2X^vR1&K",
        id: produtoOBJ.id_produtos,
        DM: DM === '' ? tudoOLD.demanda_media : DM,
        TR: TR === '' ? tudoOLD.tempo_reposicao : TR,
        QV: QV === '' ? tudoOLD.quantidade_vendida : QV,
        TE: TE === '' ? tudoOLD.tempo_entrega : TE 
      }
      await atualizaDadosUniversal(funcao, setRefreshTudo)
      setDM('');
      setTE('')
      setTR('');
      setQV('');
      atualiza();
      setShowConfirma(false)
    }

    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando <u>Ponto de Pedido</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message={msg}
              onConfirm={() => atualizaDados() }
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha={msg == 'Por favor, informe pelo menos um campo para alteração' || msg == 'Por favor, preencha todos os campos' ? false : true}
              styles={{ 'STYLE1': { color: '#da0f0f' }, 'STYLE2': { color: '#00aef3' } }}
              tamanho={tamanho}
            />
          }
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
          <div className='divConteudo'>
            <form className='formCat' onSubmit={(e) => handleForm(e)}>
              <label>
                Demanda média de vendas diárias:
                <input placeholder={tudoOLD.demanda_media ? tudoOLD.demanda_media : "Não possui"}
                  value={DM}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setDM(value);
                    }
                  }}
                  numeric/>
              </label>

              <label>
                Tempo de Reposição:
                <input placeholder={tudoOLD.tempo_reposicao ? tudoOLD.tempo_reposicao : "Não possui"}
                  value={TR}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setTR(value);
                    }
                  }}
                  numeric/>
              </label>

              <label>
                Tempo Estimado de Entrega:
                <input placeholder={tudoOLD.tempo_entrega ? tudoOLD.tempo_entrega : "Não possui"}
                  value={TE}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setTE(value);
                    }
                  }}
                  numeric/>
              </label>

              <label>
                Quantidade de produtos vendidos no mês:
                <input placeholder={tudoOLD.quantidade_vendida ? tudoOLD.quantidade_vendida : "Não possui"}
                  value={QV}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setQV(value);
                    }
                  }}
                  numeric />
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
            Alterar Categoria para Todos os Produtos Associados
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'InfoCatProduto' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('InfoCatProduto')}
          >
            Mover <u>Produto</u> para Outra Categoria
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
