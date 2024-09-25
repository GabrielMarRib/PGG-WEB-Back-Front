import React, { useState, useEffect, useContext } from "react";
import { RelatorioPP, exibeData, traduzData } from "../Functions/Functions";
import '../Styles/Components/DashboardPP.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const DashboardPP = () => {
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;

  let vezes = 0;
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const PegaNotificacoes = async () => {
      if (User && User.userData) {
        setCarregando(true);
        try {
          const response = await RelatorioPP();
          setNotificacoes(response);
          console.log(response.length);
        } catch (error) {
          console.error('Erro ao buscar notificações:', error);
        } finally {
          setCarregando(false);
        }
      }
    };
    PegaNotificacoes();
  }, [User]);

  const handleClick = (item) => {
    if (item) {
      if (item.pp) {
        navigate('/PagPontoPedido');
      }
    }
  };

  notificacoes.sort((a, b) => {
    const dataA = traduzData(a);
    const dataB = traduzData(b);
    return dataB - dataA;
  });

  const constroiMsg = (msg) => {
    const ChaveMsg = msg.split(' ')[0];
    const msgFinal = msg.replace(ChaveMsg, '');
    let styleCustom = {};
    switch (ChaveMsg) {
      case "URGENTE!!":
        styleCustom = {
          display: 'inline-block',
          backgroundColor: '#fc8458',
          minWidth: '4vw',
          borderRadius: '5px',
          color: 'white',
          fontSize: '16px',
          padding: '2px 4px', // Adiciona padding para ajustar o tamanho
        };
        break;
    }

    return (
      <h3>
        <span style={styleCustom}>{ChaveMsg}</span> <br />
        {msgFinal}
      </h3>
    );
  };

  return (
    <div className="DashPP">
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        notificacoes.length > 0 ? (
          notificacoes.map(item => {
            vezes++;
            if (!item?.MSG) {
              if (vezes === 1) {
                return <p key={vezes}>Não há notificações A</p>;
              } else {
                return null;
              }
            }
            if (item.PP && User.userData.Nivel_acesso !== 2) {
              if (vezes === 1) {
                return <p key={vezes}>Não há notificações B</p>;
              } else {
                return null;
              }
            }
            return (
              <div key={item.id_}>
                <h2>{exibeData(item)}</h2>
                {constroiMsg(item?.MSG)}
                <button className="BotaoAcao" onClick={() => { handleClick(item) }}>Ver situação</button>
                <hr style={{ marginTop: "2vh", marginBottom: "2vh" }} />
              </div>
            );
          })
        ) : (
          <p>Não há pontos de pedido...</p>
        )
      )}
    </div>
  );
};

export default DashboardPP;
