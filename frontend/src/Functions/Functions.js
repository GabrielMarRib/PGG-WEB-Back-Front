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
export const PegaDadosGeralDB = async (setDadoOBJ) => {  // Função de pegar os dados... Recebe um Obj de UseState, mas especificamente um SET
    try {
        const response = await axios.get('http://localhost:4000/PegaProdutos'); //espera a resposta do axios na url...
        const estoqueData = response.data.map(item => ({ id: item.id, ...item })); // mapeia os itens
        setDadoOBJ(estoqueData); // seta os dados no setState solicidado (o q foi passado por parametro)
        console.log(estoqueData)
    } catch (error) {
        console.error('erro pegando os dados mlk doido: ', error);
    }
};
export const PegadadosVALOR = async (setDadoOBJ) => {  // Função de pegar os dados... Recebe um Obj de UseState, mas especificamente um SET
    try {
        const response = await axios.get('http://localhost:4000/PegadadosCurvaABC'); //espera a resposta do axios na url...
        const estoqueData = response.data.map(item => ({ id: item.id, ...item })); // mapeia os itens
        setDadoOBJ(estoqueData); // seta os dados no setState solicidado (o q foi passado por parametro)
        console.log(estoqueData)
    } catch (error) {
        console.error('erro pegando os dados mlk doido: ', error);
    }
};
export const traduzData = (item) => {
    if (item?.data?.Data_Venda) {
        const data = item.data.Data_Venda;
        const segundos = data._seconds
        const nanoseg = data._nanoseconds
        return segundos * 1000 + nanoseg / 1000000;
    }
}
export const exibeData = (item) => {
    if (item?.data?.Data_Venda) {
        const dataCrua = traduzData(item)
        const dataOK = new Date(dataCrua).toLocaleString('pt-BR')
        return dataOK
    }
}

export const pegaDadosPP = async (setDadoOBJ) => {
    try {
        const response = await axios.get('http://localhost:4000/pegaPontoDePedido')
        const PPData = response.data.map(item => ({ id: item.id, ...item }));
        setDadoOBJ(PPData)
        console.log(PPData)
    } catch (erro) {
        console.error('Error fetching data:', erro);
    }
};

export const handleAdicionarUser = async (nome, cpf, email, telefone, acesso, userRequisitado) => {
    if (!userRequisitado)
        return;

    let msg = "";
    try {
        const response = await axios.post('http://localhost:4000/CriarFuncionario', {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            acesso: acesso
        });
        const id = response.data.id;
        
        const responseMysql = await axios.post('http://localhost:80/php/', {
            funcao: 'insereUser', 
            senha: '@7h$Pz!q2X^vR1&K',
            id: id,
            CPF: cpf,
            Celular: telefone,
            Email: email,
            Grupo_Acesso: acesso,
            Nome: nome
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });

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

const NullifyLocalStorage = (itens) =>{
    itens.forEach((item) =>{
        localStorage.setItem(item,null)
    })
}

export const handleLogOut = (navigate) => {
    console.log("Deslogando . . . . ");
    setTimeout(() => {
        NullifyLocalStorage(['User','Permissoes','classeA','classeB','limiteA','limiteB','userAvatar'])
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

export const RelatorioPP = async () => {
    const response = await axios.post('http://localhost:80/php/', {
        funcao: 'pegaRelatorioPP', 
        senha: '@7h$Pz!q2X^vR1&K',
    },
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
      },
    });
    return (response.data)
}

export const RelatorioVendas = async () => {
    const response = await axios.post('http://localhost:80/php/', {
        funcao: 'pegaRelatorioVendas', 
        senha: '@7h$Pz!q2X^vR1&K',
    },
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
      },
    });
    return Array.isArray(response.data) ? response.data : [];
}

export const pegaCategorias = async (setOBJ) =>{

    try { //tente...
        const response = await axios.post('http://localhost:80/php/', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
            funcao: 'pegacategorias', 
            senha: '@7h$Pz!q2X^vR1&K',
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        console.log(response.data) 
        setOBJ(response.data) 
    } catch (error) { 
        console.log("deu ruim: " + error) 
    }
    //const response = await axios.get('http://localhost:4000/pegaCategoriasCSub')
   
}

export const VerificaCategorias = async (SubCat, Result) =>{
    try { 
        const response = await axios.post('http://localhost:80/php/', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
                funcao: 'verificacategorias', 
                senha: '@7h$Pz!q2X^vR1&K',
                subCat: SubCat // ( Exemplo: 1, 2 ) Vou pegar por Id
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        Result(response.data) 
    } catch (error) { 
        console.log("Falha: " + error) 
    }
}

export const insereHistorico = async (info) =>{
    try { 
        if(!info.valores_novo){
            return false;
        }

        const response = await axios.post('http://localhost:80/php/', { 
            funcao: "insereHistorico",
            senha: '@7h$Pz!q2X^vR1&K',
            campos: info.campos,
            valores_antigo: info.valores_antigo,
            valores_novo: info.valores_novo,
            id_user: info.id_user,
            justificativa: info.justificativa,
            idTabela: info.idTabela,
            nomeTabela: info.nomeTabela,
            aux: info?.aux ?? null
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        console.log(response)
        return (response.status === 200)
    } catch (error) { 
        console.log("Falha: " + error) 
    }
}

