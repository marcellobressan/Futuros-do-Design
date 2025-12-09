import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

const renderFallbackError = (error: any) => {
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'DM Sans', sans-serif;
        background-color: #fffeee;
        color: #161616;
        text-align: center;
        padding: 2rem;
      ">
        <div style="
          width: 64px; 
          height: 64px; 
          background-color: #ff6002; 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin-bottom: 1.5rem;
          color: white;
          font-size: 32px;
          font-weight: bold;
        ">!</div>
        <h1 style="font-size: 24px; margin-bottom: 1rem; font-weight: 800;">Erro ao carregar o portal</h1>
        <p style="margin-bottom: 2rem; color: #3f3f3f; max-width: 400px; line-height: 1.5;">
          Ocorreu um problema durante a inicialização da aplicação.
        </p>
        <div style="
          background-color: #fff;
          border: 1px solid #e5e7eb;
          padding: 1rem;
          border-radius: 8px;
          color: #ef4444;
          font-family: monospace;
          font-size: 12px;
          text-align: left;
          max-width: 600px;
          width: 100%;
          overflow: auto;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        ">
          <strong>Detalhes do erro:</strong><br/>
          ${error instanceof Error ? error.message : String(error)}
          <br/><br/>
          <em>Verifique o console do desenvolvedor para mais informações.</em>
        </div>
        <button onclick="window.location.reload()" style="
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          background-color: #161616;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          font-family: inherit;
        ">
          Tentar Novamente
        </button>
      </div>
    `;
  }
};

try {
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (e) {
  console.error("Critical Application Error:", e);
  renderFallbackError(e);
}

// Global error safety net
window.addEventListener('error', (event) => {
  console.error("Global Error Caught:", event.error);
  // Only render fallback if the app hasn't mounted properly (e.g. still blank)
  if (rootElement && rootElement.childElementCount === 0) {
    renderFallbackError(event.error || "Erro desconhecido na execução do script.");
  }
});