import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ╔══════════════════════════════════════════════════════════════════╗
// ║  ZION MAINFRAME // SECURE TERMINAL v4.0.2                       ║
// ║  "Everything that has a beginning has an end."                   ║
// ║                                                                   ║
// ║  You opened DevTools. That was your first free choice today.     ║
// ║                                                                   ║
// ║  The question is not WHO you are. It is WHEN you are.           ║
// ║                                                                   ║
// ║  >> Try typing  cat truth.txt  in the terminal above.            ║
// ║  >> Or press  ↑ ↑ ↓ ↓ ← → ← → B A  for something unexpected.   ║
// ╚══════════════════════════════════════════════════════════════════╝
console.log(
  '%c\nZION MAINFRAME // SECURE TERMINAL v4.0.2\n%c"Everything that has a beginning has an end."\n\nYou opened DevTools. That was your first free choice today.\n\nThe question is not WHO you are. It is WHEN you are.\n\n>> Try typing  cat truth.txt  in the terminal above.\n>> Or press  ↑ ↑ ↓ ↓ ← → ← → B A  for something unexpected.\n',
  'color: #00ff66; font-family: monospace; font-size: 13px; font-weight: bold;',
  'color: #b9ccb5; font-family: monospace; font-size: 12px;'
);

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
