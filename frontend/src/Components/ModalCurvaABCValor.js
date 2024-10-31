import '../Styles/App/Service/ModalCurvaABC.css';

const ModalCurvaABCValor = ({ isOpen, onClose, limiteA, setLimiteA, limiteB, setLimiteB, handleChangeClassificao }) => {
  if (!isOpen) return null; // Retorna nada se o modal não estiver aberto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Fechar</button>
        <h2>Configurar Classificação</h2>
        <div className='conteudoLabel'>
          <label>
            Limite A (%):
            <input
              type="number"
              value={limiteA}
              onChange={(e) => handleChangeClassificao(Number(e.target.value), setLimiteA)}
              min="0"
              max="100"
            />
          </label>
          <label>
            Limite B (%):
            <input
              type="number"
              value={limiteB}
              onChange={(e) => handleChangeClassificao(Number(e.target.value), setLimiteB)}
              min="0"
              max="100"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalCurvaABCValor;