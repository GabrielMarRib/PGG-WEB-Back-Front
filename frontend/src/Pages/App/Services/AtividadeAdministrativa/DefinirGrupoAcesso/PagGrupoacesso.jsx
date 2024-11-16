import React, { useState } from 'react';
import Titulo from '../../../../../Components/Titulo/Titulo';
import CabecalhoHome from '../../../../../Components/Cabecalho/CabecalhoHome';
import { useNavigate } from 'react-router-dom';
import './PagGrupoacesso.css';

function PagGrupoacesso() {
  const navigate = useNavigate();
  const [textoPesquisa, setTextoPesquisa] = useState(""); 
  const [grupos, setGrupos] = useState([
    { 
      id: 1, 
      nome: 'grupo 1', 
      funcionarios: ['JuJu', 'Milena', 'Pedro'] 
    },
    { 
      id: 2, 
      nome: 'grupo 2', 
      funcionarios: ['Blue', 'Sarah'] 
    },
    {  
      id: 3, 
      nome: 'grupo 69', 
      funcionarios: ['Mari A', 'Japa'] 
    }
  ]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null); 

  const handleChangePesquisa = (event) => {
    setTextoPesquisa(event.target.value);
  };

  const gruposFiltrados = grupos.filter(grupo =>
    grupo.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  const selecionarGrupo = (id) => {
    const grupo = grupos.find(grupo => grupo.id === id);
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
            {gruposFiltrados.map((grupo) => (
              <div
                key={grupo.id}
                className={`ItemGrupo ${grupoSelecionado?.id === grupo.id ? 'selecionado' : ''}`}
                onClick={() => selecionarGrupo(grupo.id)}
              >
                {grupo.nome}
              </div>
            ))}
          </div>

          <div className="ConteudoPrincipal">
            {grupoSelecionado ? (
              <div className="dados-grupo">
                <h1>Detalhes do Grupo</h1>
                <p><strong>Nome:</strong> {grupoSelecionado.nome}</p>
                <p><strong>Descrição:</strong> {grupoSelecionado.descricao || 'Não disponível'}</p>
                <p><strong>Funcionários:</strong></p>
                <ul>
                  {grupoSelecionado.funcionarios.length > 0 ? (
                    grupoSelecionado.funcionarios.map((funcionario, index) => (
                      <li key={index}>{funcionario}</li>
                    ))
                  ) : (
                    <li>Não há funcionários cadastrados.</li>
                  )}
                </ul>
                <button className="Fechar" onClick={() => setGrupoSelecionado(null)}>Fechar</button>
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
