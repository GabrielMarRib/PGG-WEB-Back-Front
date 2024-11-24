import React, { useEffect, useState } from 'react';
import Titulo from '../../../../../Components/Titulo/Titulo';
import CabecalhoHome from '../../../../../Components/Cabecalho/CabecalhoHome';
import { useNavigate } from 'react-router-dom';
import './PagGrupoacesso.css';
import { pegaPermissoesTotais, pegaPermissoesWHERE } from '../../../../../Config/Permissoes';
import PermissoesModal from '../../../../../Components/Modais/PermissoesModal/PermissoesModal';
import NavBar from '../../../../../Components/NavBar/NavBar';

function PagGrupoacesso() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([])
  const [carregando, setCarregando] = useState(true);
  const [permissoesGrupo, setPermissoesGrupo] = useState([]);
  const [carregandoPermissoes, setCarregandoPermissoes] = useState(true);

  //modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const pegaGrupos = async () => {
      const response = await pegaPermissoesTotais();
      setGrupos(response)
      setCarregando(false)
    }
    pegaGrupos();
  }, [])

  const updateModalData = (newData) =>{
    setGrupoSelecionado(newData)
  }

  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

  const handleChangePesquisa = (event) => {
    setTextoPesquisa(event.target.value);
  };

  const gruposFiltrados = grupos?.filter(grupo =>
    grupo.nome_grupo.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  const selecionarGrupo = (id) => {
    const grupo = grupos.find(grupo => grupo.id_grupo === id);
    setGrupoSelecionado(grupo);
  };

  useEffect(() => {
    const pegaExclusivo = async () => {
      console.log("passou no useEffect")
      if (grupoSelecionado) {
        const response = await pegaPermissoesWHERE(grupoSelecionado.id_grupo, false);
        setPermissoesGrupo(response)
        setCarregandoPermissoes(false);
      }
    }
    pegaExclusivo();
  }, [grupoSelecionado])

  const handleGrupos = (grupoSelecionado) => {
    console.log(grupoSelecionado)
    if (grupoSelecionado.nomes_usuarios && grupoSelecionado.nomes_usuarios.indexOf(',') != -1) {
      return (
        <>
          {grupoSelecionado.nomes_usuarios.split(',').map((user, index) => (
            <>
              <li>
                <span>{user}</span>
                <span>id: {grupoSelecionado.ids_usuarios.split(',')[index]}</span>
              </li>

            </>
          ))}
        </>
      )
    } else {
      return (
        <>
          <li>
            <span>{grupoSelecionado.nomes_usuarios ? grupoSelecionado.nomes_usuarios : "Sem funcionários"}</span>
            <span>{grupoSelecionado.ids_usuarios ? "id: " + grupoSelecionado.ids_usuarios : null}</span>
          </li>
        </>
      )
    }
  }


  return (
    <div className="PagGrupoacesso">
      <NavBar />
      <Titulo tituloMsg="Gerenciar Grupos de Acesso" />

      <div className="conteudoPagina">
        {showModal &&
          <PermissoesModal
            fechar={() => { setShowModal(false) }}
            grupoOBJ={permissoesGrupo}
            updateModalData={updateModalData}
          />}
        <div className="btn">
        </div>

        <div className="Conteudo">
          <div className="BarraLateral">
            <input
              type="text"
              placeholder="Pesquisar grupos"
              value={textoPesquisa}
              onChange={handleChangePesquisa}
            />
            {carregando ?
              <>Carregando...</>
              : gruposFiltrados.map((grupo) => (
                <div
                  key={grupo.id_grupo}
                  className={grupoSelecionado?.id_grupo === grupo.id_grupo ? 'ItemGrupoSelecionado' : 'ItemGrupo'}
                  onClick={() => selecionarGrupo(grupo.id_grupo)}
                >
                  {grupo.nome_grupo}
                </div>
              ))
            }
          </div>

          <div className="ConteudoPrincipal">
            {grupoSelecionado ? (
              <div className="dados-grupo">
                <h1>Detalhes do Grupo</h1>
                <br />
                <p><strong>Id:</strong> {grupoSelecionado.id_grupo}</p>
                <p><strong>Nome:</strong> {grupoSelecionado.nome_grupo}</p>
                <p><strong>Descrição:</strong> {grupoSelecionado.descricao_grupo || 'Não disponível'}</p>
                <p><strong>Funcionários:</strong></p>
                <div className='conteudo-gerado'>
                  <ul>
                    {handleGrupos(grupoSelecionado)}
                  </ul>
                </div>

                <p><strong>Permissões:</strong></p>
                {carregandoPermissoes ?
                  <>Carregando...</> :
                  <>
                    <div className='conteudoBotao'>
                      <button className="botaoPermissao" onClick={() => { setShowModal(true) }}>Visualizar ou Editar permissões</button>
                    </div>
                  </>}
                <button className="Fechar" onClick={() => setGrupoSelecionado(null)}>X</button>
              </div>
            ) : (
              <div>
                <h3>Selecione um grupo para ver os detalhes...</h3>
                <button className="adicionarGrupo" onClick={()=>{console.log(permissoesGrupo)}}>
                  Adicionar um Grupo Novo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagGrupoacesso;
