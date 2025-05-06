import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { LoanProvider } from './context/LoanContext';

createRoot(document.getElementById('root')).render(
  <LoanProvider>
  <BrowserRouter> 
    <App />
  </BrowserRouter>
  </LoanProvider>
)
