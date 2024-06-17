import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import CabecalhoHome from "../../../Components/CabecalhoHome";
import '../../../Styles/App/Service/PagCurvaABC.css';
import axios from 'axios';
import { PegaDadosGeralDB, PegadadosVALOR } from '../../../Functions/Functions';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from "../../../Functions/RedirectAcesso";
import BuscarCategoria from '../../../Components/BuscaCategoria';

function PagCurvaABCPorValor() {
  const [dadosEstoqueGeral, setDadosEstoqueGeral] = useState([]);
  const [dadosCurvaABC, setDadosCurvaABC] = useState({});
  const [valorTotalConsumo, setValorTotalConsumo] = useState(0);
  const [porcentagens, setPorcentagens] = useState({});
  const [porcentagensA, setPorcentagensA] = useState({});
  const [classificacao, setClassificacao] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const navigate = useNavigate();

  RedirectAcesso(User, 1);
  Redirect(User);

  useEffect(() => {
    PegaDadosGeralDB((data) => {
      setDadosEstoqueGeral(data);
      setCarregando(false);
    });
    PegadadosVALOR(setDadosCurvaABC);
  }, []);

  useEffect(() => {
    if (filteredItems.length > 0) {
      const valorTotalConsumo = calcularValorTotalConsumo(filteredItems);
      setValorTotalConsumo(valorTotalConsumo);

      const porcentagens = calcularPorcentagemSimples(filteredItems, valorTotalConsumo);
      const [porcentagensA, classificacao] = calcularPorcentagemAcumulada(filteredItems, porcentagens);

      setPorcentagens(porcentagens);
      setPorcentagensA(porcentagensA);
      setClassificacao(classificacao);
    }
  }, [filteredItems]);

  const calcularValorTotalConsumo = (items) => {
    let totalConsumo = 0;

    items.forEach(item => {
      if (Array.isArray(dadosCurvaABC)) {
        const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id) || {};
        const qtdConsumo = dadosCabiveisAbc.data.QtdeConsumo || 0;
        const custoUnitario = parseFloat(item.data.Custo_Unitario) || 0;
        totalConsumo += (qtdConsumo * custoUnitario);
      }
    });

    return totalConsumo;
  };

  const calcularPorcentagemSimples = (items, valorTotalConsumo) => {
    const porcentagens = {};

    items.forEach(item => {
      if (Array.isArray(dadosCurvaABC)) {
        const dadosCabiveisAbc = dadosCurvaABC.find(obj => obj.id === item.id);
        const qtdConsumo = dadosCabiveisAbc.data.QtdeConsumo || 0;
        const custoUnitario = parseFloat(item.data.Custo_Unitario) || 0;
        const valorConsumo = qtdConsumo * custoUnitario;
        porcentagens[item.id] = ((valorConsumo / valorTotalConsumo) * 100).toFixed(2);
      }
    });

    return porcentagens;
  };

  const calcularPorcentagemAcumulada = (items, porcentagens) => {
    const acumulada = {};
    const classificacao = {};

    items.forEach((item, i) => {
      if (i === 0) {
        acumulada[item.id] = parseFloat(porcentagens[item.id]);
      } else {
        const itemAnteriorID = items[i - 1].id;
        acumulada[item.id] = parseFloat((parseFloat(porcentagens[item.id]) + parseFloat(acumulada[itemAnteriorID])).toFixed(2));
      }

      if (acumulada[item.id] <= 50)
        classificacao[item.id] = 'A';
      else if (acumulada[item.id] <= 80)
        classificacao[item.id] = 'B';
      else
        classificacao[item.id] = 'C';
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
          <td>{item.subCatId}</td> {/* Display subcategory ID */}
          <td>{item.subCatNome}</td> {/* Display subcategory name */}
          <td>{item.id}</td>
          <td>{item.data.Nome}</td>
          <td>{infoComumEmABC.data.QtdeConsumo}</td>
          <td>R$: {parseFloat(item.data.Custo_Unitario).toFixed(2)}</td>
          <td>R$: {custoTotal.toFixed(2)}</td>
          <td>{porcentagens[item.id]}%</td>
          <td>{parseFloat(porcentagensA[item.id]).toFixed(2)}%</td>
          <td style={estiloClassificacao}>{classificacao[item.id]}</td>
        </tr>
      );
    }
  };

  if (Array.isArray(dadosCurvaABC)) {
    dadosEstoqueGeral.sort((a, b) => {
      const A = dadosCurvaABC.find(obj => obj.id === a.id) || {};
      const B = dadosCurvaABC.find(obj => obj.id === b.id) || {};
      const valorConsumoA = (A?.data.QtdeConsumo || 0) * parseFloat(a.data.Custo_Unitario || 0);
      const valorConsumoB = (B?.data.QtdeConsumo || 0) * parseFloat(b.data.Custo_Unitario || 0);
      return valorConsumoB - valorConsumoA;
    });
  }

  const preparaDadosParaGrafico = (porcentagensA, items) => {
    const dadosPreparados = items.map((item) => {
      return {
        name: item.data.Nome,
        id: item.id,
        acumulado: parseFloat(porcentagensA[item.id]) || 0,
        acumuladoBarra: parseFloat(porcentagensA[item.id]) || 0
      };
    });
    return dadosPreparados;
  };

  const mudaCorClassGrafico = (classificacao) => {
    const corzinha = pegaCorClassificacaoVibrante(classificacao);

    function Vibrante(texto) {
      return <span style={{ color: corzinha, fontWeight: 'bold' }}>{texto}</span>;
    }

    return Vibrante(classificacao);
  };

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

  const pegaProdutosComCat = async (obj) => {      
    if (obj === "Vazio"){
      setCategoriaSelecionada(null)
      return
    }
    setCategoriaSelecionada(obj);
    filtraProdutosPorCategoria(obj);
  };

  const filtraProdutosPorCategoria = (categoriaSelecionada) => {
    if (categoriaSelecionada && categoriaSelecionada.length > 0) {
      const produtoIds = categoriaSelecionada.flatMap(cat => cat.produtos.map(prod => prod.id));
      const filtered = dadosEstoqueGeral.filter(item => produtoIds.includes(item.id)).map(item => {
        const categoria = categoriaSelecionada.find(cat => cat.produtos.some(prod => prod.id === item.id));
        return {
          ...item,
          subCatId: categoria.id,
          subCatNome: categoria.subCatNome
        };
      });
      setFilteredItems(filtered);
      return filtered;
    }else {
      setFilteredItems([]); // Ensure filtered items array is cleared if no category is selected
      setValorTotalConsumo(0)
      return [];
  }
  };

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
          {Object.keys(porcentagensA).length > 0 && (
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
                        {`Produto: ${item.id}`}
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
              <th>SubCat ID</th>
              <th>SubCat Nome</th>
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
            {carregando ? (
              <tr>
                <td colSpan="10">Carregando...</td>
              </tr>
            ) : (
              filteredItems.map(pegaDadosComunsEmAbc)
            )}
          </tbody>
        </table>
      </div>
      <center><div>Valor Total Consumo: R$ {valorTotalConsumo.toFixed(2)}</div></center>
    </div>
  );
}

export default PagCurvaABCPorValor;
