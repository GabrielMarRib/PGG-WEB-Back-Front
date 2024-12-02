import React, { useContext } from 'react';
import { checaPaiPermissao } from './Permissoes';
import { PermissoesContext } from '../Context/PermissoesContext';
import "../Components/NavBar/NavBar.css";

function PrivateButtonPai({ classe, children, className = "", ...rest }) {
  const { Permissoes, isLoadingP } = useContext(PermissoesContext);

  if (isLoadingP) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {checaPaiPermissao(Permissoes.data, Permissoes.nome, classe) && (
        <button
          className={`private-button-pai ${className}`} // Adicione a classe para o botão
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default PrivateButtonPai;
