import React, { useState, memo, useEffect } from 'react';
import '../Styles/Components/ModalLote.css';
import axios from 'axios';
import { useAlerta } from "../Context/AlertaContext.js";
import AlertaNotificação from "./AlertaNotificação.js";
import ConfirmaModal from './ConfirmaModal.js';
import { Link } from 'react-router-dom';

const LoteMemo = memo(function ModalAtualizarLote({ LoteSelecionado, fechar }) { // teoricamente faria não ter reRender, mas ta tendo, ou seja, fds

  const { Alerta } = useAlerta();

  const [Vlr_Compra, setVlr_Compra] = useState('');
  const [Vlr_Venda, setVlr_Venda] = useState('');
  const [Qtd_Produto, setQtd_Produto] = useState('');
  const [Justificativa, setJustificativa] = useState('');



  const AtulizarLote = async () => {
    try {
      const response = await axios.post(
        "http://pggzettav3.mooo.com/api/index.php",
        {
          funcao: "atulizarLote",
          senha: "@7h$Pz!q2X^vR1&K",
          vlr_compra: Vlr_Compra,
          vlr_venda: Vlr_Venda,
          qtde: Qtd_Produto,
          Justificativa: Justificativa
        }
      );
      console.log(response.data);
      setVlr_Compra('')
      setVlr_Venda('')
      setQtd_Produto('')
      setJustificativa('')
      fechar()
    } catch (error) {
      console.log("deu ruim: " + error);
    }
  };



  const Alterar = async (e) => {
    e.preventDefault();
    // setShowConfirma(true);
    if(Vlr_Compra == '' && Vlr_Venda == '' && Qtd_Produto == ''){
      Alerta(1, "Preencha algum valor");
      return
    }
    if(Vlr_Compra == ''){
      setVlr_Compra(LoteSelecionado.vlr_compra)
    }
    if(Vlr_Venda == ''){
      setVlr_Venda(LoteSelecionado.vlr_venda)
    }
    if(Qtd_Produto == ''){
      setQtd_Produto(LoteSelecionado.qtde)
    }

   await AtulizarLote()

  }

  return (
    <div className='ModalAtualizarLote'>
        <AlertaNotificação />
    <div className='conteudo-modal'>
      <div className='cabecalho-modal'>
      <h1>Editar lote :D</h1>
      <button onClick={fechar} className='botao-fechar'>X</button>
      </div>
    <center><h1> {LoteSelecionado.nome} </h1></center>
    
    <center> <p className='Ps'>
      Numero do lote: {LoteSelecionado.numerolote} / Codigo do produto: {LoteSelecionado.produto} 
    </p></center>

    <center> <p className='Ps'>
      Data de compra: {LoteSelecionado.dt_compra} / Data de validade: {LoteSelecionado.dt_validade}
    </p></center>


    <form className="formCat" onSubmit={(e) => Alterar(e)}>

      <label>  
        Valor de compra
        <input 
         type='number'
         value={Vlr_Compra}
         placeholder={LoteSelecionado.vlr_compra}
         onChange={(e) => setVlr_Compra(e.target.value)}
        />
      
        Valor de venda
        <input
          type='number' 
          value={Vlr_Venda}
          placeholder={LoteSelecionado.vlr_venda}
          onChange={(e) => setVlr_Venda(e.target.value)}
        />

    
        Quantide do produto
        <input 
          type='number'
          value={Qtd_Produto}
          placeholder={LoteSelecionado.qtde}
          onChange={(e) => setQtd_Produto(e.target.value)}
        />

        Justificativa
        <input 
          value={Justificativa}
          placeholder={"Porque . . ."}
          required 
          onChange={(e) => setJustificativa(e.target.value)}
        />

        
      </label>
      <button className='botao-testar'>Alterar</button>


      </form>

    </div>

    </div>


  )

});

export default LoteMemo;
