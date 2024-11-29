import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';


function Email() {

    const user = {email_q_envia: "rigeltechtcc@gmail.com", nome: "sexo"}
    const handleclick = async () => {
        const resposta = await axios.post('http://localhost:4000/email', {
            email_q_recebe: "acessofull92@gmail.com",
            assunto: "Ô buceta",
            body: "KKKKKKK se fodeu",
            userObj: user
        });
        console.log(resposta)
    }

    return (
        <div>
            email
            <button onClick={() => { handleclick() }}>enviar email kkkkkkkkk</button>

        </div>

    )
}

export default Email