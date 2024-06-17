import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../../../Styles/App/Service/PagCurvaABC.css';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Cabecalho from "../../../Components/Cabecalho";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import BuscarCategoria from '../../../Components/BuscaCategoria';
import { PegaDadosGeralDB, PegadadosVALOR } from '../../../Functions/Functions';
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from "../../../Functions/RedirectAcesso";

function CurvaABC() {
    const [dadosEstoque, setDadosEstoque] = useState([]);
    const [dadosCurvaABC, setDadosCurvaABC] = useState({});
    const [somaQtdConsumo, setSomaQtdConsumo] = useState(0);
    const [porcentagens, setPorcentagens] = useState([]);
    const [porcentagensA, setPorcentagensA] = useState([]);
    const [classificacao, setClassificacao] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [produtosCats, setProdutosCats] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]); // New state for filtered items

    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const navigate = useNavigate();

    RedirectAcesso(User, 1);
    Redirect(User);

    useEffect(() => {
        PegaDadosGeralDB((data) => {
            setDadosEstoque(data);
            setCarregando(false);
        });
        PegadadosVALOR(setDadosCurvaABC);
    }, []);

    useEffect(() => {
        if (filteredItems.length > 0) {
            const somaQtdConsumo = calcularSomaQtdeConsumo(filteredItems);
            setSomaQtdConsumo(somaQtdConsumo);

            const porcentagens = calcularPorcentagemSimples(filteredItems, somaQtdConsumo);
            const [porcentagensA, classificacao] = calcularPorcentagemAcumulada(filteredItems, porcentagens);

            setPorcentagens(porcentagens);
            setPorcentagensA(porcentagensA);
            setClassificacao(classificacao);
        }
    }, [filteredItems]);

    const calcularSomaQtdeConsumo = (items) => {
        let totalConsumo = 0;

        items.forEach(item => {
            if (Array.isArray(dadosCurvaABC)) {
                const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);
                totalConsumo += (dadosCabiveisAbc?.data.QtdeConsumo || 0);
            }
        });

        return totalConsumo;
    };

    const calcularPorcentagemSimples = (items, somaQtdConsumo) => {
        const porcentagens = [];

        items.forEach(item => {
            if (Array.isArray(dadosCurvaABC)) {
                const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);
                const qtdConsumo = dadosCabiveisAbc?.data.QtdeConsumo || 0;
                porcentagens.push({ id: item.id, data: (qtdConsumo / somaQtdConsumo) * 100 });
            }
        });
        return porcentagens;
    };

    const calcularPorcentagemAcumulada = (items, porcentagens) => {
        const acumulada = [];
        const classificacao = {};

        if (Array.isArray(porcentagens)) {
            items.forEach((item, i) => {
                const dadosCabiveisPorc = porcentagens.find(obj => obj.id === item.id);
                if (dadosCabiveisPorc && dadosCabiveisPorc.data) {
                    if (i === 0) {
                        acumulada.push({ id: item.id, data: parseFloat(dadosCabiveisPorc.data) });
                    } else {
                        const itemAnteriorID = items[i - 1].id;
                        const acumuladaAnterior = acumulada.find(obj => obj.id === itemAnteriorID);
                        const novaAcumulada = parseFloat(dadosCabiveisPorc.data) + parseFloat(acumuladaAnterior.data);
                        acumulada.push({ id: item.id, data: parseFloat(novaAcumulada.toFixed(2)) });
                    }

                    const ultimoAcumulado = acumulada[acumulada.length - 1].data;

                    if (ultimoAcumulado <= 50)
                        classificacao[item.id] = 'A';
                    else if (ultimoAcumulado <= 80)
                        classificacao[item.id] = 'B';
                    else
                        classificacao[item.id] = 'C';
                }
            });
            return [acumulada, classificacao];
        }
        return [[], {}];
    };

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

    const pegaDadosComunsEmAbc = (item) => {
        if (Array.isArray(dadosCurvaABC) && Array.isArray(porcentagens) && Array.isArray(porcentagensA)) {
            const infoComumEmABC = dadosCurvaABC.find(obj => obj.id === item.id);
            const infoComumEmPorc = porcentagens.find(obj => obj.id === item.id);
            const infoComumEmPorcA = porcentagensA.find(obj => obj.id === item.id);

            if (infoComumEmABC && infoComumEmABC.data && infoComumEmPorc && infoComumEmPorc.data && infoComumEmPorcA && infoComumEmPorcA.data) {
                const estiloClassificacao = {
                    backgroundColor: pegaCorClassificacao(classificacao[item.id])
                };

                return (
                    <tr key={item.id}>
                        <td>{item.subCatId} - {item.subCatNome}</td> {/* Display subcategory ID */}
                        <td>{item.id}</td>
                        <td>{item.data.Nome}</td>
                        <td>{infoComumEmABC.data.QtdeConsumo}</td>
                        <td>R$: {parseFloat(item.data.Custo_Unitario).toFixed(2)}</td>
                        <td>{(infoComumEmPorc.data).toFixed(2)}%</td>
                        <td>{parseFloat(infoComumEmPorcA.data).toFixed(2)}%</td>
                        <td style={estiloClassificacao}>{classificacao[item.id]}</td>
                    </tr>
                );
            }
        } else {
            console.error("dadosCurvaABC or porcentagens or porcentagensA is not an array:", dadosCurvaABC, porcentagens, porcentagensA);
        }
        return null;
    };

    dadosEstoque.sort((a, b) => {
        if (Array.isArray(dadosCurvaABC)) {
            const qtdeConsumoA = dadosCurvaABC.find(obj => obj.id === a.id || 0);
            const qtdeConsumoB = dadosCurvaABC.find(obj => obj.id === b.id || 0);
            return qtdeConsumoB.data.QtdeConsumo - qtdeConsumoA.data.QtdeConsumo;
        }
    });

    const preparaDadosParaGrafico = (porcentagensA, items) => {
        const dadosPreparados = items.map((item) => {
            if (Array.isArray(porcentagens) && Array.isArray(porcentagensA)) {
                const infoComumEmPorcA = porcentagensA.find(obj => obj.id === item.id);
                const infoComumEmPorc = porcentagens.find(obj => obj.id === item.id);
                return {
                    name: item.data.Nome,
                    acumulado: infoComumEmPorcA ? infoComumEmPorcA.data : 0,
                    acumuladoBarra: infoComumEmPorcA ? infoComumEmPorcA.data : 0,
                    id: item.id,
                    qtdeConsumo: item.data.QtdeConsumo,
                    porcentagemSimples: infoComumEmPorc ? infoComumEmPorc.data : 0
                };
            }
        });
        return dadosPreparados;
    };

    const mudaCorClassGrafico = (texto) => {
        const corzinha = pegaCorClassificacaoVibrante(texto)
        return <span style={{ color: corzinha, fontWeight: 'bold' }}>{texto}</span>;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Produto: ${label}`}</p>
                    <p className="intro">{`Id: ${item.id}`}</p>
                    <p className="intro">
                        {`Classificação: `}
                        {mudaCorClassGrafico(classificacao[item.id])}
                    </p>
                    <p className="intro" style={{ color: '#1e58ff' }}>{`Acumulado: ${item.acumulado}%`}</p>
                </div>
            );
        }
        return null;
    };

    const pegaProdutosComCat = async (obj) => {
        setProdutosCats(obj);
        setCategoriaSelecionada(obj); // Set the selected category
        filtraProdutosPorCategoria();
    }

    const filtraProdutosPorCategoria = () => {
        if (categoriaSelecionada && produtosCats?.length > 0) {
            const produtoIds = categoriaSelecionada.flatMap(cat => cat.produtos.map(prod => prod.id));
            const filtered = dadosEstoque.filter(item => produtoIds.includes(item.id)).map(item => {
                const categoria = categoriaSelecionada.find(cat => cat.produtos.some(prod => prod.id === item.id));
                return {
                    ...item,
                    subCatId: categoria.id,
                    subCatNome: categoria.subCatNome
                };
            });
            setFilteredItems(filtered); // Update state with filtered items
            return filtered;
        }
        return [];
    }

    return (
        <div className="CurvaABC">
            <div className="CabecalhoHome">
                <CabecalhoHome />
            </div>
            <div className="btn">
                <button className="Voltar" onClick={() => { navigate("/PagEscolhaCurvaABC") }}>
                    Voltar
                </button>
            </div>
            <div className="BuscarCategoriaCurvaABC">
                <h3>Selecione a Categoria</h3>
                <BuscarCategoria funcaoReturn={pegaProdutosComCat} />
            </div>
            <div id="ParteSuperior">
                <div className="CurvaABCGrafico">
                    {carregando ? (
                        <div></div>
                    ) : (
                        Object.keys(porcentagensA).length > 0 && (
                            <ResponsiveContainer>
                                <ComposedChart
                                    data={preparaDadosParaGrafico(porcentagensA, filteredItems)}
                                    margin={{
                                        top: 40,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fontSize: 15 }}
                                        tickFormatter={(value) => value}
                                    />
                                    <YAxis dataKey="acumulado" domain={[0, 120]} tickCount={7} />
                                    <Tooltip content={<CustomTooltip />}
                                        labelFormatter={(label, payload) => {
                                            const item = payload[0]?.payload || {};
                                            return (
                                                <>
                                                    {`Produto: ${label}`}
                                                    <br />
                                                    {`Id: ${item.id}`}
                                                    <br />
                                                    {`Classificação: ${classificacao[item.id]}`}
                                                </>
                                            );
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="acumuladoBarra"
                                        barSize={20}
                                        fill='#103CA9'
                                    />
                                    <Line type="monotone" dataKey="acumulado" stroke="#FF4D00" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )
                    )}
                </div>
            </div>
            <br /><br /><br /><br />
            <div className="Tabela">
                <table border="1">
                    <thead>
                        <tr>
                            <th>SubCat</th>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Qtd Con.</th>
                            <th>Custo Unitário</th>
                            <th>%</th>
                            <th>% Acumulada</th>
                            <th>Classificação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carregando ? (
                            <tr>
                                <td colSpan="9">Carregando...</td>
                            </tr>
                        ) : (
                            filteredItems.map(pegaDadosComunsEmAbc)
                        )}
                    </tbody>
                </table>
            </div>
            <center><div>Total Qtde Consumo: {somaQtdConsumo}</div></center>
        </div>
    );
}

export default CurvaABC;
