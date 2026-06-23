import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { execa } from 'execa';
import { DoctorConfig, DoctorIssue, FixResult } from '../../types/index.js';
import { getPackageManager } from './detection.js';

export async function applyFixes(
  issues: DoctorIssue[],
  config: DoctorConfig
): Promise<FixResult[]> {
  const results: FixResult[] = [];

  for (const issue of issues) {
    if (!issue.fixable) {
      results.push({
        issueId: issue.id,
        title: issue.title,
        success: false,
        error: 'Not automatically fixable',
      });
      continue;
    }

    try {
      const result = await fixIssue(issue, config);
      results.push(result);
    } catch (error) {
      results.push({
        issueId: issue.id,
        title: issue.title,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
}

async function fixIssue(issue: DoctorIssue, config: DoctorConfig): Promise<FixResult> {
  switch (issue.id) {
    case 'missing-eslint':
      return fixMissingEslint(config);
    case 'eslint-not-installed':
      return fixEslintNotInstalled(config);
    case 'missing-prettier':
      return fixMissingPrettier(config);
    case 'missing-prettierignore':
      return fixMissingPrettierignore(config);
    case 'missing-tsconfig':
      return fixMissingTsconfig(config);
    case 'typescript-not-strict':
      return fixTypescriptNotStrict(config);
    case 'typescript-module-resolution':
      return fixTypescriptModuleResolution(config);
    case 'missing-scripts':
      return fixMissingScripts(config);
    case 'missing-repository':
      return fixMissingRepository(config);
    case 'missing-license':
      return fixMissingLicense(config);
    case 'no-git':
      return fixNoGit(config);
    case 'missing-gitignore':
      return fixMissingGitignore(config);
    case 'no-ci':
      return fixNoCI(config);
    case 'missing-editorconfig':
      return fixMissingEditorConfig(config);
    default:
      return {
        issueId: issue.id,
        title: issue.title,
        success: false,
        error: 'Unknown issue type',
      };
  }
}

async function fixMissingEslint(config: DoctorConfig): Promise<FixResult> {
  const eslintConfig = getEslintConfig(config.projectType);
  const configPath = resolve(config.projectRoot, '.eslintrc.cjs');
  
  writeFileSync(configPath, eslintConfig, 'utf-8');
  
  return {
    issueId: 'missing-eslint',
    title: 'ESLint configuration',
    success: true,
    details: ['Created .eslintrc.cjs'],
  };
}

async function fixEslintNotInstalled(config: DoctorConfig): Promise<FixResult> {
  const packageJsonPath = resolve(config.projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }
  
  // Add ESLint packages based on project type
  packageJson.devDependencies.eslint = '^8.56.0';
  
  if (config.projectType === 'react' || config.projectType === 'nextjs') {
    packageJson.devDependencies['@typescript-eslint/eslint-plugin'] = '^6.15.0';
    packageJson.devDependencies['@typescript-eslint/parser'] = '^6.15.0';
    packageJson.devDependencies['eslint-plugin-react-hooks'] = '^4.6.0';
    packageJson.devDependencies['eslint-plugin-react-refresh'] = '^0.4.5';
  } else if (config.projectType === 'typescript') {
    packageJson.devDependencies['@typescript-eslint/eslint-plugin'] = '^6.15.0';
    packageJson.devDependencies['@typescript-eslint/parser'] = '^6.15.0';
  }
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  
  return {
    issueId: 'eslint-not-installed',
    title: 'ESLint dependencies',
    success: true,
    details: ['Added ESLint to devDependencies'],
    requiresInstall: true,
  };
}

async function fixMissingPrettier(config: DoctorConfig): Promise<FixResult> {
  const prettierConfig = {
    semi: true,
    trailingComma: 'es5' as const,
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always' as const,
    endOfLine: 'lf' as const,
  };
  
  const configPath = resolve(config.projectRoot, '.prettierrc.json');
  writeFileSync(configPath, JSON.stringify(prettierConfig, null, 2), 'utf-8');
  
  // Add Prettier to package.json if not present
  const packageJsonPath = resolve(config.projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }
  
  let needsInstall = false;
  if (!packageJson.devDependencies.prettier) {
    packageJson.devDependencies.prettier = '^3.1.1';
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
    needsInstall = true;
  }
  
  return {
    issueId: 'missing-prettier',
    title: 'Prettier configuration',
    success: true,
    details: ['Created .prettierrc.json', needsInstall ? 'Added prettier to devDependencies' : ''].filter(Boolean),
    requiresInstall: needsInstall,
  };
}

async function fixMissingPrettierignore(config: DoctorConfig): Promise<FixResult> {
  const prettierIgnore = `node_modules/
dist/
build/
coverage/
.next/
*.log
.DS_Store
`;
  
  const ignorePath = resolve(config.projectRoot, '.prettierignore');
  writeFileSync(ignorePath, prettierIgnore, 'utf-8');
  
  return {
    issueId: 'missing-prettierignore',
    title: '.prettierignore',
    success: true,
    details: ['Created .prettierignore'],
  };
}

async function fixMissingTsconfig(config: DoctorConfig): Promise<FixResult> {
  const tsconfig = getTsconfigForProject(config.projectType);
  const tsconfigPath = resolve(config.projectRoot, 'tsconfig.json');
  
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
  
  return {
    issueId: 'missing-tsconfig',
    title: 'TypeScript configuration',
    success: true,
    details: ['Created tsconfig.json'],
  };
}

async function fixTypescriptNotStrict(config: DoctorConfig): Promise<FixResult> {
  const tsconfigPath = resolve(config.projectRoot, 'tsconfig.json');
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  
  tsconfig.compilerOptions.strict = true;
  
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
  
  return {
    issueId: 'typescript-not-strict',
    title: 'TypeScript strict mode',
    success: true,
    details: ['Enabled strict mode in tsconfig.json'],
  };
}

async function fixTypescriptModuleResolution(config: DoctorConfig): Promise<FixResult> {
  const tsconfigPath = resolve(config.projectRoot, 'tsconfig.json');
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {};
  }
  
  tsconfig.compilerOptions.moduleResolution = 'bundler';
  
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
  
  return {
    issueId: 'typescript-module-resolution',
    title: 'TypeScript module resolution',
    success: true,
    details: ['Updated moduleResolution to "bundler"'],
  };
}

async function fixMissingScripts(config: DoctorConfig): Promise<FixResult> {
  const packageJsonPath = resolve(config.projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  const addedScripts: string[] = [];
  
  if (!packageJson.scripts.lint) {
    packageJson.scripts.lint = 'eslint . --ext .ts,.tsx';
    addedScripts.push('lint');
  }
  
  if (!packageJson.scripts.format) {
    packageJson.scripts.format = 'prettier --write "src/**/*.{ts,tsx,js,jsx}"';
    addedScripts.push('format');
  }
  
  if (!packageJson.scripts.test && !packageJson.scripts['test:unit']) {
    packageJson.scripts.test = 'vitest run';
    packageJson.scripts['test:watch'] = 'vitest';
    addedScripts.push('test', 'test:watch');
  }
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  
  return {
    issueId: 'missing-scripts',
    title: 'Package.json scripts',
    success: true,
    details: [`Added scripts: ${addedScripts.join(', ')}`],
  };
}

async function fixMissingRepository(config: DoctorConfig): Promise<FixResult> {
  const packageJsonPath = resolve(config.projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  packageJson.repository = {
    type: 'git',
    url: 'https://github.com/username/repo.git',
  };
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  
  return {
    issueId: 'missing-repository',
    title: 'Repository field',
    success: true,
    details: ['Added repository field (update URL as needed)'],
  };
}

async function fixMissingLicense(config: DoctorConfig): Promise<FixResult> {
  const packageJsonPath = resolve(config.projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  packageJson.license = 'MIT';
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  
  return {
    issueId: 'missing-license',
    title: 'License field',
    success: true,
    details: ['Added MIT license (change if needed)'],
  };
}

async function fixNoGit(config: DoctorConfig): Promise<FixResult> {
  try {
    await execa('git', ['init'], { cwd: config.projectRoot });
    
    return {
      issueId: 'no-git',
      title: 'Git initialization',
      success: true,
      details: ['Initialized Git repository'],
    };
  } catch (error) {
    return {
      issueId: 'no-git',
      title: 'Git initialization',
      success: false,
      error: 'Failed to initialize Git',
    };
  }
}

async function fixMissingGitignore(config: DoctorConfig): Promise<FixResult> {
  const gitignore = getGitignoreForProject(config.projectType);
  const gitignorePath = resolve(config.projectRoot, '.gitignore');
  
  writeFileSync(gitignorePath, gitignore, 'utf-8');
  
  return {
    issueId: 'missing-gitignore',
    title: '.gitignore',
    success: true,
    details: ['Created .gitignore'],
  };
}

async function fixNoCI(config: DoctorConfig): Promise<FixResult> {
  const workflowDir = resolve(config.projectRoot, '.github/workflows');
  
  if (!existsSync(workflowDir)) {
    mkdirSync(workflowDir, { recursive: true });
  }
  
  const ciConfig = getCIConfigForProject(config.projectType);
  const ciPath = resolve(workflowDir, 'ci.yml');
  
  writeFileSync(ciPath, ciConfig, 'utf-8');
  
  return {
    issueId: 'no-ci',
    title: 'GitHub Actions CI/CD',
    success: true,
    details: ['Created .github/workflows/ci.yml'],
  };
}

async function fixMissingEditorConfig(config: DoctorConfig): Promise<FixResult> {
  const editorConfig = `root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
`;
  
  const configPath = resolve(config.projectRoot, '.editorconfig');
  writeFileSync(configPath, editorConfig, 'utf-8');
  
  return {
    issueId: 'missing-editorconfig',
    title: '.editorconfig',
    success: true,
    details: ['Created .editorconfig'],
  };
}

// Helper functions for generating configs

function getEslintConfig(projectType: string | null): string {
  if (projectType === 'react' || projectType === 'nextjs') {
    return `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
`;
  }
  
  return `module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
`;
}

function getTsconfigForProject(projectType: string | null): object {
  if (projectType === 'react' || projectType === 'nextjs') {
    return {
      compilerOptions: {
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
      },
      include: ['src'],
    };
  }
  
  return {
    compilerOptions: {
      target: 'ES2020',
      module: 'commonjs',
      lib: ['ES2020'],
      outDir: './dist',
      rootDir: './src',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist'],
  };
}

function getGitignoreForProject(projectType: string | null): string {
  const base = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;

  if (projectType === 'nextjs') {
    return base + `\n# Next.js\n.next/\nout/\n`;
  }
  
  return base;
}

function getCIConfigForProject(projectType: string | null): string {
  const pm = 'npm';
  const installCmd = 'npm ci';
  
  return `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: '${pm}'

    - name: Install dependencies
      run: ${installCmd}

    - name: Run linter
      run: npm run lint

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build
`;
}
