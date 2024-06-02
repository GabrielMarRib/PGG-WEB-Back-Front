import React, { useState, useEffect } from 'react';
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagPontoPedido.css';
import axios from 'axios';
import { PegaDadosGeralDB } from '../../../Functions/Functions';

function PagPontoPedido() {
    const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
    const [dadosPP, setDadosPP] = useState([]);
    const [carregando, setCarregando] = useState(true);

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
                console.log(PPData);
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

    const pegaDadosComunsEmPP = (item) => {
        if (item && item.data) {
            const infoComumEmPP = dadosPP.find(obj => obj.id === item.id);
            if (infoComumEmPP && infoComumEmPP.data) {
                const CM = calculaCM(infoComumEmPP.data.QV);
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.data.Nome}</td>
                        <td>{item.data.Quantidade}</td>
                        <td>{infoComumEmPP.data.QV}</td>
                        <td>{CM}</td>
                        <td>{infoComumEmPP.data.TR}</td>
                        <td>{infoComumEmPP.data.ES}</td>
                        <td>{infoComumEmPP.data.PP}</td>

                        {item.data.Quantidade <= infoComumEmPP.data.PP ? (
                            <td style={{backgroundColor: '#fa3d2f'}}>REQUER ATENÇÃO URGENTEMENTE</td>
                        ) :
                            <td style={{backgroundColor: '#89ff57', minWidth: '13.5vw'}}>OK</td>
                        }

                    </tr>

                );
            }
        }
        return null;
    }

    return (
        <div className="PagPontoPedido">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <h1 className='h1PontoDePedido'>Gestão de Ponto de Pedido</h1>
            <div className="Tabela">
                <table border="1">
                    <thead>
                        <tr>
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
                                <td colSpan="8">Carregando...</td>
                            </tr>
                        ) : (
                            dadosEstoqueGeral.map(pegaDadosComunsEmPP)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PagPontoPedido;
