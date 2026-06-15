import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './output.css';
import DataProvider from './project/Context/Context_Provider/Dataprovider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />

    </DataProvider>
  </StrictMode>,
)
