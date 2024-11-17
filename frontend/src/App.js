import React from 'react';
import AppRoutes from './Routes';
import { UserContextProvider } from './Context/UserContext';
import { AlertaProvider } from './Context/AlertaContext';
import { PermissoesContextProvider } from './Context/PermissoesContext';
//npm i react-scripts
//npm i primereact
//npm i recharts
//npm i xlsx
//npm i qrcode
//npm i file-saver
//npm i -D tailwindcss postcss autoprefixer
//npm i react-icons

function App() {
  return (
    <PermissoesContextProvider>
    <AlertaProvider>
      <UserContextProvider>
        <div>
          <AppRoutes />
        </div>
      </UserContextProvider>
    </AlertaProvider>
    </PermissoesContextProvider>
  );
}

export default App;