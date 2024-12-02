import React from 'react'
import { checaPaiPermissao } from './Permissoes'
import { PermissoesContext } from '../Context/PermissoesContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Components/NavBar/NavBar.css";


function PrivateComponent({ classe, children }) {
    const { Permissoes, isLoadingP } = useContext(PermissoesContext)
    if (isLoadingP) {
        return <div>Carregando...</div>
    }

    if (!checaPaiPermissao(Permissoes.data, Permissoes.nome, classe)) {
        return null; 
    }

    return <>{children}</>; 
}

export default PrivateComponent

