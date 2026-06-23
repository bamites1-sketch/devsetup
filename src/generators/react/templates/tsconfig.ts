import { ProjectConfig } from '../../../types/index.js';

export function getTsConfig(config: ProjectConfig): string {
  const compilerOptions: Record<string, unknown> = {
    target: 'ES2020',
    useDefineForClassFields: true,
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    module: 'ESNext',
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react-jsx',
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  };

  if (config.usePathAliases) {
    compilerOptions.baseUrl = '.';
    compilerOptions.paths = {
      '@/*': ['./src/*'],
    };
  }

  return JSON.stringify(
    {
      compilerOptions,
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    },
    null,
    2
  );
}
