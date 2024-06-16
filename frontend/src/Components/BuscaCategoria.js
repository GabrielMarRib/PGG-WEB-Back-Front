import React, { useState, useEffect, useCallback } from 'react';
import { pegaCategorias } from "../Functions/Functions";
import '../Styles/Components/BuscaCategorias.css';
import axios from 'axios';

function BuscarCategoria({ funcaoReturn }) {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [subCats, setSubCats] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await pegaCategorias(setCategorias);
        };
        fetchData();
    }, []);

    useEffect(() => {
        funcaoReturn(produtos);
    }, [produtos, funcaoReturn]);

    categorias.sort((a, b) => {
        const dataA = parseInt(a.id);
        const dataB = parseInt(b.id);
        return dataA - dataB;
    });

    const handleChange = (e) => {
        setProdutos(null)
        const val = e.target.value;
        if (val === "Vazio") {
            setCategoriaSelecionada([]);
            setSubCats([]);
        } else {
            const CatSelecJSON = JSON.parse(val);
            setCategoriaSelecionada(CatSelecJSON);
            setSubCats(CatSelecJSON.Subcategoria || []);
        }
    };

    const pegaDadosSelect = (item) => {
        const subcategorias = item.subcollections.subCategorias;
        return (
            <option
                key={item.id}
                value={JSON.stringify({
                    id: item.id,
                    data: item.data,
                    Subcategoria: subcategorias,
                })}
            >
                {item.id} - {item.data.CategoriaNome}
            </option>
        );
    };

    const fetchProdutos = useCallback(async () => {
        setCarregando(true);
        await pegaProdutos();
        setCarregando(false);
    }, [subCats]);

    useEffect(() => {
        if (categoriaSelecionada) {
            fetchProdutos();
        }
    }, [categoriaSelecionada, fetchProdutos]);

    const pegaProdutos = async () => {
        try {
            if (subCats) {
                let produtosPegados = [];
                for (const subCat of subCats) { // pra cada subcategoria da lista de subcategorias:
                    const response = await axios.post('http://localhost:4000/pegaProdutosDeSubInformado', { // pega os produtos
                        codigoSelecionado: categoriaSelecionada.id,
                        subcatCodigoNEW: subCat.id
                    });
                    produtosPegados.push({id: subCat.id, produtos: response.data, subCatNome: subCat.data.subCategoriaNome});
                }
                setProdutos(produtosPegados);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='BuscarCategoria'>
            <div className="grupo-select">
            <select
                value={categoriaSelecionada ? JSON.stringify(categoriaSelecionada) : "Vazio"}
                onChange={handleChange}
            >
                <option value="Vazio">Categorias</option>
                {categorias.map(pegaDadosSelect)}
            </select>
            {carregando && <p>Carregando...</p>}
            </div>
        </div>
    );
}

export default BuscarCategoria;
