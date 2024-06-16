import React, { useState, useEffect, useContext } from 'react';
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/App/Service/PagPontoPedido.css';
import axios from 'axios';
import { PegaDadosGeralDB } from '../../../Functions/Functions';
import { UserContext } from '../../../Context/UserContext';
import Redirect from '../../../Functions/Redirect';
import { useNavigate } from "react-router-dom";
import BuscarCategoria from '../../../Components/BuscaCategoria';

function PagPontoPedido() {
    const navigate = useNavigate();
    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [dadosPP, setDadosPP] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [produtosCats, setProdutosCats] = useState(null);
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;

    Redirect(User);

    useEffect(() => {
        PegaDadosGeralDB((data) => {
            setDadosEstoqueGeral(data);
            setCarregando(false);
        });
    }, []);

    useEffect(() => {
        const pegaDadosPP = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pegaPontoDePedido');
                const PPData = response.data.map(item => ({ id: item.id, ...item }));
                setDadosPP(PPData);
                setCarregando(false);
            } catch (erro) {
                console.error('Error fetching data:', erro);
                setCarregando(false);
            }
        };
        pegaDadosPP();
    }, []);

    const calculaCM = (QV) => {
        return parseFloat((QV / 30).toFixed(2));
    }

    const pegaProdutosDisponiveis = () => {
        if (produtosCats?.length > 0) {
            return produtosCats;
        }
    }

    const pegaDadosComunsEmPP = (itemESTOQUE) => {
        if (itemESTOQUE && itemESTOQUE.data && produtosCats && produtosCats.length > 0) {
            const produtoToCatMap = new Map();
            produtosCats.forEach(cat => {
                cat.produtos.forEach(prod => {
                    produtoToCatMap.set(prod.id, { id: cat.id, subCatNome: cat.subCatNome });
                });
            });

            const infoComum = dadosPP.filter(obj => produtoToCatMap.has(obj.id))
                .map(obj => {
                    const matchingCat = produtoToCatMap.get(obj.id);
                    return {
                        ...obj, // Spread the obj to include data from dadosPP
                        catId: matchingCat.id,
                        subCatNome: matchingCat.subCatNome
                    };
                });

            return infoComum.map(objCOMUM => {
                console.log(itemESTOQUE)
                if (objCOMUM.id === itemESTOQUE.id) {
                    return (
                        <tr key={itemESTOQUE.id}>
                            <td>{objCOMUM.catId} - {objCOMUM.subCatNome}</td>
                            <td>{itemESTOQUE.id}</td>
                            <td>{itemESTOQUE.data.Nome}</td>
                            <td>{itemESTOQUE.data.Quantidade}</td>
                            <td>{objCOMUM.data.QV}</td>
                            <td>{calculaCM(objCOMUM.data.QV)}</td>
                            <td>{objCOMUM.data.TR}</td>
                            <td>{objCOMUM.data.ES}</td>
                            <td>{objCOMUM.data.PP}</td>
                            <td style={{ backgroundColor: itemESTOQUE.data.Quantidade <= objCOMUM.data.PP ? '#fa3d2f' : '#89ff57', minWidth: '13.5vw' }}>
                                {itemESTOQUE.data.Quantidade <= objCOMUM.data.PP ? 'REQUER ATENÇÃO URGENTEMENTE' : 'OK'}
                            </td>
                        </tr>
                    );
                }
                return null;
            });
        }
        return null;
    };

    const pegaProdutosComCat = async (obj) => {
        setProdutosCats(obj);
        pegaProdutosDisponiveis();
    }

    return (
        <div className="PagPontoPedido">
            <div className="CabecalhoHome">
                <CabecalhoHome />
            </div>
            <div className="btn">
                <button className="Voltar" onClick={() => { navigate("/PagHome") }}>
                    Voltar
                </button>
                <BuscarCategoria funcaoReturn={pegaProdutosComCat} />
            </div>
            <div className="conteudoPaginaMaster">
                <h1 className='h1PontoDePedido'>Gestão de Ponto de Pedido</h1>
                <div className="Tabela">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>SubCat</th>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Estoque Atual</th>
                                <th>Quantia vendida mensal</th>
                                <th>Consumo Médio</th>
                                <th>Tempo de Reposição</th>
                                <th>Estoque de Segurança</th>
                                <th>Ponto de Pedido</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td colSpan="9">Carregando...</td>
                                </tr>
                            ) : (
                                produtosCats?.length > 0 ? (
                                    dadosEstoqueGeral.map(pegaDadosComunsEmPP)
                                ) : null
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PagPontoPedido;
