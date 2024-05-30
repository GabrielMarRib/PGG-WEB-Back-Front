// src/Routes.js
import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import PagLogin from './Pages/PagLogin';
import PagLoginMobile from './Mobile/PagLogin-Mobile';
import PagHome from './Pages/App/PagHome';
import PagPerfil from './Pages/App/PagPerfil';
import { IsMobile } from './Functions/Functions';

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
          </>
        )}
        {/* Rota padrão para redirecionar qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
