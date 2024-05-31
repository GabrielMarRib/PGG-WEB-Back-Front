import axios from "axios";

export function IsMobile() {
    // Lógica para determinar se o usuário está em um dispositivo móvel
    return /Mobi|Android/i.test(navigator.userAgent);
}

export const handleLogin = async (email, password) => {
    let msg = "";
    try {
        const response = await axios.post('http://localhost:4000/Login', {
            email: email,
            password: password
        });
        return [response.data, false, "Logado com sucesso"];
    } catch (error) {
        if (!error.response || error.response.status === 500) {
            msg = ("Erro ao acessar o servidor");
            console.log("Erro ao acessar o servidor");
        } else if (error.response.status === 401) {
            msg = ("Usuário ou senha inválidos");
            console.log("Usuário ou senha inválidos");
        } else {
            msg = ("Erro desconhecido");
            console.log("Erro desconhecido");
        }
        console.log("Erro durante o login:", error);
        return [null, true, msg];
    }
};

export const handleAdicionarUser = async (nome, cpf, email, telefone, acesso, userRequisitado) => {
    if(!userRequisitado)
        return;
    else if(userRequisitado.userData.Nivel_acesso != 2){
        alert("irmao vc nao tem permissao pra isso nao kkkkk")
        return;
    }
        
    let msg = "";
    try {
        const response = await axios.post('http://localhost:4000/CriarFuncionario', {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            acesso: acesso
        });
        console.log(response.data.message)
        return [response.data.message, false];

    } catch (error) {
        if (!error.response) {
            msg = "Erro ao acessar o servidor";
            console.log(msg);
        } else {
            switch (error.response.status) {
                case 500:
                    msg = error;
                    break;
                default:
                    msg = "Erro desconhecido";
            }
        }
        console.error("Erro durante o login:", error);
        return [msg, true];
    }
}

export const handleRedefinirSenha = async (email) => {
    let msg = "";
    try {
        const response = await axios.post('http://localhost:4000/RedefinirSenha', {
            email: email
        });
        console.log(response.data.message)
        return [response.data.message, false];

    } catch (error) {
        if (!error.response) {
            msg = "Erro ao acessar o servidor";
            console.log(msg);
        } else {
            switch (error.response.status) {
                case 400:
                    msg = "Email inválido inserido";
                    break;
                case 404:
                    msg = "Email não encontrado na base de dados";
                    break;
                case 500:
                    msg = "Erro ao acessar o servidor";
                    break;
                default:
                    msg = "Erro desconhecido";
            }
        }
        console.error("Erro durante o login:", error);
        return [msg, true];
    }
}
export const handleLogOut = (navigate) => {
    console.log("Deslogando . . . . ");
    setTimeout(() => {
        localStorage.setItem('User', null);
        window.location.reload();
    }, 1);
    navigate('/PagLogin');
}


export const TrocarloginEsquecerSenha = (setMostrarLogin, mostrarLogin) => {
    setMostrarLogin(!mostrarLogin);
}


export const apagarCampos = (setOBJ) => {
    if (!Array.isArray(setOBJ)) // se só foi informado um campo
    {
        setOBJ("");
        return;
    }
    setOBJ.forEach((obj) => {
        obj("");
    })
}

export const CheckCamposVazios = (campos) => {
    if (!Array.isArray(campos)) // se só foi informado um campo
        return campos === "";

    for (let i = 0; i < campos.length; i++) { // se foi informado mais de um campo, looping para checar todos
        if (campos[i] === "")
            return true
    }
    return false;
}

export const CheckCamposNulos = (campos) => {
    if (!Array.isArray(campos)) // se só foi informado um campo
        return campos === 0 || campos === null;

    for (let i = 0; i < campos.length; i++) { // se foi informado mais de um campo, looping para checar todos
        if (campos[i] === 0 || campos[i] === null)
            return true
    }
    return false;
}


export const exibeMsg = async (setMsg, conteudo, tempo, erro, SetStyle) => {
    return new Promise((resolve) => { // Promise que representa se o código foi concluído ou não
        if (!erro) {
            SetStyle("mensagem-acerto");
            setMsg(conteudo);
            setTimeout(() => {
                setMsg("");
                SetStyle("");
                resolve(); // O código foi concluído depois de esperar pelo tempo especificado
            }, tempo); // Isso será executado após o tempo especificado
        } else {
            SetStyle("mensagem-erro");
            setMsg(conteudo);
            setTimeout(() => {
                setMsg("");
                SetStyle("");
                resolve(); // O código foi concluído depois de esperar pelo tempo especificado
            }, tempo); // Isso será executado após o tempo especificado
        }
    });
};
