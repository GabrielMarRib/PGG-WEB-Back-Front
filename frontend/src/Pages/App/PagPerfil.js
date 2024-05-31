import React, { useState, useContext, useEffect } from "react";
import "../../Styles/App/PagPerfil.css";
import Cabecalho from '../../Components/Cabecalho.js';
import ImageProfile from '../../Assets/userProfile/TESTEUSER.png';
import ImageEmail from '../../Assets/userProfile/EMAIL.png';
import NivelAcesso from '../../Assets/userProfile/CHAVE.png';
import Telefone from '../../Assets/userProfile/TELEFONE.png';
import SININHO from '../../Assets/userProfile/SININHO.png';
import Cpf from '../../Assets/userProfile/CPF.png';
import AddPerfil from '../../Assets/add-userWhite.png';
import IconListaFunc from '../../Assets/ListaFunc.png';
import { UserContext } from '../../Context/UserContext.js'
import { handleLogOut } from "../../Functions/Functions.js";
import { useNavigate } from "react-router-dom";
import Redirect from "../../Functions/Redirect.js";


function PagPerfil() {
    const [showPopup, setShowPopup] = useState(false);
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;
    const navigate = useNavigate();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    Redirect(User)

    const mostraNivelAcesso = () => {
        if (User && User.userData && User.userData.Nivel_acesso) {
            console.log(User.userData.Nivel_acesso)
            switch (parseInt(User.userData.Nivel_acesso)) {
                case 0:
                    return "(Funcionário)"
                case 1:
                    return "(Funcionário+)"
                case 2:
                    return "(Gestor)"
            }
        }
    }
    return (
        <div className="PagPerfil">
            <Cabecalho />
                {/* <button className="Notificacao" onClick={togglePopup}> <img src={SININHO} alt="Sino"></img> </button> */}
            <div className="DivBtnsFuncionarios">
                    {User && User.userData && User.userData.Nivel_acesso && User.userData.Nivel_acesso==2 ? (
                     <div id="IdBtnAddFunc">
                        <button className="AddFunc" onClick={() =>{navigate('/PagAddFunc')}}> <img src={AddPerfil} id="IdAddFuncIcon"></img> Adicionar Funcionário</button>
                        <button className="AddFunc" onClick={() =>{navigate('/PagAddFunc')}}> <img src={IconListaFunc} id="IdAddFuncIcon"></img> Lista de Funcionarios</button>
                     </div>
                    ):
                        null
                    }
            </div>
            <div className="Corpo">
                <div className="coluna1">

                    <div className="forms">
                        <div className="data-user">
                            <h1>INFO</h1>
                            <h2> <img className="Imagem1" src={ImageProfile} alt="Userimg" /> Nome: {User && User.userData && User.userData.Nome} </h2>
                            <h2> <img className="Imagem2" src={ImageEmail} alt="EmailIcon" /> Email: {User && User.userData && User.userData.Email}</h2>
                            <h2> <img className="Imagem3" src={NivelAcesso} alt="AcessoIcon" /> Nível de Acesso: {User && User.userData && User.userData.Nivel_acesso} {mostraNivelAcesso()}</h2>
                            <h2> <img className="Imagem4" src={Telefone} alt="TelefoneIcon" />  Telefone: {User && User.userData && User.userData.Celular} </h2>
                            <h2> <img className="Imagem5" src={Cpf} alt="CpfIcon" /> CPF: {User && User.userData && User.userData.CPF}</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Pendencias">
                            <h2>Atividade Administrativa</h2>
                            <p> - Verificar estoque em 25/05/2024 </p>
                            <p> - 2 novos pedidos aguardando aprovação </p>
                            <p> - Novo acesso em 23/05/2024 </p>
                        </div>

                        <div className="buttons">
                            <button className="ButtonEditar"> Editar </button>
                            <br />
                            <button className="ButtonExcluir"> Excluir </button>
                        </div>
                    </div>
                </div>

                <div className="coluna2">
             
                  
                    
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <button onClick={togglePopup} className="close-popup">X</button>
                                <h2>Notificações</h2>
                                <p>TESTE</p>
                                <p>TESTE</p>
                            </div>
                        </div>
                    )}

                    <div className="Informacoes1">
                        <div className="data-user">
                            <h2> Quantidade no Estoque </h2>
                            <h3> {User && User.userData && User.userData.Nivel_acesso} Unidades</h3>
                            <p> - Lucro de 10% </p>
                        </div>
                    </div>

                    <div className="Informacoes2">
                        <div className="data-user">
                            <h2> Quantidade no Estoque </h2>
                            <h3> {User && User.userData && User.userData.Nivel_acesso} Unidades</h3>
                            <p> - Lucro de 10% </p>
                        </div>
                    </div>

                    <div className="Informacoes3">
                        <div className="data-user">
                            <h2> Quantidade no Estoque </h2>
                            <h3> {User && User.userData && User.userData.Nivel_acesso} Unidades</h3>
                            <p> - Lucro de 10% </p>
                        </div>
                    </div>
                </div>

            </div>
                
        </div>
    );
}

export default PagPerfil;
