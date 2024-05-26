import React, { useState, useEffect } from "react";
import "../Styles/PagHome.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cabecalho from '../Components/Cabecalho'
import { useContext } from "react";
import { UserContext } from "../Context/UserContext"; 
import { handleLogOut } from "../Functions/Functions.js";
function PagHome() {
  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User...


  useEffect(() => {
    if(User == null){
      navigate('/PagLogin');
    }
}, []);



  return (
    <div className="PagHome">
      {console.log(User)}
        <p>{JSON.stringify(User)}</p>
       
      <button  type="button" onClick={() => handleLogOut(navigate)}> Deslogar </button>


    </div>
  );
}
export default PagHome;