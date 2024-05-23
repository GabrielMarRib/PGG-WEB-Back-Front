import React from 'react';
import AppRoutes from './Routes';
import { UserContextProvider } from './Context/UserContext';

//npm install firebase-admin
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