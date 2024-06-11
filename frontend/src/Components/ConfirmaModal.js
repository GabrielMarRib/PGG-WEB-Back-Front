import React from 'react';
import '../Styles/Components/ConfirmaModal.css';
const ConfirmaModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="ConfirmaModal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Não</button>
      </div>
    </div>
  );
};

export default ConfirmaModal;