import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { AlertContextProvider } from './context/alertContext/alertContext';
import { UserContextProvider } from './context/userContext/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
);
