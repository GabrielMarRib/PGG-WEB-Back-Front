import React from 'react';
import './PermissoesModal.css';

function PermissoesModal({ fechar, grupoOBJ }) {
  const JSON_permissoes = grupoOBJ.Permissoes;
  const permissoes_edicao = JSON.parse(JSON_permissoes)[grupoOBJ.nome_grupo]["edicao"];
  const permissoes_visualizacao = JSON.parse(JSON_permissoes)[grupoOBJ.nome_grupo]["visualizacao"];

  const beautifyJSON = (JSON_Obj, Nome) => {
    const objKeys = Object.keys(JSON_Obj);
    const objValues = Object.values(JSON_Obj);

    return (
      <>
        <h3>{Nome}</h3>
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
          {beautifyJSON(permissoes_edicao, "Edição")}
        </div>

        {/* Visualização Section */}
        <div className="permissao-section">
          {beautifyJSON(permissoes_visualizacao, "Visualização")}
        </div>
      </div>
    </div>
  );

}

export default PermissoesModal;
