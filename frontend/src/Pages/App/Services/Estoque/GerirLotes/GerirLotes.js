import React, { useState, useEffect, useCallback } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
//import "../../../Styles/App/Service/PagAddCategoria.css"; ???????????????????????

import axios from "axios";
import { CheckCamposVazios } from "../../../../../Functions/Functions.js";

import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import InfoModalCat from "../../../../../Components/Modais/CategoriaModal/InfoModalCat.js";
import ModalAtualizarLote from "../../../../../Components/Modais/LoteModal/ModalAtualizarLote.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../../../Context/UserContext.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";

import Box from "../../../../../Assets/Box.png";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import BuscaCategorias from "../../../../../Components/BuscaCategoria/BuscaCategoriasComponente.js";

function GerirLotes() {
  const { User } = useContext(UserContext);
  const navigate = useNavigate();

  const [TabelaLote, SetTabelaLote] = useState([]); // Inicializa como array vazio
  const [ShowModal, setShowModal] = useState(false);
  const [LoteSelecionado, setLoteSelecionado] = useState(false);
  const [FiltroLotes, setFiltroLotes] = useState(null);
  const [InputFiltro, setInputFiltro] = useState(null);
  const [FiltroCategoria, setFiltroCategoria] = useState(null);
  const [PesquisaProdutos, setPesquisaProdutos] = useState(null);
  
  const PegarLotes = async (SetTabelaLote) => {
    try {
      console.log("Pegando lotes");
      console.log("User" + JSON.stringify(User.id));

      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "PegarLotes",
          senha: "@7h$Pz!q2X^vR1&K",
        }
      );

      console.log(response.data);
      SetTabelaLote(response.data);
    } catch (error) {
      console.log("Não pegou: " + error);
    }
  };

  //Após iniciar a pagina, rodar a função que pega os dados da tabela
  useEffect(() => {
    const UssseEffect = async () => {
      await PegarLotes(SetTabelaLote);
    };
    UssseEffect();
  }, []);

  const EditarLote = (item) => {
    const LoteSelecionados = JSON.parse(item.target.value);
    console.log(LoteSelecionados);
    setShowModal(true);
    setLoteSelecionado(LoteSelecionados);
  };

  const handleFecharModal = async (bool) => {
    setShowModal(bool);
    await PegarLotes(SetTabelaLote);
  };

  const [showPopup, setShowPopup] = useState(false);

  const MapearLotes = (item) => {
    //Mapeando item por item dentro da tabela lote
    return (
      <div key={item.numerolote} className="DivGerirLotes">
        <center>
          <img src={Box} className="IconBoxImg" alt="Imagem Externa" />
          <p className="p" style={{ fontSize: "20px" }}>
            <strong> Id do lote: </strong> {item.numerolote}
          </p>
        </center>
        <center>
          <p className="p" style={{ fontSize: "20px", marginTop: "0px" }}>
            {" "}
            <strong> Produto: </strong>{item.nome}{" "}
          </p>
        </center>
        <center>
          <p className="p" style={{ fontSize: "20px", marginTop: "0px" }}>
            {" "}
            <strong>Codigo do Fornecedor: </strong> {item.fornecedor ? item.fornecedor : "Sem fornecedor"}
          </p>
        </center>
        <center>
          <p className="p"> <strong> Data de compra:   </strong>{item.dt_compra} /</p>
          <p className="p"> <strong> Data de validade: </strong>{item.dt_validade} /</p>
          <p className="p"> <strong> Valor da venda:   </strong>{item.vlr_venda} /</p>
          <p className="p"> <strong> Valor da compra: </strong>{item.vlr_compra} /</p>
          <p className="p"> <strong> Valor da compra: </strong>{item.vlr_compra} </p>
        </center>

        <div>
          <div className="divbtnEditarGerirLotes">
            <button
              onClick={EditarLote}
              value={JSON.stringify(item)}
              className="btnEditarGerirLotes"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    );
  };
  const FiltraPorCategoria = async () => {
    try {
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "pegaprodutosporcategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          codcategoria: FiltroCategoria.id_categorias
        }
      );
      console.log(response.data);
    
      let ProdutosDaCategoria = response.data
      const FiltrarLotes = TabelaLote.filter((Lot) =>
        ProdutosDaCategoria.some((Prod) => Prod.id_produtos === Lot.produto)
      );

      setFiltroLotes(FiltrarLotes)
    } catch (error) {
      console.log("Não pegou: " + error);
    }
  } 
  const FiltraPorCategoriaEInput = async () => {
    try {
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "pegaprodutosporcategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          codcategoria: FiltroCategoria.id_categorias
        }
      );
      console.log(response.data);
      let ProdutosDaCategoria = response.data
      const FiltrarLotes = TabelaLote.filter((Lot) =>
        ProdutosDaCategoria.some((Prod) => Prod.id_produtos === Lot.produto)
      );
  
      const FiltroLote = FiltrarLotes.filter((Lote) => {
        if(isNaN(InputFiltro)){
          return Lote.nome.toLowerCase().includes(InputFiltro.toLowerCase()) //não é num; vê o nome
        }else{
          return Lote
        }
      })
      setFiltroLotes(FiltroLote)
    } catch (error) {
      console.log("Não pegou: " + error);
    }

  }

  useEffect( () => {
  
    if(InputFiltro == ""){
      setInputFiltro(null)
    }
    if(InputFiltro == null && FiltroCategoria){
      //Só o filtro da categoria
      console.log('Entro')
      FiltraPorCategoria()
    }else if(InputFiltro && FiltroCategoria == null){
      //Só o filtro padrão
      const FiltroLote = TabelaLote.filter((Lote) => {
        if(isNaN(InputFiltro)){
          return Lote.nome.toLowerCase().includes(InputFiltro.toLowerCase()) //não é num; vê o nome
        }else{
          return null
        }
      })
      setFiltroLotes(FiltroLote)
    }else{
      //Os Dois filtros
      FiltraPorCategoriaEInput()
    }
    
}, [InputFiltro, FiltroCategoria]);
  

  return (
    <div className="PagAddCategoria">
      <CabecalhoHome />
      <AlertaNotificação />
      <Titulo tituloMsg="Gerenciamento de lotes" />

      <header className="cabecalhoBtnAjuda">
        <div
          className="Botaoajuda"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          {" "}
          {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
          Ajuda
        </div>
      </header>

      <div className="BtnAjuda">
        {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
          <BtnAjuda /* chama o btnAjuda */
            fechar={() => {
              setShowPopup(false);
            }} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
            msgChave={"GERENCIAMENTOLOTES"} // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
          />
        )}

        <button
          className="voltar"
          onClick={() => {
            navigate("/PagEscolhaProdutos");
          }}
        >
          Voltar
        </button>
      </div>

      {ShowModal ? (
        <ModalAtualizarLote
          LoteSelecionado={LoteSelecionado}
          fechar={() => handleFecharModal(false)}
          IdUser={User.id}
        />
      ) : null}

      <div className="Formulario">
        <div className="ListaCategorias">
          <div className="Filtro">

            <input
              value={InputFiltro}
              onChange={(e) => setInputFiltro(e.target.value)}
              placeholder="Pesquisar lote..."
            />

            <div style={{display: 'inline-block', width: '400px', height: '10px'}}>
              <BuscaCategorias setCategoriaSelecionada={setFiltroCategoria} CategoriaSelecionada={FiltroCategoria} />
            </div>
            
          </div>
          {/* <div className="barra-pesquisa">
            </div>
            <div className="teste">
              <FiltragemCategoria
                setFiltroSelecionado={setFiltroCategoriaSelecionada}
                FiltroSelecionado={FiltroCategoria}
              />
            </div>

            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={pesquisaProduto}
              onChange={(e) => setPesquisaProduto(e.target.value)}
            />
          </div> */}

          {TabelaLote.length > 0 ? ( // Verifica se há dados no array antes de mapear sa bomba
             InputFiltro == null && FiltroCategoria == null  ? (
               TabelaLote.map(MapearLotes)
             ) : (
              FiltroLotes ? (
                FiltroLotes.map(MapearLotes)
              ) : (
                <>
                Carregando ...
                </>
              )
             )
          ) : (
            <p>Nenhum lote disponível.</p> // Mostra caso n tenha porra nenhuma no blg lá
          )}
        </div>
      </div>
    </div>
  );
}

export default GerirLotes;
