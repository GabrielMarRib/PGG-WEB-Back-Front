import React from 'react'

function Titulo({ tituloMsg }) {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 172, 18, 0.245)',borderRadius: '0px 0px 20px 20px' }}>
            <h1 className='text-4xl mt-2 mb-2'>{tituloMsg}</h1>
        </div>
    )
}

export default Titulo