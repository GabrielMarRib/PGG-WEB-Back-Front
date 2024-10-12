import React from "react";
import "../Styles/Components/Dica.css";

const Dica = ({ children, text }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

//USANDO ESSA PORRA PARA AS LEGENDAS

export default Dica;
