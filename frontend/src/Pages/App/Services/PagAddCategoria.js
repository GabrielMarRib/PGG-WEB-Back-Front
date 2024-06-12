import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagAddCategoria.css';
import axios from "axios";
import { pegaCategorias } from "../../../Functions/Functions";
function PagAddCategoria() {
    const [addCat, setAddCat] = useState(true);
    const [addSubCat, setAddSubCat] = useState(false);

    const [codigoDisponivel, SetCodigoDisponivel] = useState(null)
    const [categorias, setCategorias] = useState([])

    const [categoriaInput, setCategoriaInput] = useState(null);
    const [categoriaSelecionada, SetCategoriaSelecionada] = useState([]);

    const pegaCodigoDisponivel = async () => {
        const response = await axios.get('http://localhost:4000/pegaCategoriaDisponivel')
        SetCodigoDisponivel(response.data)
    }

    useEffect(() => {
        pegaCodigoDisponivel();
        pegaCategorias(setCategorias);
    }, [])

    const handleChange = (e) => {
        const val = e.target.value;

        if (val === "Add")
            setAddCat(true)
        else {
            setAddCat(false)
            const CatSelecJSON = JSON.parse(val);
            SetCategoriaSelecionada(CatSelecJSON)
        }

    }

    const handleSubCat = () => {
        setAddSubCat(prevState => !prevState)
    }

    const pegaDadosSelect = (item) => {
        const subcategorias = item.subcollections.subCategorias

        let subsId = [];
        for (const sub of subcategorias) {
            subsId.push(parseInt(sub.id))
        }
        const max = Math.max(...subsId)+1
        return (<option key={item.id} value={JSON.stringify({ id: item.id, data: item.data, max: max })}>{item.id} - {item.data.CategoriaNome}</option>)
    }
    return (
        <div className="PagAddCategoria">
            <Cabecalho />
            <div className="Formulario">
                <h2>Adicionar Nova Categoria</h2>
                <div className="FormularioCampo">
                    <select value={JSON.stringify(categoriaSelecionada)} onChange={handleChange} >
                        <option value="Add">Adicionar nova categoria</option>
                        {categorias.map(pegaDadosSelect)}

                    </select>
                    {addCat ? ( // se for pra add categoria:
                        <div className="conteudo1">
                            <input
                                className="addCat"
                                type="text"
                                placeholder="Nome da categoria"
                            />
                            {addSubCat ? (
                                <input
                                    className="addSubCat"
                                    type="text"
                                    placeholder="Nome da subcategoria"
                                />
                            ) : (
                                null
                            )}
                            <button className="BotaoAddSubCategoria" onClick={() => { handleSubCat() }}>
                                <span>{!addSubCat ? ('+') : ('-')}</span> {!addSubCat ? ("Adicionar Subcategoria") : ("Remover Subcategoria")}
                            </button>
                        </div>
                    ) : (
                        <div>  {/* input para categoria q ja existe*/}
                            <input
                                type="text"
                                className="addCatProibido"
                                value={categoriaSelecionada.max <  10 ? ".0" + categoriaSelecionada.max : "."+ categoriaSelecionada.max}
                                readOnly
                            />

                            <input
                                type="text"
                                className="addSubCat"
                            />
                        </div>
                    )}
                    <button className="btnEnviar" onClick={() => { console.log(categoriaSelecionada) }}>Enviar</button>
                </div>
                <div className="ListaCategorias">
                    <h3>Lista categorias:</h3>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PagAddCategoria;
