  import React, { useState } from "react";
  import "../Styles/PagLogin.css";
  import axios from "axios";
  import { handleLogin, handleLogOut } from "../Functions/Functions.js";
  import Logo from "../Assets/FundoLoginWeb1921x1416.png";
  import { TrocarloginEsquecerSenha, CheckCamposVazios, exibeMsg, apagarCampos } from "../Functions/Functions.js";
  // import { Logar, recuperarSenha } from "../../Servicos/servicosBD";
  // import { camposNaoPreenchidos } from "../../mensagens/Msg";
  // import LogoRigel from "../../img/logo.png";
  import { useNavigate } from "react-router-dom";
  import { UserContext } from "../Context/UserContext.js";
  import { useContext } from "react";


  function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [Style, SetStyle] = useState("");
    const [mensagem, setMensagem] = useState("");

    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const navigate = useNavigate();
    const setUser = useContext(UserContext);

    return (
      <div className="PagLogin">
        <div className="container">
          <div className="container-imagem">
            <img src={Logo} alt="Imagem Tela" className="img-bg" />
          </div>
          <div className="container-formulario">
            <div className="conteudo-formulario">
              <h1>
                <div className="wrapper">
                  <svg>
                    <text
                      className="styledText"
                      x="50%"
                      y="60%"
                      dy=".35em"
                      text-anchor="middle"
                    >
                      Pequeno Grande Gestor
                    </text>
                  </svg>
                </div>
              </h1>
              <h2>Zetta</h2>
              {mostrarLogin ? (
                <div className="Container_login">
                  <div className="linha-com-texto">
                    <span className="texto-no-meio">Acesse a sua conta</span>
                  </div>
                  <br></br>
                  {mensagem && Style && <p className={Style}>{mensagem}</p>}
                  <form>
                    <div className="grupo-formulario">
                      <label htmlFor="email">Digite seu Email:</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="usuario@dominio.com.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grupo-formulario">
                      <label htmlFor="password">Digite sua senha:</label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        (async () => {
                          let erro = ''; 
                          if (CheckCamposVazios([email, password])) {
                            exibeMsg(setMensagem, "Preencha todos os campos antes de continuar", 4000, true, SetStyle);
                            return;
                          }
                          setUser(async () => {await handleLogin(email, password, setError)});
                          if(setUser){
                            await exibeMsg(setMensagem, error, 2000, true, SetStyle);
                          }else{
                            console.log("esse eh o setUser: " + setUser.id)
                            console.log("Entrou aqui");
                            navigate('/PagHome');
                          }
                          if (erro) return;
                        })();
                      }}
                    >
                      Enviar
                    </button>
                    <div className="esqueceu-senha">
                  <a
                    onClick={() => {
                      TrocarloginEsquecerSenha(setMostrarLogin, mostrarLogin);
                      apagarCampos([setEmail, setPassword]);
                    }}>
                    Esqueceu a senha?
                    </a>
                      <br></br>
                      <span className="politica-privacidade">
                        Política de Privacidade
                      </span>
                      <span className="politica-privacidade2">
                        {" "}
                        | Desenvolvido por Rígel Tech
                      </span>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="Container_EsqueceuSenha">
                  <div className="linha-com-texto">
                    <a
                      onClick={() => {
                        TrocarloginEsquecerSenha(setMostrarLogin, mostrarLogin);
                        apagarCampos([setEmail, setPassword]);
                      }}
                    >
                      <span className="texto-no-meio">Esqueceu</span>
                    </a>
                  </div>
                  {mensagem && Style && <p className={Style}>{mensagem}</p>}
                  <form>
                    <div className="grupo-formulario">
                      <label htmlFor="email" className="textoSenha">
                        Informe seu e-mail para receber as instruções de
                        recuperação de senha
                      </label>
                      <input
                        id="emailRecuperacao"
                        type="email"
                        placeholder="usuario@dominio.com.br"
                        value={emailRecuperacao}
                        onChange={(e) => setEmailRecuperacao(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        (async () => {
                          if (CheckCamposVazios([emailRecuperacao])) {
                            //verifica se os campos estão vazios
                            exibeMsg(setMensagem, "Preencha o campo antes de continuar", 4000, true, SetStyle ); //obj setMensagem, mensagem(true = plural, false = singular), tempo, msg de erro ou nao
                            return;
                          }
                          // const { msg, erro } = await recuperarSenha(
                          //   emailRecuperacao
                          // );
                          // exibeMsg(setMensagem, msg, 4000, erro, SetStyle);
                        })();
                      }}
                    >
                      Recuperar
                    </button>
                    <div className="esqueceu-senha">
                      <a
                        onClick={() => {
                          TrocarloginEsquecerSenha(setMostrarLogin, mostrarLogin);
                          apagarCampos(setEmailRecuperacao);
                        }}
                      >
                        Voltar
                        <br></br>
                      </a>
                      <span className="politica-privacidade2">
                        Desenvolvido por Rígel Tech
                      </span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Home;
