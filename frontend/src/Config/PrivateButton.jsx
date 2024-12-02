import React from 'react'
import { checaPermissaoVisualizacao } from './Permissoes'
import { PermissoesContext } from '../Context/PermissoesContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Components/NavBar/NavBar.css";

function PrivateButton({ route, intent, className, nome, ...rest }) {
  const { Permissoes, isLoadingP } = useContext(PermissoesContext)
  const navigate = useNavigate();
  if (isLoadingP) {
    return <div>Carregando...</div>
  }
  return (
    <>
       {checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, intent) && (
        <button
          onClick={() => { navigate(String(route)); }}
          className={className}
          {...rest}
        >
          {nome}
        </button>
        )}
    </>
  )
}

export default PrivateButton

/**
 * Botão filho de PrivateButtonPai
 */