import React, { useState, memo, useEffect } from 'react';
import './ModalLote.css';
import axios from 'axios';
import { useAlerta } from "../../../Context/AlertaContext.js";
import AlertaNotificação from "../../NotificacaoAlert/AlertaNotificação.js";
import ConfirmaModal from '../ConfirmaModal/ConfirmaModal.js';
import { Link } from 'react-router-dom';

const LoteMemo = memo(function ModalAtualizarLote({ LoteSelecionado, fechar, IdUser }) { // teoricamente faria não ter reRender, mas ta tendo, ou seja, fds

  const { Alerta } = useAlerta();

  const [Vlr_Compra, setVlr_Compra] = useState('');
  const [Vlr_Venda, setVlr_Venda] = useState('');
  const [Qtd_Produto, setQtd_Produto] = useState('');
  const [Justificativa, setJustificativa] = useState('');



  const AtulizarLote = async (LetVlr_Compra, LetVlr_Venda, LetQtd_Produto) => {
    try {
      console.log("Valores a ser alterado:" + LetVlr_Compra + "/" + LetVlr_Venda + "/" + LetQtd_Produto + "/" + LoteSelecionado.numerolote)
      console.log("Justificativa: " + Justificativa)
      console.log("Id User: " + IdUser);
      const response = await axios.post(
        "http://discordia.com.br/",
        {
          funcao: "atualizarLotes",
          senha: "@7h$Pz!q2X^vR1&K",
          vlr_compra: LetVlr_Compra,
          vlr_venda: LetVlr_Venda,
          qtde: LetQtd_Produto,
          numerolote: LoteSelecionado.numerolote,
          id_usuario: IdUser, 
          justificativa: Justificativa
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        }
      );
      console.log(response.data);
      setVlr_Compra('')
      setVlr_Venda('')
      setQtd_Produto('')
      setJustificativa('')
      LetVlr_Compra = 0
      LetVlr_Venda = 0
      LetQtd_Produto = 0
      Alerta(2, "Alterado com sucesso");
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
    let LetVlr_Compra = 0;
    let LetVlr_Venda = 0;
    let LetQtd_Produto = 0;


    if(Vlr_Compra == ''){
      LetVlr_Compra = LoteSelecionado.vlr_compra
      console.log("Entrou Vlr_Compra" + LetVlr_Compra)
    }else{
      LetVlr_Compra = Vlr_Compra;
    }
    if(Vlr_Venda == ''){
      LetVlr_Venda = LoteSelecionado.vlr_venda
      console.log("Entrou Vlr_Venda" + LetVlr_Venda)
    }else{
      LetVlr_Venda = Vlr_Venda;
    }
    if(Qtd_Produto == ''){
      LetQtd_Produto = LoteSelecionado.qtde
      console.log("Entrou Qtd" + LetQtd_Produto)
    }else{
      LetQtd_Produto = Qtd_Produto;
    }

   await AtulizarLote(LetVlr_Compra, LetVlr_Venda, LetQtd_Produto)

  }

  return (
    <div className='ModalAtualizarLote'>
        <AlertaNotificação />
    <div className='conteudo-modal'>
      <div className='cabecalho-modal'>
      <h1 className='textoCentro'>Editar Lote</h1>
      <button onClick={fechar} className='botao-fechar'>X</button>
      </div>
    <center className='testeH1'><h1> "{LoteSelecionado.nome}" </h1></center>
    
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

    
        Quantidade do produto
        <input 
          type='number'
          value={Qtd_Produto}
          placeholder={LoteSelecionado.qtde}
          onChange={(e) => setQtd_Produto(e.target.value)}
        />

        Justificativa
        <input 
          value={Justificativa}
          placeholder={"Porque..."}
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
