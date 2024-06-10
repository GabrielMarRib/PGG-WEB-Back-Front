import React, { useState } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagRelatorios.css';
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from '../../../Functions/RedirectAcesso';
import { useNavigate } from "react-router-dom";

function PagRelatorios() {
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate()
    RedirectAcesso(User,2);
    Redirect(User);

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
            <div className="btn">
                <button className="Voltar" onClick={() => { navigate("/PagPerfil") }}>
                    Voltar
                </button>
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
