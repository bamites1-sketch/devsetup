import { ProjectConfig } from '../../../types/index.js';

export function getViteConfig(config: ProjectConfig): string {
  const plugins = ["react()"];
  
  let pathAlias = '';
  if (config.usePathAliases) {
    pathAlias = `
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },`;
  }

  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';${config.usePathAliases ? "\nimport path from 'path';" : ''}

export default defineConfig({
  plugins: [${plugins.join(', ')}],${pathAlias}
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
`;
}
