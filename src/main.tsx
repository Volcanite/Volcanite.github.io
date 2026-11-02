import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
// BrowserRouter rend la navigation disponible à l'ensemble de l'application. Sans lui, les composants Link et Routes ne pourraient pas fonctionner correctement.
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
