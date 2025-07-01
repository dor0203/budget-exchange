import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from './data-provider.tsx'
import './index.css'
import App from './App.tsx'

const serverDataUrl = 'http://localhost:3001/data.json';

createRoot(document.getElementById('root')!).render(
  <DataProvider url={serverDataUrl}>
    <StrictMode>
      <App />
    </StrictMode>
  </DataProvider>
)
