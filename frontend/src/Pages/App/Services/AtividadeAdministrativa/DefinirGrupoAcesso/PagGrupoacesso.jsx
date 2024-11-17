import React, { useEffect, useState } from 'react';
import Titulo from '../../../../../Components/Titulo/Titulo';
import CabecalhoHome from '../../../../../Components/Cabecalho/CabecalhoHome';
import { useNavigate } from 'react-router-dom';
import './PagGrupoacesso.css';
import { pegaPermissoesTotais } from '../../../../../Config/Permissoes';

function PagGrupoacesso() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([])
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const pegaGrupos = async () => {
      const response = await pegaPermissoesTotais();
      setGrupos(response)
      setCarregando(false)
    }
    pegaGrupos();
  }, [])

  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

  const handleChangePesquisa = (event) => {
    setTextoPesquisa(event.target.value);
  };

  const gruposFiltrados = grupos.filter(grupo =>
    grupo.nome_grupo.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  const selecionarGrupo = (id) => {
    const grupo = grupos.find(grupo => grupo.id_grupo === id);
    setGrupoSelecionado(grupo);
  };

  return (
    <div className="PagGrupoacesso">
      <CabecalhoHome />
      <Titulo tituloMsg="Gerenciar Grupos de Acesso" />

      <div className="conteudoPagina">
        <div className="btn">
          <button className="voltar" onClick={() => navigate("/PagHome")}>
            Voltar
          </button>
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
                  className={`ItemGrupo ${grupoSelecionado?.id === grupo.id_grupo ? 'selecionado' : ''}`}
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
                <button onClick={() => { console.log(grupoSelecionado.nomes_usuarios.split(',')) }}>a</button>
                <h1>Detalhes do Grupo</h1>
                <p><strong>Nome:</strong> {grupoSelecionado.nome_grupo}</p>
                <p><strong>Descrição:</strong> {grupoSelecionado.descricao_grupo || 'Não disponível'}</p>
                <p><strong>Funcionários:</strong></p>
                <ul className='left-20'>
                  {grupoSelecionado.nomes_usuarios.split(',').map((user, index) => (
                    <li>
                      <span>{user}</span>
                      <span>id: {grupoSelecionado.ids_usuarios.split(',')[index]}</span>
                    </li>
                  ))}
                </ul>
                <p><strong>Permissões:</strong></p>
                
                <button className="Fechar" onClick={() => setGrupoSelecionado(null)}>X</button>
              </div>
            ) : (
              <div>
                <h3>Selecione um grupo para ver os detalhes...</h3>
                <button className="adicionarGrupo">
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
