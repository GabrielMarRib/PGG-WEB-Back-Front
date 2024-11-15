import { pegaCategorias } from "../../Functions/Functions";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

// componente estritamente igual ao de BuscaCategorias (praticamente duplicado), só foi criado com variáveis diferentes para não dar conflito na página de produtos

function FiltragemComponente({ setFiltroSelecionado, FiltroSelecionado }) {

    const [inputValue, setInputValue] = useState("");
    const [inputFallBack, setInputFallBack] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [foco, setFoco] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [CategoriasFiltradas, setCategoriasFiltradas] = useState(false);
    const [I, setI] = useState(true);
    const [Montador, setMontador] = useState(true);
  
  
    const ColhendoCategoria = async (setOBJ) => {
  
      try { //tente...
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
          funcao: 'pegacategorias',
          senha: '@7h$Pz!q2X^vR1&K'
        });
  
        setOBJ(response.data)
        console.log(response.data)
        // const FiltroCategoria = response.data.filter((categoria) =>
        //   categoria.nome.toLowerCase().includes(inputValue.toLowerCase())
        // )
        // setCategoriasFiltradas(FiltroCategoria)
      } catch (error) {
        console.log("Falha na coleta: " + error)
      }
  
    }
  
  
    const pegacategoria = async () => {
      await ColhendoCategoria(setCategorias);
      console.log(categorias)
    };
  
    useEffect(() => {
      pegacategoria();
    }, [])
  
  
    const handleOptionClick = async (categoria) => {
      setI(false)
  
      setFiltroSelecionado(categoria)
      setInputValue(`${categoria.id_categorias} - ${categoria.nome}`);
      setInputFallBack('')
      setShowOptions(false);
  
    };
  
    const handleOptionClickFixo = (msg) =>{
      setInputFallBack('')
      setFiltroSelecionado(null)
      setInputValue(msg)
    }
  
    useEffect(() => {
      if (Montador == true) {
        pegacategoria();
        setMontador(false)
      }
  
      if (I == true) {
        if (foco) { // mudei kkkkk foi mal gabriel
          setShowOptions(true);
        } else {
          setShowOptions(false);
        }
      } else {
        setI(true)
      }
  
      if(inputValue === ''){
        setCategoriasFiltradas(categorias) // kkkkkk
        return
      }
      
      const FiltroCategoria = categorias.filter((categoria) => {
        if(isNaN(inputValue)){
          return categoria.nome.toLowerCase().includes(inputValue.toLowerCase()) //não é num; vê o nome
        }else{
          return categoria.id_categorias.includes(inputValue) // é num, vê o código
        }
        
      })
      setCategoriasFiltradas(FiltroCategoria)
    }, [inputValue, foco]); // tasquei foco aq tbm
  
    const handleFocus = () =>{
      if(typeof parseInt(inputValue.charAt(0)) === 'number'){ // achei q ia ficar mais bonito assim
        setInputFallBack(inputValue)
        setInputValue('')
      }
      setFoco(true)
    }
    
  return (
    <div className="BuscaCategoriasComponente">
      <div className="barra-pesquisa">
        <input
          value={inputValue}
          onFocus={() => handleFocus()} // kkkkkkk
          onBlur={() => {
            setFoco(false);
            if(inputFallBack){
              setInputValue(inputFallBack);
              setInputFallBack('')
            }
            //
          }}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pesquisar categoria..."

        />
        {showOptions && (
          <div className="options-container">
            <div
             key="opcaoFixa"
             className="option"
             onMouseDown={() => handleOptionClickFixo('todas as categorias (sem restrições)')}
            >
            todas as categorias (sem restrições)
            </div>
            
            {showOptions && (
              CategoriasFiltradas.map((categoria, index) => (
                <div
                  key={index}
                  className="option"
                  onMouseDown={() => handleOptionClick(categoria)} // Use onMouseDown para capturar o clique antes do onBlur
                >
                  {categoria.id_categorias} - {categoria.nome}
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltragemComponente;
