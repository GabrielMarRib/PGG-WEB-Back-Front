import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../../../Styles/App/Service/PagCurvaABC.css';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CabecalhoHome from "../../../Components/CabecalhoHome";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from "../../../Functions/RedirectAcesso";
import axios from "axios";

function CurvaABCPorValor() {
    const [dadosCurvaABC, setDadosCurvaABC] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [qtdTotalCusto, setQtdTotalCusto] = useState(null);

    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const navigate = useNavigate();

    RedirectAcesso(User, 1);
    Redirect(User);

    useEffect(() => {
        const pegaTudo = async () => {
            if (categoriaSelecionada !== null) {
                try {
                    const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                        funcao: 'PegaDadosPorCategoriaComCurvaAbcLoteOrderByValorVendaComCustoTotalAtreladoAutomaticamenteEcustoTotalAcumulado',
                        senha: '@7h$Pz!q2X^vR1&K',
                        categoriaCodigo: categoriaSelecionada
                    });

                    console.log("Dados recebidos da API:", response.data);
                    const resposta = response.data;

                    if (resposta.length > 0) {
                        const ultimoItem = resposta[resposta.length - 1];
                        setQtdTotalCusto(ultimoItem.custoTotalAcumulado);

                        const respostaComPorcentagem = resposta.map((produto) => {
                            const porcentagem = ((produto.custoTotal / ultimoItem.custoTotalAcumulado) * 100).toFixed(2);
                            return { ...produto, porcentagem };
                        });

                        let acumulado = 0;
                        const respostaComAcumulado = respostaComPorcentagem.map((produto) => {
                            acumulado += parseFloat(produto.porcentagem);

                            let classificacao = 'C';
                            if (acumulado <= 80) classificacao = 'A';
                            else if (acumulado <= 95) classificacao = 'B';
                            return { ...produto, porcentagemAcumulada: acumulado.toFixed(2), classificacao };
                        });

                        setDadosCurvaABC(respostaComAcumulado);
                    }
                } catch (error) {
                    console.log("Erro ao buscar produtos: " + error);
                    setDadosCurvaABC({msg:`Não há produtos cadastrados em Curva ABC para a categoria => ${categoriaSelecionada} - '${categorias.find((cat => cat.id_categorias === categoriaSelecionada)).categoria_nome}'`})
                } finally {
                    setCarregando(false);
                }
            } else {
                setDadosCurvaABC({ msg: "Escolha uma categoria para exibir a Curva ABC" })
            }
        };

        pegaTudo();
    }, [categoriaSelecionada]);

    useEffect(() => {
        const pegaCategorias = async () => {
            try {
                const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                    funcao: 'pegaCategoriasComConsumo',
                    senha: '@7h$Pz!q2X^vR1&K'
                });
                setCategorias(response.data);
            } catch (error) {
                console.log("Erro ao buscar categorias: " + error);
            }
        };
        pegaCategorias();
    }, []);

    const pegaCorClassificacao = (classificacao) => {
        switch (classificacao) {
            case 'A':
                return '#CCFFCC';
            case 'B':
                return '#FFFF99';
            case 'C':
                return '#FFCCCC';
            default:
                return '#D3D3D3';
        }
    };

    const pegaCorClassificacaoVibrante = (classificacao) => {
        switch (classificacao) {
            case 'A':
                return '#228b22';
            case 'B':
                return '#ff9000';
            case 'C':
                return '#ff0000';
            default:
                return '#D3D3D3';
        }
    };

    const mudaCorClassGrafico = (texto) => {
        const corzinha = pegaCorClassificacaoVibrante(texto);
        return <span style={{ color: corzinha, fontWeight: 'bold' }}>{texto}</span>;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Produto: ${label}`}</p>
                    <p className="intro">{`Id: ${item.id_produtos}`}</p>
                    <p className="intro">
                        {`Classificação: `}
                        {mudaCorClassGrafico(item.classificacao)}
                    </p>
                    <p className="intro" style={{ color: '#1e58ff' }}>{`Acumulado: ${item.porcentagemAcumulada}%`}</p>
                </div>
            );
        }
        return null;
    };

    const handleChangeCategoria = (e) => {
        const valor = e.target.value;
        if (isNaN(valor))
            setCategoriaSelecionada(null);
        else
            setCategoriaSelecionada(valor);
    }

    return (
        <div className="CurvaABC">
            <div className="CabecalhoHome">
                <CabecalhoHome />
            </div>
            <div className="btn">
                <button className="Voltar" onClick={() => navigate("/PagEscolhaCurvaABC")}>
                    Voltar
                </button>
            </div>
            <div className="BuscarCategoriaCurvaABC">
                <h3>Selecione a Categoria</h3>
                <select value={categoriaSelecionada} onChange={handleChangeCategoria}>
                    <option value="Vazio">Categorias</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id_categorias} value={categoria.id_categorias}>
                            {categoria.id_categorias} - {categoria.categoria_nome} {'->'} Produtos: {categoria.produtos_nomes ? categoria.produtos_nomes?.split('§~|§~').length: '0'} {'=>'} Produtos em Curva Abc: {categoria.qt_consumos ? categoria.qt_consumos?.split(',').length: '0'}
                        </option>
                    ))}
                </select>
            </div>
            <div id="ParteSuperior">
                <div className="CurvaABCGrafico">
                    {carregando ? (
                        <div>Carregando...</div>
                    ) : (
                        dadosCurvaABC.msg ? (dadosCurvaABC.msg) : (
                            dadosCurvaABC.length > 0 && (
                                <ResponsiveContainer width="100%" height={400}>
                                    <ComposedChart
                                        data={dadosCurvaABC}
                                        margin={{
                                            top: 40,
                                            right: 20,
                                            bottom: 20,
                                            left: 20,
                                        }}
                                    >
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis dataKey="nome" tick={{ fontSize: 15 }} />
                                        <YAxis domain={[0, 120]} tickCount={7} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar dataKey="porcentagemAcumulada" barSize={20} fill='#103CA9' />
                                        <Line type="monotone" dataKey="porcentagemAcumulada" stroke="#FF4D00" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            )
                        ))}
                </div>
            </div>
            <div className="Tabela">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Qtd Con.</th>
                            <th>Custo Unitário</th>
                            <th>Custo Total</th>
                            <th>%</th>
                            <th>% Acumulada</th>
                            <th>Classificação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosCurvaABC.length > 0 ? (
                            dadosCurvaABC.map((produto) => (
                                <tr key={produto.id_produtos}>
                                    <td>{produto.id_produtos}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.qt_consumo}</td>
                                    <td>{produto.vlr_venda}</td>
                                    <td>{produto.custoTotal}</td>
                                    <td>{produto.porcentagem}%</td>
                                    <td>{produto.porcentagemAcumulada}%</td>
                                    <td style={{ backgroundColor: pegaCorClassificacao(produto.classificacao) }}>{mudaCorClassGrafico(produto.classificacao)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Nenhum produto encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <center>
                <div>
                    Valor Total de Custo Acumulado: {dadosCurvaABC.msg == null ? qtdTotalCusto : 0}
                </div>
            </center>
        </div>
    );
}

export default CurvaABCPorValor;