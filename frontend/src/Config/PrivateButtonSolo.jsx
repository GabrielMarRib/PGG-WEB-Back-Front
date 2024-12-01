import React from 'react'
import { checaPermissaoVisualizacao } from './Permissoes'
import { PermissoesContext } from '../Context/PermissoesContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateButtonSolo({ route, intent, children, ...rest }) {
    const { Permissoes, isLoadingP } = useContext(PermissoesContext)
    const navigate = useNavigate();
    if (isLoadingP) {
        return <div>Carregando...</div>
    }
    return (
        <>
        {checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, intent) &&
            <button
                onClick={() => { navigate(String(route)); }}
                {...rest}
            >{children}</button>
            }
        </>
    )
}

export default PrivateButtonSolo