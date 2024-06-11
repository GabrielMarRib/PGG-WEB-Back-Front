import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagAddCategoria.css';

function PagAddCategoria() {
    
    const [categoria, setCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [adicionandoSubCategoria, setAdicionandoSubCategoria] = useState(false);
    const [categoriaExistente, setCategoriaExistente] = useState('');

    const atualizarCategoria = (e) => {
        setCategoria(e.target.value);
        setSubCategoria('');
    };

    const atualizarSubCategoria = (e) => {
        setSubCategoria(e.target.value);
    };

    const enviarFormulario = () => {
        if (categoria.trim() !== '') {
            if (adicionandoSubCategoria && categoriaExistente !== '') {
                const categoriaExistenteIndice = parseInt(categoriaExistente, 10);
                const categoriasAtualizadas = [...categorias];
                const subCategorias = categoriasAtualizadas[categoriaExistenteIndice].subCategorias || [];
                subCategorias.push(subCategoria);
                categoriasAtualizadas[categoriaExistenteIndice].subCategorias = subCategorias;
                setCategorias(categoriasAtualizadas);
            } else {
                const novaCategoria = {
                    numero: categorias.length + 1,
                    categoria,
                    subCategorias: []
                };
                setCategorias([...categorias, novaCategoria]);
            }

            setCategoria('');
            setSubCategoria('');
            setAdicionandoSubCategoria(false);
            setCategoriaExistente('');
            localStorage.removeItem('categoriaExistente');
        }
    };

    const adicionarSubCategoria = () => {
        setAdicionandoSubCategoria(true);
    };

    const atualizarCategoriaExistente = (e) => {
        const categoriaSelecionada = e.target.value;
        if (categoriaSelecionada === 'nova') {
            setCategoria('');
            setCategoriaExistente('');
            setAdicionandoSubCategoria(false);
        } else {
            setCategoriaExistente(categoriaSelecionada);
            setAdicionandoSubCategoria(true);
            setCategoria(categorias[categoriaSelecionada]?.categoria || '');
            setSubCategoria('');
        }
    };

    return (
        <div className="PagAddCategoria">
            <Cabecalho />
            <div className="Formulario">
                <h2>Adicionar Nova Categoria</h2>
                <div className="FormularioCampo">
                    <select value={categoriaExistente} onChange={atualizarCategoriaExistente}>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat, indice) => (
                            <option key={indice} value={indice}>{cat.numero}</option>
                        ))}
                        <option value="nova">Adicionar nova categoria</option>
                    </select>
                    
                    {categoriaExistente !== '' && (
                        <input
                            type="text"
                            value={categorias[categoriaExistente]?.categoria || ''}
                            readOnly
                        />
                    )}

                    {(adicionandoSubCategoria || categoriaExistente === '') && (
                        <input
                            type="text"
                            value={categoria}
                            onChange={atualizarCategoria}
                            placeholder="Nome da categoria"
                        />
                    )}

                    {(adicionandoSubCategoria || categoriaExistente !== '') && (
                        <input
                            type="text"
                            value={subCategoria}
                            onChange={atualizarSubCategoria}
                            placeholder="Nome da subcategoria"
                        />
                    )}

                    {!adicionandoSubCategoria && categoriaExistente === '' && (
                        <button className="BotaoAddSubCategoria" onClick={adicionarSubCategoria}>
                            <span>+</span> Adicionar subcategoria
                        </button>
                    )}
                    <button onClick={enviarFormulario}>Enviar</button>
                </div>
                <div className="ListaCategorias">
                    <h3>Lista categorias:</h3>
                    <ul>
                        {categorias.map((cat, indice) => (
                            <li key={indice}>
                                {cat.numero}. {cat.categoria}
                                {cat.subCategorias && cat.subCategorias.length > 0 && (
                                    <ul>
                                        {cat.subCategorias.map((subCat, subIndice) => (
                                            <li key={subIndice}>{cat.numero}.{subIndice + 1} {subCat}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PagAddCategoria;
