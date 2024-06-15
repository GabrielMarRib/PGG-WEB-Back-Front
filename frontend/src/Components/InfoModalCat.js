import React, { useState, useCallback, useEffect } from 'react';
import '../Styles/Components/InfoModalCat.css';
import axios from "axios";
import { CheckCamposVazios } from '../Functions/Functions';
import AlertaNotificação from "./AlertaNotificação";
import { useAlerta } from "../Context/AlertaContext.js";

const InfoModalCat = ({ msgObj, fechar, reFetch }) => {
  const { Alerta } = useAlerta();

  const [novoNome, setNovoNome] = useState('');
  const [modoEdit, setModoEdit] = useState(false);
  const [modoVisProdutos, setModoVisProdutos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState(null);

  const handleEditarNome = useCallback(() => {
    setNovoNome('');
    setModoVisProdutos(false);
    setModoEdit(prevState => !prevState);
  }, []);

  const fetchProdutos = useCallback(async () => {
    setCarregando(true);
    console.log("passando por fetchProdutos...")
    await pegaProdutos();
    setCarregando(false);
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  const pegaProdutos = async () => {
    try {
      const response = await axios.post('http://localhost:4000/pegaProdutosDeSubInformado', {
        codigoSelecionado: msgObj.catId,
        subcatCodigoNEW: msgObj.subCatId
      });
      setProdutos(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditarCat = useCallback(async (catAtual, subCategoriaUpd, subCatAtual) => {
    if (CheckCamposVazios(subCategoriaUpd)) {
      Alerta(1, "Preencha todos os campos");
      return;
    }
    try {
      await axios.post('http://localhost:4000/atualizaSub', {
        codigoSelecionado: catAtual,
        subCatNome: subCategoriaUpd,
        subcatCodigoNEW: subCatAtual
      });
      Alerta(2, "Alteração concluída com êxito");
      fechar();
      reFetch();
    } catch (error) {
      console.log(error);
    }
  }, [Alerta, fechar, reFetch]);

  const handleVisualizarProdutos = useCallback(() => {
    setModoEdit(false);
    setModoVisProdutos(prevState => !prevState);
  }, []);

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
          {modoEdit && (
            <div className='InfoChild'>
              <div className='btnFecharInfoDiv'>
                <button className="btnFecharInfo" onClick={() => setModoEdit(false)} >X</button>
              </div>
              <input
                className="novoNomeSub"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                type="text"
                placeholder={msgObj.subCat}
              />
              <br />
              <button onClick={() => handleEditarCat(msgObj.catId, novoNome, msgObj.subCatId)}>Enviar</button>
            </div>
          )}
          {modoVisProdutos && (
            <div className='InfoChild'>
              <div className='btnFecharInfoDiv'>
                <button className="btnFecharInfo" onClick={() => setModoVisProdutos(false)} >X</button>
              </div>
              <h3>Listagem de produtos inseridos na Subcategoria {msgObj.subCat}:</h3>
              {carregando ? (
                <div>Carregando...</div>
              ) : (
                <ul>
                  {produtos.map(produto => (
                    <li key={produto.id}>{produto.id}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className='util'>
            <button onClick={handleEditarNome}>Editar Nome</button>
            <button onClick={handleVisualizarProdutos}>Visualizar produtos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(InfoModalCat);
