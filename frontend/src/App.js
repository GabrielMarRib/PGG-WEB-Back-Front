import React from 'react';
import AppRoutes from './Routes';
import { UserContextProvider } from './Context/UserContext';
import { AlertaProvider } from './Context/AlertaContext';
//npm i react-scripts
//npm i primereact
//npm i recharts
function App() {
  return (
    <AlertaProvider>
    <UserContextProvider>
      <div>
        <AppRoutes />
      </div>
    </UserContextProvider>
    </AlertaProvider>
  );
}

export default App;