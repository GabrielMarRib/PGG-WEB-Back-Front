import React, { useState, useContext, useLayoutEffect } from "react";
import "../Styles/PagLogin.css";
import Logo from "../Assets/FundoLoginWeb1921x1416.png";
import { TrocarloginEsquecerSenha, CheckCamposVazios, exibeMsg, apagarCampos, handleRedefinirSenha, handleLogin } from "../Functions/Functions.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
import { camposNaoPreenchidos } from "../Messages/Msg.js"
import { useAlerta } from "../Context/AlertaContext.js";
import AlertaNotificação from "../Components/AlertaNotificação.js";

function Home() {
  const [email, setEmail] = useState("");
  const { Alerta } = useAlerta();
  const [password, setPassword] = useState("");
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [Style, SetStyle] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const navigate = useNavigate();

  // Correctly destructure the context value
  const { setUser } = useContext(UserContext);

  const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
  const User = UserOBJ.User; //Pega só o User...


  useLayoutEffect(() => {
    if (User != null) {
      navigate('/PagHome');
    }
  }, [User,navigate]);

  return (
    <div className="PagLogin">
      <div className="container">
      <AlertaNotificação />
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
                        if (CheckCamposVazios([email, password])) {
                          exibeMsg(setMensagem, camposNaoPreenchidos(true), 4000, true, SetStyle);
                          return;
                        }
                        const [userData, erro, msg] = await handleLogin(email, password);
                        await exibeMsg(setMensagem, msg, 2000, erro, SetStyle);
                        console.log("userData NOVO!!! " + JSON.stringify(userData));
                        setUser(userData);
                        localStorage.setItem('User', JSON.stringify(userData));
                        
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
                      }}
                    >
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
                          exibeMsg(setMensagem, camposNaoPreenchidos(false), 4000, true, SetStyle);
                          return;
                        }
                        const [msg, erro] = await handleRedefinirSenha(emailRecuperacao);

                        console.log("msg frontend: " + msg)
                        exibeMsg(setMensagem, msg, 4000, erro, SetStyle);
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
