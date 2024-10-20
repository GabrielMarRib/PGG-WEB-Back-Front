import React, { useState, useEffect, useCallback } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagAddCategoria.css";

import axios from "axios";
import { CheckCamposVazios } from "../../../Functions/Functions.js";

import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import InfoModalCat from "../../../Components/InfoModalCat.js";
import ModalAtualizarLote from "../../../Components/ModalAtualizarLote.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext.js";
import Titulo from "../../../Components/Titulo.jsx";
import Box from '../../../Assets/Box.png'
import BtnAjuda from "../../../Components/BtnAjuda.js";


function GerirLotes() {
  const { User } = useContext(UserContext);
  const navigate = useNavigate();

  const [TabelaLote, SetTabelaLote] = useState([]); // Inicializa como array vazio
  const [ShowModal, setShowModal] = useState(false);
  const [LoteSelecionado, setLoteSelecionado] = useState(false);

  const PegarLotes = async (SetTabelaLote) => {

    try {
      console.log("Pegando lotes");
      console.log("User" + JSON.stringify(User.id));
      
      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
        funcao: 'PegarLotes',
        senha: '@7h$Pz!q2X^vR1&K'
        
      });

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


const EditarLote = (item) =>{
  const LoteSelecionados = JSON.parse(item.target.value)
  console.log(LoteSelecionados)
  setShowModal(true)
  setLoteSelecionado(LoteSelecionados)
}

const handleFecharModal = async (bool) =>{
  setShowModal(bool);
  await PegarLotes(SetTabelaLote);
}

const [showPopup, setShowPopup] = useState(false); 

  const MapearLotes = (item) => {
    //Mapeando item por item dentro da tabela lote
    return (
    
      <div key={item.numerolote} className="DivGerirLotes">
     
        
        <center>
        <img src={Box} className="IconBoxImg" alt="Imagem Externa" />
        <p className="p" style={{ fontSize: '20px'}}>
        <strong> Id do lote: {item.numerolote}</strong></p></center>
        <center><p className="p" style={{ fontSize: '20px', marginTop: '0px'}}> Produto: {item.nome} </p></center>
        <center><p className="p" style={{ fontSize: '20px', marginTop: '0px'}}> Fornecedor: {item.fornecedor ? (item.fornecedor) : "Sem fornecedor"}</p></center>
        <center><p className="p"> Data de compra: {item.dt_compra} /</p>
        <p className="p"> Data de validade: {item.dt_validade} /</p>
        <p className="p"> Valor da venda: {item.vlr_venda} /</p>
        <p className="p"> Valor da compra: {item.vlr_compra} /</p>
        <p className="p"> Valor da compra: {item.vlr_compra} </p></center>

      <div>
      <div className="divbtnEditarGerirLotes"> 
          <button onClick={EditarLote} value={JSON.stringify(item)} className="btnEditarGerirLotes">
            Editar
          </button>
      </div>

        </div>
      </div>
    );
  };
  
  return (
    <div className="PagAddCategoria">
      <CabecalhoHome />
      <AlertaNotificação />
      <Titulo tituloMsg="Gerenciamento de lotes" />

      <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
            Ajuda
          </div>
        </header>  

      <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"GERENCIAMENTOLOTES"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
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
            IdUser = {User.id}
          />
           ) : (
            null
        )}

      <div className="Formulario">
        <div className="ListaCategorias"> 
        <h2>Gerir lotes</h2>
        {TabelaLote.length > 0 ? ( // Verifica se há dados no array antes de mapear sa bomba
          TabelaLote.map(MapearLotes)
        ) : (
          <p>Nenhum lote disponível.</p> // Mostra caso n tenha porra nenhuma no blg lá
        )}
      </div>
        </div>
    </div>
  );
}

export default GerirLotes;