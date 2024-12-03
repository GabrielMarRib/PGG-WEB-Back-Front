import React, { useEffect, useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import { PermissoesContext } from "./Context/PermissoesContext";
import { checaPermissaoVisualizacao } from "./Config/Permissoes";
import { pegaPermissoesWHERE } from "./Config/Permissoes";
import Loading from "./Components/LoadingScreen/Loading";

const PrivateRoute = ({ element: Component, intent: Intent, ...rest }) => {
  const { User, isLoading } = useContext(UserContext);
  const { Permissoes, setPermissoes, isLoadingP } =
    useContext(PermissoesContext);
  const [permissionsReady, setPermissionsReady] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [erroDetectado, setErroDetectado] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log("E");
    let loadingTimer;

    if (User && !permissionsReady) {
      console.log("F");
      const fetchPermissions = async () => {
        const id_grupo = User?.userData?.Grupo_Acesso;
        const permissoes_OBJ = await pegaPermissoesWHERE(id_grupo, true);
        if (
          permissoes_OBJ == null ||
          (Permissoes == null && permissionsReady)
        ) {
          console.log("G");
          setErroDetectado(true);
        } else {
          console.log("H");
          if (permissoes_OBJ !== Permissoes) {
            console.log("I");
            setPermissoes(permissoes_OBJ);
          }
          console.log("J");
          setPermissionsReady(true);
        }
      };
      console.log("K");
      fetchPermissions();
    }

    if (loadingVisible) {
      loadingTimer = setTimeout(() => {
        setLoadingVisible(false);
      }, 1000);
    }

    return () => clearTimeout(loadingTimer);
  }, [User, Permissoes, setPermissoes, permissionsReady, loadingVisible]);

  if (isLoading || isLoadingP || (!permissionsReady && Permissoes)) {
    erroDetectado ? <Loading erro={true} /> : <Loading />;
  }

  if (User && Permissoes) {
    console.log("D");
    if (checaPermissaoVisualizacao(Permissoes.data, Permissoes.nome, Intent)) {
      console.log("A");
      return Component;
    } else {
      console.log("B");
      return location.pathname !== "/PagHome" ? (
        <Navigate to="/PagHome" state={{ from: location }} />
      ) : null;
    }
  } else {
    console.log("C");
    return <Navigate to="/PagLogin" state={{ from: location }} />;
  }
};

export default PrivateRoute;
