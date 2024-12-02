import { createContext, useState, useEffect } from 'react';
import { pegaPermissoesWHERE } from '../Config/Permissoes';
export const PermissoesContext = createContext();

export const PermissoesContextProvider = ({ children }) => {
  const [Permissoes, setPermissoes] = useState(null);
  const [isLoadingP, setIsLoadingP] = useState(true);

  useEffect(() => {

    const savedPermissoes = localStorage.getItem('Permissoes');
    console.log("LocalStorage: " + savedPermissoes);
    if (savedPermissoes) {
      console.log("Setting Permissoes from LocalStorage...");
      setPermissoes(JSON.parse(savedPermissoes));
    }
    setIsLoadingP(false); 
  }, []);

  return (
    <PermissoesContext.Provider value={{ Permissoes, setPermissoes, isLoadingP }}>
      {children}
    </PermissoesContext.Provider>
  );
};
