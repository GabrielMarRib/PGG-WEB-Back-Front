import React, { useState, useEffect, useContext } from "react";
import Cabecalho from "../../../Components/CabecalhoHome.js";
import '../../../Styles/App/Service/PagFuncionarios.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext"; 
import Titulo from "../../../Components/Titulo.jsx";
import BtnAjuda from "../../../Components/BtnAjuda.js";

function PagFuncionarios() {
    
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);
    const [textoPesquisa, setTextoPesquisa] = useState(""); 
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const navegar = useNavigate();
    const { Usuario } = useContext(UserContext); 
    const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

    useEffect(() => {
        const buscarFuncionarios = async () => {
            try {
                const resposta = await axios.get('http://localhost:4000/pegaUsers');
                console.log("Dados recebidos:", resposta.data); 
                setFuncionarios(resposta.data);
                setCarregando(false);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
                setErro('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
                setCarregando(false);
            }
        };

        buscarFuncionarios();
    }, []);

    const selecionarFuncionario = (id) => {
        const funcionarioSelecionado = funcionarios.find(funcionario => funcionario.id === id);
        setFuncionarioSelecionado(funcionarioSelecionado.data);
    };

    const mostrarNivelAcesso = () => {
        if (Usuario && Usuario.dadosUsuario) {
            switch (parseInt(Usuario.dadosUsuario.Nivel_acesso)) {
                case 0:
                    return "(Funcionário)";
                case 1:
                    return "(Funcionário+)";
                case 2:
                    return "(Gestor)";
                default:
                    return "Nível de Acesso Indefinido";
            }
        }
        return "";
    };

    const handleChangePesquisa = (event) => {
        setTextoPesquisa(event.target.value);
    };

    const funcionariosFiltrados = funcionarios.filter(funcionario =>
        funcionario.data && funcionario.data.Nome && funcionario.data.Nome.toLowerCase().includes(textoPesquisa.toLowerCase())
    );

    const imprimirInformacoes = () => {
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleDateString();
        const horaFormatada = dataAtual.toLocaleTimeString();
        
        const conteudoParaImprimir = `
            <h1>Informações Pessoais</h1>
            <hr/>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Hora:</strong> ${horaFormatada}</p>
            <p><strong>Nome:</strong> ${funcionarioSelecionado.Nome}</p>
            <p><strong>Email:</strong> ${funcionarioSelecionado.Email}</p>
            <p><strong>Telefone:</strong> ${funcionarioSelecionado.Celular}</p>
            <p><strong>CPF:</strong> ${funcionarioSelecionado.CPF}</p>
            <hr/> 
            <h1>Informações de Acesso</h1>
            <p><strong>Nível de Acesso:</strong> ${funcionarioSelecionado.Nivel_acesso} ${mostrarNivelAcesso()}</p>
            <hr/> 
        `;
        const janelaDeImpressao = window.open('', '_blank');
        janelaDeImpressao.document.write(`
            <html>
            <head>
                <title>Informações do Funcionário</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h2 {
                        color: #333;
                    }
                    h1{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                ${conteudoParaImprimir}
            </body>
            </html>
        `);
        janelaDeImpressao.document.close();
        janelaDeImpressao.print();
    };

    return (
        <div className="PagFuncionarios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <Titulo
                tituloMsg='Listagem de funcionários'
            />

        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => {setShowPopup(true)}}> {/*crie um botão que no onClick faz o setShowPopup ficar true */}
          Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
            <BtnAjuda /* chama o btnAjuda */
              fechar={() => {setShowPopup(false)}} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
              msgChave={"LISTAGEMFUNCIONARIOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
            />
          )}
        </div> 

        <div className="conteudoPagina"> 
            <div className="btn">
                <button className="Voltar" onClick={() => { navegar("/PagPerfil") }}>
                    Voltar
                </button>
            </div>
        
            <div className="Conteudo">
                <div className="BarraLateral">
                    <input
                        type="text"
                        placeholder="Pesquisar funcionários"
                        value={textoPesquisa} 
                        onChange={handleChangePesquisa} 
                    />
                    {carregando && <div>Carregando...</div>}
                    {erro && <div>{erro}</div>}
                    {funcionariosFiltrados.map((funcionario) => (
                        <div
                            key={funcionario.id}
                            className={`ItemFuncionario ${funcionarioSelecionado && funcionarioSelecionado.id === funcionario.id ? 'selecionado' : ''}`}
                            onClick={() => selecionarFuncionario(funcionario.id)}
                        >
                            {funcionario.data && funcionario.data.Nome}
                        </div>
                    ))}
                </div>
                <div className="ConteudoPrincipal">
                    <div className="forms">
                        <div className="dados-usuario">
                            {funcionarioSelecionado ? (
                                <>
                                    <div className="info-section">
                                        <h1 className="centralizar">Informações Pessoais</h1>
                                        <p><strong>Nome:</strong> {funcionarioSelecionado.Nome}</p>
                                        <p><strong>Email:</strong> {funcionarioSelecionado.Email}</p>
                                        <p><strong>Telefone:</strong> {funcionarioSelecionado.Celular}</p>
                                        <p><strong>CPF:</strong> {funcionarioSelecionado.CPF}</p>
                                    </div>
                                    <hr />
                                    <div className="info-section">
                                        <h1 className="centralizar">Informações de Acesso</h1>
                                        <p><strong>Nível de Acesso:</strong> {funcionarioSelecionado.Nivel_acesso} {mostrarNivelAcesso()}</p>
                                    </div>
                                    <hr />
                                    <div className="botoes nao-imprimir">
                                        <button onClick={() => setFuncionarioSelecionado(null)}>Fechar</button>
                                        <button className="no-print" onClick={imprimirInformacoes}>Imprimir</button>
                                    </div>
                                </>
                            ) : (
                                <h3>Selecione um funcionário para ver as informações...</h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default PagFuncionarios;
