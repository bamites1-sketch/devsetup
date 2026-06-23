import { ProjectConfig } from '../../../types/index.js';

export function getMainTs(config: ProjectConfig): string {
  let imports = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';`;

  if (config.useTailwind) {
    imports += `\nimport './index.css';`;
  }

  return `${imports}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
}
