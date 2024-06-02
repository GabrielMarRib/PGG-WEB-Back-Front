import React, { useState, useEffect } from "react";
import '../../../Styles/App/Service/PagCurvaABC.css';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Cabecalho from "../../../Components/Cabecalho";
import { PegaDadosGeralDB, PegadadosVALOR } from '../../../Functions/Functions';
import { renderToString } from "react-dom/server";

function CurvaABC() {
    const [dadosEstoque, setDadosEstoque] = useState([]);
    const [dadosCurvaABC, setDadosCurvaABC] = useState({});
    const [somaQtdConsumo, setSomaQtdConsumo] = useState(0);
    const [porcentagens, setPorcentagens] = useState({});
    const [porcentagensA, setPorcentagensA] = useState({});
    const [classificacao, setClassificacao] = useState({});
    const [carregando, setCarregando] = useState(true); // Adiciona um estado de carregamento

    useEffect(() => {
        PegaDadosGeralDB((data) => {
            setDadosEstoque(data);
            setCarregando(false); // Define como falso após os dados serem carregados
        });
        PegadadosVALOR(setDadosCurvaABC); // arrumei essa merda pra nao mandar 50k de leitura pro bd. USEM USEEFFECT PELO AMOR DE CRISTO
    }, [])

    useEffect(() => { // a cada alteração basicamente, faz isso aqui, mermao isso é uma tremenda duma putaria to fazendo isso há 3 horas
        if (dadosEstoque.length > 0) {
            const somaQtdConsumo = calcularSomaQtdeConsumo(dadosEstoque);
            setSomaQtdConsumo(somaQtdConsumo);

            const porcentagens = calcularPorcentagemSimples(dadosEstoque, somaQtdConsumo);
            const [porcentagensA, classificacao] = calcularPorcentagemAcumulada(dadosEstoque, porcentagens); // retorno da função filha da puta de calcular a porcentagem

            setPorcentagens(porcentagens);
            setPorcentagensA(porcentagensA);
            setClassificacao(classificacao);
        }
    }, [dadosEstoque, dadosCurvaABC]); // falta arrumar esse useEffect... calcularPorcentagemSimples calcularPorcentagemAcumulada e calcularSomaQtdeConsumo precisam de callback e tbm serem listadas na dependency array

    const calcularSomaQtdeConsumo = (dadosEstoque) => {
        let totalConsumo = 0;

        dadosEstoque.forEach(item => { // pra cada item no estoque...
            if (Array.isArray(dadosCurvaABC)) {
                const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);
                totalConsumo += (dadosCabiveisAbc.data.QtdeConsumo || 0); // se dadosCabiveisAbc.QtdeConsumo existir, soma com total consumo
            }
        });

        return totalConsumo; //devolve
    };

    const calcularPorcentagemSimples = (dadosEstoque, somaQtdConsumo) => {
        const porcentagens = []; //array/obj pq é pra cada item...

        dadosEstoque.forEach(item => { //pra cada item do estoque
            if (Array.isArray(dadosCurvaABC)) {
                const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);
                const qtdConsumo = dadosCabiveisAbc.data.QtdeConsumo || 0;  // pega qtdConsumo se existir (em teoria sempre existe, mas é pra nao dar exceção caso dê merda)
                porcentagens.push({ id: item.id, data: (qtdConsumo / somaQtdConsumo) * 100 });
            }
        });
        console.log(porcentagens)
        return porcentagens; // devolve
    };

    const calcularPorcentagemAcumulada = (dadosEstoque, porcentagens) => {
        const acumulada = [];      // acumulo de porcentagem
        const classificacao = {};  // classficação da porcentagem

        if (Array.isArray(porcentagens)) {
            dadosEstoque.forEach((item, i) => {
                const dadosCabiveisPorc = porcentagens.find(obj => obj.id === item.id);
                if (dadosCabiveisPorc && dadosCabiveisPorc.data) {
                    if (i === 0) {
                        acumulada.push({ id: item.id, data: parseFloat(dadosCabiveisPorc.data) });
                    } else {
                        const itemAnteriorID = dadosEstoque[i - 1].id;
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
        return [[], {}]; // Return empty arrays if porcentagens is not an array
    };

    const pegaCorClassificacao = (classificacao) => { // Aqui Criei  uma funcão pra retornar a cor de fundo com base na classificação ('A', 'B', 'C')
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

    const pegaCorClassificacaoVibrante = (classificacao) => { // Aqui Criei  uma funcão pra retornar a cor de fundo com base na classificação ('A', 'B', 'C')
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

    const preparaDadosParaGrafico = (porcentagensA, dadosEstoque) => {
        const dadosPreparados = dadosEstoque.map((item) => {
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
                        {mudaCorClassGrafico(classificacao[item.id])}  {/* Applying color to Classificação value */}
                    </p>
                    <p className="intro" style={{ color: '#1e58ff' }}>{`Acumulado: ${item.acumulado}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="CurvaABC">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <div id="ParteSuperior">
                <div className="CurvaABCGrafico">
                    {carregando ? (
                        <div></div>
                    ) : (
                        Object.keys(porcentagensA).length > 0 && (
                            <ResponsiveContainer>
                                
                                <ComposedChart
                                    data={preparaDadosParaGrafico(porcentagensA, dadosEstoque)}
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
                                    <td colSpan="7">Carregando...</td>
                                </tr>
                            ) : (
                                dadosEstoque.map(pegaDadosComunsEmAbc)
                            )}
                        </tbody>
                    </table>
            </div>
            <center><div>Total Qtde Consumo: {somaQtdConsumo}</div></center>
        </div>
    );
}

export default CurvaABC;
