import CabecalhoHome from "../../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagAddFunc.css";
import { InputMask } from "primereact/inputmask";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../../../Context/UserContext.js";
import RedirectAcesso from "../../../../../../Functions/RedirectAcesso.js";
import { handleAdicionarUser } from "../../../../../../Functions/Functions.js";
import { useAlerta } from "../../../../../../Context/AlertaContext.js";
import AlertaNotificação from "../../../../../../Components/NotificacaoAlert/AlertaNotificação.js";
import Titulo from "../../../../../../Components/Titulo/Titulo.jsx";
import BtnAjuda from "../../../../../../Components/BotaoAjuda/BtnAjuda.js";
import { pegaPermissoesTotais } from "../../../../../../Config/Permissoes.js";
function PagAddFunc() {
  const { Alerta } = useAlerta(); // alertinha...
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const navigate = useNavigate();

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User....

  const [showPopup, setShowPopup] = useState(false); // variaveis para o btnAjuda
  const [permissoes, setPermissoes] = useState([]);
  const [permissaoSelec, setPermissaoSelec] = useState("");
  useEffect(() => {
    const pegaPermissoes = async () => {
      const permissoesObj = await pegaPermissoesTotais()
      setPermissoes(permissoesObj)
    }; 
    pegaPermissoes();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(permissaoSelec === ""){  
      Alerta(1,"Preencha todos os campos")
      return;
    }

    //Firebase:
    const [msg, erro] = await handleAdicionarUser(
      nome,
      cpf,
      email,
      telefone,
      permissaoSelec,
      User
    );

    Alerta(2, msg)
    setNome('');
    setCpf(null)
    setEmail('')
    setTelefone(null)

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
        <div className="Botaoajuda" onClick={() => { console.log(permissaoSelec ? permissaoSelec : null) }}> {/*crie um botão que no onClick faz o setShowPopup ficar true */}
          Ajuda
        </div>
      </header>

      <div className="BtnAjuda">
        {showPopup && ( // showPopup && significa: se tiver showPopup (no caso, se for true), faz isso ai embaixo:
          <BtnAjuda /* chama o btnAjuda */
            fechar={() => { setShowPopup(false) }} // props do bixo: fechar (passa o setshowPopup como false) (será executado quando a função fechar for chamada no componente btnAjuda)
            msgChave={"ADDFUNCIONARIOS"}                   // passa a chave que dita a msg no componente (veja as chaves válidas no componente)
          />
        )}
      </div>

      <div className="btn">
        <button className="Voltar" onClick={() => { navigate("/PagPerfil") }}>
          Voltar
        </button>
      </div>

      {User && (
        <form className="formAddFunc" onSubmit={(e) => handleSubmit(e)}>
          <div className="teste">
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
            <p>
              <h2>Grupo de Acesso:</h2>
              <select onChange={(e) => {setPermissaoSelec(e.target.value)}} >
                <option value={""}>Selecione um grupo de acesso...</option>
                {permissoes.map((permissao)=>(
                  <option key={permissao.id_grupo} value={permissao.id_grupo}>Grupo: {permissao.id_grupo} - {permissao.nome_grupo}</option>
                ))}
              </select>
              <div style={{marginTop: "10px", color:"gray"}}>Para adicionar Grupos de Acesso e visualizar permissões, clique <span style={{color: "blue", cursor: "pointer", textDecoration: "underline"}} onClick={()=>{navigate("/DefGrupoAcesso")}}>AQUI</span> para acessar a página de controle de acesso</div>
            </p>
            <br />

            <button className="enviar">Enviar</button>
          </div>
        </form>
      )}
    </div>

  );
}

export default PagAddFunc;
