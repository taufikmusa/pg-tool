import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const home = document.createElement('div')
home.className = 'px-4 pt-3 md:px-8 bg-[#F4F0E6]'
home.innerHTML = '<a href="/" class="inline-flex items-center gap-1 bg-white text-black font-black text-xs uppercase px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all">&larr; Home</a>'
document.getElementById('root').before(home)
