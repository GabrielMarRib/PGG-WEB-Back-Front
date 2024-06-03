import Cabecalho from "../../../Components/Cabecalho";
import "../../../Styles/App/Service/PagAddFunc.css";
import { InputMask } from "primereact/inputmask";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from "../../../Functions/RedirectAcesso";
import { handleAdicionarUser } from "../../../Functions/Functions";
function PagAddFunc() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedAccess, setSelectedAccess] = useState(null);

  const navigate = useNavigate();

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....

  RedirectAcesso(User,2);
  Redirect(User);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // consistencia ja foi feita na pagina pelo gustavo, mlk é monstro poupou meu tempo
    const [msg, erro] = await handleAdicionarUser(
      nome,
      cpf,
      email,
      telefone,
      parseInt(selectedAccess),
      User
    );
    alert(msg);
    setSelectedAccess(null);
    setNome('');
    setCpf(null)
    setEmail('')
    setTelefone(null)
    
  };

  const handleRadioChange = (event) => {
    setSelectedAccess(event.target.value);
  };

  return (
    <div className="PagAddFunc">
      <div className="Cabecalho">
        <Cabecalho />
      </div>
      {User &&
      User.userData &&
      User.userData.Nivel_acesso &&
      User.userData.Nivel_acesso == 2 ? (
        <form className="formAddFunc" onSubmit={(e) => handleSubmit(e)}>
          <h1>Cadastro de Funcionário</h1>
          <br />
          <p>
            <h2>Nome:</h2>
            <input
              id="inNome"
              type="text"
              required
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          </p>
          <br />

          <p>
            <h2>CPF:</h2>
            <InputMask
              id="inCPF"
              required
              value={cpf}
              onChange={(e) => {
                setCpf(e.value);
              }}
              mask="999.999.999-99"
            />
          </p>
          <br />
          <p>
            <h2>Email:</h2>
            <input
              id="inEmail"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              mask="999.999.999-99"
            />
          </p>
          <br />
          <p>
            <h2>Telefone:</h2>
            <InputMask
              id="inTelefone"
              required
              value={telefone}
              onChange={(e) => {
                setTelefone(e.value);
              }}
              mask="(99)99999-9999"
            />
          </p>
          <br />
          <p>
            <h2>Nível de acesso:</h2>
            <input
              type="radio"
              name="access"
              value="0"
              checked={selectedAccess === "0"}
              onChange={handleRadioChange}
              required
            />{" "}
            Acesso 0
            <br />
            <input
              type="radio"
              name="access"
              value="1"
              checked={selectedAccess === "1"}
              onChange={handleRadioChange}
              required
            />{" "}
            Acesso 1
          </p>
          <br />

          <button>Enviar</button>
        </form>
      ) : (
        <>Sem autorização</>
      )}
    </div>
  );
}

export default PagAddFunc;
