import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import { UserContextProvider } from './Context/UserContext'; // Import the UseProvider component from your context file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
