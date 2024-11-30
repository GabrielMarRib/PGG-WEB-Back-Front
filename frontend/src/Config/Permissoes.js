import axios from "axios";
// talvez esse arquivo sirva pra servir as permissoes pro contexto, idk don't ask me
// serve sim, ask me

export const pegaPermissoesTotais = async () => {
    try {
        const response = await axios.post('http://discordia.com.br/', {
            funcao: 'SelectGrupoAcesso',
            senha: '@7h$Pz!q2X^vR1&K'
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        return(response.data);
    } catch (error) {
        console.log("deu ruim: " + error)
        return null;
    }
};
export const pegaPermissoesWHERE = async (where, context) => {
    try {
        const response = await axios.post('http://discordia.com.br/', {
            funcao: 'SelectPermissoesWhere',
            senha: '@7h$Pz!q2X^vR1&K',
            id: Number(where)
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        if(context) return({data: response.data[0].Permissoes, nome: response.data[0].nome_grupo });
        return response.data[0]

    } catch (error) {
        console.log("deu ruim: " + error)
        return null;
    }
};

export const checaPermissaoVisualizacao = (permissao, role, intent) =>{
    const permissaoParse = JSON.parse(permissao)
    const check = permissaoParse[role].permissoes[intent.class][intent.intentPage].visualizacao
    return check
}


