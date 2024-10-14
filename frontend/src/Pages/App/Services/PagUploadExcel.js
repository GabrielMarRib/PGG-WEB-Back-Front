import React, { useState, useEffect } from 'react';
import "../../../Styles/App/Service/PagUploadExcel.css";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import Titulo from "../../../Components/Titulo.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as XLSX from 'xlsx'; // Novo pacote npm no Front para manipular arquivos Excel (npm install xlsx)

function PagUploadExcel() {
    const [nomeArquivo, setNomeArquivo] = useState(""); // Estado para armazenar o nome do arquivo Excel
    const [dadosImportados, setDadosImportados] = useState([]); // Estado para guardar os dados importados
    const [importacoes, setImportacoes] = useState([]); // Estado para armazenar as importações salvas
    const [carregando, setCarregando] = useState(true); // Estado de controle de carregamento
    const [importacaoExpandida, setImportacaoExpandida] = useState(null); // Estado para controlar qual importação está expandida
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
            } else {
                console.log("Formato inesperado da resposta:", resposta.data);
            }
        } catch (error) {
            console.log("Erro ao buscar importações:", error.response ? error.response.data : error.message);
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
        if (arquivo) {
            setNomeArquivo(arquivo.name); // Armazena o nome do arquivo
            const leitor = new FileReader();

            // Quando o leitor termina de carregar o arquivo, processa os dados
            leitor.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' }); // Lê o arquivo como uma planilha
                const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Pega a primeira aba da planilha
                const dadosDaPlanilha = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Converte para JSON
                setDadosImportados(dadosDaPlanilha); // Armazena os dados importados no estado
            };
            leitor.readAsBinaryString(arquivo); // Lê o arquivo como string binária
        }
    };

    // Função que envia os dados da planilha importada para o servidor
    const lidarComSubmit = async () => {
        if (dadosImportados.length === 0) {
            console.log("Nenhum dado importado para enviar.");
            return;
        }
        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "uploadDados",
                dados: dadosImportados,
                nome_arquivo: nomeArquivo
            });

            console.log("Dados importados com sucesso:", resposta.data);
            buscarImportacoes(); // Atualiza a lista de importações
            setNomeArquivo("");
            setDadosImportados([]);
            document.getElementById('upload-arquivo').value = ""; // Reseta o campo de upload
        } catch (error) {
            console.log("Erro ao enviar dados:", error.response ? error.response.data : error.message);
        }
    };

    // Função que deleta uma importação do banco de dados
    const lidarComDeletar = async (id) => {
        const confirmarDeletar = window.confirm("Tem certeza que deseja deletar esta importação?"); // Colocar isso depois em um popup.
        if (!confirmarDeletar) return;

        try {
            const resposta = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
                senha: "@7h$Pz!q2X^vR1&K",
                funcao: "deletarImportacao",
                id
            });

            console.log("Importação deletada com sucesso:", resposta.data);

            // Atualiza o estado de importacoes para remover a importação deletada
            setImportacoes((prevImportacoes) =>
                prevImportacoes.filter(importacao => importacao.id !== id)
            );
        } catch (error) {
            console.log("Erro ao deletar importação:", error.response ? error.response.data : error.message);
        }
    };

    // Função para formatar os dados importados em uma tabela HTML
    const formatarDadosImportacao = (dados) => {
        return (
            <table>
                <thead>
                    <tr>
                        {dados[0].map((cabecalho, index) => (
                            <th key={index}>{cabecalho}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dados.slice(1).map((linha, index) => (
                        <tr key={index}>
                            {linha.map((celula, indiceCelula) => (
                                <td key={indiceCelula}>{celula}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
    

    return (
        <div className="PagUploadExcel">
            <CabecalhoHome />
            <Titulo tituloMsg='Importação de Planilha Excel' />

            <button
                className="voltar"
                onClick={() => {
                    navigate("/PagPerfil");
                }}
            >
                Voltar
            </button>

            <div className="container-upload">
                <div className="cabecalho-upload">
                    <h2>Envio de Arquivo Excel</h2>
                </div>

                <div className="area-upload">
                    <label htmlFor="upload-arquivo" className="custom-file-upload">
                        <span>Selecione a Planilha</span>
                    </label>
                    <input
                        id="upload-arquivo"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={lidarComUploadArquivo}
                    />
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
                    <h3>Importações Salvas</h3>
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
                                    {formatarDadosImportacao(JSON.parse(importacoes.find(importacao => importacao.id === importacaoExpandida).dados))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PagUploadExcel;
