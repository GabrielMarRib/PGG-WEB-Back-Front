import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import { PermissoesContext } from './Context/PermissoesContext';
import { checaPermissaoVisualizacao } from './Config/Permissoes';
import { pegaPermissoesWHERE } from './Config/Permissoes';
import Carregamento from './Components/Carregamento/Carregamento';

const PrivateRoute = ({ element: Component, intent: Intent, ...rest }) => {
  const { User, isLoading } = useContext(UserContext);
  const { Permissoes, setPermissoes, isLoadingP } = useContext(PermissoesContext);
  const [permissionsReady, setPermissionsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (User && !permissionsReady) {
      const fetchPermissions = async () => {
        console.log("useEFFECT")
        console.log(Permissoes)
        
        const id_grupo = User?.userData?.Grupo_Acesso;
        const permissoes_OBJ = await pegaPermissoesWHERE(id_grupo, true);
        console.log(permissoes_OBJ)
        if (permissoes_OBJ !== Permissoes) {
          setPermissoes(permissoes_OBJ);
        }
        setPermissionsReady(true);
      };

      fetchPermissions();
    }
  }, [User, Permissoes, setPermissoes, permissionsReady]);

  if (isLoading || isLoadingP || (!permissionsReady && Permissoes)) {
    return <Carregamento></Carregamento>
  }

  if (User) {
    if (Permissoes && checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, Intent)) {
      return Component;
    } else {
      return location.pathname !== "/PagHome" ? <Navigate to="/PagHome" state={{ from: location }} /> : null;
    }
  } else {
    return <Navigate to="/PagLogin" state={{ from: location }} />;
  }
};

export default PrivateRoute;
