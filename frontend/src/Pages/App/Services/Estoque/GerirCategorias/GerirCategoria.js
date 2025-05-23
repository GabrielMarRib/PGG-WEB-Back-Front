import React, { useState, useEffect, useCallback } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagAddCategoria.css";

import axios from "axios";
import {
  CheckCamposVazios,
} from "../../../../../Functions/Functions.js";

import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import InfoModalCat from "../../../../../Components/Modais/CategoriaModal/InfoModalCat.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import RedirectAcesso from "../../../../../Functions/RedirectAcesso.js";
import { useContext } from "react";
import { UserContext } from "../../../../../Context/UserContext.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import NavBar from "../../../../../Components/NavBar/NavBar.js";

function GerirCategoria() {
  const navigate = useNavigate();

  //funções de style:
  const { Alerta } = useAlerta(); // alertinha...
  const [mostrarModal, setMostrarModal] = useState(false); // mostra o modal...
  const [msgModal, setMsgModal] = useState({}); //msg dessa poha
  const [Remapear, setRemapear] = useState(false);
  const [ShowSelect2, setShowSelect2] = useState([]);


  // GERALZÃO:
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true); // Estado para carregamento
  const [Render2Select, setRender2Select] = useState(false);

  // Categoria do momento:
  const [MapearOptions, setMapearOptions] = useState([null]);
  const [categoriaSelecionada, SetCategoriaSelecionada] = useState([]);
  const [categoriaSelecionada2, SetCategoriaSelecionada2] = useState([]);
  const [CategoriaFiltrada, setCategoriaFiltrada] = useState([]);
  const [HistoricoSelecoes, setHistoricoSelecoes] = useState([]);


  // Usado para inserção (addCat true)
  const [codigoDisponivel, SetCodigoDisponivel] = useState(null);
  const [categoriaInput, setCategoriaInput] = useState("");

  //Modal:
  const [titulo, setTitulo] = useState('');

  const pegaCategorias = async (setOBJ, LetRender2Select) => {

    try { //tente...
      const response = await axios.post('http://localhost:80/php/', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
        funcao: 'pegacategorias',
        senha: '@7h$Pz!q2X^vR1&K'
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
      });
      console.log(response.data)
      setOBJ(response.data)

      if (LetRender2Select == true) {
        console.log("Entrou aqui")
        console.log("CategoriaSelecionada" + JSON.stringify(categoriaSelecionada))
        const categoriasFiltradas = response.data.filter((cat) => cat.subcategoria === categoriaSelecionada.id);
        setCategoriaFiltrada(categoriasFiltradas);
        setShowSelect2(true);
        LetRender2Select = false;  //DESGRAÇA DE RENDER DE SELECT TOMANO CU PORRA
      }
    } catch (error) {
      console.log("deu ruim: " + error)
    }


  }

  const fetchData = useCallback(async (LetRender2Select) => {
    setCarregando(true);

    console.log("Pegando as infos do Banco");
    await pegaCategorias(setCategorias, LetRender2Select);

    setCarregando(false);


  }, []);
  useEffect(() => {
    if(categorias.length == 0){
      SetCodigoDisponivel(0)
    }else{
      let maiorIdCategoria = Math.max(...categorias.map(item => parseInt(item.id_categorias)))
      SetCodigoDisponivel(maiorIdCategoria + 1);
    }
  }, [categorias]);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const handleChange = async (e) => {
    const val = e.target.value;

    if (val === "Add") {

      if (HistoricoSelecoes.length > 0) {
        setHistoricoSelecoes((prevItens) => {

          if (prevItens.length > 0) {
            const lastItem = prevItens[prevItens.length - 1];
            SetCategoriaSelecionada(lastItem);
          } else {
            // Se a lista estiver vazia, define como 'Add'
            SetCategoriaSelecionada('Add');
          }
          const newHistorico = prevItens.slice(0, -1)
          setHistoricoSelecoes(newHistorico);
          return newHistorico;
        }); //-1 item da lista



      } else {
        console.log("lenght " + HistoricoSelecoes.length)
        setHistoricoSelecoes("")
        SetCategoriaSelecionada('Add')
        setShowSelect2(false)
      }
    } else {
      setShowSelect2(true)
      const selectedValue = JSON.parse(val);
      SetCategoriaSelecionada(selectedValue);
      // Adicionando a seleção atual ao histórico

    }
  };
  useEffect(() => {
    console.log("HistoricoSelecoes= " + JSON.stringify(HistoricoSelecoes))
  }, [HistoricoSelecoes]);

  const handleChange2 = async (e) => {
    const val = e.target.value;
    if (val === "Add") {
      SetCategoriaSelecionada2("Add");
    } else {
      const selectedValue = JSON.parse(val);
      // Adicionar a seleção atual ao histórico
      setHistoricoSelecoes((prev) => [
        ...prev,
        {
          id: categoriaSelecionada.id,
          nome: categoriaSelecionada.nome,
          subcategoria: categoriaSelecionada.subcategoria,
        }
      ]);
      setRemapear(true);
      SetCategoriaSelecionada(selectedValue)
      setMapearOptions(CategoriaFiltrada)
      SetCategoriaSelecionada2(null)

      setCategoriaFiltrada(categorias.filter(cat => cat.subcategoria === selectedValue.id));

    }
  };

  useEffect(() => {
    if (categoriaSelecionada) {
      if (Remapear == false) {
        const categoriasFiltradas = categorias.filter(cat => cat.subcategoria === categoriaSelecionada.id);
        setCategoriaFiltrada(categoriasFiltradas);
      } else {
        setRemapear(false);
      }
      setMapearOptions(categorias.filter(cat => cat.subcategoria === categoriaSelecionada.subcategoria))
    }
    console.log("Select1 " + JSON.stringify(categoriaSelecionada))
  }, [categoriaSelecionada]);


  const MapearCategoria = (item) => {

    if (item.subcategoria == null) {
      return (
        <option
          key={item.id_categorias}
          value={JSON.stringify({
            id: item.id_categorias,
            nome: item.nome,
            subcategoria: item.subcategoria,
          })}
        >
          {item.id_categorias} - {item.nome}
        </option>
      );
    }
  };


  const MapearCategoriasSub = (item) => {
    return (
      <option
        key={item.id_categorias}
        value={JSON.stringify({
          id: item.id_categorias,
          nome: item.nome,
          subcategoria: item.subcategoria,
        })}
      >
        {item.id_categorias} - {item.nome}
      </option>
    )
  }

  const MapearCategorias = (item) => {
    const categoriasFiltradas = categorias.filter((cat) => cat.subcategoria === item.id_categorias);

    let EnderecoProduto = item.id_categorias;
    if (item.subcategoria == null) {
      return (
        <li key={item.id_categorias}>
          {item.id_categorias} - {item.nome}
          <span className="btnEditSpan">
            <button
              onClick={() => {
                handleEditar(item, null, EnderecoProduto);
              }}
              className="btnEditar"
            >
              Editar
            </button>

          </span>
          <ul>
            <div>
              {categoriasFiltradas.map((subItem) =>
                MapearSubs(item, subItem, EnderecoProduto)
              )}
            </div>
          </ul>
        </li>
      );
    } else {
      <li key={item.id}>
        {item.id} - {item.nome}
      </li>;
    }
  };

  const MapearSubs = (itemPai, subItem, EnderecoProduto) => {
    // console.log("itemPai> " + JSON.stringify(itemPai));
    // console.log("subItem> " + JSON.stringify(subItem));
    const categoriasFiltradas = categorias.filter((cat) => cat.subcategoria === subItem.id_categorias);
    EnderecoProduto = EnderecoProduto + "." + subItem.id_categorias;
    return (
      <li key={subItem} className="SubCatLI">
        <div className="TextoEBtn">
          <span className="SubCatSpan">
            {EnderecoProduto} - {subItem.nome}
          </span>
          <span className="btnEditSpan">
            <button
              onClick={() => {
                handleEditar(itemPai, subItem, EnderecoProduto);
              }}
              className="btnEditar"
            >
              Editar
            </button>

          </span>
        </div>
        {categoriasFiltradas.map((subItem) =>
          MapearSubs(itemPai, subItem, EnderecoProduto)
        )}
      </li>
    );
  };

  const handleEditar = (itemPai, subItem, EnderecoProduto) => {

    if (subItem) {
      setTitulo('Editando Subcategoria')
    } else {
      setTitulo('Editando Categoria')
    }
    setMsgModal({
      cat: itemPai.nome,
      catId: itemPai.id_categorias,
      subCat: subItem?.nome ? subItem.nome : "Não possui",
      subCatId: subItem?.id_categorias ? subItem.id_categorias : "nulo",
      caminho: EnderecoProduto,
    });
    setMostrarModal(true);
  };

  const AdicaoCategoria = async (LetRender2Select) => {
    console.log("Rodou");
    console.log(categoriaSelecionada)
    if (Array.isArray(categoriaSelecionada)) {
      try {

        const response = await axios.post(
          "http://localhost:80/php/",
          {
            funcao: "inserecategoria",
            senha: "@7h$Pz!q2X^vR1&K",
            nome: categoriaInput,
            subcategoria: null,
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log("Deu ruim: " + error);
      }


    } else {
      try {
        const response = await axios.post(
          "http://localhost:80/php/",
          {
            funcao: "inserecategoria",
            senha: "@7h$Pz!q2X^vR1&K",
            nome: categoriaInput,
            subcategoria: categoriaSelecionada.id,
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log("Deu ruim: " + error);
      }
    }


    Alerta(2, "Categoria Adicionada!");
    setCategoriaInput("");
    SetCategoriaSelecionada("Add")
    await fetchData(LetRender2Select)

  };
  let LetRender2Select = false;
  const handleEnviar = async () => {

    if (CheckCamposVazios(categoriaInput)) {
      Alerta(1, "Preencha todos os campos");
      return;
    }
    console.log("Render antes: " + Render2Select)
    setRender2Select(true);
    console.log("Render depois: " + Render2Select)
    LetRender2Select = true;
    await AdicaoCategoria(LetRender2Select);

   
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setMsgModal({});
  };


  const MapCodigoProduto = (item) => {
    let Codigo = 0;
    if (item.id < 10) {
      Codigo = "0" + item.id + "."
    } else {
      Codigo = "0" + item.id + "."
    }
    return (Codigo)
  }

  const IpersLinks = (item) => {
    SetCategoriaSelecionada(item)

    setHistoricoSelecoes((Prev) => {
      // Find the index of the specific item in the list
      const index = Prev.findIndex((I) =>
        I.id === item.id &&
        I.nome === item.nome &&
        I.subcategoria === item.subcategoria
      );

      // If the item is found, return a new array sliced up to the found index
      // If not found, return the original array
      return index !== -1 ? Prev.slice(0, index) : Prev;
    });
  }

  // COMO USAR BTN AJUDA :)
  // crie esta buceta:
  const [showPopup, setShowPopup] = useState(false); 


  return (
    <div className="PagAddCategoria">
      <NavBar />
      <AlertaNotificação />
      <Titulo
        tituloMsg='Gerenciamento de Categorias'
      />
      <div className="pagina-produtos">

        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true*/}
            Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"GERENCIAMENTECATEGORIA"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div>
      </div>
      {mostrarModal && (
        <InfoModalCat
          titulo={titulo}
          msgObj={msgModal}
          fechar={handleFecharModal}
          reFetch={fetchData} // Pass fetchData as a prop
        />
      )}
      <div className="Formulario">
        <h2>Adicionar Nova Categoria</h2>
        <div className="HistoricoSelecoes" style={{ width: '100%', display: "flex", justifyContent: 'flex-start', marginLeft: '10px' }}>
          {HistoricoSelecoes != "" ? (
            <div className="HistoricoSelecoesTexto">

              {HistoricoSelecoes.map((item, index) => (
                <span key={index} className="historico-item">
                  <a onClick={() => IpersLinks(item)} style={{ cursor: 'pointer' }} value={item}>
                    {item.nome}
                  </a>
                  {index < HistoricoSelecoes.length - 1 ? " / " : ""}
                </span>
              ))}
              <span className="historico-item">
                <a>
                  ﾠ/ {categoriaSelecionada.nome}
                </a>
              </span>
            </div>
          ) :
            null
          }
        </div>
        <div className="FormularioCampo">
          <select value={JSON.stringify(categoriaSelecionada)} onChange={handleChange} >
            <option value="Add">Adicionar categoria aqui</option>
            {MapearOptions == null || MapearOptions == "" ? categorias.map(MapearCategoria) : MapearOptions.map(MapearCategoriasSub)}
          </select>
          {/* {console.log(categoriaSelecionada)} */}
          {ShowSelect2 != false ? (
            <select value={categoriaSelecionada2 ? JSON.stringify(categoriaSelecionada2) : "Add"} onChange={handleChange2} >
              <option value="Add">Adicionar categoria aqui</option>
              {CategoriaFiltrada.map((item) => MapearCategoriasSub(item))}
            </select>
          ) :
            null
          }

          <div className="conteudo1">
            <input className="CodigoCatProibido" type="text"
              value={ShowSelect2 == false ? (codigoDisponivel) ? "." + codigoDisponivel : 0 : (HistoricoSelecoes) ? (HistoricoSelecoes.map(MapCodigoProduto).join("") + (categoriaSelecionada.id < 10 ? ("0" + categoriaSelecionada.id) : categoriaSelecionada.id) + "." + codigoDisponivel) : "0" + categoriaSelecionada.id + "." + codigoDisponivel}
              readOnly
            />

            <input
              className="add"
              type="text"
              value={categoriaInput}
              onChange={(e) => setCategoriaInput(e.target.value)}
              placeholder="Nome da categoria"
            />
          </div>
          <button
            className="btnEnviar"
            onClick={() => {
              handleEnviar();
            }}
          >
            Enviar
          </button>
        </div>
        <div className="ListaCategorias">
          <h3>Lista categorias:</h3>
          {carregando ? ( // Renderização condicional baseada no estado de carregamento
            <p>Carregando...</p>
          ) : (
            categorias.length == 0 ? 
              <>
              Nenhuma categoria criada
              </>
             : 
              <ul>{categorias.map(MapearCategorias)}</ul>
            
          )}
        </div>
      </div>
    </div>
  );
}




















export default GerirCategoria;