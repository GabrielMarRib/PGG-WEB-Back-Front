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
  const [camposVariaveis, setCamposVariaveis] = useState([])

  useEffect(() => { // useEffect para pegar informações da LISTA de categorias...
    const pegaHistorico = async () => { // função existe para separar async do useEffect...
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
          funcao: 'consultarHistorico', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
          senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
        });
        setHistorico(response.data); // coloca a LISTA de categorias em uma useState
        console.log(response.data) // log para sabermos o que foi pego.
        criaCampos(response.data)
      } catch (error) {
        console.log("deu ruim: " + error) // log para sabermos qual foi o erro
      }
    };
    pegaHistorico(); //chama a função
  }, [])

  const criaCampos = (dados) => {

    const dadosUnicos = [];
    for (let dado of dados) {
      if (!dadosUnicos.includes(dado.campos)) {
        if (dado.campos.indexOf(',') > 0) {
          const subArray = dado.campos.split(',')
          subArray.forEach((valor) => {
            let valTrim = valor.trim();
            if (!dadosUnicos.includes(valTrim)) {
              dadosUnicos.push(valTrim)
            }
          })
        }
        dadosUnicos.push(dado.campos)
      }
    };
    dadosUnicos.forEach((dado) => {
      if (dado.indexOf(',') > 0) {
        const index = dadosUnicos.indexOf(dado)
        dadosUnicos.splice(index, 1);
      }
    })
    console.log(dadosUnicos)
    setCamposVariaveis(dadosUnicos)
  }
  let i = 0;

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

      <div className="historicoVendas">
        <table className="historicoTable">
          <thead>
            <tr>
              <th>Departamento</th>
              {camposVariaveis.map((campo) => (
                <th>{campo}</th>
              ))}
              <th>AUTOR</th>
              <th>DATA</th>
              <th>JUSTIFICATIVA</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((registro) => (
              <tr key={registro.id}>

                <td>{registro.tabela}</td>
                {camposVariaveis.map((campo) => (
                  registro.campos.includes(campo) ? (
                    (()=>{
                       
                      let registrosAntigos = '';
                      let registrosNovos = '';
                      let registrosRaw = '';
                      let multiplo = false;

                      if(registro.valores_antigos?.indexOf(',') > 0){
                        registrosRaw = registro.valores_antigos.split(',')
                        multiplo = true;
                        registrosAntigos = registrosRaw[i]
                      }else{
                        registrosAntigos = registro.valores_antigos;
                      }

                      if(registro.valores_novos?.indexOf(',') > 0){ //repetindo a mesma coisa pq isso NÃO DÁ pra deixar estável em um método por alguma CARALHA de motivo
                        registrosRaw = registro.valores_novos.split(',')
                        registrosNovos = registrosRaw[i]
                      }else{
                        registrosNovos = registro.valores_novos;
                      }

                      i++;
                      if (i > registrosRaw.length-1)
                        i = 0;
                      return (       
                         <td>
                          <table className="inner-table">
                                <tbody>
                                  <tr>
                                    {multiplo ? i-1 === 0 ? <td><span className="tag-antigos">ANTIGOS</span></td> : null : i === 0 ? <td><span className="tag-antigos">ANTIGOS</span></td> : null}
                                    <td className="TDantigo">{registrosAntigos ? "ﾠ" + registrosAntigos : "ﾠNão possui"} </td>
                                  </tr>
                                  <tr>
                                    {multiplo ? i-1 === 0 ? <td><span className="tag-novos">NOVOS</span></td> : null : i === 0 ? <td><span className="tag-novos">NOVOS</span></td> : null}
                                    <td className="TDnovo">{"ﾠ"+registrosNovos}</td>
                                  </tr>
                                </tbody>
                              </table>
                         </td>  
                      )
                    })()  
                  ) : (
                    <td></td>
                  )               
                ))}
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