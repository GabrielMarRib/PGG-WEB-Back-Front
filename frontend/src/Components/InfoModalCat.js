import React, { useState } from 'react';
import '../Styles/Components/InfoModalCat.css';
import axios from "axios";
import { CheckCamposVazios } from '../Functions/Functions';
import AlertaNotificação from "./AlertaNotificação";
import { useAlerta } from "../Context/AlertaContext.js";

const InfoModalCat = ({ msgObj, fechar, reFetch }) => {

  const { Alerta } = useAlerta(); // alertinha...

  //referentes à edição de subCats...
  const [novoNome, setNovoNome] = useState('');
  const [modoEdit, setModoEdit] = useState(false);

  //referentes à visualização de produtos...
  const [modoVisProdutos, setModoVisProdutos] = useState(false);
  const handleEditarNome = () => {
    setNovoNome('')
    setModoVisProdutos(false)
    setModoEdit(prevState => !prevState)
  }

  const handleEditarCat = async (catAtual, subCategoriaUpd, subCatAtual) => { // depois fazer ele gerar um relatório aqui...
    if (CheckCamposVazios(subCategoriaUpd)) {
      Alerta(1, "Preencha todos os campos")
      return;
    }
    try {
      await axios.post('http://localhost:4000/atualizaSub', {
        codigoSelecionado: catAtual,
        subCatNome: subCategoriaUpd,
        subcatCodigoNEW: subCatAtual
      });
      Alerta(2, "Alteração concluída com êxito")
      fechar();
      reFetch();
    } catch (error) {
      console.log(error)
    }
  }

  const handleVisualizarProdutos = () => {
    setModoEdit(false)
    setModoVisProdutos(prevState => !prevState)

  }

  return (
    <div className="InfoModal">
      <AlertaNotificação />
      <div className="modal-content">
        <div className='btnFecharDiv'>
          <button className="btnFechar" onClick={fechar} >X</button>
        </div>
        <div className='tituloDiv'>
          <h2>Editando Subcategoria</h2>
          <div className='subTit'><h4>{msgObj.subCat}</h4></div>
        </div>
        <hr />
        <div className='Info'>
          <h3>
            Categoria: {msgObj.cat} ({msgObj.catId})
            <br />
            Subcategoria: {msgObj.subCat} ({msgObj.subCatId})
            <br />
            Caminho completo: {msgObj.caminho}
          </h3>
          {/*Modo de edição de Subcategorias*/}
          {modoEdit ? (
            <div className='InfoChild'>
              <div className='btnFecharInfoDiv'>
                <button className="btnFecharInfo" onClick={() => { setModoEdit(false) }} >X</button>
              </div>
              <input
                className="novoNomeSub"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                type="text"
                placeholder={msgObj.subCat}
              />
              <br></br>
              <button onClick={() => { handleEditarCat(msgObj.catId, novoNome, msgObj.subCatId) }}>Enviar</button>
            </div>
          ) : (
            null
          )}
          {/*Modo de Visualização de produtos*/}
          {modoVisProdutos ? (
            <div className='InfoChild'>
              <div className='btnFecharInfoDiv'>
                <button className="btnFecharInfo" onClick={() => { setModoVisProdutos(false) }} >X</button>
              </div>
              <h3>Listagem de produtos:</h3>
              <ul>
                {}
              </ul>
            </div>
          ) : (
            null
          )}
          <div className='util'>
            <button onClick={() => { handleEditarNome() }}>Editar Nome</button>
            <button onClick={() => { handleVisualizarProdutos() }}>Visualizar produtos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModalCat;