  import React, { useState, useEffect } from "react";
  import "../Styles/PagHome.css";
  import { useLocation, useNavigate } from "react-router-dom";
  import Cabecalho from '../Components/Cabecalho'
  import { useContext } from "react";
  import { UserContext } from "../Context/UserContext"; // Import the UserContext object from your context file

  function PagHome() {
    const navigate = useNavigate();
    const {User} = useContext(UserContext); // Access user from the UserContext
    
    return (
      <div className="PagHome">
        test
        {console.log("teste:" + User)}
      </div>
    );
  }

  export default PagHome;
