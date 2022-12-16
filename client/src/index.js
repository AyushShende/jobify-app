import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { AlertContextProvider } from './context/alertContext/alertContext';
import { UserContextProvider } from './context/userContext/userContext';
import { JobContextProvider } from './context/jobContext/jobContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <UserContextProvider>
        <JobContextProvider>
          <App />
        </JobContextProvider>
      </UserContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
);
