import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// Design system Morpho irisé : tokens, puis composants xt-*, puis la mise en page du site.
import './design-system/tokens.css'
import './design-system/components/bundle.css'
import './index.css'

// Cloudflare Pages renvoie index.html pour toute route inconnue
// (voir public/_redirects), donc les URLs propres fonctionnent en lien direct.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
