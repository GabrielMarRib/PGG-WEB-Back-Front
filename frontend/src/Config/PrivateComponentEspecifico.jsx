import React from 'react'
import { checaPermissaoVisualizacao } from './Permissoes'
import { PermissoesContext } from '../Context/PermissoesContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateComponentEspecifico({ intent, children }) {
    const { Permissoes, isLoadingP } = useContext(PermissoesContext)
    if (isLoadingP) {
        return <div>Carregando...</div>
    }

    if (!checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, intent)) {
        return null; 
    }

    return <>{children}</>; 
}

export default PrivateComponentEspecifico

