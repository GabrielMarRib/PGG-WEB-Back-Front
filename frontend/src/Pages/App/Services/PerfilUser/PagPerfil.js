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

function PagPerfil() {
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const PermissoesOBJ = useContext(PermissoesContext)
    const PermissoesNome = PermissoesOBJ.Permissoes.nome
    console.log(PermissoesOBJ)
    const navigate = useNavigate();

    return (
        <div className="PagPerfil">
            <CabecalhoHome />
            <Titulo
                tituloMsg='Gerenciamento de Informações'
            />
            {User &&
                <div className="Corpo">
                    <div className="dados-usuario">
                        <h1>Suas informações</h1>
                        <h2> <img src={ImageProfile} alt="User" /> Nome: {User.userData.Nome} </h2>
                        <h2> <img src={ImageEmail} alt="Email" /> Email: {User.userData.Email}</h2>
                        <h2> <img src={NivelAcesso} alt="Nível de Acesso" /> Grupo de Acesso: {User.userData.Grupo_Acesso} ({PermissoesNome})</h2>
                        <h2> <img src={Telefone} alt="Telefone" /> Telefone: { User.userData.Celular} </h2>
                        <h2> <img src={Cpf} alt="CPF" /> CPF: { User.userData.CPF}</h2>
                    </div>

                    <div className="acoes-funcionarios">
                        <button className="botao-func" onClick={() => { navigate('/PagAddFunc') }}>
                            <img src={AddPerfil} alt="Adicionar Funcionário" /> Adicionar Funcionário
                        </button>
                        <button className="botao-func" onClick={() => { navigate('/PagFuncionarios') }}>
                            <img src={IconListaFunc} alt="Lista de Funcionários" /> Lista de Funcionários
                        </button>
                        <button className="botao-func" onClick={() => { navigate('/PagRelatorios') }}>
                            <img src={IconListaFunc} alt="Relatórios" /> Relatórios
                        </button>
                        <button className="botao-func" onClick={() => { navigate('/DefGrupoAcesso') }}>
                            <img src={grupos} alt="Grupos" /> Gerenciar Grupos de acesso
                        </button>

                    </div>

                </div>
   
            }
        </div>
    );
}

export default PagPerfil;
