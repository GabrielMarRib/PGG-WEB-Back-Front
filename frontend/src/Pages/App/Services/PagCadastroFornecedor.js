import React, { useState, useContext } from "react";
import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagVenderProduto.css";
import { UserContext } from "../../../Context/UserContext.js";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Titulo from "../../../Components/Titulo.jsx";

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
  const [Status, setStatus] = useState('');

  const navigate = useNavigate();
  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const { Alerta } = useAlerta();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !NomeForcedor || !CNPJ || !Endereco || !Telefone || !Email || !Status
    ) {
      Alerta(3, "Campos não preenchidos");
      return;
    }

   
    try {
      const Response = await axios.post("http://pggzettav3.mooo.com/api/index.php", {
        funcao: "CadastroFuncionario",
        senha: "@7h$Pz!q2X^vR1&K",
        Nome: NomeForcedor,
        CNPJ: CNPJ,
        Endereco: Endereco,
        Telefone: Telefone,
        Email: Email,
        Status: Status,
      });
      console.log( Response );
    } catch (eee) {
      console.log("deu merda");
    }
  

    console.log({ NomeForcedor, CNPJ, Endereco, Telefone, Email, Status });
  };

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

          <div className="container-tela-produtos">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagVenderProduto;
