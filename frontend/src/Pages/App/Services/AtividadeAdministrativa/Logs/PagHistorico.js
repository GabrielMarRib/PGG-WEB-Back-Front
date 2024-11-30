import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagHistorico.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import axios from "axios";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import NavBar from "../../../../../Components/NavBar/NavBar.js";
import { pegaPermissoesTotais } from "../../../../../Config/Permissoes.js";

function PagHistorico() {
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);
  const [camposVariaveis, setCamposVariaveis] = useState([]);
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState("Curva ABC"); // Porra do filtro de departamento
  const [adicionaisCurva, setAdicionaisCurva] = useState([]);
  const [adicionaisLote, setAdicionaisLote] = useState([]);
  const [tabelasUnicas, setTabelasUnicas] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda
  const [adicionaisPermissoes, setAdicionaisPermissoes] = useState([]);
  useEffect(() => {
    const pegaHistorico = async () => { // função existe para separar async do useEffect...
      try {

        const response = await axios.post(
          "http://discordia.com.br/",
          {
            funcao: "consultarHistorico",
            senha: "@7h$Pz!q2X^vR1&K",
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
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
          "http://discordia.com.br/",
          {
            funcao: "PegaTodosDadosCurvaABC",
            senha: "@7h$Pz!q2X^vR1&K",
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
          }
        );
        setAdicionaisCurva(response.data);
        const responseLote = await axios.post(
          "http://discordia.com.br/",
          {
            funcao: "PegarLotes",
            senha: "@7h$Pz!q2X^vR1&K",
          },
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
              "Accept": "application/json, text/plain, */*",
              "Connection": "keep-alive",
            },
          }
        );
        setAdicionaisLote(responseLote.data)

        const responsePermissoes = await pegaPermissoesTotais();
        console.log(responsePermissoes)
        setAdicionaisPermissoes(responsePermissoes)
      } catch (error) {
        console.log("deu ruim: " + error); // log para sabermos qual foi o erro
      }
    };
    pegaAdicionais();
  }, [])

  const criaCampos = (dados) => {
    const dadosUnicos = [];

    for (let dado of dados) {
      const camposExistentes = dadosUnicos.map((item) => item.campo);

      if (!camposExistentes.includes(dado.campos)) {
        if (dado.campos.indexOf(",") > 0) {
          const subArray = dado.campos.split(",");
          subArray.forEach((valor) => {
            let valTrim = valor.trim();
            if (!camposExistentes.includes(valTrim)) {
              dadosUnicos.push({ campo: valTrim, tabela: dado.tabela });
            }
          });
        } else {
          dadosUnicos.push({ campo: dado.campos, tabela: dado.tabela });
        }
      }
    }

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
  const camposDepartamento = camposVariaveis.reduce((acc, reg) => {
    if (!acc[reg.tabela]) { // se já não tiver um registro reduzido,
      acc[reg.tabela] = []; // nn tendi, mas blz
    }
    acc[reg.tabela].push(reg.campo); // da certo, fé em Deus
    return acc;
  }, {});



  const obterCamposDepartamento = () => {
    // retorna os campos do departamento que foi selecionado ou os campos variaveis se nenhum departamento estiver selecionado
    if (departamentoSelecionado && camposDepartamento[departamentoSelecionado]) {
      return camposDepartamento[departamentoSelecionado];
    }
    return camposVariaveis;
  };

  const beautifyValor = (valor) => {
    if (typeof valor === 'string') {
      if (valor.toLowerCase() === 'true') return '✔️ ';
      if (valor.toLowerCase() === 'false') return '❌ ';
    }
    return valor;
  };

  return (
    <div className="PagHistorico">
      <NavBar />
      <AlertaNotificação />
      <div className="marginNavbar">
        <Titulo tituloMsg="Logs" />

        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" style={{color: 'white'}} onClick={() => { setShowPopup(true) }}> {/*crie um botão que no onClick faz o setShowPopup ficar true */}
            Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => { setShowPopup(false) }} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"LOGS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div>

        <div className="filtroDepartamento">
          <label htmlFor="departamento">Filtrar por tipo de visão:</label>
          <select
            id="departamento"
            value={departamentoSelecionado}
            onChange={(e) => setDepartamentoSelecionado(e.target.value)}
          >
            {Object.keys(camposDepartamento).map((tabela) => (
              <option key={tabela} value={tabela}>
                {tabela}
              </option>
            ))}
          </select>
        </div>

        <div className="historicoVendas">
          <table className="historicoTable">
            <thead>
              <tr>
                <th>TIPO DE VISÃO</th>
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
                      if (registro?.tabela === 'Curva ABC') {
                        const achados = adicionaisCurva.find((adicional) => adicional.id_curvaabc === registro.id_tabela)
                        return (
                          <div className="infoAdicional">
                            Produto: <span style={{ fontWeight: '700' }}>{achados?.prodNome}</span><br />
                            Id: <span style={{ fontWeight: '700' }}>{achados?.id_produtos}</span><br />
                            Categoria: <span style={{ fontWeight: '700' }}>{achados?.id_categorias} - {achados?.catNome}</span>
                          </div>
                        )
                      } else if (registro?.tabela === 'lote') {
                        const achados = adicionaisLote.find((adicional) => adicional.numerolote === registro.id_tabela)
                        return (
                          <div className="infoAdicional">
                            Id lote: <span style={{ fontWeight: '700' }}>{achados?.numerolote}</span><br />
                            Produto: <span style={{ fontWeight: '700' }}>{achados?.nome}</span><br />
                            Fornecedor: <span style={{ fontWeight: '700' }}>{achados?.fornecedor ? achados?.fornecedor : "Não cadastrado"}</span><br />
                            Nota Fiscal: <span style={{ fontWeight: '700' }}>{achados?.nota_fiscal ? achados?.nota_fiscal : "Não cadastrado"}</span><br />
                          </div>
                        )
                      } else if (registro?.tabela === 'Baixa') {
                        const achados = adicionaisLote.find((adicional) => adicional.numerolote === registro.id_tabela)
                        return (
                          <div className="infoAdicional">
                            Id lote: <span style={{ fontWeight: '700' }}>{achados?.numerolote}</span><br />
                            Produto: <span style={{ fontWeight: '700' }}>{achados?.nome}</span><br />
                            Fornecedor: <span style={{ fontWeight: '700' }}>{achados?.fornecedor ? achados?.fornecedor : "Não cadastrado"}</span><br />
                            Nota Fiscal: <span style={{ fontWeight: '700' }}>{achados?.nota_fiscal ? achados?.nota_fiscal : "Não cadastrado"}</span><br />
                          </div>
                        )
                      } else if (registro?.tabela.split(' ')[0] === 'Grupo') {

                        const achados = adicionaisPermissoes.find((adicional) => adicional.id_grupo === registro.id_tabela)
                        return (
                          <div className="infoAdicional">
                            <h3> <span style={{ fontWeight: 'normal' }}>Permissão alterada:</span> <span style={{ fontWeight: '700' }}>{registro?.aux}</span></h3>
                            Id grupo: <span style={{ fontWeight: '700' }}>{achados?.id_grupo}</span><br />
                            Funcionário(s): <span style={{ fontWeight: '700' }}>{achados?.nomes_usuarios ? achados?.nomes_usuarios : "Sem Funcionários"}</span><br />
                            Ids Funcionário(s): <span style={{ fontWeight: '700' }}>{achados?.ids_usuarios ? achados?.ids_usuarios : "Sem Funcionários"}</span><br />
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
                                    {registrosAntigos && registrosAntigos != "null" ? "ﾠ" + beautifyValor(registrosAntigos) : "ﾠNão possui"}
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
                                  <td className="TDnovo">{"ﾠ" + beautifyValor(registrosNovos)}</td>
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
    </div>
  );
}

export default PagHistorico;
