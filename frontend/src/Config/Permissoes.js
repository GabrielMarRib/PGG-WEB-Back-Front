import axios from "axios";
import { useEffect, useState } from "react";

function Permissoes() {
// talvez esse arquivo sirva pra servir as permissoes pro contexto, idk don't ask me
const [permissoesBD, setPermissoesBD] = useState([])
useEffect(()=>{
    const pegaPermissoes = async () => { 
        try {
            const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  
                funcao: 'SelectGrupoAcesso', 
                senha: '@7h$Pz!q2X^vR1&K'
            });
            setPermissoesBD(response.data.Permissoes); 
            console.log(`dados do bd (permissoes) ${response}`) 
        } catch (error) {
            console.log("deu ruim: " + error) 
        }
    };
    pegaPermissoes(); 
},[])


const permissoesBase = {
    permissoes: {
        ...permissoesBD,
        department_1: {
            edicao: {
                estoque: {
                    Inventario: true,
                    AddProdutos: true,
                    Baixa: true,
                    GerirCategorias: false,
                    GerirLotes: false,
                    MostrarMovimentos: true,
                    ImportarPlanilha: false,
                    CadastroFornecedor: false,
                    EncomendaProdutos: true
                },
                curva: {
                    CurvaFrequencia: false,
                    CurvaValor: true
                },

            },
            visualizacao: {
                estoque: {
                    Inventario: false,
                    AddProdutos: false,
                    Baixa: true,
                    GerirCategorias: false
                },
                curva: {
                    CurvaFrequencia: true,
                    CurvaValor: false
                }
            }
        }
    }
};
return {
    permissoesBase
}


}


export default Permissoes