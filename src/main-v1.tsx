// neudental v1 - Application Entry Point
import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App-v1.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production pages arrive as complete HTML from the build-time prerender
// (scripts/prerender.mjs), so React attaches to that markup instead of
// redrawing it. The dev server and the /admin shell send an empty root.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
