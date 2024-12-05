import axios from "axios";
import { useEffect, useState, useRef } from "react";

// componente estritamente igual ao de BuscaCategorias (praticamente duplicado), só foi criado com variáveis diferentes para não dar conflito na página de produtos

function FiltragemFornecedor({ setFiltroSelecionado, FiltroSelecionado }) {

    const [inputValue, setInputValue] = useState("");
    const [inputFallBack, setInputFallBack] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [foco, setFoco] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [FornecedoresFiltrados, setFornecedoresFiltrados] = useState(false);
    const [I, setI] = useState(true);
    const [Montador, setMontador] = useState(true);
  
  
    const ColhendoFornecedor = async (setOBJ) => {
  
      try { //tente...
        const response = await axios.post('http://localhost:80/php/', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
          funcao: 'pegarTodosFornecedores',
          senha: '@7h$Pz!q2X^vR1&K'
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
  
        setOBJ(response.data.fornecedores)
        console.log(response.data.fornecedores)
        // const FiltroCategoria = response.data.filter((categoria) =>
        //   categoria.nome.toLowerCase().includes(inputValue.toLowerCase())
        // )
        // setCategoriasFiltradas(FiltroCategoria)
      } catch (error) {
        console.log("Falha na coleta: " + error)
      }
  
    }
    const pegaFornecedor = async () => {
      await ColhendoFornecedor(setFornecedores);
    };
  
    useEffect(() => {
      pegaFornecedor();
    }, [])
  
    const handleOptionClick = async (fornecedor) => {
      setI(false)
  
      setFiltroSelecionado(fornecedor)
      setInputValue(`${fornecedor.id_fornecedor} - ${fornecedor.nome}`);
      setInputFallBack('')
      setShowOptions(false);
  
    };
  
    const handleOptionClickFixo = (msg) =>{
      setInputFallBack('')
      setFiltroSelecionado('sem filtro')
      setInputValue(msg)
    }
  
    useEffect(() => {
      if (Montador == true) {
        pegaFornecedor();
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
        setFornecedoresFiltrados(fornecedores) // kkkkkk
        return
      }
      
      const FiltroFornecedor = fornecedores.filter((fornecedor) => {
        if(isNaN(inputValue)){
          return fornecedor.nome.toLowerCase().includes(inputValue.toLowerCase()) //não é num; vê o nome
        }else{
          return fornecedor.id_fornecedor.includes(inputValue) // é num, vê o código
        }
        
      })
      setFornecedoresFiltrados(FiltroFornecedor)
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
          placeholder="Pesquisar fornecedor..."

        />
        {showOptions && (
          <div className="options-container">
            <div
             key="opcaoFixa"
             className="option"
             onMouseDown={() => handleOptionClickFixo('todos os fornecedores (sem restrições)')}
            >
            todos os fornecedores (sem restrições)
            </div>
            
            {showOptions && (
              FornecedoresFiltrados.map((fornecedor, index) => (
                <div
                  key={index}
                  className="option"
                  onMouseDown={() => handleOptionClick(fornecedor)} // Use onMouseDown para capturar o clique antes do onBlur
                >
                  {fornecedor.id_fornecedor} - {fornecedor.nome}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltragemFornecedor;
