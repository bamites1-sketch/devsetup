import { ProjectConfig } from '../../../types/index.js';

export function getAppComponent(config: ProjectConfig): string {
  const className = config.useTailwind
    ? 'className="min-h-screen bg-gray-100 flex items-center justify-center"'
    : '';
  const containerClass = config.useTailwind ? 'className="text-center"' : '';
  const titleClass = config.useTailwind
    ? 'className="text-4xl font-bold text-blue-600 mb-4"'
    : '';
  const textClass = config.useTailwind ? 'className="text-gray-700 mb-6"' : '';

  return `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div ${className}>
      <div ${containerClass}>
        <h1 ${titleClass}>${config.projectName}</h1>
        <p ${textClass}>
          Welcome to your new React + TypeScript + Vite application!
        </p>
        <button
          ${
            config.useTailwind
              ? 'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
              : ''
          }
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
`;
}
