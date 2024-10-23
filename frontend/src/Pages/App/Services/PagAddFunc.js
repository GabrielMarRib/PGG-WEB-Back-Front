import CabecalhoHome from "../../../Components/CabecalhoHome.js";
import "../../../Styles/App/Service/PagAddFunc.css";
import { InputMask } from "primereact/inputmask";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import RedirectAcesso from "../../../Functions/RedirectAcesso";
import { handleAdicionarUser } from "../../../Functions/Functions";
import { useAlerta } from "../../../Context/AlertaContext.js";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import Titulo from "../../../Components/Titulo";
import BtnAjuda from "../../../Components/BtnAjuda.js";

function PagAddFunc() {
  const { Alerta } = useAlerta(); // alertinha...
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedAccess, setSelectedAccess] = useState(null);

  const navigate = useNavigate();

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....

  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda

  RedirectAcesso(User,2);

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
    Alerta(2, msg)
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
        <CabecalhoHome />
      </div>
      <AlertaNotificação />
      <Titulo
                tituloMsg='Adição de funcionários'
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
          msgChave={"ADDFUNCIONARIOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
          />
      )}
      </div> 

      <div className="btn">
        <button className="Voltar" onClick={() => { navigate("/PagPerfil") }}>
            Voltar
        </button>
      </div>



      {User &&
      User.userData &&
      User.userData.Nivel_acesso &&
      User.userData.Nivel_acesso >= 2 ? (
        <form className="formAddFunc" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="tituloca">Cadastro de Funcionário</h1>
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

          <button className="enviar">Enviar</button>
        </form>
      ) : (
        <>Sem autorização</>
      )}
    </div>
  );
}

export default PagAddFunc;
