import React from 'react'
import "./PermissoesSubModal.css"
function PermissoesSubModal({ fechar }) {

  return (
    <div className='PermissoesSubModal'>
      <div className='conteudo-modal'>
        <button onClick={fechar}>X</button>
        I WATCHED A CHANGEEE IN YOOOOU
      </div>
    </div>
  )
}

export default PermissoesSubModal
