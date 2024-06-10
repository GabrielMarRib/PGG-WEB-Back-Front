import React from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagFuncionarios.css';
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from "../../../Functions/RedirectAcesso";
import { useNavigate } from "react-router-dom";

function PagFuncionarios() {

    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate()
    RedirectAcesso(User,2);
    Redirect(User);

    const funcionarios = [
        { id: 1, nome: "Funcionario 1", cargo: "Desenvolvedor" },
        { id: 2, nome: "Funcionario 2", cargo: "Designer" },
        { id: 3, nome: "Funcionario 3", cargo: "Gerente de Projetos" },
    ];

    return (
        <div className="PagFuncionarios">
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
