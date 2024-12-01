import React from 'react'
import { checaPaiPermissao } from './Permissoes'
import { PermissoesContext } from '../Context/PermissoesContext'
import { useContext } from 'react';

function PrivateButtonPai({ classe, children, ...rest}) {
  const { Permissoes, isLoadingP } = useContext(PermissoesContext)

  if (isLoadingP) {
    return <div>Carregando...</div>
  }
  return (
    <>
      {checaPaiPermissao(Permissoes.data, Permissoes.nome, classe) &&
        <button
          {...rest}
        >{children}</button>
      }
    </>
  )
}

export default PrivateButtonPai


/**
 * Botão pai
 */