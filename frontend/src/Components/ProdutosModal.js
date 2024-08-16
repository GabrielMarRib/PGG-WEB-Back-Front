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
  const [showConfirma, setShowConfirma] = useState(false);
  const [msg, setMsg] = useState({});

  // Categoria
  const [cat, setCat] = useState('')
  const [produtosEmCat, setProdutosEmCat] = useState([]);

  // Gerais
  const [nomeProd, setNomeProd] = useState('');
  const [descProd, setDescProd] = useState('');
  
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
  }, [])

  const handleClickAba = (nomeAba) => {
    setAbaAtiva(nomeAba);
  };

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
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "UpdNomeCategoria",
            senha: "@7h$Pz!q2X^vR1&K",
            codcategoria: produtoOBJ.categoria,
            newname: cat
          }
        );
        if (response.status === 200) {
          Alerta(2, "Alteração OK");
          setCat('');
          atualiza();
          setShowConfirma(false)
        }
      } catch (error) {
        console.log(error)
      }
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


  const InfoProduto = () => {

    const handleForm = (e) => {
      e.preventDefault();
      if(nomeProd === '' && descProd === '' ){
        setMsg("Por favor, informe pelo menos um campo para alteração")
      } else if(nomeProd !== '' && descProd === ''){
        const msgOBJ = [
          'Tem certeza que deseja alterar o NOME do produto? Nome anterior:',
          `'STYLE1${produtoOBJ.nome}' `,
          'Novo nome:',
          `'STYLE2${nomeProd}'`,
        ]
        setMsg(msgOBJ)
      } else if(nomeProd === '' && descProd !== ''){
        const msgOBJ = [
          'Tem certeza que deseja alterar a DESCRIÇÃO do produto? Descrição anterior:',
          `'STYLE1${produtoOBJ.descricao}'`,
          'Nova descrição:',
          `'STYLE2${descProd}' `,
        ]
        setMsg(msgOBJ)
      }else{
        const msgOBJ = [
          'Tem certeza que deseja alterar o NOME e a DESCRIÇÃO do produto? Descrição anterior:',
          `'STYLE1${produtoOBJ.descricao}'`,
          'Nova descrição:',
          `'STYLE2${descProd}' `,
          'Nome anterior:',
          `'STYLE1${produtoOBJ.nome}'`,
          'Novo nome:',
          `'STYLE2${nomeProd}'`,
        ]
        setMsg(msgOBJ)
      }
      setShowConfirma(true)
    }

    const atualizaDados = () =>{

    }

    return (
      <div className='divSub'>
        <h2 className='Titulo'> Editando informações <u>Gerais</u> do item</h2>
        <div className='subTitulo'>
          {showConfirma &&
            <ConfirmaModal
              message= {msg}
              onConfirm={() => atualizaDados()}
              onCancel={() => setShowConfirma(false)}
              BoolMultiplaEscolha= {msg == 'Por favor, informe pelo menos um campo para alteração' ? false : true  }
              styles = {{ 'STYLE1': {color: '#da0f0f'}, 'STYLE2': {color: '#00aef3'}}}

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
                  placeholder={produtoOBJ.categoria}
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
              <button className='botao-testar'>Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  const infoLote = () => {
    return (
      <div>
        <h2 className='Titulo'> Editando <u>Lote</u> do item</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
      </div>
    )
  }
  const infoPP = () => {
    return (
      <div>
        <h2 className='Titulo'> Editando <u>Ponto de Pedido</u> do item</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
      </div>
    )
  }
  const infoCurva = () => {
    return (
      <div>
        <h2 className='Titulo'> Editando <u>Curva ABC</u> do item</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
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
