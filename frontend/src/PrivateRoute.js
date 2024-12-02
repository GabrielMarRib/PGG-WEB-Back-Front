import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import { PermissoesContext } from './Context/PermissoesContext';
import { checaPermissaoVisualizacao } from './Config/Permissoes';
import { pegaPermissoesWHERE } from './Config/Permissoes';
import Loading from './Components/LoadingScreen/Loading';

const PrivateRoute = ({ element: Component, intent: Intent, ...rest }) => {
  const { User, isLoading } = useContext(UserContext);
  const { Permissoes, setPermissoes, isLoadingP } = useContext(PermissoesContext);
  const [permissionsReady, setPermissionsReady] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let loadingTimer;

    if (User && !permissionsReady) {
      const fetchPermissions = async () => {
        const id_grupo = User?.userData?.Grupo_Acesso;
        const permissoes_OBJ = await pegaPermissoesWHERE(id_grupo, true);
        if (permissoes_OBJ !== Permissoes) {
          setPermissoes(permissoes_OBJ);
        }
        setPermissionsReady(true);
      };

      fetchPermissions();
    }

    if (loadingVisible) {
      loadingTimer = setTimeout(() => {
        setLoadingVisible(false);
      }, 1000); // 5000ms delay
    }

    return () => clearTimeout(loadingTimer); // Cleanup on component unmount
  }, [User, Permissoes, setPermissoes, permissionsReady, loadingVisible]);

  if (isLoading || isLoadingP || loadingVisible) {
    return <Loading />;
  }

  if (User) {
    if (Permissoes && checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, Intent)) {
      return Component;
    } else {
      return location.pathname !== '/PagHome' ? (
        <Navigate to="/PagHome" state={{ from: location }} />
      ) : null;
    }
  } else {
    return <Navigate to="/PagLogin" state={{ from: location }} />;
  }
};

export default PrivateRoute;
