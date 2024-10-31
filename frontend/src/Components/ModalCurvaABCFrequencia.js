import '../Styles/App/Service/ModalCurvaABC.css';

const ModalCurvaABCFrequencia = ({ isOpen, onClose, classeA, setClasseA, classeB, setClasseB, handleChangeClassificao }) => {
  if (!isOpen) return null; // Retorna nada se o modal não estiver aberto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Fechar</button>
        <h2>Configurar Classificação</h2>
        <div className='conteudoLabel'>
          <label className='label'>
            Limite A (%):
            <input
              type="number"
              value={classeA}
              onChange={(e) => handleChangeClassificao(Number(e.target.value), setClasseA)}
              min="0"
              max="100"
            />
          </label>
          <label className='label'>
            Limite B (%):
            <input
              type="number"
              value={classeB}
              onChange={(e) => handleChangeClassificao(Number(e.target.value), setClasseB)}
              min="0"
              max="100"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalCurvaABCFrequencia;