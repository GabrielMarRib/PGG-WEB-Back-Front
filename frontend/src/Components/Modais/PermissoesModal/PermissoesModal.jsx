import React, { useEffect, useState } from 'react';
import './PermissoesModal.css';
import PermissoesSubModal from '../PermissoesSubModal/PermissoesSubModal';

function PermissoesModal({ fechar, grupoOBJ }) {
  const JSON_permissoes = grupoOBJ.Permissoes;
  const permissoes = JSON.parse(JSON_permissoes)[grupoOBJ.nome_grupo].permissoes;
  const objKeysClasses = Object.keys(permissoes);
  const admin = grupoOBJ.nome_grupo === "admin";

  const [showModal, setShowModal] = useState(false);

  const allFalse = Object.fromEntries(objKeysClasses.map(key => [key, false]));

  const [showInfo, setShowInfo] = useState(allFalse);

  const [editando, setEditando] = useState(false);

  const defineIcon = (valor) => {
    if (valor)
      return '✔️ '
    return '❌ '
  }

  const Obtem_classe_children = (Classe_key, JSON_Obj) => {
    const paginasbyclass = JSON_Obj[Classe_key]
    const keys_paginasbyclass = Object.keys(paginasbyclass);
    const Values_paginasbyclass = Object.values(paginasbyclass);

    console.log(Values_paginasbyclass)
    return (
      keys_paginasbyclass.map((pagina_AKA_key, index) => (
        <li key={index} className={editando 
        ? `subLIEditando${String(Values_paginasbyclass[index].visualizacao)}${String(Values_paginasbyclass[index].edicao)}` 
        : 'subLI'}
        onClick={() => editando && setShowModal(true)}>
          <span>{pagina_AKA_key}</span>
          <span>
            Visualização: {defineIcon(Values_paginasbyclass[index].visualizacao)}
            Edição: {defineIcon(Values_paginasbyclass[index].edicao)}
          </span>
        </li>
      ))

    )

  }

  const ExibePermissoes = (key) => {
    setShowInfo(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));

  }
  const Monta_Permissoes = () => {

    // const objValues = Object.values(JSON_Obj);

    return (
      <>

        <div className='tituloPermissoes'>
          <h3>Classes de permissões</h3>
          <button className={admin ? 'botaoInativo' : editando ? 'botaoEditando' : 'botao'} onClick={() => { !admin && setEditando(prevState => !prevState) }}>
            {editando ? "Editando Permissões" : "Editar Permissões"}
          </button>
        </div>
        <ul>
          {objKeysClasses.map((key, index) => ( // CLASSES:
            <>
              <li key={index} onClick={() => { ExibePermissoes(key) }}>
                <span>{key}</span>
                <span className='checkmark'>
                  {showInfo[key] ? "˄" : "˅"}
                </span>
              </li>
              {showInfo[key] && //PÁGINAS:
                <ul className='subLIContainer'>
                  {Obtem_classe_children(key, permissoes)}
                </ul>
              }
            </>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="PermissoesModal">
      <div className='Header-e-conteudo'>
        <div className="header-content">
          <div className='header'>
            <div className='subHeader'>
              <h2>Visualização de Permissões do Grupo de Acesso: <u>{grupoOBJ.id_grupo} - {grupoOBJ.nome_grupo}</u></h2>

            </div>
            <button onClick={fechar} className="botao-fechar">X</button>
          </div>
        </div>

        <div className="conteudo-modal">
          {showModal &&
            <PermissoesSubModal
              fechar={() => { setShowModal(false) }}
              grupoOBJ={null}
            />}
          {/* Edição Section */}
          <div className="permissao-section">
            {Monta_Permissoes()}
          </div>

        </div>
      </div>
    </div>
  );

}

export default PermissoesModal;
