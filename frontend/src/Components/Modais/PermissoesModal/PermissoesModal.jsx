import React, { useEffect, useState } from 'react';
import './PermissoesModal.css';
import PermissoesSubModal from '../PermissoesSubModal/PermissoesSubModal';

function PermissoesModal({ fechar, grupoOBJ }) {
  const JSON_permissoes = grupoOBJ.Permissoes;
  const permissoes_edicao = JSON.parse(JSON_permissoes)[grupoOBJ.nome_grupo]["edicao"];
  const permissoes_visualizacao = JSON.parse(JSON_permissoes)[grupoOBJ.nome_grupo]["visualizacao"];
  const [showModal, setShowModal] = useState(false);
  const beautifyJSON = (JSON_Obj, Nome) => {
    const objKeys = Object.keys(JSON_Obj);
    const objValues = Object.values(JSON_Obj);

    return (
      <>
        {showModal && <PermissoesSubModal></PermissoesSubModal>}
        <div className='w-[100%] flex justify-between'>
          <h3>{Nome}</h3>
          <button className='botao' onClick={()=>{setShowModal(true)}}>Editar</button>
        </div>
        <ul>
          {objKeys.map((key, index) => (
            <li key={index}>
              <span>{key}</span>
              <span>
                {objValues[index] ? (
                  <span className="checkmark">✔️</span>
                ) : (
                  <span className="cross">❌</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="PermissoesModal">
      <div className="header-content">
        <div className='header'>
          <h2>Visualização de Permissões do Grupo de Acesso: <u>{grupoOBJ.id_grupo} - {grupoOBJ.nome_grupo}</u></h2>
          <button onClick={fechar} className="botao-fechar">X</button>
        </div>
      </div>
      <div className="conteudo-modal">
        {/* Edição Section */}
        <div className="permissao-section">
          {beautifyJSON(permissoes_visualizacao, "Visualização")}
        </div>

        {/* Visualização Section */}
        <div className="permissao-section">
          {beautifyJSON(permissoes_edicao, "Edição")}
        </div>
      </div>
    </div>
  );

}

export default PermissoesModal;
