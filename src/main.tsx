import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AppProviders from './context/AppProviders';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppProviders>
        <App />
      </AppProviders>
    </Router>
  </React.StrictMode>,
); 