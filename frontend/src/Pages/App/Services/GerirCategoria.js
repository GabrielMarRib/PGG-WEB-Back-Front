import React, { useState, useEffect, useCallback } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagAddCategoria.css";
import "./SelectsInfinitos.js";
import axios from "axios";
import {
  CheckCamposNulos,
  pegaCategorias,
  CheckCamposVazios,
  VerificaCategorias,
} from "../../../Functions/Functions.js";

import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import InfoModalCat from "../../../Components/InfoModalCat.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import Redirect from "../../../Functions/Redirect.js";
import RedirectAcesso from "../../../Functions/RedirectAcesso.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext.js";

function GerirCategoria() {
  const navigate = useNavigate();

  // //Página protegida...
  // const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  // const User = UserOBJ.User; //Pega só o User....
  // //Redireciona sem user
  // Redirect(User);
  // //Redireciona se user nn for 2
  // RedirectAcesso(User, 2)

  //funções de style:
  const { Alerta } = useAlerta(); // alertinha...
  const [mostrarModal, setMostrarModal] = useState(false); // mostra o modal...
  const [msgModal, setMsgModal] = useState({}); //msg dessa poha
  const [Remapear, setRemapear] = useState(false); 
  const [ShowSelect2, setShowSelect2] = useState([]);




  // GERALZÃO:
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true); // Estado para carregamento

  // Categoria do momento:
  const [MapearOptions, setMapearOptions] = useState([null]);
  const [categoriaSelecionada, SetCategoriaSelecionada] = useState([]);
  const [categoriaSelecionada2, SetCategoriaSelecionada2] = useState([]);
  const [CategoriaFiltrada, setCategoriaFiltrada] = useState([]);
  const [HistoricoSelecoes, setHistoricoSelecoes] = useState([]);
  


  // Usado para inserção (addCat true)
  const [codigoDisponivel, SetCodigoDisponivel] = useState(null);
  const [categoriaInput, setCategoriaInput] = useState("");


 
  


  const fetchData = useCallback(async () => {
    setCarregando(true);
    console.log("Pegando as infos do Banco");
    await pegaCategorias(setCategorias);
    setCarregando(false);
  }, []);
  useEffect(() => {
    SetCodigoDisponivel(categorias.length + 2);
  }, [categorias]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = async (e) => {
    const val = e.target.value;
  
    if (val === "Add") {
      
      if(HistoricoSelecoes.length > 0){
    
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
     
      
      
      }else{
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
      if(Remapear == false){
        const categoriasFiltradas = categorias.filter(cat => cat.subcategoria === categoriaSelecionada.id);
        setCategoriaFiltrada(categoriasFiltradas);
      }else{
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
    // console.log(item.id_categorias + "Categoriasfiltradas>" + JSON.stringify(categoriasFiltradas))
    let EnderecoProduto = item.id_categorias;
    if (item.subcategoria == null) {
      return (
        <li key={item.id_categorias}>
          {item.id_categorias} - {item.nome}
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
    
    setMsgModal({
      cat: itemPai.nome,
      catId: itemPai.id_categorias,
      subCat: subItem.nome,
      subCatId: subItem.id_categorias,
      caminho: EnderecoProduto,
    });
    setMostrarModal(true);
  };

  const AdicaoCategoria = async () => {
    console.log("Rodou");
    console.log(categoriaSelecionada)
    if(Array.isArray(categoriaSelecionada)){
    try {
        
        console.log("ENTROU AQUI A")
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "inserecategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          nome: categoriaInput,
          subcategoria: null,
        }
      );
      // setDados(response.data)
      console.log(response.data);
    } catch (error) {
      console.log("Deu ruim: " + error);
    }


    }else{
      try {
      console.log("ENTROU AQUI B")
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "inserecategoria",
          senha: "@7h$Pz!q2X^vR1&K",
          nome: categoriaInput,
          subcategoria: categoriaSelecionada.id,
        }
      );
      // setDados(response.data)
      console.log(response.data);

    }catch (error) {
    console.log("Deu ruim: " + error);
  }
    }
    
    
    Alerta(2, "Categoria Adicionada!");
    setCategoriaInput("");
    pegaCategorias(setCategorias);
   

  
  };

  const handleEnviar = async () => {

        if (CheckCamposVazios(categoriaInput)) {
          Alerta(1, "Preencha todos os campos");
          return;
        }

          await AdicaoCategoria();
        
     
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setMsgModal({});
  };


  const MapCodigoProduto = (item) => {
    let Codigo = 0;
    if(item.id < 10){
      Codigo = "0" + item.id + "."
    }else{
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



  return (
    <div className="PagAddCategoria">
      <CabecalhoHome />
      <AlertaNotificação />
      <button
        className="voltar"
        onClick={() => {
          navigate("/PagEscolhaProdutos");
        }}
      >
        Voltar
      </button>

      {mostrarModal && (
        <InfoModalCat
          msgObj={msgModal}
          fechar={handleFecharModal}
          reFetch={fetchData} // Pass fetchData as a prop
        />
      )}

      <div className="Formulario">
        <h2>Adicionar Nova Categoria</h2>

       



        <div className="HistoricoSelecoes" style={{width: '100%', display: "flex", justifyContent: 'flex-start', marginLeft: '10px'}}>

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
        ) : (null)}


        </div>

        <div className="FormularioCampo">

           

          <select value={JSON.stringify(categoriaSelecionada)} onChange={handleChange} >
            <option value="Add">Adicionar aqui</option>
            {MapearOptions == null || MapearOptions == "" ? categorias.map(MapearCategoria) : MapearOptions.map(MapearCategoriasSub)}
          </select>
          
            {/* {console.log(categoriaSelecionada)} */}
          {ShowSelect2 != false ? (

          <select value={categoriaSelecionada2 ? JSON.stringify(categoriaSelecionada2) : "Add"} onChange={handleChange2} >
            <option value="Add">Adicionar aqui</option>
            {CategoriaFiltrada.map(MapearCategoriasSub)}
          </select> 

          ) : (null)}

      
             
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
            <ul>{categorias.map(MapearCategorias)}</ul>
          )}
        </div>
      </div>
    </div>
  );
}




















export default GerirCategoria;

