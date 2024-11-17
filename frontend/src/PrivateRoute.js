// src/Components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { PermissoesContext } from './Context/PermissoesContext';
import { checaPermissaoVisualizacao } from './Config/Permissoes';


const PrivateRoute = ({ element: Component,  intent: Intent, ...rest }) => {
  const { User, isLoading } = useContext(UserContext);
  const {Permissoes, isLoadingP} = useContext(PermissoesContext)

  const location = useLocation();

  if (isLoading || isLoadingP) {
    return <div>Carregando...</div>
  }

  if (User) {
    if(Permissoes){
      //console.log((checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, intent)))
       if(checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, Intent))
        return Component;
      else
         return location.pathname !== "/PagHome" ? <Navigate to="/PagHome" state={{ from: location }}  /> : null;
     }
  } else {
    return <Navigate to="/PagLogin" state={{ from: location }} />;
  }
};

export default PrivateRoute;