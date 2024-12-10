import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18+ syntax
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
