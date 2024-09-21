import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagHistorico.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import Titulo from "../../../Components/Titulo";
import axios from "axios";

function PagHistorico() {
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);
  const [camposVariaveis, setCamposVariaveis] = useState([]);
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState(""); // Porra do filtro de departamento
  const [adicionaisCurva, setAdicionaisCurva] = useState([]);
  const [adicionaisLote, setAdicionaisLote] = useState([]);
  useEffect(() => {
    const pegaHistorico = async () => { // função existe para separar async do useEffect...
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "consultarHistorico",
            senha: "@7h$Pz!q2X^vR1&K",
          }
        );
        setHistorico(response.data);
        console.log(response.data);
        criaCampos(response.data);
      } catch (error) {
        console.log("deu ruim: " + error); // log para sabermos qual foi o erro
      }
    };
    pegaHistorico(); //chama a função
  }, []);

  useEffect(() => {
    const pegaAdicionais = async () => {
      try {
        const response = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "PegaTodosDadosCurvaABC",
            senha: "@7h$Pz!q2X^vR1&K",
          }
        );
        setAdicionaisCurva(response.data);
        const responseLote = await axios.post(
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "PegarLotes",
            senha: "@7h$Pz!q2X^vR1&K",
          }
        );
        setAdicionaisLote(responseLote.data)
        console.log(responseLote.data)
      } catch (error) {
        console.log("deu ruim: " + error); // log para sabermos qual foi o erro
      }
    };
    pegaAdicionais();
  }, [])

  const criaCampos = (dados) => {
    const dadosUnicos = [];
    for (let dado of dados) {
      if (!dadosUnicos.includes(dado.campos)) {
        if (dado.campos.indexOf(",") > 0) {
          const subArray = dado.campos.split(",");
          subArray.forEach((valor) => {
            let valTrim = valor.trim();
            if (!dadosUnicos.includes(valTrim)) {
              dadosUnicos.push(valTrim);
            }
          });
        }
        dadosUnicos.push(dado.campos);
      }
    }
    dadosUnicos.forEach((dado) => {
      if (dado.indexOf(",") > 0) {
        const index = dadosUnicos.indexOf(dado);
        dadosUnicos.splice(index, 1);
      }
    });
    console.log(dadosUnicos);
    setCamposVariaveis(dadosUnicos);
  };

  // Função Para filtrar departamento selecionado
  const historicoFiltrado = departamentoSelecionado
    ? historico.filter( // Se não for vazio
      (registro) =>
        registro.tabela.toLowerCase() === departamentoSelecionado.toLowerCase()
    )
    : historico; // Se essa porra estiver vazio, retorna todo a arry do historico

  let i = 0; // Inicia essa porra 


  // Campos pertencentes a cada departamento
  const camposDepartamento = {
    curvaabc: ["quantidadeConsumo"],
    lote: ["vlr_compra", "vlr_venda", "qtde"]
  };


  const obterCamposDepartamento = () => {
    // retorna os campos do departamento que foi selecionado ou os campos variaveis se nenhum departamento estiver selecionado
    if (departamentoSelecionado && camposDepartamento[departamentoSelecionado]) {
      return camposDepartamento[departamentoSelecionado];
    }
    return camposVariaveis;
  };

  return (
    <div className="PagHistorico">
      <div className="Cabecalho">
        <CabecalhoHome />
      </div>
      <AlertaNotificação />
      <Titulo tituloMsg="Histórico" />
      <div className="btn">
        <button className="Voltar" onClick={() => navigate("/PagHome")}>
          Voltar
        </button>
      </div>

      <div className="filtroDepartamento">
        <label htmlFor="departamento">Filtrar por Departamento:</label>
        <select
          id="departamento"
          value={departamentoSelecionado}
          onChange={(e) => setDepartamentoSelecionado(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="curvaabc">Curva ABC</option>
          <option value="lote">Lote</option>

        </select>
      </div>

      <div className="historicoVendas">
        <table className="historicoTable">
          <thead>
            <tr>
              <th>Departamento</th>
              {obterCamposDepartamento().map((campo) => (
                <th key={campo}>{campo}</th>
              ))}
              <th>AUTOR</th>
              <th>DATA</th>
              <th>JUSTIFICATIVA</th>
            </tr>
          </thead>
          <tbody>
            {historicoFiltrado.map((registro) => (
              <tr key={registro.id}>
                <td>
                  <div className="paiTabela">
                    {registro.tabela}
                  </div>
                  <br />
                  {(() => {
                    if (registro?.tabela === 'curvaabc') {
                      const achados = adicionaisCurva.find((adicional) => adicional.id_curvaabc === registro.id_tabela)
                      return (
                        <div className="infoAdicional">
                          Produto: <span style={{fontWeight: '700'}}>{achados?.prodNome}</span><br />
                          Id: <span style={{fontWeight: '700'}}>{achados?.id_produtos}</span><br />
                          Categoria: <span style={{fontWeight: '700'}}>{achados?.id_categorias} - {achados?.catNome}</span>
                        </div>
                      )
                    } else if (registro?.tabela === 'lote'){
                      const achados = adicionaisLote.find((adicional) => adicional.numerolote === registro.id_tabela)
                      return (
                        <div className="infoAdicional">
                          Id lote: <span style={{fontWeight: '700'}}>{achados?.numerolote}</span><br />
                          Produto: <span style={{fontWeight: '700'}}>{achados?.nome}</span><br />
                          Fornecedor: <span style={{fontWeight: '700'}}>{achados?.fornecedor ? achados?.fornecedor : "Não cadastrado"}</span><br />
                          Nota Fiscal: <span style={{fontWeight: '700'}}>{achados?.nota_fiscal ? achados?.nota_fiscal : "Não cadastrado"}</span><br />
                        </div>
                      )
                    }
                  })()}
                </td>
                {obterCamposDepartamento().map((campo) =>
                  registro.campos.includes(campo) ? (
                    (() => {
                      let registrosAntigos = "";
                      let registrosNovos = "";
                      let registrosRaw = "";
                      let multiplo = false;

                      if (registro.valores_antigos?.indexOf(",") > 0) {
                        registrosRaw = registro.valores_antigos.split(",");
                        multiplo = true;
                        registrosAntigos = registrosRaw[i];
                      } else {
                        registrosAntigos = registro.valores_antigos;
                      }

                      if (registro.valores_novos?.indexOf(",") > 0) { //repetindo a mesma coisa pq isso NÃO DÁ pra deixar estável em um método por alguma CARALHA de motivo
                        registrosRaw = registro.valores_novos.split(",");
                        registrosNovos = registrosRaw[i];
                      } else {
                        registrosNovos = registro.valores_novos;
                      }

                      i++;
                      if (i > registrosRaw.length - 1) i = 0;
                      return (
                        <td className="tdInfernal">
                          <table className="inner-table">
                            <tbody>
                              <tr>
                                {multiplo
                                  ? i - 1 === 0 ? (
                                    <td><span className="tag-antigos">ANTIGOS</span></td>
                                  ) : null

                                  : i === 0 ? (
                                    <td><span className="tag-antigos">ANTIGOS</span></td>
                                  ) : null}
                                <td className="TDantigo">
                                  {registrosAntigos ? "ﾠ" + registrosAntigos : "ﾠNão possui"}
                                </td>
                              </tr>
                              <tr>
                                {multiplo
                                  ? i - 1 === 0 ? (
                                    <td><span className="tag-novos">NOVOS</span></td>
                                  ) : null
                                  : i === 0 ? (
                                    <td><span className="tag-novos">NOVOS</span></td>
                                  ) : null}
                                <td className="TDnovo">{"ﾠ" + registrosNovos}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      );
                    })()
                  ) : (
                    <td key={campo}></td>
                  )
                )}
                <td className="Autor">{registro.nome_autor}</td>
                <td className="Data">{registro.data}</td>
                <td className="justificativa">{registro.justificativa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PagHistorico;
