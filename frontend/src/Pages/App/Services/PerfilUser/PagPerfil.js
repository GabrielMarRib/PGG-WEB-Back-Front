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


function PagPerfil() {
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const navigate = useNavigate();

    const mostraNivelAcesso = () => {
        if (User && User.userData) {
            switch (parseInt(User.userData.Nivel_acesso)) {
                case 0:
                    return "(Funcionário)";
                case 1:
                    return "(Funcionário+)";
                case 2:
                    return "(Gestor)";
                default:
                    return null;
            }
        }
    }

    return (
        <div className="PagPerfil">
            <CabecalhoHome />
            <Titulo
          tituloMsg='Gerenciamento de Informações'
            />
            <div className="Corpo">
                <div className="dados-usuario">
                    <h1>Suas informações</h1>
                    <h2> <img src={ImageProfile} alt="User" /> Nome: {User && User.userData && User.userData.Nome} </h2>
                    <h2> <img src={ImageEmail} alt="Email" /> Email: {User && User.userData && User.userData.Email}</h2>
                    <h2> <img src={NivelAcesso} alt="Nível de Acesso" /> Nível de Acesso: {User && User.userData && User.userData.Nivel_acesso} {mostraNivelAcesso()}</h2>
                    <h2> <img src={Telefone} alt="Telefone" /> Telefone: {User && User.userData && User.userData.Celular} </h2>
                    <h2> <img src={Cpf} alt="CPF" /> CPF: {User && User.userData && User.userData.CPF}</h2>
                </div>
                {User && User.userData && User.userData.Nivel_acesso >= 2 && (
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
                )}
            </div>
        </div>
    );
}

export default PagPerfil;
