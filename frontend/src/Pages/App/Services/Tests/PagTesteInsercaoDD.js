// Como acessar essa página? Acesse em seu navegador: http://localhost:3000/PagTesteInsercao

// Leu e não entendeu porra nenhuma? Fala com a gente

import React, { useEffect, useState } from 'react'

//  useEffect é um Hook que permite executar "efeitos colaterais" em componentes, como essa página.
// "Efeitos colaterais" são operações como busca de dados e manipulação do DOM (mudar a função de algum componente da página dinamicamente),
//  Só é chamado quando o componente (essa página) é renderizada
//  a "dependency array" define quando que esse procedimento deve ser chamado

// useState guarda o estado de objetos dentro do componente (página), fuciona como uma variável


import axios from 'axios'; // axios é utilizado para acessar a internet. (lugar onde tá a nossa api)
import { CheckCamposVazios } from '../../../../Functions/Functions.js';
import { useAlerta } from "../../../../Context/AlertaContext.js";
function PagTesteInsercaoDD() {

    // useStates que interagem com a API:
    const [dados, setDados] = useState([]); // variável useState, iniciando como uma array vazia, pois o que esperamos da api é uma array (sempre será).
    const [categorias, setCategorias] = useState([]); // variável useState sobre as categoriAS, a lista de categorias... iniciando como uma array vazia, pois o que esperamos da api é uma array (sempre será).


    // useStates que interagem com o formulário:
    const { Alerta } = useAlerta();
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null); // useState sobre a CATEGORIA, apenas uma, a categoria selecionada.... aqui esperamos uma coisa só (o código da categoria), por isso, não inicia como array...
    const [codigo, setCodigo] = useState(null); // mesma coisa, esperamos uma coisa só
    const [nome, setNome] = useState(''); // aqui esperamos texto, mas podia ser null também... tanto faz, mas é melhor prática usar o tipo de variável que esperamos aqui.
    const [descricao, setDescricao] = useState('');
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [dataValidade, setDataValidade] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorCompra, setValorCompra] = useState('');
    const [valorVenda, setValorVenda] = useState('');

    //useState que interage com o useEffect de dados gerais
    const [repescarInfo, setRepescarInfo] = useState(false); // inicia como false, e troca de false e true para repescar os dados...


    useEffect(() => { // useEffect para pegar informações da LISTA de categorias...
        const pegaCategorias = async () => { // função existe para separar async do useEffect...
            try {
                const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)                
                    funcao: 'pegacategorias', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
                    senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
                });
                setCategorias(response.data); // coloca a LISTA de categorias em uma useState
                console.log(response.data) // log para sabermos o que foi pego.
            } catch (error) {
                console.log("deu ruim: " + error) // log para sabermos qual foi o erro
            }
        };
        pegaCategorias(); //chama a função
    }, [])

    useEffect(() => { // useEffect para pegar informações gerais...

        const pegaDados = async () => { // criamos uma função para separar a lógica do useEffect em si. damos async para a função, pois o "await" está presente.
            // isso acontece pois o axios terá que acesar a internet para fazer a operação, e isso demanda tempo, e se não esperarmos,
            // o programa "pula" a vez do axios e ele não consegue voltar com a operação...
            try { //tente...
                const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via post (SEMPRE SERÁ POST)
                    funcao: 'pegadadoscomcat', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
                    senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
                });
                setDados(response.data) // coloca as informações que acabou de pegar da api na variável useState
                console.log(response.data) // log para sabermos o que foi pego.
            } catch (error) { //caso erro;
                console.log("deu ruim: " + error) // log para sabermos qual foi o erro
            }
        };

        pegaDados(); //chama a função (até o momento só criamos ela, por isso temos q chamar aqui)

    }, [repescarInfo]) // [] = dependency array, ela vazia  significa que o useEffect vai ser executado uma vez só, apenas quando o componente "montar" ou carregar.
    // aqui colocamos a variável repescarInfo. Quando o valor dela muda, esse useEffect em específico, é ativado novamente. Isso ocorre no onSubmit do form

    const handleChangeCategoria = (e) => { // e significa 'evento' que no caso, é o valor de um 'filho' do select, no caso, na ordem de hierarquia, a única coisa abaixo de select é option.
        const valor = e.target.value; // basicamente o valor do filho do select (option)
        console.log(valor)
        if (valor === 'MandarNullParaO_bd') // aquela jogadinha la embaixo...
            setCategoriaSelecionada(null)   // se o valor pouco importa para o bd, manda null
        else                                // caso contrário
            setCategoriaSelecionada(valor)  // manda o valor pra variável de categoria selecionada
    }
    const handleForm = async (e) => { // e = evento, basicamente algumas informações/propriedades que o formulário tem
        e.preventDefault(); // não deixa a página recarregar (Sim, por default ele faz isso...)
        if(CheckCamposVazios([codigo, nome, dataCompra, quantidade, valorCompra, valorVenda]))
        {
            Alerta(1, "Campos não preenchidos");
            return;
        }

        //inserção de produtos...
        try {
            const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {  // acessa via get (post é usado quando se passa informações mais complexas), por exemplo, passar variáveis para a api, etc.
                //parâmetros da consulta... SÃO necessários.
                funcao: 'insereProduto', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
                senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)

                id: codigo, //nome da esquerda (id), nome que você está mandando pro backend. Nome da direita (codigo), o código q o usuario digitou (o valor)
                nome: nome,
                descricao: descricao,
                codigoBarras: codigoDeBarras, // na api, referenciamos como 'codigoBarras' não 'codigoDeBarras'... Regra: o da esquerda é oq vc manda pra gente do backend
                categoria: categoriaSelecionada //categoria q é selecionada pelo usuario no select...
            });
            
            
            // se a inserção deu OK, ele vai executar os códigos abaixo... (Se deu ruim, vai pro catch direto... Sim, existe uma linha de continuídade, só é bem tênue)
            console.log("resposta da inserção> "+response) // manda a resposta pro console.log pra gente saber o que ta acontecendo...

            //zera os campos
            setCategoriaSelecionada(null);
            setCodigo('');
            setDescricao('');
            setNome('');
            setCodigoDeBarras('');
            setDataCompra('');
            setDataValidade('');
            setQuantidade('');
            setValorCompra('');
            setValorVenda('');
            
            //REPESCAR INFORMAÇÕES (ATUALIZAR TABELA)
            setRepescarInfo(prevState => !prevState); // variável fica na dependency array do useEffect que busca as informações da tabela. Quando o valor é mudado,
                                                      // o useEffect é triggered de novo, pois ESSA variável está na dependency array.
            // prevState => !prevState inverte um valor booleano. Se era false, vira true, se era true, vira false. Isso só para repescarmos a informação.
        } catch (error) {
            console.log("deu ruim: " + error) // log para sabermos qual foi o erro
        }
    }
    return ( //html...
        <div>PagTeste
            <table border="1">
                <thead>
                    <tr>
                        <th>Código</th>         {/*informaçõs fixas, e as chaves definem elementos jsx (código) que conseguimos implantar diretamente no html*/}
                        <th>Nome</th>
                        <th>descricao</th>
                        <th>codigo de barras</th>
                        <th>categoria</th>
                        <th>categoria Id</th>
                        <th>Subcategoria Id</th>
                        <th>Nº Lote</th>
                        <th>Data da compra</th>
                        <th>Data de validade</th>
                        <th>Quantidade</th>
                        <th>Valor de compra</th>
                        <th>Valor de venda</th>
                    </tr>
                </thead>
                <tbody>
                    {dados?.map((item) => (    // mapeia cada item... (foreach)
                        <tr key={item.id_produtos}> {/* a key é sempre o id, você descobre o nome que demos utilizando o console.log e vendo a estrutura. nesse caso foi id_produtos */}
                            <td>{item.id_produtos}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{
                                item.codigodebarras === null ? "Não possui" : item.codigodebarras
                            }</td>
                            <td>{item.nomeCat === null ? "Não possui" : item.nomeCat}</td>
                            <td>{item.categoria === null ? "Não possui" : item.categoria}</td>
                            <td>{item.idSubCat === null ? "Não possui" : item.idSubCat}</td>
                        </tr>
                    ))}
                    {/* e fim, é assim que é feito uma busca de api... dúvidas, me chamem bbs. */}
                </tbody>
            </table>

            <div className='input'> {/* Como adicionar informação (e atualizar) */}
                <br></br> {/* quebra de linha kk */}
                <form onSubmit={(e) => handleForm(e)}> {/* IMPORTANTE!! quando o botão é acionado, o onSubmit é ativado, por isso que não tem onClick no botao...  */}

                    <select
                        value={categoriaSelecionada} // utiliza no select, o valor da categoria (quando vc mandar o form, ele vai pegar o valor do select, não do option, então coloca essa poha)
                        onChange={handleChangeCategoria} // quando ouver mudança... (quando o usuario clicar em alguma opção...), ele aciona a função handleChangeCategoria (nomenclatura em ingles pq tecnicamente é o correto)
                    >
                        <option value="MandarNullParaO_bd">Escolha uma categoria</option> {/* value significa o valor que aquela opção no select possui, no caso, aqui, essa opção tem um valor que é uma mensagem (string) escrita, que facilita a nossa vida */}
                        <option value="MandarNullParaO_bd">Não possui categoria</option>  {/* pq facilita a vida? pq essas informações, seja "escolha uma categoria" ou "não possui categoria", não tem nenhuma informação realmente útil para o bd...
                                                                                            pois podemos facilmente só utilizar null no lugar delas, mas aqui resolvi marcar com uma msg para ficar mais claro o intuito...*/}

                        {categorias?.map((categoria) => ( // para cada cadegoria no objeto de categorias.... (sim quando você faz variavel.map(item) => ...) você quer dizer um foreach, então imaginem que isso quer dizer: Para cada categoria em categorias, faça:  )
                            <option key={categoria.id_categorias} value={categoria.id_categorias}> {categoria.id_categorias} - {categoria.nome}</option> // exibe o id e o nome da categoria (de cada uma)
                        ))} {/* key pq o react é chato, só manda o id do item q ta OK. O value (nesse caso) é algo que importa para o bd, que pede apenas o número da categoria, por isso que no value tem só o id (número da categoria) */}
                    </select>

                    {/* inputs... */}
                    <input
                        type="number"
                        id="novoInput"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Código"
                        style={{ width: '120px' }}
                    />
                    <input
                        type="text"
                        id="novoInput"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome do produto"
                    />
                    <input
                        type="text"
                        id="novoInput"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do produto"
                    />
                    <input
                        type="text"
                        id="novoInput"
                        value={codigoDeBarras}
                        onChange={(e) => setCodigoDeBarras(e.target.value)}
                        placeholder="Código de barras"
                        mask="9999999999999"
                    />

                    <input
                        type="date"
                        id="novoInput"
                        value={dataCompra}
                        onChange={(e) => setDataCompra(e.target.value)}
                        placeholder="Data da Compra"
                    />

                    <input
                        type="date"
                        id="novoInput"
                        value={dataValidade}
                        onChange={(e) => setDataValidade(e.target.value)}
                        placeholder="Data de Validade"
                    />

                    <input
                        type="int"
                        id="novoInput"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        placeholder="Quantidade do Produto"
                    />

                    <input
                        type="number"
                        id="novoInput"
                        value={valorCompra}
                        onChange={(e) => setValorCompra(e.target.value)}
                        placeholder="Valor da Compra"
                        style={{ width: '120px' }}
                    />

                    <input
                        type="number"
                        id="novoInput"
                        value={valorVenda}
                        onChange={(e) => setValorVenda(e.target.value)}
                        placeholder="Valor da Venda"
                        style={{ width: '120px' }}
                    />

                    <button>
                        Enviar {/* o onsubmit cuida quando o botão é clicado, pule para a linha 150 para saber oq acontece */}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default PagTesteInsercaoDD // exporta a página, até o momento ela só existia