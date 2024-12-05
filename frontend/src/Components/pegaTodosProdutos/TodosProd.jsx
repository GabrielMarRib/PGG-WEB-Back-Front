import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import './TodosProd.css';

function TodosProd() {
    const [qtdeProdutos, setQtdeProdutos] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const pegaData = async () => {
            try {
                const response = await axios.post('http://localhost:80/php/', {
                    funcao: 'pegaCategoriasComTotalProdutos',
                    senha: '@7h$Pz!q2X^vR1&K'
                }, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                        "Accept": "application/json, text/plain, */*",
                        "Connection": "keep-alive",
                    },
                });
                setQtdeProdutos(response.data);
            } catch (error) {
                console.log("deu ruim");
            }
        };
        pegaData();
    }, []);

    const handleclick = () => {
        setOpen(prevState => !prevState);
    };

    const totalQTDE = qtdeProdutos?.reduce((total, prod) => total + Number(prod?.total_produtos), 0);

    return (
        <div className="TodosProd">
            <button 
                onClick={handleclick} 
                className={`TodosProd__toggle ${open ? 'TodosProd__toggle--open' : ''}`}
            >
                {open ? "Esconder informações extras" : "Mostrar informações extras"}
            </button>
            <div className={`TodosProd__content ${open ? 'TodosProd__content--visible' : ''}`}>
                <p>Total de produtos no Estoque: <strong>{totalQTDE}</strong></p>
                <ul>
                    <span>N° Produtos separados por categoria:</span>
                    {qtdeProdutos?.map((prod) => (
                        <li key={prod.nome}>{prod.nome + " => " + prod.total_produtos}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodosProd;
