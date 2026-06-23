import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export type ProjectType = 'react' | 'nextjs' | 'vue' | 'node' | 'typescript' | null;

export function detectProjectType(projectRoot: string): ProjectType {
  const packageJsonPath = resolve(projectRoot, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Check for Next.js
    if (deps.next) {
      return 'nextjs';
    }

    // Check for React
    if (deps.react) {
      return 'react';
    }

    // Check for Vue
    if (deps.vue) {
      return 'vue';
    }

    // Check for TypeScript
    if (deps.typescript || existsSync(resolve(projectRoot, 'tsconfig.json'))) {
      return 'typescript';
    }

    // Generic Node.js project
    if (packageJson.name) {
      return 'node';
    }

    return null;
  } catch {
    return null;
  }
}

export function getPackageManager(projectRoot: string): 'npm' | 'pnpm' | 'yarn' {
  if (existsSync(resolve(projectRoot, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (existsSync(resolve(projectRoot, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}
