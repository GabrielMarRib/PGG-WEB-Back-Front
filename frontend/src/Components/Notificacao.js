import NotificacaoIcon from "../Assets/SinoWhite.png";
import React, { useState, useEffect } from "react";
import { NotificacaoPontoPedido } from "../Functions/Functions";
import '../Styles/Components/Notificacao.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import Redirect from "../Functions/Redirect";
const Notificacao = () => {

    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....

    Redirect(User)
    let vezes=0;
    const [notificacoes, setNotificacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const PegaNotificacoes = async () => {
            if (showPopup) {
                setCarregando(true);
                try {
                    const response = await NotificacaoPontoPedido();
                    setNotificacoes(response);
                } catch (error) {
                    console.error('Erro ao buscar notificações:', error);
                } finally {
                    setCarregando(false);
                }
            }
        };

        PegaNotificacoes();
    }, [showPopup]);

    const handleClick = (item) => {
        if (item?.data) {
            if (item.data.PP) {
                navigate('/PagPontoPedido')
            } else if (item.data.Vendas) {
                navigate('/PagVenderProdutos')
            }
        }
    }

    const traduzData = (item) => {
        if (item?.data?.Data_Venda) {
            const data = item.data.Data_Venda;
            const segundos = data._seconds
            const nanoseg = data._nanoseconds
            return segundos * 1000 + nanoseg / 1000000;
        }
    }

    const exibeData = (item) => {
        if (item?.data?.Data_Venda) {
            const dataCrua = traduzData(item)
            const dataOK = new Date(dataCrua).toLocaleString('pt-BR')
            return dataOK
        }
    }


    notificacoes.sort((a, b) => {
        const dataA = traduzData(a);
        const dataB = traduzData(b);

        return dataB - dataA;
    });

    const constroiMsg = (msg) => {
        const ChaveMsg = msg.split(' ')[0];
        const msgFinal = msg.replace(ChaveMsg, '')
        let styleCustom = {}
        switch (ChaveMsg) {
            case "URGENTE!!":
                styleCustom = {
                    display: 'inline-block',
                    backgroundColor: 'red',
                    minWidth: '7vw',
                    borderRadius: '5px',
                    color: 'white',
                    fontSize: 'large'
                }
                break;
        }

        return (
            <h3>
                <span style={styleCustom}>{ChaveMsg}</span>
                {msgFinal}
            </h3>
        );
    }

    return (
        <div className="Notificacao">
            <div className="DivPrincipalzinha">
                <a onClick={togglePopup}>
                    <div id="DivImg">
                        <img src={NotificacaoIcon} />
                    </div>
                </a>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button onClick={togglePopup} className="close-popup">
                            X
                        </button>
                        <h2 className="notificacaoH2">Notificações</h2>
                        {carregando ? (
                            <p>Carregando...</p>
                        ) : (
                            notificacoes.length > 0 ? (
                                notificacoes.map(item => {
                                    vezes++;
                                    if (!item.data?.msg){ // se nao tiver msg, manda po krl
                                        if(vezes === 1){
                                            //return <p>não há notificações</p>
                                            return null
                                        }
                                        else
                                            return null
                                    }
                                    if (item.data.PP && User.userData.Nivel_acesso!=2){ // se tiver, mas se for relacionada a PP, e vc nao for gestor, manda pro krl
                                        if(vezes === 1)
                                            return <p>não há notificações</p>
                                        else
                                            return null
                                    } 
                                    return (
                                        <div key={item.id}>
                                            <h2>{exibeData(item)}</h2>
                                            {constroiMsg(item.data?.msg)}
                                            <button className="BotaoAcao" onClick={() => { handleClick(item) }}>Ver situação</button>
                                            <hr style={{ marginTop: "2vh", marginBottom: "2vh" }} />
                                        </div>
                                    );

                                })
                            ) : (
                                <p>não há notificações</p>
                            )
                        )}
                        {console.log(notificacoes)}
                    </div>


                </div>
            )}



        </div>
    )
};

export default Notificacao;
