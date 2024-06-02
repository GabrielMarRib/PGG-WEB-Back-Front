import React from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagRelatorios.css';

function PagFuncionarios() {
    const funcionarios = [
        { id: 1, nome: "verme", cargo: "Desenvolvedor" },
        { id: 2, nome: "verme2", cargo: "Designer" },
        { id: 3, nome: "verme3", cargo: "Gerente de Projetos" },
    ];
    return (
        <div className="PagRelatorios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <div className="Conteudo">
                <div className="BarraLateral">
                    <input
                        type="text"
                        placeholder="Pesquisar funcionários"
                    />
                    {funcionarios.map((funcionario) => (
                        <div key={funcionario.id} className="ItemFuncionario">
                            {funcionario.nome}
                        </div>
                    ))}
                </div>
                <div className="ConteudoPrincipal">
                    <div className="EspacoReservado">
                        Selecione um funcionário para ver as informações
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagFuncionarios;
