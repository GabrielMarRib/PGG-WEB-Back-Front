import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagHistorico.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import Titulo from "../../../Components/Titulo";

function PagHistorico() {
  const navigate = useNavigate();

  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      // Colocar a porrra da API
      const response = [
        {
          tabela: "vendas",
          id_tabela: 69,
          campos: "preço, quantidade",
          valores_antigos: "100, 2",
          valores_novos: "120, 3",
          autor: "Bluer",
          data: "2024-09-19",
          justificativa: "Ajuste de preço após promoção",
        },
      ];
      setHistorico(response);
    };

    fetchHistorico();
  }, []);

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
              <th>TABELA</th>
              <th>preços</th>
              <th>quantidade</th>
              <th>AUTOR</th>
              <th>DATA</th>
              <th>JUSTIFICATIVA</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item, index) => (
              <tr key={index}>
                <td>{item.tabela}</td>
                <td>
                  <table className="inner-table">
                    <tbody>
                      <tr>
                        <td><span className="tag-antigos">ANTIGOS</span></td>
                        <td>{item.valores_antigos.split(",")[0]}</td>
                      </tr>
                      <tr>
                        <td><span className="tag-novos">NOVOS</span></td>
                        <td>{item.valores_novos.split(",")[0]}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="inner-table">
                    <tbody>
                      <tr>
                        <td>{item.valores_antigos.split(",")[1]}</td>
                      </tr>
                      <tr>
                        <td>{item.valores_novos.split(",")[1]}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>{item.autor}</td>
                <td>{item.data}</td>
                <td>{item.justificativa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PagHistorico;
