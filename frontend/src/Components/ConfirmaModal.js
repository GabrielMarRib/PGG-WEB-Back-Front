import React from 'react';
import '../Styles/Components/ConfirmaModal.css';

const ConfirmaModal = ({ message, onConfirm, onCancel, BoolMultiplaEscolha, styles, tamanho }) => {

  const constroiMsg = (mensagem) => {
    console.log(typeof mensagem)
    if (typeof mensagem === 'object') {
      let msgAcumulada = [];
      mensagem.forEach((msg) => {
        if (msg.includes('STYLE1')) {
          msg = msg.replace('STYLE1', '')
          msg = <span style={styles.STYLE1}>{" " + msg + " "}</span>;
        } else if (msg.includes('STYLE2')) {
          msg = msg.replace('STYLE2', '')
          msg = <span style={styles.STYLE2}>{" " + msg + " "}</span>;
        }
        msgAcumulada.push(msg);
      });
      return (
        <p>
          {msgAcumulada}
        </p>
      )
    } else if (typeof mensagem === 'string') {
      return (
        <p>
          {mensagem}
        </p>
      )
    }
  }

  const StyleDiv = () =>{
    switch(tamanho){
      case 'G':
        return{
          width: '700px'
        }
      case 'GG':
        return{
          width: '1000px'
        }
      case 'XGG':
        return{
          width: '1300px'
        }
      default:
        return {
          width: '350px',
          height: 'auto'
        }
    }
  }

  return (
    <div className="ConfirmaModal">
      <div style={StyleDiv()} className="modal-content">
        <p>{constroiMsg(message)}</p>

        {BoolMultiplaEscolha ? (
          <>
            <button onClick={onConfirm}>Sim</button>
            <button onClick={onCancel}>Não</button>
          </>
        ) : (
          <button onClick={onCancel}>Voltar</button>
        )}
      </div>
    </div>
  );
};

export default ConfirmaModal;