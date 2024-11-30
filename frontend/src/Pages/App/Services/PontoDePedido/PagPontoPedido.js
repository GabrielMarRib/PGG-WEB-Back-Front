import React, { useState, useEffect } from 'react';
import CabecalhoHome from '../../../../Components/Cabecalho/CabecalhoHome.js';
import './PagPontoPedido.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Titulo from '../../../../Components/Titulo/Titulo.jsx';
import BuscaCategoriasComponentes from "../../../../Components/BuscaCategoria/BuscaCategoriasComponente.js";
import NavBar from '../../../../Components/NavBar/NavBar.js';

function PagPontoPedido() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)
    const [dadosPP, setDadosPP] = useState([])
    const [msg, setMsg] = useState('');


    useEffect(() => {
        const pegaDadosPP = async () => {
            if (categoriaSelecionada) {
                try {
                    setCarregando(true)
                    setMsg("...carregando")
                    const response = await axios.post('http://discordia.com.br/', {  // acessa via post (SEMPRE SERÁ POST)                
                        funcao: 'pegaDadosPP', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
                        senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
                        codigoPP: categoriaSelecionada.id_categorias
                    },
                    {
                      headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                        "Accept": "application/json, text/plain, */*",
                        "Connection": "keep-alive",
                      },
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
            <NavBar />
            <div className="marginNavbar"> 
            <Titulo
                tituloMsg='Gestão de Ponto de Pedido'
            />
            <div className="btn">
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
                                            <td style={{ backgroundColor: dado.qtde <= Number(dado.ponto_pedido) ? '#fa3d2f' : '#89ff57', minWidth: '13.5vw' }}>
                                                {dado.qtde <= Number(dado.ponto_pedido) ? 'REQUER ATENÇÃO URGENTEMENTE' : 'OK'}
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
        </div>
    );
}

export default PagPontoPedido;