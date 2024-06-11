import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagAddCategoria.css';

function PagAddCategoria() {
    const [addCat, setAddCat] = useState(true);
    const [addSubCat, setAddSubCat] = useState(false);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val === "Add")
            setAddCat(true)
        else
            setAddCat(false)
    }

    const handleSubCat = () => {
        setAddSubCat(prevState => !prevState)
    }
    return (
        <div className="PagAddCategoria">
            <Cabecalho />
            <div className="Formulario">
                <h2>Adicionar Nova Categoria</h2>
                <div className="FormularioCampo">
                    <select onChange={handleChange}>
                        <option value="Add">Adicionar nova categoria</option>
                        <option value="outroVal">Categoria q ja existe</option>
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
                                readOnly
                            />
                            <input
                                type="text"
                                className="addSubCatProibido"
                                readOnly
                            />
                            <input
                                type="text"
                                className="addSubCat"
                            />
                        </div>
                    )}
                    <button className="btnEnviar" onClick={() => { }}>Enviar</button>
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
