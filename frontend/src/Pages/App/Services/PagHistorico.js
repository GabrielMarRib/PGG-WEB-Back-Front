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

  useEffect(() => { // useEffect para pegar informações da LISTA de categorias...
    const pegaHistorico = async () => { // função existe para separar async do useEffect...
      try {
        const response = await axios.post(   // acessa via post (SEMPRE SERÁ POST)
          "http://pggzettav3.mooo.com/api/index.php",
          {
            funcao: "consultarHistorico", // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
            senha: "@7h$Pz!q2X^vR1&K", // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
          }
        );
        setHistorico(response.data); // coloca a LISTA de categorias em uma useState
        console.log(response.data); // log para sabermos o que foi pego.
        criaCampos(response.data);
      } catch (error) {
        console.log("deu ruim: " + error); // log para sabermos qual foi o erro
      }
    };
    pegaHistorico(); //chama a função
  }, []);

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
    lote: ["vlr_compra", "vlr_venda", "qtde"],
    teste: ["teste1", "teste2","teste3"]
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
          <option value="teste">teste</option>

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
              <td>{registro.tabela}</td>
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
                      <td>
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
              <td>{registro.nome_autor}</td>
              <td>{registro.data}</td>
              <td>{registro.justificativa}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default PagHistorico;
