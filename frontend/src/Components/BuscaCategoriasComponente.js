import { useEffect, useState, useRef } from "react";
import "../../src/Styles/Components/BuscaCategoriaComponente.css";
import { pegaCategorias } from "../Functions/Functions";
import axios from "axios";

function BuscaCategoriasComponente({ setCategoriaSelecionada, CategoriaSelecionada }) {

  const [inputValue, setInputValue] = useState("");
  const [categorias, setCategorias] = useState([]);
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
      const FiltroCategoria = response.data.filter((categoria) =>
        categoria.nome.toLowerCase().includes(inputValue.toLowerCase())
      )
      setCategoriasFiltradas(FiltroCategoria)
    } catch (error) {
      console.log("Falha na coleta: " + error)
    }

  }


  const pegacategoria = async () => {
    await ColhendoCategoria(setCategorias);

  };

  useEffect(() => {
    pegacategoria();
  }, [])




  const handleOptionClick = async (categoria) => {
    setI(false)

    setCategoriaSelecionada(categoria)
    setInputValue(categoria.nome);
    setShowOptions(false);

  };

  useEffect(() => {
    if (Montador == true) {
      pegacategoria();
      setMontador(false)
    }

    if (I == true) {
      if (inputValue == "") {
        setShowOptions(false);
      } else {
        setShowOptions(true);
      }
    } else {
      setI(true)
    }

    const FiltroCategoria = categorias.filter((categoria) => {
      if (inputValue.toLowerCase() === 'todas') { // vou mudar isso dps... ass Thiago
        return true
      } else
        return categoria.nome.toLowerCase().includes(inputValue.toLowerCase())
    }
    )
    setCategoriasFiltradas(FiltroCategoria)
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
