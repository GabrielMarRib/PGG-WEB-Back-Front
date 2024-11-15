import React, { useContext, useState, useEffect } from "react";
import "./AlertaNotificaçao.css";
import { useAlerta } from "../../Context/AlertaContext";



//Alerta( Numero, Mensagem);
//Numero = 1 { Design Simple}
//Numero = 2 { Design Sucesso}
//Numero = 3 { Design Erro}


const AlertaNotificação = () => {
    const { alerta } = useAlerta();

    const [visivel, setVisivel] = useState(alerta.tipo !== 0);

    useEffect(() => {
      if (alerta.tipo !== 0) {
        setVisivel(true);
        const timer = setTimeout(() => {
          setVisivel(false);
          alerta.tipo = 0;
        }, 2000); // Define o tempo para 3 segundos (3000 ms)
        return () => clearTimeout(timer);
      }
    }, [alerta]);

  return (
    <div className="AlertaNotificação">

        <div className={visivel ? "Show" : "Hidden"}>
        {/* {console.log("Type:" + alerta)} */}
        <div className={alerta.tipo == 1 ? "DivAlertaSimple" : alerta.tipo == 2 ? "DivAlertaSuccess" : alerta.tipo == 3 ? "DivAlertaDanger" : "Hidden"}>
          <div className={alerta.tipo == 1 ? "BarraLateralSimple" : alerta.tipo == 2 ? "BarraLateralSuccess" : alerta.tipo == 3 ? "BarraLateralDanger" : "Hidden"}></div>
          <label>{alerta.mensagem}</label>
        </div>


      </div>

    </div>
  );
};
export default AlertaNotificação;