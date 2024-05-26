import axios from "axios";

export function IsMobile() {
    // Lógica para determinar se o usuário está em um dispositivo móvel
    return /Mobi|Android/i.test(navigator.userAgent);
}


export const handleLogin = async (email, password, setError) => {
    try {
        const response = await axios.post('http://localhost:4000/Login', {
            email: email,
            password: password
        });

        setError(""); // Clear any previous errors
        //console.log(response.data)
        return [response.data, false];
    } catch (error) {
        if (!error.response || error.response.status === 500) {
            setError("Erro ao acessar o servidor");
            console.log("Erro ao acessar o servidor");
        } else if (error.response.status === 401) {
            setError("Usuário ou senha inválidos");
            console.log("Usuário ou senha inválidos");
        } else {
            setError("Erro desconhecido");
            console.log("Erro desconhecido");
        }
        console.log("Erro durante o login:", error);
        return [null,true];
    }
};

export const handleLogOut = (navigate) => {
    console.log("Deslogando . . . . ");
    localStorage.setItem('User', null);
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
