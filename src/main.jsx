import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { UserContextProvider } from "./contextapi.js/user_context.jsx";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

disableReactDevTools();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>,
)