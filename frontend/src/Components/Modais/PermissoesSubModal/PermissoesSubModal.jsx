import React, { useEffect, useState } from 'react';
import './PermissoesSubModal.css';
import axios from 'axios';

function PermissoesSubModal({ fechar, grupoOBJ, nome_grupo, classe, alvo, id, updateModalData }) {
  const permissoesOBJ = grupoOBJ.Permissoes
  const permissoesJson = JSON.parse(permissoesOBJ);
  const permissoes = permissoesJson[nome_grupo].permissoes;
  const classeObj = permissoes[classe];
  const valores = classeObj[alvo];
  const [msg, showMsg] = useState({ show: false, msg: "" })
  const [processando, setProcessando] = useState(false);
  const montaCaminho = (stateV, stateE) => {
    const visualizacao = valores.visualizacao;
    const edicao = valores.edicao;
    if (stateV) return visualizacao;
    if (stateE) return edicao;
  };

  const [visualizacao, setVisualizacao] = useState(montaCaminho(true, false));
  const [edicao, setEdicao] = useState(montaCaminho(false, true));

  useEffect(() => {
    if (!visualizacao) {
      setEdicao(false);
    }
  }, [visualizacao]);

  const handleChangeCheckboxVisualizacao = () => {
    setVisualizacao((prevState) => !prevState);
  };

  const handleChangeCheckboxEdicao = () => {
    setEdicao((prevState) => !prevState);
  };

  const AtualizaPermissoes = async () => {
    permissoesJson[nome_grupo].permissoes[classe][alvo].visualizacao = visualizacao;
    permissoesJson[nome_grupo].permissoes[classe][alvo].edicao = edicao;
    setProcessando(true);
    let Object = grupoOBJ;
    const newPermissoes = { Permissoes: {...JSON.parse(grupoOBJ.Permissoes), ...(permissoesJson)} };
    const newPS = JSON.stringify(newPermissoes)
    Object = {...Object, newPS}

    try {
      const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
        funcao: 'atualizaPermissoesGrupo', // dita qual função deve ser utilizada da api. (a gente te fala o nome)
        senha: '@7h$Pz!q2X^vR1&K', // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
        novaPermissao: JSON.stringify(permissoesJson),
        idGrupo: id,
      })
      if (response.status == 200) {
        showMsg({ show: true, msg: "Atualização realizada" });
      } else {
        showMsg({ show: true, msg: "Erro ao atualizar permissões" });
      }

    } catch (error) {
      console.error('Error during API call:', error);
      showMsg({ show: true, msg: "Erro interno" });
    } finally {
      setProcessando(false);
      RemoveAlerta();
      RemovePopUp();
      updateModalData(Object);
    }
  };

  const mostraAlerta = () => {
    return (msg.show &&
      msg.msg
    )
  }

  const RemoveAlerta = () =>{
    setTimeout(() => {
      showMsg({ show: false, msg: '' });
    }, 3000);
  }

  const RemovePopUp = () =>{
    setTimeout(() => {
      fechar();
    }, 3500);
  }

  return (
    <div className="PermissoesSubModal">
      <div className={"conteudo-modal"}>

        <button className="close-btn" onClick={fechar}>
          &times;
        </button>
        <h2 className="modal-title">{alvo}</h2>

        <p className="permissions-heading">Permissões:</p>
        {processando
          ? "Processando..."
          :
          msg.show ?
          <div className={msg.msg == 'Atualização realizada' ? 'acerto' : 'erro'}>
            {mostraAlerta()}
          </div>: null
        }

        <ul className={"permissions-list"}>
          <li>
            <label>
              <input
                type="checkbox"
                checked={visualizacao}
                onChange={handleChangeCheckboxVisualizacao}
              />
              Visualização
            </label>
          </li>
          {visualizacao && (
            <li className={visualizacao ? "animacao" : null}>
              <label>
                <input
                  type="checkbox"
                  checked={edicao}
                  onChange={handleChangeCheckboxEdicao}
                />
                Edição
              </label>
            </li>
          )}
        </ul>
        <button className="save-btn" onClick={AtualizaPermissoes}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default PermissoesSubModal;
