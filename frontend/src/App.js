import React from 'react';
import AppRoutes from './Routes';
import { UserContextProvider } from './Context/UserContext';
//npm i react-scripts
//npm i primereact
function App() {
  return (
    <UserContextProvider>
      <div>
        <AppRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;