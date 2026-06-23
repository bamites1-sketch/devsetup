import { ProjectConfig } from '../../../types/index.js';

export function getVitestConfig(config: ProjectConfig): string {
  let alias = '';
  if (config.usePathAliases) {
    alias = `
    alias: {
      '@': path.resolve(__dirname, './src'),
    },`;
  }

  return `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';${config.usePathAliases ? "\nimport path from 'path';" : ''}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'tests'],
    },
  },
  resolve: {${alias}
  },
});
`;
}
