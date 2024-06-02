import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagCurvaABC.css';
import axios from 'axios';
import { PegaDadosGeralDB, PegadadosVALOR } from '../../../Functions/Functions';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PagCurvaABCPorValor() {

  const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
  const [dadosCurvaABC, setDadosCurvaABC] = useState({}); // nao tem conexao com curva abc ainda......
  const [valorTotalConsumo, setValorTotalConsumo] = useState(0);
  const [porcentagens, setPorcentagens] = useState({});
  const [porcentagensA, setPorcentagensA] = useState({});
  const [classificacao, setClassificacao] = useState({});



  useEffect(() =>{ 
    PegaDadosGeralDB(setDadosEstoqueGeral); // arrumei essa merda pra nao mandar 50k de leitura pro bd. USEM USEEFFECT PELO AMOR DE CRISTO
    PegadadosVALOR(setDadosCurvaABC);
  },[])
  

  useEffect(() => {
    if (dadosEstoqueGeral.length > 0) {
      const valorTotalConsumo = calcularValorTotalConsumo(dadosEstoqueGeral);

      setValorTotalConsumo(valorTotalConsumo);

      const porcentagens = calcularPorcentagemSimples(dadosEstoqueGeral, valorTotalConsumo);
      const [porcentagensA, classificacao] = calcularPorcentagemAcumulada(dadosEstoqueGeral, porcentagens);

      setPorcentagens(porcentagens);
      setPorcentagensA(porcentagensA);
      setClassificacao(classificacao);
    }
  }, [dadosEstoqueGeral, dadosCurvaABC]);

  // Função para calcular o valor total do consumo
  const calcularValorTotalConsumo = (dadosEstoqueGeral) => {
    let totalConsumo = 0;
    
    // Percorre os dados do estoque
    
    dadosEstoqueGeral.forEach(item => {
      if (Array.isArray(dadosCurvaABC)) {
        
      
      
      // Obtém os dados relevantes da Curva ABC para o item, ou um objeto vazio caso não houver
      
      const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id) || {};
     

      // Obtém a quantidade de consumo do item ou assume 0 se não houver
      const qtdConsumo = dadosCabiveisAbc.data.QtdeConsumo || 0;
      
      // Obtém o custo unitário do item ou assume 0 se não houver
      const custoUnitario = parseFloat(item.data.Custo_Unitario) || 0;

      // Calcula o valor total de consumo para este item e o adiciona ao "totalConsumo"
      totalConsumo += (qtdConsumo * custoUnitario);
  }});

    return totalConsumo;
  };

  // Função para calcular as porcentagens simples de cada item do estoque
  const calcularPorcentagemSimples = (dadosEstoqueGeral, valorTotalConsumo) => {
    const porcentagens = {};

    // Percorre os dados do estoque
    dadosEstoqueGeral.forEach(item => {
if (Array.isArray(dadosCurvaABC)) {
      // Obtém os dados relevantes da Curva ABC para o item, ou um objeto vazio se não houver
      const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);




      // Obtém a quantidade de consumo do item ou assume 0 se não houver
      const qtdConsumo = dadosCabiveisAbc.data.QtdeConsumo || 0;

      // Obtém o custo unitário do item ou assume 0 se não houver
      const custoUnitario = parseFloat(item.data.Custo_Unitario) || 0;

      // Calcula o valor total de consumo para este item e o adiciona ao "totalConsumo"
      const valorConsumo = qtdConsumo * custoUnitario;

      // Calcula a porcentagem de consumo deste item em relação ao "valor total de consumo"
      porcentagens[item.id] = ((valorConsumo / valorTotalConsumo) * 100).toFixed(2);
  }});

    return porcentagens;
  };

  // Função para calcular as porcentagens acumuladas e classificação de cada item do estoque
  const calcularPorcentagemAcumulada = (dadosEstoqueGeral, porcentagens) => {
    const acumulada = {};
    const classificacao = {};

    // Percorre os dados do estoque
    dadosEstoqueGeral.forEach((item, i) => {
      // Calcula a porcentagem acumulada para este item
      if (i === 0) {
        acumulada[item.id] = parseFloat(porcentagens[item.id]);
      } else {
        const itemAnteriorID = dadosEstoqueGeral[i - 1].id;
        acumulada[item.id] = parseFloat((parseFloat(porcentagens[item.id]) + parseFloat(acumulada[itemAnteriorID])).toFixed(2));
      }

      // Define a classificação (A, B ou C) com base na porcentagem acumulada
      if (acumulada[item.id] <= 50)
        classificacao[item.id] = 'A'
      else if (acumulada[item.id] <= 80)
        classificacao[item.id] = 'B'
      else
        classificacao[item.id] = 'C'
    });
    return [acumulada, classificacao];
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
    if (Array.isArray(dadosCurvaABC)) {
    const infoComumEmABC = dadosCurvaABC.find(obj => obj.id === item.id);
    
    



  
    const estiloClassificacao = {
      backgroundColor: pegaCorClassificacao(classificacao[item.id])
    };

    const valorConsumo = (infoComumEmABC.data.QtdeConsumo || 0) * parseFloat(item.data.Custo_Unitario || 0);
   
    const custoTotal = parseFloat(item.data.Custo_Unitario || 0) * (infoComumEmABC.data.QtdeConsumo || 0);


    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.data.Nome}</td>
        <td>R$: {valorConsumo.toFixed(2 )}</td> {/*QTD de consumo*/}
        <td>R$: {parseFloat(item.data.Custo_Unitario).toFixed(2)}</td>
        <td>R$: {custoTotal.toFixed(2)}</td>
        <td>{porcentagens[item.id]}%</td>
        <td>{parseFloat(porcentagensA[item.id]).toFixed(2)}%</td>
        <td style={estiloClassificacao}>{classificacao[item.id]}</td>
      </tr>
    );
 } };

  dadosEstoqueGeral.sort((a, b) => {
    const valorConsumoA = (dadosCurvaABC[a.id]?.QtdeConsumo || 0) * parseFloat(a.Custo_Unitario || 0);
    const valorConsumoB = (dadosCurvaABC[b.id]?.QtdeConsumo || 0) * parseFloat(b.Custo_Unitario || 0);
    return valorConsumoB - valorConsumoA;
  });

  const preparaDadosParaGrafico = (porcentagensA, dadosEstoqueGeral) => {
    const dadosPreparados = dadosEstoqueGeral.map((item) => {
      return {
        name: item.data.Nome,
        id: item.id,
        acumulado: parseFloat(porcentagensA[item.id]) || 0,
        acumuladoBarra: parseFloat(porcentagensA[item.id]) || 0
      };
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
          <p className="intro" style={{ color: '#1e58ff' }}>{`Acumulado: ${item.acumulado.toFixed(2)}%`}</p>
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
          {Object.keys(porcentagensA).length > 0 && (
            <ResponsiveContainer>
              <ComposedChart
                data={preparaDadosParaGrafico(porcentagensA, dadosEstoqueGeral)}
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
              <th>QTD.Consumo</th>
              <th>Custo Unitário</th>
              <th>Custo Total</th>
              <th>%</th>
              <th>% Acumulada</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {dadosEstoqueGeral.map(pegaDadosComunsEmAbc)}
          </tbody>
        </table>
      </div>
      <center><div>Valor Total Consumo: R$ {valorTotalConsumo.toFixed(2)}</div></center>
    </div>
  );
}

export default PagCurvaABCPorValor;
