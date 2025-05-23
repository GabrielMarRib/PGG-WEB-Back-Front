import React from 'react'

function Titulo({ tituloMsg }) {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,155,63)'}}>
            <h1 style={{color: 'white'}}>{tituloMsg}</h1>
        </div>
    )
}

export default Titulo