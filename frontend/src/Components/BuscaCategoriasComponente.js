import { useEffect, useState, useRef } from "react";
import "../../src/Styles/Components/BuscaCategoriaComponente.css";
import { pegaCategorias } from "../Functions/Functions";
import axios from "axios";

function BuscaCategoriasComponente({
  setCategoriaSelecionada,
  CategoriaSelecionada,
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputFallBack, setInputFallBack] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [foco, setFoco] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [CategoriasFiltradas, setCategoriasFiltradas] = useState(false);
  const [I, setI] = useState(true);
  const [Montador, setMontador] = useState(true);
  const [HistoricoSelecoes, setHistoricoSelecoes] = useState([]);
  const [isClickInside, setIsClickInside] = useState(false); // New state to track clicks inside the options
  const inputRef = useRef(null);
  const optionsRef = useRef(null); // Reference for the options container

  const ColhendoCategoria = async (setOBJ) => {
    try {
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "pegacategorias",
          senha: "@7h$Pz!q2X^vR1&K",
        }
      );

      setOBJ(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Falha na coleta: " + error);
    }
  };

  const pegacategoria = async () => {
    await ColhendoCategoria(setCategorias);
    console.log(categorias);
  };

  useEffect(() => {
    pegacategoria();
  }, []);

  const handleOptionClick = async (categoria) => {
    setI(false);
    setCategoriaSelecionada(categoria);
    setInputFallBack("");
    if (!categoria) {
      setShowOptions(false);
    }
    setInputValue(`${categoria.id_categorias} - ${categoria.nome}`);

    setHistoricoSelecoes((prev) => [
      ...prev,
      {
        id: categoria.id_categorias,
        nome: categoria.nome,
        subcategoria: categoria.subcategoria,
      },
    ]);

    const categoriasFiltradasLet = categorias.filter(
      (cat) => categoria.id_categorias === cat.subcategoria
    );
    setCategoriasFiltradas(categoriasFiltradasLet);
  };

  const handleOptionClickFixo = (msg) => {
    setInputFallBack("");
    setCategoriaSelecionada(null);
    setInputValue(msg);
    setHistoricoSelecoes("");
  };

  useEffect(() => {
    if (Montador === true) {
      pegacategoria();
      setMontador(false);
    }

    if (I === true) {
      if (foco) {
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
    } else {
      setI(true);
    }

    if (inputValue === "") {
      const categoriasFiltradasLet = categorias.filter(
        (cat) => cat.subcategoria === null
      );
      setCategoriasFiltradas(categoriasFiltradasLet);
      return;
    }
    const contemNumero = /\d/.test(inputValue);
    if (contemNumero) {
      return;
    }

    const FiltroCategoria = categorias.filter((categoria) => {
      if (isNaN(inputValue)) {
        return categoria.nome.toLowerCase().includes(inputValue.toLowerCase());
      } else {
        return categoria.id_categorias.includes(inputValue);
      }
    });

    setCategoriasFiltradas(FiltroCategoria);
  }, [inputValue, foco]);

  const handleFocus = () => {
    if (typeof parseInt(inputValue.charAt(0)) === "number") {
      setInputFallBack(inputValue);
      setInputValue("");
      setHistoricoSelecoes("");
    }
    setFoco(true);
  };

  const IpersLinks = (item) => {
    setCategoriaSelecionada(item);
    setInputValue(`${item.id} - ${item.nome}`);

    setHistoricoSelecoes((Prev) => {
      const index = Prev.findIndex(
        (I) =>
          I.id === item.id &&
          I.nome === item.nome &&
          I.subcategoria === item.subcategoria
      );

      return index !== -1 ? Prev.slice(0, index) : Prev;
    });
  };

  const handleClickInside = () => {
    setIsClickInside(true);
  };

  const handleClickOutside = () => {
    if (!isClickInside) {
      setShowOptions(false);
    }
    setIsClickInside(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClickInside]);

  return (
    <div className="BuscaCategoriasComponente">
      <div
        className="HistoricoSelecoes"
        style={{
          width: "100%",
          display: "-ms-flexbox",
          justifyContent: "block",
          marginLeft: "10px",
        }}
      >
        {HistoricoSelecoes.length > 0 ? (
  <div className="HistoricoSelecoesTexto">
    {/* Exibe "../" se houver mais de 3 itens no histórico */}
    {HistoricoSelecoes.length > 3 && (
      <span className="historico-item">
        <a style={{ cursor: "default", textDecoration: "none" }}>.. / </a>
      </span>
    )}
    {HistoricoSelecoes.slice(-3).map((item, index) => (
      <span key={index} className="historico-item">
        <a
          onClick={() => IpersLinks(item)}
          style={{ cursor: "pointer" }}
          value={item}
        >
          {item.nome}
        </a>
        {index < 2 ? " / " : ""} {/* Exibe " / " entre as últimas 3 opções */}
      </span>
    ))}
    <span className="historico-item">
      <a>ﾠ{inputValue.nome}</a>
    </span>
  </div>
) : null}
      </div>
      <div className="barra-pesquisa">
        <input
          ref={inputRef}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={() => {
            setFoco(false);
            if (inputFallBack) {
              setInputValue(inputFallBack);
              setInputFallBack("");
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pesquisar categoria..."
        />

        {showOptions && (
          <div
            className="options-container"
            ref={optionsRef}
            onMouseDown={handleClickInside} // Set the click inside when clicking in options
          >
            <div
              key="opcaoFixa"
              className="option"
              onMouseDown={() =>
                handleOptionClickFixo("Selecione uma categoria")
              }
            >
              Voltar todas as categorias
            </div>

            {CategoriasFiltradas.map((categoria, index) => (
              <div
                key={index}
                className="option"
                onMouseDown={() => handleOptionClick(categoria)}
              >
                {categoria.id_categorias} - {categoria.nome}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuscaCategoriasComponente;
