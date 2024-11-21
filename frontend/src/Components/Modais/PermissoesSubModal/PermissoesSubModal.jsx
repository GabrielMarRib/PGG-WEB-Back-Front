import React from 'react'
import "./PermissoesSubModal.css"
function PermissoesSubModal({ fechar, grupoOBJ }) {
  const permissoes_visualizacao = JSON.parse(grupoOBJ?.Permissoes)[grupoOBJ?.nome_grupo]["visualizacao"] || null;

  const beautifyJSON = (JSON_Obj, Nome) => {
    const objKeys = Object.keys(JSON_Obj);
    const objValues = Object.values(JSON_Obj);

    return (
      <>

        <div className='w-[100%] flex justify-between'>
          <h3>{Nome}</h3>
        </div>
        <ul>
          {objKeys.map((key, index) => (
            <li key={index}>
              <span>{key}</span>
              <p>Edição</p>
              <select value={objValues[index]}>
                <option value={true}>Habilitado</option>
                <option value={false}>Desabilitado</option>
              </select>
              <p>Visualização</p>
              <select value={objValues[index]}>
                <option value={true}>Habilitado</option>
                <option value={false}>Desabilitado</option>
              </select>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className='PermissoesSubModal'>
      <div className='conteudo-modal'>
        <button onClick={fechar}>X</button>
        I WATCHED A CHANGEEE IN YOOOOU

        {beautifyJSON(permissoes_visualizacao, "Edição")}
      </div>
    </div>
  )
}

export default PermissoesSubModal
