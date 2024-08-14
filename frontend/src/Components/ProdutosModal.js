import React, { useState, memo, useEffect } from 'react';
import '../Styles/Components/ProdutosModal.css';
import axios from 'axios';
const produtoMemo = memo(function ProdutosModal({ fechar, produtoOBJ, opcao, atualiza }) { // teoricamente faria não ter reRender, mas ta tendo, ou seja, fds

  // Genérico
  const [abaAtiva, setAbaAtiva] = useState(opcao);

  // Categoria
  const [cat, setCat] = useState('')
  const [produtosEmCat, setProdutosEmCat] = useState([]);

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


  const escolhaCat = () => {
    return (
      <div>
      <button onClick={() => handleClickAba('CategoriaMUDAR')}>SEXO</button>
      <button onClick={() => handleClickAba('Curva ABC')}>ANAL</button>
    </div>
    )
    
  }


  const CategoriaMUDAR = () => {
    const handleForm = async (e) => {
      e.preventDefault();
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
        setCat('');
        atualiza();
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div style={{ height: '100%' }}>
        <button onClick={() => handleClickAba('Categoria')}>X</button>
        <h2 className='Titulo'> Editando <u>Categoria</u> (GERAL)</h2>
        <div className='subTitulo'>
          <h3>'{produtoOBJ.nome}'</h3>
          <hr />
        </div>
        <div className='divConteudo'>
          Produtos pertencentes a categoria:
          <ul>
            {produtosEmCat.map((produto) => (
              <li>{produto.nome}</li>
            ))}
          </ul>
          <form onSubmit={(e) => handleForm(e)}>
            <label>
              Código da Categoria:
              <input
                style={{ cursor: 'not-allowed' }}
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

            <button>testar</button>
          </form>

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
  const InfoProduto = () => {
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

  return (
    <div className='ProdutosModal'>
      <div className='conteudo-modal'>
        <div className='cabecalho-modal'>
          <button
            className={`botao-aba ${abaAtiva === 'Produto' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Produto')}
          >
            Produto
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
            className={`botao-aba ${abaAtiva === 'Lote' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Lote')}
          >
            Lote
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Categoria' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Categoria')}
          >
            Categoria
          </button>

          <button onClick={fechar} className='botao-fechar'>X</button>
        </div>
        <div className='corpo-modal'>

          {(() => {
            switch (abaAtiva) {
              case 'Produto': return InfoProduto();
              case 'Ponto De Pedido': return infoPP();
              case 'Curva ABC': return infoCurva();
              case 'Lote Econômico': return infoLoteEco();
              case 'Lote': return infoLote();
              case 'Categoria': return escolhaCat(); 
              case 'CategoriaMUDAR': return CategoriaMUDAR(); 
              default: return "erro nos props... veja se o parametro opcao está correto";
            }
          }
          )()}


          {/**/}

        </div>
      </div>
    </div>
  )
});

export default produtoMemo;
