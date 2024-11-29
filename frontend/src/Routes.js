// src/Routes.js
import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

// Login
import PagLogin from './Pages/App/Login/PagLogin';
import PagLoginMobile from './Mobile/PagLogin-Mobile';

// Dashboard
import PagHome from './Pages/App/Services/Dashboard/PagHome';

// Perfil
import PagPerfil from './Pages/App/Services/PerfilUser/PagPerfil';

//Atividade Administrativa
import PagAddFunc from './Pages/App/Services/AtividadeAdministrativa/Funcionarios/AddFuncionarios/PagAddFunc';
import PagFuncionarios from './Pages/App/Services/AtividadeAdministrativa/Funcionarios/ListaFuncionarios/PagFuncionarios';
import PagRelatorios from './Pages/App/Services/AtividadeAdministrativa/Relatorios/PagRelatorios';
import PagHistorico from './Pages/App/Services/AtividadeAdministrativa/Logs/PagHistorico';
import PagGrupoacesso from './Pages/App/Services/AtividadeAdministrativa/DefinirGrupoAcesso/PagGrupoacesso';
// Fornecedores 
import PagCadastroFornecedor from './Pages/App/Services/Fornecedores/CadastroFornecedor/PagCadastroFornecedor';
import PagPesquisaFornecedor from './Pages/App/Services/Fornecedores/PesquisaFornecedor/PagPesquisaFornecedor';

// Estoque 
import PagProdutos from './Pages/App/Services/Estoque/AddProdutos/PagProdutos';
import PagVenderProduto from './Pages/App/Services/Estoque/BaixaProdutos/PagVenderProduto';
import PagMovimentos from './Pages/App/Services/Estoque/Movimento/PagMovimentos';
import GerirLotes from './Pages/App/Services/Estoque/GerirLotes/GerirLotes';
import GerirCategoria from './Pages/App/Services/Estoque/GerirCategorias/GerirCategoria';
import PagUploadExcel from './Pages/App/Services/Estoque/Excel/PagUploadExcel';
import PagInventario from './Pages/App/Services/Estoque/Inventario/PagInventario';

// Curva ABC 
import PagCurvaABC from './Pages/App/Services/CurvaABC/Curva_Frequencia/PagCurvaABC';
import PagCurvaABCPorValor from './Pages/App/Services/CurvaABC/Curva_Valor/PagCurvaABCPorValor';

// Lote Econômico 
import PagLoteEconomico from './Pages/App/Services/LoteEconomico/PagLoteEconomico';

// Ponto de Pedido
import PagPontoPedido from './Pages/App/Services/PontoDePedido/PagPontoPedido';

// Escolha (Deprecated)
import PagEscolhaProdutos from './Pages/App/Services/PaginasEscolha(DEPRECATED)/Produtos/PagEscolhaProdutos';
import PagEscolhaCurvaABC from './Pages/App/Services/PaginasEscolha(DEPRECATED)/CurvaABC/PagEscolhaCurvaABC';
import PagEscolhaPontoDePedido from './Pages/App/Services/PaginasEscolha(DEPRECATED)/PagEscolhaPontoDePedido';

// Testes
import PagTeste from './Pages/App/Services/Tests/PagTeste';
import TesteDashboard from './Pages/App/Services/Tests/DashboardTeste/TesteDashboard';
import PagTesteInsercao from './Pages/App/Services/Tests/PagTesteInsercao';
import PagTesteInsercaoDD from './Pages/App/Services/Tests/PagTesteInsercaoDD';
import NavBar from './Components/NavBar/NavBar';
import Email from './Pages/App/Services/Tests/email'; 

// Funcoes
import { IsMobile } from './Functions/Functions';
import PrivateRoute from './PrivateRoute';

const Mobile = IsMobile();

function AppRoutes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {Mobile ? (
          <>
            <Route path="/" element={<Navigate to="/mobile" />} />
            <Route path="/mobile" element={<PagLoginMobile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/PagLogin" />} />
            <Route path="/PagLogin" element={<PagLogin />} />
            <Route path="/email" element={<Email/> } />
            {/* // Dashboard */}
            <Route path="/PagHome" element={<PrivateRoute element={<PagHome />} intent={{ class: "Dashboard", intentPage: "Página Dashboard" }} />} />

            {/* // Perfil */}
            <Route path="/PagPerfil" element={<PrivateRoute element={<PagPerfil />} intent={{ class: "Perfil", intentPage: "Página de Perfil" }} />} />

            {/* // Atividade Administrativa */}
            <Route path="/PagAddFunc" element={<PrivateRoute element={<PagAddFunc />} intent={{ class: "Atividade Administrativa", intentPage: "Adicionar Funcionário" }} />} />
            <Route path="/PagRelatorios" element={<PrivateRoute element={<PagRelatorios />} intent={{ class: "Atividade Administrativa", intentPage: "Relatórios" }} />} />
            <Route path="/PagFuncionarios" element={<PrivateRoute element={<PagFuncionarios />} intent={{ class: "Atividade Administrativa", intentPage: "Lista de Funcionarios" }} />} />
            <Route path="/PagHistorico" element={<PrivateRoute element={<PagHistorico />} intent={{ class: "Atividade Administrativa", intentPage: "Histórico" }} />} />
            <Route path="/DefGrupoAcesso" element={<PrivateRoute element={<PagGrupoacesso />} intent={{ class: "Atividade Administrativa", intentPage: "Gerenciar Grupos de Acesso" }} />} />

            {/* // Estoque */}
            <Route path="/PagProdutos" element={<PrivateRoute element={<PagProdutos />} intent={{ class: "Estoque", intentPage: "Adicionar Produtos" }} />} />
            <Route path="/PagMovimentos" element={<PrivateRoute element={<PagMovimentos />} intent={{ class: "Estoque", intentPage: "Movimento" }} />} />
            <Route path="/PagGerirLotes" element={<PrivateRoute element={<GerirLotes />} intent={{ class: "Estoque", intentPage: "Gerenciar Lotes" }} />} />
            <Route path="/PagInventario" element={<PrivateRoute element={<PagInventario />} intent={{ class: "Estoque", intentPage: "Inventário" }} />} />
            <Route path="/PagCurvaABC" element={<PrivateRoute element={<PagCurvaABC />} intent={{ class: "Estoque", intentPage: "Curva ABC" }} />} />
            <Route path="/PagCurvaABCPorValor" element={<PrivateRoute element={<PagCurvaABCPorValor />} intent={{ class: "Estoque", intentPage: "Curva ABC Por valor" }} />} />
            <Route path="/PagVenderProduto" element={<PrivateRoute element={<PagVenderProduto />} intent={{ class: "Estoque", intentPage: "Página de Baixa" }} />} />
            <Route path="/PagUploadExcel" element={<PrivateRoute element={<PagUploadExcel />} intent={{ class: "Estoque", intentPage: "Upload de Excel ao estoque" }} />} />
            <Route path="/PagGerirCategoria" element={<PrivateRoute element={<GerirCategoria />} intent={{ class: "Estoque", intentPage: "Gerenciar Categorias" }} />} />
            <Route path="/PagPontoPedido" element={<PrivateRoute element={<PagPontoPedido />} intent={{ class: "Estoque", intentPage: "Ponto de Pedido" }} />} />
            <Route path="/PagLoteEconomico" element={<PrivateRoute element={<PagLoteEconomico />} intent={{ class: "Estoque", intentPage: "Lote econômico" }} />} />

            {/* // Fornecedor */}
            <Route path="/PagCadFornecedor" element={<PrivateRoute element={<PagCadastroFornecedor />} intent={{ class: "Fornecedor", intentPage: "Cadastrar Fornecedor" }} />} />
            <Route path="/PagPesquisaFornecedor" element={<PrivateRoute element={<PagPesquisaFornecedor />} intent={{ class: "Fornecedor", intentPage: "Pesquisar Fornecedor" }} />} />

            {/* // Test */}
            <Route path="/PagTeste" element={<PrivateRoute element={<PagTeste />} intent={{ class: "Test", intentPage: "PagTeste" }} />} />
            <Route path="/TesteDashboard" element={<PrivateRoute element={<TesteDashboard />} intent={{ class: "Test", intentPage: "TesteDashboard" }} />} />
            <Route path="/PagTesteInsercao" element={<PrivateRoute element={<PagTesteInsercao />} intent={{ class: "Test", intentPage: "PagTesteInsercao" }} />} />
            

            {/* // Misc */}
            <Route path="/PagEscolhaProdutos" element={<PrivateRoute element={<PagEscolhaProdutos />} intent={{ class: "Misc", intentPage: "PagEscolhaProdutos" }} />} />
            <Route path="/PagEscolhaCurvaABC" element={<PrivateRoute element={<PagEscolhaCurvaABC />} intent={{ class: "Misc", intentPage: "PagEscolhaCurvaABC" }} />} />
            <Route path="/PagTesteInsercaoDD" element={<PrivateRoute element={<PagTesteInsercaoDD />} intent={{ class: "Misc", intentPage: "PagTesteInsercaoDD" }} />} />
            <Route path="/PagEscolhaPontoDePedido" element={<PrivateRoute element={<PagEscolhaPontoDePedido />} intent={{ class: "Misc", intentPage: "PagEscolhaPontoDePedido" }} />} />
            <Route path="/PagNavBar" element={<PrivateRoute element={<NavBar />} intent={{ class: "Misc", intentPage: "PagNavBar" }} />} />


          </>
        )}
        {/* Rota padrão para redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
