import React, { useState, useEffect } from "react";
import "../Styles/PagHome.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cabecalho from '../Components/Cabecalho'
import { useContext } from "react";
import { UserContext } from "../Context/UserContext"; 

function PagHome() {
  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User...
  return (
    <div className="PagHome">
      {console.log(User)}
      {User ? (
        <p>{JSON.stringify(User)}</p>
      ) : (
        <p>Vc nao ta logado irmao</p>
      )}
    </div>
  );
}
export default PagHome;