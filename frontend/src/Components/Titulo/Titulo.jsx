import React from 'react'

function Titulo({ tituloMsg }) {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(30, 41, 59, 0.9)',borderRadius: '0px 0px 20px 20px' }}>
            <h1 style={{color: 'white'}}>{tituloMsg}</h1>
        </div>
    )
}

export default Titulo