import { useEffect, useState, useRef } from "react";
import "../../src/Styles/Components/BuscaCategoriaComponente.css";
import { pegaCategorias } from "../Functions/Functions";

function BuscaCategoriasComponente({ setCategoriaSelecionada, CategoriaSelecionada }) {
  
  const [inputValue, setInputValue] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [I, setI] = useState(true);


  const pegacategoria = async () => {
    await pegaCategorias(setCategorias);
    
  };

  useEffect(() => {
    
    pegacategoria();
  }, [])

 
  const CategoriasFiltradas = categorias.filter((categoria) =>{
    if(inputValue === 'todas'){
      return true
    }else{
      return categoria.nome.toLowerCase().includes(inputValue.toLowerCase())
    }
  }

    
  );

 
  const handleOptionClick = async (categoria) => {
      setI(false)

      setCategoriaSelecionada(categoria)
      setInputValue(categoria.nome);
      setShowOptions(false);
    
  };
  
  useEffect(() => {
    
    if(I == true){
      if(inputValue == "" ){
        setShowOptions(false);
      }else{
        setShowOptions(true);
      }
    }else{
      setI(true)
    }
    }, [inputValue]);
 

  return (
    <div className="BuscaCategoriasComponente">
      <div className="barra-pesquisa">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pesquisar categoria..."
            
        />
     {showOptions && (
      <div className="options-container">
        {showOptions && (
            CategoriasFiltradas.map((categoria, index) => (
                <div
                  key={index}
                  className="option"
                  onMouseDown={() => handleOptionClick(categoria)} // Use onMouseDown para capturar o clique antes do onBlur
                >
                  {categoria.nome}
                </div>
              ))

            )}
        </div>
              )}
      </div>
    </div>
  );
}

export default BuscaCategoriasComponente;
