// Como acessar essa página? Acesse em seu navegador: http://localhost:3000/PagTeste

// Leu e não entendeu porra nenhuma? Fala com a gente

import React, { useEffect, useState } from 'react'

//  useEffect é um Hook que permite executar "efeitos colaterais" em componentes, como essa página.
// "Efeitos colaterais" são operações como busca de dados e manipulação do DOM (mudar a função de algum componente da página dinamicamente),
//  Só é chamado quando o componente (essa página) é renderizada
//  a "dependency array" define quando que esse procedimento deve ser chamado

// useState guarda o estado de objetos dentro do componente (página), fuciona como uma variável


import axios from 'axios'; // axios é utilizado para acessar a internet. (lugar onde tá a nossa api)

function PagTeste() {

    const [dados, setDados] = useState([]); // variável useState, iniciando como uma array vazia, pois o que esperamos da api é uma array (sempre será).

    useEffect(() => { // useEffect...

        const pegaDados = async () => { // criamos uma função para separar a lógica do useEffect em si. damos async para a função, pois o "await" está presente.
            // isso acontece pois o axios terá que acesar a internet para fazer a operação, e isso demanda tempo, e se não esperarmos,
            // o programa "pula" a vez do axios e ele não consegue voltar com a operação...

            try { //tente...
                const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
                  //parâmetros da consulta... SÃO necessários.
                        funcao: 'pegadados', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
                        senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
                });
                setDados(response.data) // coloca as informações que acabou de pegar da api na variável useState
                console.log(response.data) // log para sabermos o que foi pego.
            } catch (error) { //caso erro;
                console.log("deu ruim: " + error) // log para sabermos qual foi o erro
            }
        };


        pegaDados(); //chama a função (até o momento só criamos ela, por isso temos q chamar aqui)

    }, []) // [] = dependency array, ela vazia  significa que o useEffect vai ser executado uma vez só, apenas quando o componente "montar" ou carregar.
    // caso aqui estivesse a variável useState de dados, caso o valor dela mude, o useEffect é chamado de novo.

    return ( //html...
        <div>PagTeste
            <table border="1">
                <thead>
                    <tr>
                        <th>id</th>         {/*informaçõs fixas, e as chaves definem elementos jsx (código) que conseguimos implantar diretamente no html*/}
                        <th>descricao</th>
                        <th>Nome</th>
                        <th>codigo de barras</th>
                    </tr>
                </thead>
                <tbody>
                    {dados?.map((item) => (    // mapeia cada item...
                        <tr key={item.id_produtos}> {/* a key é sempre o id, você descobre o nome que demos utilizando o console.log e vendo a estrutura. nesse caso foi id_produtos */}
                            <td>{item.id_produtos}</td>
                            <td>{item.descricao}</td>
                            <td>{item.nome}</td>
                            <td>{
                                item.codigodebarras === null ? "Não possui" : item.codigodebarras
                            }</td>
                        </tr>
                    ))}
                    {/* e fim, é assim que é feito uma busca de api... dúvidas, me chamem bbs. */}
                </tbody>
            </table>
        </div>
    )
}

export default PagTeste // exporta a página, até o momento ela só existia