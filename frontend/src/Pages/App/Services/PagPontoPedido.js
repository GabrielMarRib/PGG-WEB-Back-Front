import React, { useState, useEffect, useContext } from 'react';
import CabecalhoHome from '../../../Components/CabecalhoHome';
import '../../../Styles/App/Service/PagPontoPedido.css';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import Redirect from '../../../Functions/Redirect';
import { useNavigate } from "react-router-dom";
import Titulo from '../../../Components/Titulo.jsx';
import BuscaCategoriasComponentes from "../../../Components/BuscaCategoriasComponente";

function PagPontoPedido() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)
    const [dadosPP, setDadosPP] = useState([])
    const [msg, setMsg] = useState('');
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;

    Redirect(User);

    useEffect(() => {
        const pegaDadosPP = async () => {
            if (categoriaSelecionada) {
                try {
                    setCarregando(true)
                    setMsg("...carregando")
                    const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
                        funcao: 'pegaDadosPP', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
                        senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
                        codigoPP: categoriaSelecionada.id_categorias
                    });
                    console.log(response)
                    setDadosPP(response.data)
                    setCarregando(false);
                } catch (erro) {
                    console.error('Error fetching data:', erro);
                    setCarregando(false);
                    setDadosPP([])
                    setMsg(`Nenhum produto cadastrado em Ponto de Pedido na categoria '${categoriaSelecionada.id_categorias} - ${categoriaSelecionada.nome}'`)
                }
            } else {
                setCarregando(false)
                setDadosPP([])
                setMsg("Selecione uma categoria para visualizar o ponto de pedido")
            }
        };
        pegaDadosPP();
    }, [categoriaSelecionada]);

    return (
        <div className="PagPontoPedido">
            <div className="CabecalhoHome">
                <CabecalhoHome />
            </div>
            <Titulo
                tituloMsg='Gestão de Ponto de Pedido'
            />
            <div className="btn">
                <button className="Voltar" onClick={() => { navigate("/PagHome") }}>
                    Voltar
                </button>
            </div>
            <div className="conteudoPaginaMaster">
                <div className='BuscarCategoria'>
                    <h3>Selecione a Categoria</h3>
                    <BuscaCategoriasComponentes setCategoriaSelecionada={setCategoriaSelecionada} categoriaSelecionada={categoriaSelecionada} />
                </div>
                <div className="Tabela">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Estoque Atual</th>
                                <th>Quantia vendida mensal</th>
                                <th>Demanda de vendas diárias</th>
                                <th>Consumo Médio</th>
                                <th>Tempo de Reposição</th>
                                <th>Estoque de Segurança</th>
                                <th>Ponto de Pedido</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosPP?.length < 1 || carregando ? (
                                <tr>
                                    <td colSpan="11">{msg}</td>
                                </tr>
                            ) : (
                                dadosPP.map(dado => {
                                    return (
                                        <tr key={dado.id_produtos}>
                                            <td>{dado.categoria}</td>
                                            <td>{dado.id_produtos}</td>
                                            <td>{dado.nome}</td>
                                            <td>{dado.qtde}</td>
                                            <td>{dado.quantidade_vendida}</td>
                                            <td>{dado.demanda_media}</td>
                                            <td>{dado.consumo_medio}</td>
                                            <td>{dado.tempo_reposicao}</td>
                                            <td>{dado.estoque_seguranca}</td>
                                            <td>{dado.ponto_pedido}</td>
                                            <td style={{ backgroundColor: dado.qtde <= dado.ponto_pedido ? '#fa3d2f' : '#89ff57', minWidth: '13.5vw' }}>
                                                {dado.qtde <= dado.ponto_pedido ? 'REQUER ATENÇÃO URGENTEMENTE' : 'OK'}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PagPontoPedido;