import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import MemosStorage from '@/services/MemosStorage.ts';
import MemosProvider from '@/components/providers/MemosProvider.tsx';
import NotistackProvider from '@/components/providers/NotistackProvider.tsx';

const storage = new MemosStorage();
await storage.initialize();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotistackProvider>
      <MemosProvider storage={storage}>
        <App />
      </MemosProvider>
    </NotistackProvider>
  </React.StrictMode>
);
