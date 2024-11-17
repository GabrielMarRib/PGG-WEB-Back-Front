import axios from "axios";
// talvez esse arquivo sirva pra servir as permissoes pro contexto, idk don't ask me
// serve sim, ask me

export const pegaPermissoesTotais = async () => {
    try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
            funcao: 'SelectGrupoAcesso',
            senha: '@7h$Pz!q2X^vR1&K'
        });
        return(response.data);
    } catch (error) {
        console.log("deu ruim: " + error)
    }
};
export const pegaPermissoesWHERE = async (where, context) => {
    try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
            funcao: 'SelectPermissoesWhere',
            senha: '@7h$Pz!q2X^vR1&K',
            id: Number(where)
        });
        if(context) return({data: response.data[0].Permissoes, nome: response.data[0].nome_grupo });
        return response.data[0]
            
    } catch (error) {
        console.log("deu ruim: " + error)
    }
};

export const checaPermissaoVisualizacao = (permissao, chavePermissao, intent) =>{
    const permissaoParse = JSON.parse(permissao)
    const possivel = permissaoParse[chavePermissao].visualizacao[intent];
    console.log(possivel)
    return possivel
}


