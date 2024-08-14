import React, { useState } from 'react';
import '../Styles/Components/ProdutosModal.css';

function ProdutosModal() {
  const [abaAtiva, setAbaAtiva] = useState(null);

  const handleClickAba = (nomeAba) => {
    setAbaAtiva(nomeAba);
  };

  return (
    <div className='ProdutosModal'>
      <div className='conteudo-modal'>
        <div className='cabecalho-modal'>
          <button
            className={`botao-aba ${abaAtiva === 'Produto' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Produto')}
          >
            Produto
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Ponto De Pedido' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Ponto De Pedido')}
          >
            Ponto De Pedido
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Curva ABC' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Curva ABC')}
          >
            Curva ABC
          </button>
          <button
            className={`botao-aba ${abaAtiva === 'Lote Econômico' ? 'ativa' : ''}`}
            onClick={() => handleClickAba('Lote Econômico')}
          >
            Lote Econômico
          </button>
          <button className='botao-fechar'>X</button>
        </div>
        <div className='corpo-modal'>
          <ul>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            <li>SEXO</li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProdutosModal;
