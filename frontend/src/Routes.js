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
import PagTestePontoPedido from './Pages/App/Services/PagTestePontoPedido'; 
import PagRelatorios from './Pages/App/Services/PagRelatorios';
import PagFuncionarios from './Pages/App/Services/PagFuncionarios'; 
import PagTeste from './Pages/App/Services/PagTeste';
import TesteDashboard from './Pages/App/Services/TesteDashboard';
import GerirCategoria from './Pages/App/Services/GerirCategoria';
import PagTesteInsercao from './Pages/App/Services/PagTesteInsercao'; 
import PagTesteInsercaoDD from './Pages/App/Services/PagTesteInsercaoDD';
import GerirLotes from './Pages/App/Services/GerirLotes';
import PagMovimentos from './Pages/App/Services/PagMovimentos';

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
            <Route path="/PagHome" element={<PagHome />} />
            <Route path="/PagPerfil" element={<PagPerfil />} />
            <Route path="/PagAddFunc" element={<PagAddFunc />} />
            <Route path="/PagProdutos" element={<PagProdutos />} />
            <Route path="/PagLoteEconomico" element={<PagLoteEconomico />} />
            <Route path="/PagEscolhaProdutos" element={<PagEscolhaProdutos />} />
            <Route path="/PagVenderProduto" element={<PagVenderProduto />} />
            <Route path="/PagEscolhaCurvaABC" element={<PagEscolhaCurvaABC />} />
            <Route path="/PagCurvaABC" element={<PagCurvaABC />} />  
            <Route path="/PagCurvaABCPorValor" element={<PagCurvaABCPorValor />} /> 
            <Route path="/PagPontoPedido" element={<PagPontoPedido />} /> 
            <Route path="/PagTestePontoPedido" element={<PagTestePontoPedido />} /> 
            <Route path="/PagRelatorios" element={<PagRelatorios />} />   
            <Route path="/PagFuncionarios" element={<PagFuncionarios />} /> 
            <Route path="/PagTeste" element={<PagTeste />} />
            <Route path="/PagTesteInsercao" element={<PagTesteInsercao />} />
            <Route path="/PagTesteInsercaoDD" element={<PagTesteInsercaoDD />} />
            <Route path="/TesteDashboard" element={<TesteDashboard />} />
            <Route path="/PagGerirCategoria" element={<GerirCategoria />} />
            <Route path="/PagGerirLotes" element={<GerirLotes />} />
            <Route path="/PagMovimentos" element={<PagMovimentos />} />
            
    
          </> 
        )}
        {/* Rota padrão para redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
