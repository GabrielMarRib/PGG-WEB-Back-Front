import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/App/Service/PagAddCategoria.css';
import axios from "axios";
import { CheckCamposNulos, pegaCategorias, CheckCamposVazios } from "../../../Functions/Functions";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import InfoModalCat from "../../../Components/InfoModalCat.js";
import { useAlerta } from "../../../Context/AlertaContext.js";


function PagAddCategoria() {
    const navigate = useNavigate();
    //funções de style:
    const { Alerta } = useAlerta(); // alertinha...
    const [mostrarModal, setMostrarModal] = useState(false); // mostra o modal...
    const [msgModal, setMsgModal] = useState({}); //msg dessa poha
    // Gerenciamento de tela (mostra se está adicionando, e se está adicionando subCat)
    const [addCat, setAddCat] = useState(true);
    const [addSubCat, setAddSubCat] = useState(false);

    // GERALZÃO:
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true); // Estado para carregamento

    // Categoria do momento:
    const [categoriaSelecionada, SetCategoriaSelecionada] = useState([]);

    // Usado para inserção (addCat true)
    const [codigoDisponivel, SetCodigoDisponivel] = useState(null);
    const [categoriaInput, setCategoriaInput] = useState('');
    const [subCategoriaInput, setSubCategoriaInput] = useState('');

    //Usado para update (addCat false)
    const [subCategoriaUpd, setSubCategoriaUpd] = useState('');

    const pegaCodigoDisponivel = async () => {
        const response = await axios.get('http://localhost:4000/pegaCategoriaDisponivel');
        SetCodigoDisponivel(response.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            setCarregando(true); // Define carregando como true antes de buscar dados
            await pegaCodigoDisponivel();
            await pegaCategorias(setCategorias);
            setCarregando(false); // Define carregando como false após buscar dados
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;

        if (val === "Add") {
            setAddCat(true);
            SetCategoriaSelecionada(null);
        } else {
            setAddCat(false);
            const CatSelecJSON = JSON.parse(val);
            SetCategoriaSelecionada(CatSelecJSON);
        }
    };

    const handleSubCat = () => {
        setAddSubCat(prevState => !prevState);
    };

    const pegaDadosSelect = (item) => {
        const subcategorias = item.subcollections.subCategorias;
        let max = 1;
        let subsId = [];
        if (subcategorias) {
            for (const sub of subcategorias) {
                subsId.push(parseInt(sub.id));
            }
            max = Math.max(...subsId) + 1;
        }
        return (<option key={item.id} value={JSON.stringify({ id: item.id, data: item.data, max: max })}>{item.id} - {item.data.CategoriaNome}</option>);
    };

    const pegaDadosLista = (item) => {
        const subs = item.subcollections.subCategorias;
        return (
            <li key={item.id} >{item.id} - {item.data.CategoriaNome}
                <ul>
                    {subs ? (
                        <div>
                            {subs.map(sub => pegaDadosSub(sub, item))}
                        </div>

                    ) : (
                        null
                    )}
                </ul>
            </li>
        );
    };

    const pegaDadosSub = (subItem, itemPai) => {
        return (
            <li key={subItem.id}>
                <span className="SubCatSpan">{itemPai.id}.{subItem.id} - {subItem.data.subCategoriaNome}</span>
                <span className="btnEditSpan">
                    <button onClick={() => { handleEditar(itemPai,subItem) }} className="btnEditar">Editar</button>
                </span>
            </li>
        );
    };

    const handleEditar = (itemPai,subItem) => {
        setMsgModal({
            cat: itemPai.data.CategoriaNome,
            catId: itemPai.id,
            subCat: subItem.data.subCategoriaNome,
            subCatId: subItem.id,
            caminho: itemPai.id + '.' + subItem.id
        })
        setMostrarModal(true)
    }

    const adicaoSemSub = async () => {
        try {
            let codigoTraduzido = codigoDisponivel.toString();
            if (codigoDisponivel < 10) {
                codigoTraduzido = '0' + codigoTraduzido;
            }
            await axios.post('http://localhost:4000/insereCategoriaSimples', {
                codigo: codigoTraduzido,
                nome: categoriaInput
            });
            Alerta(2, "Adição concluída com sucesso")
            setCategoriaInput('');
            pegaCategorias(setCategorias);
            pegaCodigoDisponivel();
        } catch (error) {
            console.log("deu ruim, " + error);
        }
    };

    const adicaoComSub = async () => {
        try {
            let codigoTraduzido = codigoDisponivel.toString();
            if (codigoDisponivel < 10) {
                codigoTraduzido = '0' + codigoTraduzido;
            }
            await axios.post('http://localhost:4000/insereCategoriaCSub', {
                codigo: codigoTraduzido,
                nome: categoriaInput,
                subCatNome: subCategoriaInput
            });
            Alerta(2, "Adição concluída com sucesso")
            setCategoriaInput('');
            setSubCategoriaInput('');
            pegaCategorias(setCategorias);
            pegaCodigoDisponivel();
        } catch (error) {
            console.log("deu ruim, " + error);
        }
    };

    const atualizaSub = async () => {
        try {
            let novaSub = categoriaSelecionada.max.toString();
            const catAtual = categoriaSelecionada.id;

            if (categoriaSelecionada.max < 10) {
                novaSub = '0' + novaSub;
            }

            await axios.post('http://localhost:4000/atualizaSub', {
                codigoSelecionado: catAtual,
                subCatNome: subCategoriaUpd,
                subcatCodigoNEW: novaSub
            });
            Alerta(2, "Adição concluída com sucesso")
            setSubCategoriaUpd('');
            setAddCat(true);
            pegaCategorias(setCategorias);
        } catch (error) {
            console.log("deu mta merda: " + error);
        }
    };

    const handleEnviar = async () => {
        if (addCat) {
            if (!addSubCat) { //mais simples primeiro...
                if (CheckCamposVazios(categoriaInput)) {
                    Alerta(1, "Preencha todos os campos")
                    return
                }
                await adicaoSemSub();
            } else { // se tiver subCat...
                if (CheckCamposVazios([categoriaInput, subCategoriaInput])) {
                    Alerta(1, "Preencha todos os campos")
                    return
                }
                await adicaoComSub();
            }
        } else { // se nao for pra add cat...
            if (CheckCamposVazios(subCategoriaUpd) || CheckCamposNulos(categoriaSelecionada)) {
                Alerta(1, "Preencha todos os campos")
                return
            }
            await atualizaSub();
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setMsgModal({});
    }

    return (
        <div className="PagAddCategoria">
            <CabecalhoHome />
            <AlertaNotificação />
            <button className='voltar' onClick={() => { navigate("/PagEscolhaProdutos") }}>
                Voltar
            </button>

            {mostrarModal && (
                <InfoModalCat
                    msgObj={msgModal}
                    fechar={handleFecharModal}
                    reFetch={pegaCategorias(setCategorias)}
                />
            )}

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
                                className="CodigoCatProibido"
                                type="text"
                                value={(codigoDisponivel == null) ? null : (codigoDisponivel < 10 ? "0" + codigoDisponivel : codigoDisponivel)}
                                readOnly
                            />
                            <input
                                className="add"
                                type="text"
                                value={categoriaInput}
                                onChange={(e) => setCategoriaInput(e.target.value)}
                                placeholder="Nome da categoria"
                            />

                            {addSubCat ? (
                                <input
                                    className="addSubCat"
                                    type="text"
                                    value={subCategoriaInput}
                                    onChange={(e) => setSubCategoriaInput(e.target.value)}
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
                                value={categoriaSelecionada.max < 10 ? ".0" + categoriaSelecionada.max : "." + categoriaSelecionada.max}
                                readOnly
                            />
                            <input
                                type="text"
                                value={subCategoriaUpd}
                                onChange={(e) => setSubCategoriaUpd(e.target.value)}
                                placeholder="Nome da subcategoria"
                                className="addSubCat"
                            />
                        </div>
                    )}
                    <button className="btnEnviar" onClick={() => { handleEnviar() }}>Enviar</button>

                </div>
                <div className="ListaCategorias">
                    <h3>Lista categorias:</h3>
                    {carregando ? ( // Renderização condicional baseada no estado de carregamento
                        <p>Carregando...</p>
                    ) : (
                        <ul>
                            {categorias.map(pegaDadosLista)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PagAddCategoria;