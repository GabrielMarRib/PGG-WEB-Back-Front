import React, { useState, useContext, useEffect } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagVenderProduto.css";
import { UserContext } from "../../../Context/UserContext.js";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Titulo from "../../../Components/Titulo.jsx";
import ImgAtivo from "../../../Assets/GreenCheckMark.png";
import ImgInativo from "../../../Assets/ReadCheckMark.png";





const formatCNPJ = (value) => {
  // Remove caracteres não numéricos
  value = value.replace(/\D/g, '');
  // Aplica a máscara
  if (value.length <= 14) {
    return value.replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1/$2')
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
  const [Status, setStatus] = useState('inativo');
  const [FornecedoresTabela, setFornecedoresTabela] = useState([]);

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();


  const PegarFornecedores = async () => {
    try {
      const Response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "pegarTodosFornecedores",
        senha: "@7h$Pz!q2X^vR1&K",
      });
      console.log( "Fornecedores pegados" );
      setFornecedoresTabela(Response.data.fornecedores)
      console.log( Response.data.fornecedores );
    } catch (eee) {
      console.log("deu merda");
    }
  }

  useEffect(() => {

    const PegarFornecedores = async () => {
      try {
        const Response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
          funcao: "pegarTodosFornecedores",
          senha: "@7h$Pz!q2X^vR1&K",
        });
        console.log( "Fornecedores pegados" );
        setFornecedoresTabela(Response.data.fornecedores)
        console.log( Response.data.fornecedores );
      } catch (eee) {
        console.log("deu merda");
      }
    }

    PegarFornecedores()

  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !NomeForcedor || !CNPJ || !Endereco || !Telefone || !Email
    ) {
      Alerta(3, "Campos não preenchidos");
      return;
    }

   
    try {
      const Response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "cadastrarFornecedor",
        senha: "@7h$Pz!q2X^vR1&K",
        nome: NomeForcedor,
        cnpj: CNPJ,
        endereco: Endereco,
        telefone: Telefone,
        email: Email,
        status: Status,
      });
      console.log( Response );
      Alerta(2, "Cadastrado")
      setNomeForcedor('')
      setCNPJ('')
      setEndereco('')
      setTelefone('')
      setEmail('')
      setStatus('')
      PegarFornecedores()
    } catch (eee) {
      console.log("deu merda");
    }
  

    console.log({ NomeForcedor, CNPJ, Endereco, Telefone, Email, Status });
  };


  const MapearFornecedores = (Fornecedor) => {
    return(
      <div className="Fornecedores"> 
       <center><label><strong>Fornecedor(a): </strong>{Fornecedor.nome}</label>
        <label> - {Fornecedor.id_fornecedor}</label></center>
        <br />
        <label><strong>CNPJ:</strong> {Fornecedor.cnpj} </label>
        <label><strong>Endereço:</strong> {Fornecedor.endereco} </label>
        <br />
        <label><strong>Email:</strong> {Fornecedor.email} </label>
        <br />
        <label><strong>Telefone:</strong> {Fornecedor.telefone} </label>
        <br />
        {Fornecedor.status == 'ativo' ? (
        <label><strong>Status:</strong> Ativo</label>
      ) : (
        <label><strong>Status:</strong> Inativo</label>
      )}
        {Fornecedor.status == 'ativo' ? (
          <img src={ImgAtivo} alt="GreenCheck" />
        ) : (
          <img src={ImgInativo} alt="ReadCheck" />
        )}

      </div>
    );
  }

  return (
    <div className="PagVenderProduto">
      <div className="DivForms">
        <div className="CabecalhoHome">
          <CabecalhoHome />
        </div>
        <Titulo tituloMsg='Cadastro de fornecedor' />
        <AlertaNotificação />

        <div className="enquadramento">
          <button
            className="voltar"
            onClick={() => navigate("/PagEscolhaProdutos")}
          >
            Voltar
          </button>

           <div className="container-tela-cad_Fornecedor">   {/* container-tela-produtos */}
            <form className="formulario" onSubmit={handleSubmit}>
              <div className="grupo-input-produto">
                <div className="grupo-input">
                  <label>Nome do fornecedor:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={NomeForcedor}
                    placeholder="Ex: Thiago Marques"
                    onChange={(e) => setNomeForcedor(e.target.value)}
                  />

                  <label>CNPJ:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={CNPJ}
                    onChange={(e) => setCNPJ(formatCNPJ(e.target.value))}
                    placeholder="00.000.000/0000-00"
                  />

                  <label>Endereço</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={Endereco}
                    placeholder="Ex: Rua Rastelo,02 - SP"
                    onChange={(e) => setEndereco(e.target.value)}
                  />

                  <label>Telefone:</label>
                  <input
                    className="controle-formulario"
                    type="text"
                    value={Telefone}
                    onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    placeholder="(00) 00000-0000"
                  />

                  <label>Email:</label>
                  <input
                    className="controle-formulario"
                    type="email"
                    value={Email}
                    placeholder="Ex: SeuEmail@gmail.com"
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
                    <label htmlFor="statusToggle">{Status ? "ativo" : "inativo"}</label>
                  </div>

                  
                <button className="botao" type="submit">
                  Efetuar venda
                </button>
              </div>
            </form>
            <div className="formulario">
          <div className="ListaFornecedores">
              <h2>Lista de fornecedores</h2>

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
