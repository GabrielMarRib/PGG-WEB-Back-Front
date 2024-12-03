import React, { useState, useContext, useEffect } from "react";
import CabecalhoHome from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./CadFornecedor.css"; 
import { UserContext } from "../../../../../Context/UserContext.js";
import AlertaNotificação from "../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import { useAlerta } from "../../../../../Context/AlertaContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Titulo from "../../../../../Components/Titulo/Titulo.jsx";
import ImgAtivo from "../../../../../Assets/GreenCheckMark.png";
import ImgInativo from "../../../../../Assets/ReadCheckMark.png";
import BtnAjuda from "../../../../../Components/BotaoAjuda/BtnAjuda.js";
import NavBar from "../../../../../Components/NavBar/NavBar.js";

const formatCep = (value) => {
  value = value.replace(/\D/g, ''); // Remove tudo que não for número
  if (value.length <= 5) {
    return value.replace(/(\d{5})(\d)/, '$1-$2');
  } else {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
};

const formatCNPJ = (value) => {
  // Remove caracteres não numéricos
  value = value.replace(/\D/g, '');
  // Aplica a máscara
  if (value.length <= 14) {
    return value.replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{4})/, '$1/$2')
      .replace(/(\d{4})(\d{2})$/, '$1-$2');
  }
  return value;
};

const formatTelefone = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length <= 11) {
    return value.replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return value;
};

function PagVenderProduto() {
  const [NomeForcedor, setNomeForcedor] = useState('');
  const [CNPJ, setCNPJ] = useState('');
  const [Endereco, setEndereco] = useState('');
  const [Telefone, setTelefone] = useState('');
  const [Email, setEmail] = useState('');
  const [Status, setStatus] = useState(false);
  const [FornecedoresTabela, setFornecedoresTabela] = useState([]);
  const [inputCep, setInputCep] = useState('');  // Estado para o CEP
  const [cepData, setCepData] = useState({});  // Estado para os dados do CEP
  const [cepError, setCepError] = useState(''); // Estado para erro de CEP


  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();

  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

  const PegarFornecedores = async () => {
    try {
      const Response = await axios.post("http://discordia.com.br/", {
        funcao: "pegarTodosFornecedores",
        senha: "@7h$Pz!q2X^vR1&K",
      },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
      setFornecedoresTabela(Response.data.fornecedores);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    PegarFornecedores();
  }, []);

  async function handleCepSearch() {
    const cepSemMascara = inputCep.replace(/\D/g, ''); // Remove a máscara (hífen e outros caracteres)

    if (cepSemMascara.length !== 8) {
      setCepData({});  // Limpa os dados do CEP se não tiver 8 caracteres
      setCepError('CEP inválido. O CEP deve ter 8 dígitos.');
      return;  // Não faz a requisição se o CEP não for válido
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
      if (response.data.erro) {
        setCepData({});
        setCepError('Sem informações para o CEP fornecido.');
      } else {
        setCepData(response.data);  // Atualiza os dados do CEP
        setCepError('');  // Limpa qualquer erro
        setEndereco(response.data.logradouro);  // Atualiza o campo de endereço com a rua
      }
    } catch (error) {
      setCepData({});
      setCepError('Erro ao buscar o CEP. Tente novamente.');
    }
  }

  useEffect(() => {
    if (inputCep.length === 9) {  // Chamando apenas se o CEP estiver com 9 caracteres (com a máscara)
      handleCepSearch();
    }
  }, [inputCep]); // Dependência de `inputCep`


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!NomeForcedor || !CNPJ || !Endereco || !Telefone || !Email) {
      Alerta(3, "Todos os campos devem ser preenchidos.");
      return;
    }


    console.log({ NomeForcedor, CNPJ, Endereco, Telefone, Email, Status });
    try {
      const Response = await axios.post("http://discordia.com.br/", {
        funcao: "cadastrarFornecedor",
        senha: "@7h$Pz!q2X^vR1&K",
        nome: NomeForcedor,
        cnpj: CNPJ,
        endereco: cepData.logradouro,
        telefone: Telefone,
        email: Email,
        status: Status ? 'ativo' : 'inativo', // Convertendo booleano para string
      },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
      Alerta(2, "Fornecedor cadastrado com sucesso.");
      // Resetando os campos
      setNomeForcedor('');
      setCNPJ('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setInputCep('');
      setStatus(false); // Resetando o Status para inativo
      PegarFornecedores();
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error);
      Alerta(3, "Erro ao cadastrar fornecedor.");
    }


  };

  const MapearFornecedores = (Fornecedor) => {
    return (
      <div className="Fornecedores" key={Fornecedor.id_fornecedor}>
        <center>
          <u>
            <label><strong>Fornecedor(a): </strong>"{Fornecedor.nome}</label>
            <label> - {Fornecedor.id_fornecedor}"</label>
          </u>
        </center>
        <br />
        <label><strong>CNPJ:</strong> {Fornecedor.cnpj} </label>
        <br />
        <label><strong>Endereço:</strong> {Fornecedor.endereco} </label>
        <br />
        <label><strong>Email:</strong> {Fornecedor.email} </label>
        <br />
        <label><strong>Telefone:</strong> {Fornecedor.telefone} </label>
        <br />
        <label><strong>Status:</strong> {Fornecedor.status === 'ativo' ? 'Ativo' : 'Inativo'}</label>
        <img src={Fornecedor.status === 'ativo' ? ImgAtivo : ImgInativo} alt={Fornecedor.status === 'ativo' ? 'GreenCheck' : 'ReadCheck'} />
      </div>
    );
  };

  return (
    <div className="PagVenderProduto">
      <div className="DivForms">
        <NavBar />
        <Titulo tituloMsg="Cadastro de fornecedor" />
        <AlertaNotificação />
        <header className="cabecalhoBtnAjuda">
          <div className="Botaoajuda" onClick={() => { setShowPopup(true) }}>
            Ajuda
          </div>
        </header>

        <div className="BtnAjuda">
          {showPopup && (
            <BtnAjuda
              fechar={() => { setShowPopup(false) }}
              msgChave={"CADASTROFORNECEDOR"}
            />
          )}
        </div>

        <div className="enquadramento">
          <div className="container-tela-cad_Fornecedor">
            <form className="formulario" onSubmit={handleSubmit}>
              <div className="grupo-input-produto">
                <div className="grupo-input">
                  <label>Nome do fornecedor:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={NomeForcedor}
                    placeholder="Ex: Fornecedor ABC"
                    onChange={(e) => setNomeForcedor(e.target.value)}
                  />
                  <label>CNPJ:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={CNPJ}
                    onChange={(e) => setCNPJ(formatCNPJ(e.target.value))}
                    placeholder="Ex: 00.000.000/0000-00"
                    maxLength={18}
                  />
                  <label>CEP:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={inputCep}
                    onChange={(e) => setInputCep(formatCep(e.target.value))}
                    placeholder="EX: 01299-029"
                    maxLength={9} // Permite a entrada de até 9 caracteres (com a máscara)
                  />
                  {/* Exibindo as informações do CEP em tempo real */}
                  {inputCep.length === 9 && !cepError && cepData && Object.keys(cepData).length > 0 ? (
                    <div className="teste">
                      <div className="cep-info">
                        <p><strong>Rua:</strong> {cepData.logradouro}</p>
                        <p><strong>Bairro:</strong> {cepData.bairro}</p>
                        <p><strong>Cidade:</strong> {cepData.localidade}</p>
                        <p><strong>UF:</strong> {cepData.uf}</p>
                      </div>
                    </div>
                  ) : (
                    inputCep.length === 9 && cepError && (
                      <div className="teste">
                        <p className="cep-error">{cepError}</p>
                      </div>
                    )
                  )}
                  <label>Telefone:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={Telefone}
                    onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    placeholder="Ex: (00) 00000-0000"
                    maxLength={15}
                  />
                  <label>Email:</label>
                  <input
                    className="controle-formulario"
                    type="email"
                    value={Email}
                    placeholder="Ex: fornecedor@exemplo.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <label>Status:</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="statusToggle"
                    checked={Status}
                    onChange={() => setStatus(!Status)}
                  />
                  <label htmlFor="statusToggle">{Status ? "Ativo" : "Inativo"}</label>
                </div>
                <button className="botao" type="submit">
                  Cadastrar Fornecedor
                </button>
              </div>
            </form>
            <div className="formulario">
              <div className="ListaFornecedores">
                <h2>Lista de Fornecedores</h2>
                {FornecedoresTabela.length > 0 ? (
                  FornecedoresTabela.map(MapearFornecedores)
                ) : (
                  <p>Nenhum fornecedor cadastrado.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagVenderProduto;
