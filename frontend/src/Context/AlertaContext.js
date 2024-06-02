// AlertaContext.js
import React, { createContext, useState, useContext } from 'react';

const AlertaContext = createContext();

export const useAlerta = () => useContext(AlertaContext);

export const AlertaProvider = ({ children }) => {
    const [alerta, setAlerta] = useState({ tipo: 0, mensagem: '' });

    const Alerta = (Type, Mensagem) => {
        let TipoDesign = 0;
        if (Type === 1) {
            TipoDesign = 1;
        } else if (Type === 2) {
            TipoDesign = 2;
        } else {
            TipoDesign = 3;
        }
        setAlerta({ tipo: TipoDesign, mensagem: Mensagem });
    };

    return (
        <AlertaContext.Provider value={{ alerta, Alerta }}>
            {children}
        </AlertaContext.Provider>
    );
};
