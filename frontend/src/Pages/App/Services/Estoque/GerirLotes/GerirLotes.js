import React, { useState, useEffect, useCallback } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "../GerirLotes/GerirLotes.css"

import axios from "axios";
import { CheckCamposVazios } from "../../../../../Functions/Functions.js";

import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import InfoModalCat from "../../../../../Components/Modais/CategoriaModal/InfoModalCat.js";
import ModalAtualizarLote from "../../../../../Components/Modais/LoteModal/ModalAtualizarLote.js";
import ModalAddLote from "../../../../../Components/Modais/LoteModal/ModalAdicionarLote.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../../../Context/UserContext.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";

import Box from "../../../../../Assets/Box.png";
import IconProduto from "../../../../../Assets/IconProdutoUnico.png";
import IconAddLote from "../../../../../Assets/IconAddLote.png";
import IconSeta from "../../../../../Assets/IconSeta.png";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import BuscaCategorias from "../../../../../Components/BuscaCategoria/BuscaCategoriasComponente.js";
import NavBar from "../../../../../Components/NavBar/NavBar.js";

function GerirLotes() {
  const { User } = useContext(UserContext);
  const navigate = useNavigate();

  const [TabelaLote, SetTabelaLote] = useState([]); // Inicializa como array vazio
  const [TabelaProdutos, SetTabelaProdutos] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [ShowModalAddLote, setShowModalAddLote] = useState(false);
  const [LoteSelecionado, setLoteSelecionado] = useState(false);
  const [FiltroLotes, setFiltroLotes] = useState(null);
  const [FiltroProdutos, setFiltroProdutos] = useState(null);
  const [InputFiltro, setInputFiltro] = useState(null);
  const [FiltroCategoria, setFiltroCategoria] = useState(null);
  const [ProdutoSelecionado, setProdutoSelecionado] = useState(null);
  
  
  
  
  const PegarLotes = async (SetTabelaLote) => {
    try {
      console.log("Pegando lotes");
 

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


  const PegarProdutos = async (SetTabelaProdutos) => {
    try {
      console.log("Pegando produtos");


      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "pegadados",
          senha: "@7h$Pz!q2X^vR1&K",
        }
      );

      console.log(response.data);
      SetTabelaProdutos(response.data);
    } catch (error) {
      console.log("Não pegou: " + error);
    }
  };

  //Após iniciar a pagina, rodar a função que pega os dados da tabela
  useEffect(() => {
    const UssseEffect = async () => {
      await PegarLotes(SetTabelaLote);
      await PegarProdutos(SetTabelaProdutos);
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
    setShowModalAddLote(bool);
    setProdutoSelecionado(null)
    await PegarLotes(SetTabelaLote);
    await PegarProdutos(SetTabelaProdutos);
  };

  const [showPopup, setShowPopup] = useState(false);

  const MapearLotes = (item) => {
    //Mapeando item por item dentro da tabela lote
  
    return (
      <div key={item.numerolote} className="DivGerirLotes">
<div style={{display: "inline-flex", flexDirection: "row", rowGap: "0px"}}>
  <div style={{display: "inline-flex"}}>

            <img src={Box} className="IconBoxImg2" alt="Imagem Externa" />

        <div className="LotePart1">
                  <p className="p" style={{ fontSize: "15px", marginTop: "0px" }}>
                    <strong> Id do lote: </strong> {item.numerolote}
                  </p>
                  <p className="p" style={{ fontSize: "15px", marginTop: "-10px"}}>
                    <strong> Produto: </strong>{item.nome}
                  </p>
                 <p className="p" style={{ fontSize: "15px", marginTop: "-10px"}}>
                   <strong>Codigo do Fornecedor: </strong> {item.fornecedor ? item.fornecedor : "Sem fornecedor"}
                 </p>
        </div>
  </div>
      
     
       <div className="DivDadosLote">
          <p className="pp"> <strong> Data de compra:   </strong>{item.dt_compra} / <strong> Data de validade: </strong>{item.dt_validade}</p>
          <p className="p"> <strong> Valor da venda:   </strong>{item.vlr_venda} / <strong> Valor da compra: </strong>{item.vlr_compra}</p>
          <p className="p"> <strong> Valor da compra: </strong>{item.vlr_compra} </p>
       </div>

    </div>

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
  const ShowLotes = (Item) =>{
    if(Item == ProdutoSelecionado){
      setProdutoSelecionado(null)
      return
    }
    setProdutoSelecionado(Item)
    const LotesFiltrados2 = TabelaLote.filter((lote) => lote.produto === Item.id_produtos);
    setFiltroLotes(LotesFiltrados2);


  } 

 


  const MapearProdutos = (item) => {
    //Mapeando item por item dentro da tabela lote
   
    
    return (
      <div key={item.numerolote} className="DivGeralProdutosELotes">
                <div key={item.numerolote} className="DivGerirProdutos" >
                <div onClick={() => ShowLotes(item)} style={{ cursor: "pointer"}}>

                  <div style={{ display: "inline-block"}}>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "15px", marginLeft: "10px", width: "500px"}}>
                      <img src={IconProduto} className="IconBoxImg" alt="Imagem Externa" />

                              <div style={{ display: "flex", flexDirection: "column", marginLeft: "44px", marginTop: "-35px", width: "500px"}}>
                                      <p className="p" style={{fontSize: "20px", marginTop: "0px",marginLeft: "15px" }}>
                                        <strong> Produto: </strong> {item.nome} 
                                      </p>

                                  <p className="p" style={{fontSize: "20px", marginLeft: "0", marginTop: "0px", marginLeft: "15px"}}>
                                    <strong> Id do Produto: </strong> {item.id_produtos}
                                  </p>
                              </div>
                            </div>
                            </div>


                        <div className="DivImgSeta">
                          <div >
                            <img src={IconSeta} className="IconBoxImg" alt="Imagem Externa"/>
                          </div>
                        </div>
                  </div>
                      
                {ProdutoSelecionado?.id_produtos === item.id_produtos && (
                  <>
                    <center><hr className="HR"/></center>
                    {FiltroLotes.map(MapearLotes)}


                    <div className="DivAdicionarLote" onClick={() => setShowModalAddLote((prev) => !prev)}>
                    <img src={IconAddLote} className="IconBoxImg3" alt="Imagem Externa" />
                    <h2>Adicionar lote</h2>
                    </div>
                  </>
                )}



                </div>



  </div>
    );
  };
  const FiltraPorCategoria = async () => {
    
    
      console.log("Entrou aqui")
      console.log(FiltroCategoria)
      const FiltrarProdutos2 = TabelaProdutos.filter((Prod) => Prod.categoria == FiltroCategoria?.id_categorias );
      setFiltroProdutos(FiltrarProdutos2)
   
  } 
  const FiltraPorCategoriaEInput = async () => {
  
    const FiltrarProdutosCat = TabelaProdutos.filter((Prod) => Prod.categoria == FiltroCategoria?.id_categorias );
  
      const FiltroProduto = FiltrarProdutosCat.filter((Prod) => {
        if(isNaN(InputFiltro)){
          return Prod.nome.toLowerCase().includes(InputFiltro.toLowerCase()) //não é num; vê o nome
        }else{
          return Prod
        }
      })
      setFiltroProdutos(FiltroProduto)

  }

  useEffect( () => {
    //FILTROSSS
  
    if(InputFiltro == ""){
      setInputFiltro(null)
    }
    if(InputFiltro == null && FiltroCategoria){
      //Só o filtro da categoria
      FiltraPorCategoria()
    }else if(InputFiltro && FiltroCategoria == null){
      //Só o filtro padrão
      const FiltroProduto2 = TabelaProdutos.filter((Prod) => {
        if(isNaN(InputFiltro)){
          return Prod.nome.toLowerCase().includes(InputFiltro.toLowerCase()) //não é num; vê o nome
        }else{
          return null
        }
      })
      setFiltroProdutos(FiltroProduto2)
    }else{
      //Os Dois filtros
      FiltraPorCategoriaEInput()
    }
    
}, [InputFiltro, FiltroCategoria]);
  

  return (
    <div className="PagGerirLotes">
      <NavBar />
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

    {ShowModalAddLote ? (
        <ModalAddLote
          Produto={ProdutoSelecionado}
          fechar={() => handleFecharModal(false)}
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
         

          {TabelaProdutos.length > 0 ? ( // Verifica se há dados no array antes de mapear sa bomba
             InputFiltro == null && FiltroCategoria == null  ? (
              TabelaProdutos.map(MapearProdutos)
             ) : (
              FiltroProdutos ? (
                FiltroProdutos.map(MapearProdutos)
              ) : (
                <>
                Carregando ...
                </>
              )
             )
          ) : (
            <p>Nenhum lote disponível ou ocorreu um problema.</p> // Mostra caso n tenha porra nenhuma no blg lá
          )}
        </div>
      </div>
    </div>
  );
}

export default GerirLotes;
