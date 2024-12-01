import React, { useState, useContext } from "react";
import "./PagPerfil.css";
import CabecalhoHome from "../../../../Components/Cabecalho/CabecalhoHome.js";
import ImageProfile from '../../../../Assets/userProfile/TESTEUSER.png';
import ImageEmail from '../../../../Assets/userProfile/EMAIL.png';
import NivelAcesso from '../../../../Assets/userProfile/CHAVE.png';
import Telefone from '../../../../Assets/userProfile/TELEFONE.png';
import Cpf from '../../../../Assets/userProfile/CPF.png';
import excel from '../../../../Assets/excel.png';
import pessoas from '../../../../Assets/pessoas.png';
import grupos from '../../../../Assets/grupos.png';
import AddPerfil from '../../../../Assets/add-userWhite.png';
import IconListaFunc from '../../../../Assets/ListaFunc.png';
import { UserContext } from '../../../../Context/UserContext.js';
import { useNavigate } from "react-router-dom";
import Titulo from "../../../../Components/Titulo/Titulo.jsx";
import { PermissoesContext } from "../../../../Context/PermissoesContext.js";
import NavBar from "../../../../Components/NavBar/NavBar.js";
import PrivateComponent from "../../../../Config/PrivateComponent.jsx";
import PrivateButtonSolo from "../../../../Config/PrivateButtonSolo.jsx";

function PagPerfil() {
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const PermissoesOBJ = useContext(PermissoesContext)
    const PermissoesNome = PermissoesOBJ.Permissoes.nome
    console.log(PermissoesOBJ)
    const navigate = useNavigate();

    return (
        <div className="PagPerfil">
            <NavBar />
            <Titulo
                tituloMsg='Gerenciamento de Informações'
            />
            <div className="marginNavbar">
                {User &&
                    <div className="Corpo">
                        <div className="dados-usuario">
                            <h1>Suas informações</h1>
                            <h2> <img src={ImageProfile} alt="User" /> Nome: {User.userData.Nome} </h2>
                            <h2> <img src={ImageEmail} alt="Email" /> Email: {User.userData.Email}</h2>
                            <h2> <img src={NivelAcesso} alt="Nível de Acesso" /> Grupo de Acesso: {User.userData.Grupo_Acesso} ({PermissoesNome})</h2>
                            <h2> <img src={Telefone} alt="Telefone" /> Telefone: {User.userData.Celular} </h2>
                            <h2> <img src={Cpf} alt="CPF" /> CPF: {User.userData.CPF}</h2>
                        </div>

                        <PrivateComponent classe={"Atividade Administrativa"}>
                            <div>
                                <h2> Atividades Administrativas </h2>
                                <div className="acoes-funcionarios">

                                    <PrivateButtonSolo className="botao-func" route={'/PagAddFunc'} intent={{ class: "Atividade Administrativa", intentPage: "Adicionar Funcionário" }}>
                                        <img src={AddPerfil} alt="Adicionar Funcionário" /> Adicionar Funcionário
                                    </PrivateButtonSolo>

                                    <PrivateButtonSolo className="botao-func" route={'/PagFuncionarios'} intent={{ class: "Atividade Administrativa", intentPage: "Lista de Funcionarios" }}>
                                        <img src={IconListaFunc} alt="Lista de Funcionarios" /> Lista de Funcionários
                                    </PrivateButtonSolo>

                                    <PrivateButtonSolo className="botao-func" route={'/PagRelatorios'} intent={{ class: "Atividade Administrativa", intentPage: "Relatórios" }}>
                                        <img src={IconListaFunc} alt="Relatórios" /> Relatórios
                                    </PrivateButtonSolo>

                                    <PrivateButtonSolo className="botao-func" route={'/DefGrupoAcesso'} intent={{ class: "Atividade Administrativa", intentPage: "Gerenciar Grupos de Acesso" }}>
                                        <img src={grupos} alt="Grupos" /> Gerenciar Grupos de acesso
                                    </PrivateButtonSolo>
                                </div>
                            </div>
                        </PrivateComponent>
                    </div>
                }
            </div>
        </div>
    );
}

export default PagPerfil;
