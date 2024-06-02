import NotificacaoIcon from "../Assets/SinoWhite.png";
import React, { useState, useEffect } from "react";
import { NotificacaoPontoPedido } from "../Functions/Functions";
import '../Styles/Components/Notificacao.css'
import { useNavigate } from "react-router-dom";

const Notificacao = () => {
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
                        <h2>Notificações</h2>
                        {carregando ? (
                            <p>Carregando...</p>
                        ) : (
                            notificacoes.map(item => item.data?.msg && (
                                <div key={item.id}>
                                    {console.log(item.data.terste)}
                                    <p>{item.data?.msg}</p>
                                    <button className="BotaoAcao" onClick={() => {
                                        if (item.data.PP) {
                                            navigate('/PagPontoPedido')
                                        } else if (item.data.Vendas) {
                                            navigate('/PagVenderProdutos')
                                        }
                                    }}>Ver situação</button>
                                    <hr />
                                </div>
                            ))
                        )}

                        {console.log(notificacoes)}
                    </div>
                </div>
            )}
        </div>
    )
};

export default Notificacao;
