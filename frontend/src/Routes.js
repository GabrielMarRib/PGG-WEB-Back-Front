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
import PagVenderProduto from './Pages/App/PagVenderProduto'; 

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
            <Route path="/PagEscolhaProdutos" element={<PagEscolhaProdutos />} />
            <Route path="/PagVenderProduto" element={<PagVenderProduto />} />
          </>
        )}
        {/* Rota padrão para redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
