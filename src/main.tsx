import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reloadOnce } from './lib/chunkReload';

gsap.registerPlugin(ScrollTrigger);
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;

// The browser restoring scroll before pinned content exists causes jumps/blank frames
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// A deploy removes old hashed chunks; a failed route preload would otherwise leave a dead black page
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault();
  reloadOnce();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
