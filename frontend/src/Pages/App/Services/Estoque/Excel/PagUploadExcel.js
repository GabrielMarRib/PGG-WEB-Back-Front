import React, { useState, useEffect, useContext } from 'react';
import "./PagUploadExcel.css";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as XLSX from 'xlsx'; // Novo pacote npm no Front para manipular arquivos Excel (npm install xlsx)
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import { UserContext } from "../../../../../Context/UserContext.js";
import DownloadExcel from '../../../../../Components/Excel_Download/DownloadExcel.jsx';
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";

function PagUploadExcel() {
    const { Alerta } = useAlerta();
    const [nomeArquivo, setNomeArquivo] = useState(""); // Estado para armazenar o nome do arquivo Excel
    const [dadosImportados, setDadosImportados] = useState([]); // Estado para guardar os dados importados
    const [importacoes, setImportacoes] = useState([]); // Estado para armazenar as importações salvas
    const [carregando, setCarregando] = useState(true); // Estado de controle de carregamento
    const [importacaoExpandida, setImportacaoExpandida] = useState(null); // Estado para controlar qual importação está expandida
    const [paginaAtual, setPaginaAtual] = useState(1); // Página atual para a tabela de importações
    const [registrosPorPagina, setRegistrosPorPagina] = useState(10); // Registros por página para a tabela de importações
    const [paginaAtualExpandida, setPaginaAtualExpandida] = useState(1); // Página atual para a tabela expandida
    const [registrosPorPaginaExpandida, setRegistrosPorPaginaExpandida] = useState(10); // Registros por página para a tabela expandida
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [importacaoParaDeletar, setImportacaoParaDeletar] = useState(null);
    const [nomeArquivoDeletar, setNomeArquivoDeletar] = useState(""); // Estado para armazenar o nome do arquivo a ser deletado
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

    const navigate = useNavigate();

    // Função responsável por buscar as importações salvas no banco de dados
    const buscarImportacoes = async () => {
        setCarregando(true);
        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "buscarImportacoes"
            });

            if (resposta.data && resposta.data.importacoes) {
                setImportacoes(resposta.data.importacoes);

                if (resposta.data.importacoes.length === 0) {
                    Alerta(1, "Nenhuma importação encontrada.");
                }
            } else {
                console.log("Formato inesperado da resposta:", resposta.data);
            }
        } catch (error) {
            console.log("Erro ao buscar importações:", error.response ? error.response.data : error.message);
            Alerta(3, "Erro ao carregar as importações. Tente novamente mais tarde.");
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarImportacoes();
    }, []);

    // Função que lida com o upload do arquivo Excel
    const lidarComUploadArquivo = (evento) => {
        const arquivo = evento.target.files[0]; // Captura o arquivo selecionado
        if (!arquivo) return;

        const extensaoArquivo = arquivo.name.split('.').pop().toLowerCase();
        if (!['xls', 'xlsx'].includes(extensaoArquivo)) {
            Alerta(1, "Formato de arquivo inválido. Por favor, envie um arquivo .xls ou .xlsx.");
            return;
        }

        if (arquivo) {
            setNomeArquivo(arquivo.name); // Armazena o nome do arquivo
            const leitor = new FileReader();

            // Quando o leitor termina de carregar o arquivo, processa os dados
            leitor.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' }); // Lê o arquivo como binário
                const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Pega a primeira aba da planilha
                let dadosDaPlanilha = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Converte para JSON com cabeçalho

                // Verifique se a primeira linha está duplicada
                if (dadosDaPlanilha.length > 1 && JSON.stringify(dadosDaPlanilha[0]) === JSON.stringify(dadosDaPlanilha[1])) {
                    dadosDaPlanilha.shift(); // Remove a primeira linha de cabeçalhos duplicados
                }

                // Converte dt_compra para formato YYYY-MM-DD
                for (let i = 1; i < dadosDaPlanilha.length; i++) { // Começa em 1 para ignorar o cabeçalho
                    const row = dadosDaPlanilha[i];
                    if (row[5]) { // Verifica se a data existe na coluna dt_compra (índice 5)
                        const excelTimestamp = row[5];
                        console.log(excelTimestamp)
                        const date = new Date((excelTimestamp - (25567 + 2)) * 86400 * 1000);
                        const formattedDate = date.toISOString().split('T')[0]; // Converte para YYYY-MM-DD
                        row[5] = formattedDate; // Atualiza a data na linha
                    }
                }

                console.log(dadosDaPlanilha);
                setDadosImportados(dadosDaPlanilha); // Armazena os dados importados no estado
            };

            leitor.readAsBinaryString(arquivo); // Lê o arquivo como string binária
        }
    };


    // Função que envia os dados da planilha importada para o servidor
    const lidarComSubmit = async () => {
        if (dadosImportados.length === 0) {
            Alerta(1, "Nenhum dado importado para enviar."); // Exibe um alerta de erro
            return;
        }
        console.log("Enviando os seguintes dados para o servidor:", dadosImportados);
        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "uploadDados",
                dados: dadosImportados,
                nome_arquivo: nomeArquivo
            });

            Alerta(2, "Dados importados com sucesso!"); // Alerta de sucesso
            buscarImportacoes(); // Atualiza a lista de importações
            setNomeArquivo("");
            setDadosImportados([]);
            document.getElementById('upload-arquivo').value = ""; // Reseta o campo de upload
        } catch (error) {
            Alerta(3, "Erro ao enviar dados."); // Alerta de erro
            console.log("Erro ao enviar dados:", error.response ? error.response.data : error.message);
        }
    };

    const mudarRegistrosPorPaginaExpandida = (e) => {
        setRegistrosPorPaginaExpandida(Number(e.target.value));
        setPaginaAtualExpandida(1); // Resetar para a primeira página ao mudar a quantidade de registros por página
    };


    const lidarComDeletar = (id) => {
        const importacao = importacoes.find(importacao => importacao.id === id); // Busca a importação
        setNomeArquivoDeletar(importacao.nome_arquivo); // Armazena o nome do arquivo
        setImportacaoParaDeletar(id);
        setMostrarPopup(true);
    };

    const confirmarDelecao = async () => {
        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "deletarImportacao",
                id: importacaoParaDeletar
            });

            Alerta(2, "Importação deletada com sucesso!");
            console.log("Importação deletada com sucesso:", resposta.data);
            setImportacoes((prevImportacoes) =>
                prevImportacoes.filter(importacao => importacao.id !== importacaoParaDeletar)
            );
        } catch (error) {
            Alerta(3, "Erro ao deletar importação.");
            console.log("Erro ao deletar importação:", error.response ? error.response.data : error.message);
        } finally {
            setMostrarPopup(false);
            setImportacaoParaDeletar(null);
        }
    };

    const enviarParaEstoque = async (id) => {
        const importacao = importacoes.find(importacao => importacao.id === id);
        if (!importacao) return;

        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "inserirProdutosJson",
                id_importacoes: id,
                id_usuario: User.id
            });

            Alerta(2, "Dados enviados para o estoque com sucesso!");
        } catch (error) {
            Alerta(3, "Erro ao enviar dados para o estoque.");
            console.log("Erro ao enviar para o estoque:", error.response ? error.response.data : error.message);
        }
    };

    const cancelarDelecao = () => {
        setMostrarPopup(false);
        setImportacaoParaDeletar(null);
    };

    // Função para calcular os dados visíveis na tabela de importações com paginação
    const calcularDadosPaginados = (dados, paginaAtual, registrosPorPagina) => {
        const indiceUltimoRegistro = paginaAtual * registrosPorPagina;
        const indicePrimeiroRegistro = indiceUltimoRegistro - registrosPorPagina;
        return dados.slice(indicePrimeiroRegistro, indiceUltimoRegistro);
    };

    // Função para mudar a página da tabela de importações
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    // Função para mudar a página da tabela expandida
    const mudarPaginaExpandida = (novaPagina) => {
        setPaginaAtualExpandida(novaPagina);
    };

    // Função para alterar a quantidade de registros por página na tabela de importações
    const mudarRegistrosPorPagina = (e) => {
        setRegistrosPorPagina(Number(e.target.value));
        setPaginaAtual(1);
    };

    // Função que renderiza a tabela expandida com paginação
    const formatarDadosImportacao = (dados) => {
        if (dados.length === 0) return null; // Não renderiza nada se não houver dados

        const dadosPaginados = calcularDadosPaginados(dados, paginaAtualExpandida, registrosPorPaginaExpandida);

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {dados[0] && dados[0].map((cabecalho, index) => (
                                <th key={index}>{cabecalho}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dadosPaginados.slice(1).map((linha, index) => ( // Começa do índice 1 para evitar o cabeçalho duplicado
                            <tr key={index}>
                                {linha.map((celula, indiceCelula) => (
                                    <td key={indiceCelula}>{celula}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Controles de paginação para a tabela expandida */}
                <div className="paginacao">
                    <div className="paginacaoLbl">
                        <label htmlFor="registrosPorPaginaExpandida">Registros por página:</label>
                        <select id="registrosPorPaginaExpandida" value={registrosPorPaginaExpandida} onChange={mudarRegistrosPorPaginaExpandida}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="paginacaoBtn">
                        <button
                            onClick={() => mudarPaginaExpandida(paginaAtualExpandida - 1)}
                            disabled={paginaAtualExpandida === 1}
                        >
                            Anterior
                        </button>
                        <span>{`Página ${paginaAtualExpandida}`}</span>
                        <button
                            onClick={() => mudarPaginaExpandida(paginaAtualExpandida + 1)}
                            disabled={paginaAtualExpandida * registrosPorPaginaExpandida >= dados.length}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    // Função que renderiza a tabela de importações com paginação
    const formatarTabelaImportacoes = () => {
        const dadosPaginados = calcularDadosPaginados(importacoes, paginaAtual, registrosPorPagina);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Arquivo</th>
                            <th>Data de Importação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosPaginados.map((importacao) => (
                            <tr key={importacao.id}>
                                <td>{importacao.id}</td>
                                <td
                                    onClick={() => setImportacaoExpandida(importacao.id)}
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {importacao.nome_arquivo}
                                </td>
                                <td>{new Date(importacao.data_importacao).toLocaleString()}</td>
                                <td>
                                    <button className="btn-deletar" onClick={() => lidarComDeletar(importacao.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Controles de paginação para a tabela de importações */}
                <div className="paginacao">
                    <div className="paginacaoLbl">
                        <label htmlFor="registrosPorPagina">Registros por página:</label>
                        <select id="registrosPorPagina" value={registrosPorPagina} onChange={mudarRegistrosPorPagina}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="paginacaoBtn">
                        <button
                            onClick={() => mudarPagina(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </button>
                        <span>{`Página ${paginaAtual}`}</span>
                        <button
                            onClick={() => mudarPagina(paginaAtual + 1)}
                            disabled={paginaAtual * registrosPorPagina >= importacoes.length}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    // Função para limpar a seleção do arquivo
    const limparSelecaoArquivo = () => {
        setNomeArquivo("");
        setDadosImportados([]);
        document.getElementById('upload-arquivo').value = ""; // Reseta o campo de upload
    };

    // Função que controla o clique no nome do arquivo para expandir ou colapsar os dados
    const lidarComExpandir = (id) => {
        if (importacaoExpandida === id) {
            setImportacaoExpandida(null); // Colapsa a tabela se já está expandida
        } else {
            setImportacaoExpandida(id); // Expande a tabela
        }
    };
    const excelBaseDate = new Date(Date.UTC(1900, 0, 1));
    const dadosPlanilha = importacoes.find(importacao => importacao.id === importacaoExpandida)
    return (
        <div className="PagUploadExcel">
            <CabecalhoHome />
            <AlertaNotificação />
            <Titulo tituloMsg='Importação de Planilha Excel' />

            <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true */}
          Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"PLANILHAEXCEL"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div> 

            <button
                className="voltar"
                onClick={() => {
                    navigate("/PagHome");
                }}
            >
                Voltar
            </button>

            <div className="container-upload">
                <div className="cabecalho-upload">
                    <h2>Envio de Arquivo Excel</h2>
                </div>

                <div className="area-upload">
                    <div className="areaLbl">
                        <label htmlFor="upload-arquivo" className="custom-file-upload">
                            <span>Selecione a Planilha clicando no botão abaixo</span>
                        </label>
                    </div>
                    <div className="areaInput">
                        <input
                            id="upload-arquivo"
                            className='btnInput'
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={lidarComUploadArquivo}
                        />
                        <label for="upload-arquivo" class="botao-upload">Selecionar Arquivo</label>

                    </div>
                </div>

                <button className="btn-upload" onClick={lidarComSubmit}>
                    Enviar Planilha
                </button>

                {nomeArquivo && (
                    <div className="nome-arquivo">
                        <p>Arquivo selecionado: <strong>{nomeArquivo}</strong></p>
                        <button className="btn-limpar" onClick={limparSelecaoArquivo}>
                            Selecionar Outra Planilha
                        </button>
                    </div>
                )}

                {dadosImportados.length > 0 && (
                    <div className="tabela-dados">
                        <h3>Dados Importados</h3>
                        {formatarDadosImportacao(dadosImportados)}
                    </div>
                )}

                <div className="tabela-dados">
                    {importacaoExpandida && (
                        <div className="tabela-dados-expandida">
                            <h3 style={{ flex: 1 }}>
                                Dados da Importação -
                                <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginLeft: '8px' }}>
                                    {importacoes.find(importacao => importacao.id === importacaoExpandida).nome_arquivo}
                                </span>
                            </h3>
                            <button className="btn-fechar" onClick={() => setImportacaoExpandida(null)}>
                                X
                            </button>
                            {formatarDadosImportacao(JSON.parse(dadosPlanilha.dados))}
                            
                            <div class="container-botoes">

                            <button className="btn-enviar-estoque" onClick={() => enviarParaEstoque(importacaoExpandida)}>
                                Enviar para Estoque
                            </button>

                            <DownloadExcel jsonData={JSON.parse(dadosPlanilha.dados)} nomeArquivo={dadosPlanilha.nome_arquivo} />
                            
                            </div>
                        </div>
                    )}
                    <h3 className='TextoH3'>Importações Salvas</h3>
                    {carregando ? (
                        <p>Carregando...</p>
                    ) : (
                        <div className="tabela-rolavel">

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do Arquivo</th>
                                        <th>Data de Importação</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {importacoes.map((importacao) => (
                                        <tr key={importacao.id}>
                                            <td>{importacao.id}</td>
                                            <td
                                                onClick={() => lidarComExpandir(importacao.id)}
                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                            >
                                                {importacao.nome_arquivo}
                                            </td>
                                            <td>{new Date(importacao.data_importacao).toLocaleString()}</td>
                                            <td>
                                                <button className="btn-deletar" onClick={() => lidarComDeletar(importacao.id)}>Deletar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}
                </div>
            </div>
            {mostrarPopup && (
                <div className="popup">
                    <div className="poppup-conteudo">
                        <h4>Confirmar Exclusão</h4>
                        <p>Você tem certeza que deseja deletar a importação do arquivo <strong>{nomeArquivoDeletar}</strong>?</p>
                        <div className="botao-container">
                            <button onClick={confirmarDelecao}>Confirmar</button>
                            <button onClick={cancelarDelecao}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PagUploadExcel;
