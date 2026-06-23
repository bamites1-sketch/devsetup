import { ProjectConfig } from '../../../types/index.js';

export function getPackageJson(config: ProjectConfig): string {
  const dependencies: Record<string, string> = {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
  };

  if (config.addApiService) {
    dependencies.axios = '^1.6.2';
  }

  const devDependencies: Record<string, string> = {
    '@types/react': '^18.2.43',
    '@types/react-dom': '^18.2.17',
    '@typescript-eslint/eslint-plugin': '^6.14.0',
    '@typescript-eslint/parser': '^6.14.0',
    '@vitejs/plugin-react': '^4.2.1',
    eslint: '^8.55.0',
    'eslint-plugin-react-hooks': '^4.6.0',
    'eslint-plugin-react-refresh': '^0.4.5',
    prettier: '^3.1.1',
    typescript: '^5.3.3',
    vite: '^5.0.8',
    vitest: '^1.0.4',
    '@testing-library/react': '^14.1.2',
    '@testing-library/jest-dom': '^6.1.5',
    jsdom: '^23.0.1',
  };

  if (config.useTailwind) {
    devDependencies.tailwindcss = '^3.4.0';
    devDependencies.postcss = '^8.4.32';
    devDependencies.autoprefixer = '^10.4.16';
  }

  if (config.useHusky) {
    devDependencies.husky = '^8.0.3';
    devDependencies['lint-staged'] = '^15.2.0';
  }

  const scripts: Record<string, string> = {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
    lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    format: 'prettier --write "src/**/*.{ts,tsx}"',
    test: 'vitest run',
    'test:watch': 'vitest',
    'test:coverage': 'vitest run --coverage',
  };

  if (config.useHusky) {
    scripts.prepare = 'husky install';
  }

  const packageJson = {
    name: config.projectName,
    private: true,
    version: '0.1.0',
    type: 'module',
    description: `${config.projectName} - A React application`,
    scripts,
    dependencies,
    devDependencies,
  };

  if (config.useHusky) {
    (packageJson as Record<string, unknown>)['lint-staged'] = {
      '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
    };
  }

  return JSON.stringify(packageJson, null, 2);
}
