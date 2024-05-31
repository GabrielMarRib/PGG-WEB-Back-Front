import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagCurvaABC.css';
// import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { db } from "../../BD/Firebase";
// import { onSnapshot, collection } from "firebase/firestore";
// npm install recharts


function PagCurvaABCPorValor() {
    const navigate = useNavigate();
    return (
        <div className="PagEscolhaProdutos">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <h1>CURVA ABC - Por Valor</h1>
        </div>
    );
}

export default PagCurvaABCPorValor;