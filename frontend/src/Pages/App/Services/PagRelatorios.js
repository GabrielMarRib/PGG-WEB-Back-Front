import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagRelatorios.css';

function PagRelatorios() {
    const navigate = useNavigate();
    const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);

    const relatorios = ["Relatório 1", "Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2","Relatório 2"];

    const handleRelatorioClick = (relatorio) => {
        setRelatorioSelecionado(relatorio);
    };

    return (
        <div className="PagRelatorios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <div className="Conteudo">
                <div className="BarraLateral">
                    {relatorios.map((relatorio, index) => (
                        <div key={index} className="ItemRelatorio" onClick={() => handleRelatorioClick(relatorio)}>
                            {relatorio}
                        </div>
                    ))}
                </div>
                <div className="ConteudoPrincipal">
                    {relatorioSelecionado ? (
                        <div className="InfoRelatorio">
                            Informação sobre {relatorioSelecionado}
                        </div>
                    ) : (
                        <div className="EspacoReservado">
                            Selecione um relatório para ver as informações
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PagRelatorios;
