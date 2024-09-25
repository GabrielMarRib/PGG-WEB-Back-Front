import React, { useState, useCallback, useEffect } from "react";
import "../Styles/Components/InfoModalCat.css";
import axios from "axios";
import { CheckCamposVazios } from "../Functions/Functions";
import AlertaNotificação from "./AlertaNotificação";
import { useAlerta } from "../Context/AlertaContext.js";

const InfoModalCat = ({ titulo, msgObj, fechar, reFetch }) => {
  const { Alerta } = useAlerta();

  const [novoNome, setNovoNome] = useState("");
  const [modoEdit, setModoEdit] = useState(false);
  const [modoVisProdutos, setModoVisProdutos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState(null);

  const handleEditarNome = useCallback(() => {
    setNovoNome("");
    setModoVisProdutos(false);
    setModoEdit((prevState) => !prevState);
  }, []);

  const fetchProdutos = useCallback(async () => {
    setCarregando(true);
    console.log("passando por fetchProdutos...");
    await pegaProdutos();
    setCarregando(false);
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);



  const pegaProdutos = async () => {
    console.log(msgObj)
    try {
      const response = await axios.post("http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "pegaprodutosporcategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          codcategoria: titulo === 'Editando Subcategoria' ? msgObj.subCatId : msgObj.catId
        });
      console.log("PegaprodutoPorCategoria" + JSON.stringify(response.data));
      setProdutos(response.data);
    } catch (error) {
      console.log("Deu ruim: " + error);
    }
  };

  ///Função para atualizar a categoria //Revisar essa função e atualizar ela
  const handleEditarCat = useCallback( async (CategoriaAtualizada, CodCatFilhoAtual) => {
      if (CheckCamposVazios(CategoriaAtualizada)) {
        Alerta(1, "Preencha todos os campos");
        return;
      }
      //Mudar o nome da categoria
      try{
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "UpdNomeCategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          codcategoria: CodCatFilhoAtual,
          newname: CategoriaAtualizada
        }
      );
      Alerta(2, "Alteração concluída com êxito");
      fechar();
      reFetch();
      console.log(response.data);
    } catch (error) {
      console.log("deu ruim: " + error);
    }


});

  const handleVisualizarProdutos = useCallback(() => {
    setModoEdit(false);
    setModoVisProdutos((prevState) => !prevState);
  }, []);

  return (
    <div className="InfoModal">
      <AlertaNotificação />
      <div className="modal-content">
        <div className="btnFecharDiv">
          <button className="btnFechar" onClick={fechar}>
            X
          </button>
        </div>
        <div className="tituloDiv">
          <h2>{titulo}</h2>
          <div className="subTit">
            <h4>{msgObj.subCat}</h4>
          </div>
        </div>
        <hr />
        <div className="Info">
          <h3>
            Categoria: {msgObj.cat} ({msgObj.catId})
            <br />
            Subcategoria: {msgObj.subCat} ({msgObj.subCatId})
            <br />
            Caminho completo: {msgObj.caminho}
          </h3>
          {modoEdit && (
            <div className="InfoChild">
              <div className="btnFecharInfoDiv">
                <button
                  className="btnFecharInfo"
                  onClick={() => setModoEdit(false)}
                >
                  X
                </button>
              </div>
              <input
                className="novoNomeSub"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                type="text"
                placeholder={msgObj.subCat}
              />
              <br />
              {console.log("msgObj.catId: " + JSON.stringify(msgObj) + " msgObj.subCatId: " +  msgObj.subCatId)}
              <button
                onClick={() =>
                  handleEditarCat(novoNome, msgObj.subCatId)
                }
              >
                Enviar
              </button>
            </div>
          )}
          {modoVisProdutos && (
            <div className="InfoChild">
              <div className="btnFecharInfoDiv">
                <button
                  className="btnFecharInfo"
                  onClick={() => setModoVisProdutos(false)}
                >
                  X
                </button>
              </div>
              <h3>
                Produtos na categoria {titulo ===  'Editando Subcategoria' ? msgObj.subCat : msgObj.cat}:
              </h3>
              {carregando ? (
                <div>Carregando...</div>
              ) : (
                produtos ? (
                  <ul>
                    {produtos.map((produto) => (
                      <li key={produto.id_produtos}>{produto.nome}</li>
                    ))}
                  </ul>
                  
                ) : (
                  <ul>
                  
                    <li key={null}>Não há produtos</li>
              
                </ul>
                )
              )}
            </div>
          )}
          <div className="util">
            <button onClick={handleEditarNome}>Editar Nome</button>
            <button onClick={handleVisualizarProdutos}>
              Visualizar produtos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(InfoModalCat);
