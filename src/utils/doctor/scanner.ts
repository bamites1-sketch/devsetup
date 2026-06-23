import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { DoctorIssue } from '../../types/index.js';
import { ProjectType } from './detection.js';

export async function scanProject(
  projectRoot: string,
  projectType: ProjectType
): Promise<DoctorIssue[]> {
  const issues: DoctorIssue[] = [];

  // Check package.json
  const packageJsonIssues = checkPackageJson(projectRoot);
  issues.push(...packageJsonIssues);

  // Check ESLint
  const eslintIssues = checkEslint(projectRoot, projectType);
  issues.push(...eslintIssues);

  // Check Prettier
  const prettierIssues = checkPrettier(projectRoot);
  issues.push(...prettierIssues);

  // Check TypeScript
  if (projectType === 'react' || projectType === 'nextjs' || projectType === 'typescript') {
    const tsIssues = checkTypeScript(projectRoot, projectType);
    issues.push(...tsIssues);
  }

  // Check Git
  const gitIssues = checkGit(projectRoot);
  issues.push(...gitIssues);

  // Check GitHub Actions
  const ciIssues = checkCI(projectRoot);
  issues.push(...ciIssues);

  // Check EditorConfig
  const editorConfigIssues = checkEditorConfig(projectRoot);
  issues.push(...editorConfigIssues);

  return issues;
}

function checkPackageJson(projectRoot: string): DoctorIssue[] {
  const issues: DoctorIssue[] = [];
  const packageJsonPath = resolve(projectRoot, 'package.json');

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    // Check for missing scripts
    const recommendedScripts = {
      lint: 'eslint',
      format: 'prettier',
      test: 'test',
    };

    const missingScripts = Object.entries(recommendedScripts).filter(
      ([script]) => !packageJson.scripts?.[script]
    );

    if (missingScripts.length > 0) {
      issues.push({
        id: 'missing-scripts',
        title: 'Missing package.json scripts',
        description: `Missing: ${missingScripts.map(([s]) => s).join(', ')}`,
        severity: 'warning',
        fixable: true,
        category: 'scripts',
      });
    }

    // Check for missing repository field
    if (!packageJson.repository) {
      issues.push({
        id: 'missing-repository',
        title: 'Missing repository field',
        description: 'package.json should include repository information',
        severity: 'info',
        fixable: true,
        category: 'metadata',
      });
    }

    // Check for missing license
    if (!packageJson.license) {
      issues.push({
        id: 'missing-license',
        title: 'Missing license field',
        description: 'package.json should specify a license',
        severity: 'info',
        fixable: true,
        category: 'metadata',
      });
    }
  } catch {
    issues.push({
      id: 'invalid-package-json',
      title: 'Invalid package.json',
      description: 'package.json is malformed or unreadable',
      severity: 'error',
      fixable: false,
      category: 'config',
    });
  }

  return issues;
}

function checkEslint(projectRoot: string, projectType: ProjectType): DoctorIssue[] {
  const issues: DoctorIssue[] = [];
  const configFiles = [
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.json',
    '.eslintrc.yml',
    'eslint.config.js',
  ];

  const hasConfig = configFiles.some((file) => existsSync(resolve(projectRoot, file)));

  if (!hasConfig) {
    issues.push({
      id: 'missing-eslint',
      title: 'ESLint not configured',
      description: 'Add ESLint configuration for code quality',
      severity: 'warning',
      fixable: true,
      category: 'linting',
    });
  }

  // Check if ESLint is installed
  const packageJsonPath = resolve(projectRoot, 'package.json');
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const hasEslint = packageJson.devDependencies?.eslint || packageJson.dependencies?.eslint;

    if (!hasEslint) {
      issues.push({
        id: 'eslint-not-installed',
        title: 'ESLint not installed',
        description: 'Install ESLint as a dev dependency',
        severity: 'warning',
        fixable: true,
        category: 'dependencies',
      });
    }
  }

  return issues;
}

function checkPrettier(projectRoot: string): DoctorIssue[] {
  const issues: DoctorIssue[] = [];
  const configFiles = [
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.js',
    '.prettierrc.cjs',
    'prettier.config.js',
  ];

  const hasConfig = configFiles.some((file) => existsSync(resolve(projectRoot, file)));

  if (!hasConfig) {
    issues.push({
      id: 'missing-prettier',
      title: 'Prettier not configured',
      description: 'Add Prettier for consistent code formatting',
      severity: 'info',
      fixable: true,
      category: 'formatting',
    });
  }

  // Check for .prettierignore
  if (!existsSync(resolve(projectRoot, '.prettierignore'))) {
    issues.push({
      id: 'missing-prettierignore',
      title: 'Missing .prettierignore',
      description: 'Add .prettierignore to exclude files from formatting',
      severity: 'info',
      fixable: true,
      category: 'formatting',
    });
  }

  return issues;
}

function checkTypeScript(projectRoot: string, projectType: ProjectType): DoctorIssue[] {
  const issues: DoctorIssue[] = [];
  const tsconfigPath = resolve(projectRoot, 'tsconfig.json');

  if (!existsSync(tsconfigPath)) {
    issues.push({
      id: 'missing-tsconfig',
      title: 'Missing tsconfig.json',
      description: 'TypeScript configuration file not found',
      severity: 'error',
      fixable: true,
      category: 'typescript',
    });
    return issues;
  }

  try {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

    // Check for strict mode
    if (!tsconfig.compilerOptions?.strict) {
      issues.push({
        id: 'typescript-not-strict',
        title: 'TypeScript strict mode disabled',
        description: 'Enable strict mode for better type safety',
        severity: 'warning',
        fixable: true,
        category: 'typescript',
      });
    }

    // Check for proper module resolution
    if (
      projectType === 'react' &&
      tsconfig.compilerOptions?.moduleResolution !== 'bundler' &&
      tsconfig.compilerOptions?.moduleResolution !== 'node'
    ) {
      issues.push({
        id: 'typescript-module-resolution',
        title: 'Suboptimal TypeScript module resolution',
        description: 'Update moduleResolution for modern tooling',
        severity: 'info',
        fixable: true,
        category: 'typescript',
      });
    }
  } catch {
    issues.push({
      id: 'invalid-tsconfig',
      title: 'Invalid tsconfig.json',
      description: 'TypeScript configuration is malformed',
      severity: 'error',
      fixable: false,
      category: 'typescript',
    });
  }

  return issues;
}

function checkGit(projectRoot: string): DoctorIssue[] {
  const issues: DoctorIssue[] = [];

  if (!existsSync(resolve(projectRoot, '.git'))) {
    issues.push({
      id: 'no-git',
      title: 'Git not initialized',
      description: 'Initialize Git repository for version control',
      severity: 'warning',
      fixable: true,
      category: 'vcs',
    });
  }

  if (!existsSync(resolve(projectRoot, '.gitignore'))) {
    issues.push({
      id: 'missing-gitignore',
      title: 'Missing .gitignore',
      description: 'Add .gitignore to exclude unnecessary files',
      severity: 'warning',
      fixable: true,
      category: 'vcs',
    });
  }

  return issues;
}

function checkCI(projectRoot: string): DoctorIssue[] {
  const issues: DoctorIssue[] = [];
  const githubActionsPath = resolve(projectRoot, '.github/workflows');

  if (!existsSync(githubActionsPath)) {
    issues.push({
      id: 'no-ci',
      title: 'No CI/CD configured',
      description: 'Add GitHub Actions for automated testing',
      severity: 'info',
      fixable: true,
      category: 'ci',
    });
  }

  return issues;
}

function checkEditorConfig(projectRoot: string): DoctorIssue[] {
  const issues: DoctorIssue[] = [];

  if (!existsSync(resolve(projectRoot, '.editorconfig'))) {
    issues.push({
      id: 'missing-editorconfig',
      title: 'Missing .editorconfig',
      description: 'Add .editorconfig for consistent editor settings',
      severity: 'info',
      fixable: true,
      category: 'editor',
    });
  }

  return issues;
}
