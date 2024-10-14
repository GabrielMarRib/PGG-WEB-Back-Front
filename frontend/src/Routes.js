// src/Routes.js
import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import PagLogin from './Pages/PagLogin';
import PagLoginMobile from './Mobile/PagLogin-Mobile';
import PagHome from './Pages/App/PagHome';
import PagPerfil from './Pages/App/PagPerfil';
import { IsMobile } from './Functions/Functions';
import PagAddFunc from './Pages/App/Services/PagAddFunc';
import PagProdutos from './Pages/App/Services/PagProdutos';
import PagEscolhaProdutos from './Pages/App/PagEscolhaProdutos';    
import PagVenderProduto from './Pages/App/Services/PagVenderProduto'; 
import PagLoteEconomico from './Pages/App/Services/PagLoteEconomico'; 
import PagEscolhaCurvaABC from './Pages/App/PagEscolhaCurvaABC'; 
import PagCurvaABC from './Pages/App/Services/PagCurvaABC';
import PagCurvaABCPorValor from './Pages/App/Services/PagCurvaABCPorValor'; 
import PagPontoPedido from './Pages/App/Services/PagPontoPedido'; 

import PagRelatorios from './Pages/App/Services/PagRelatorios';
import PagFuncionarios from './Pages/App/Services/PagFuncionarios'; 
import PagTeste from './Pages/App/Services/PagTeste';
import TesteDashboard from './Pages/App/Services/TesteDashboard';
import GerirCategoria from './Pages/App/Services/GerirCategoria';
import PagTesteInsercao from './Pages/App/Services/PagTesteInsercao'; 
import PagTesteInsercaoDD from './Pages/App/Services/PagTesteInsercaoDD';
import PrivateRoute from './PrivateRoute';
import GerirLotes from './Pages/App/Services/GerirLotes';
import PagMovimentos from './Pages/App/Services/PagMovimentos';
import PagCadastroFornecedor from './Pages/App/Services/PagCadastroFornecedor'; 
import PagHistorico from './Pages/App/Services/PagHistorico'; 


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

            <Route path="/PagHome" element={<PrivateRoute element={<PagHome />} />} />
            <Route path="/PagPerfil" element={<PrivateRoute element={<PagPerfil />} />} />
            <Route path="/PagAddFunc" element={<PrivateRoute element={<PagAddFunc />} />} />
            <Route path="/PagProdutos" element={<PrivateRoute element={<PagProdutos />} />} />
            <Route path="/PagLoteEconomico" element={<PrivateRoute element={<PagLoteEconomico />} />} />
            <Route path="/PagEscolhaProdutos" element={<PrivateRoute element={<PagEscolhaProdutos />} />} />
            <Route path="/PagVenderProduto" element={<PrivateRoute element={<PagVenderProduto />} />} />
            <Route path="/PagEscolhaCurvaABC" element={<PrivateRoute element={<PagEscolhaCurvaABC />} />} />
            <Route path="/PagCurvaABC" element={<PrivateRoute element={<PagCurvaABC />} />} />  
            <Route path="/PagCurvaABCPorValor" element={<PrivateRoute element={<PagCurvaABCPorValor />} />} /> 
            <Route path="/PagPontoPedido" element={<PrivateRoute element={<PagPontoPedido />} />} /> 
            <Route path="/PagRelatorios" element={<PrivateRoute element={<PagRelatorios />} />} />   
            <Route path="/PagFuncionarios" element={<PrivateRoute element={<PagFuncionarios />} />} /> 
            <Route path="/PagTeste" element={<PrivateRoute element={<PagTeste />} />} />
            <Route path="/PagTesteInsercao" element={<PrivateRoute element={<PagTesteInsercao />} />} />
            <Route path="/PagTesteInsercaoDD" element={<PrivateRoute element={<PagTesteInsercaoDD />} />} />
            <Route path="/TesteDashboard" element={<PrivateRoute element={<TesteDashboard />} />} />
            <Route path="/PagGerirCategoria" element={<PrivateRoute element={<GerirCategoria />} />} />
            <Route path="/PagGerirLotes" element={<PrivateRoute element={<GerirLotes />} />} />
            <Route path="/PagMovimentos" element={<PrivateRoute element={<PagMovimentos />} />} />
            <Route path="/PagCadFornecedor" element={<PrivateRoute element={<PagCadastroFornecedor />} />} />
            <Route path="/PagHistorico" element={<PrivateRoute element={<PagHistorico />} />} />

            
          </>
        )}
        {/* Rota padrão para redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
