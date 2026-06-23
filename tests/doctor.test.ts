import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { detectProjectType } from '../src/utils/doctor/detection';
import { scanProject } from '../src/utils/doctor/scanner';

describe('Doctor - Detection', () => {
  const testProjectPath = resolve(process.cwd(), 'test-doctor-project');

  afterEach(() => {
    if (existsSync(testProjectPath)) {
      rmSync(testProjectPath, { recursive: true, force: true });
    }
  });

  it('should detect React project', () => {
    mkdirSync(testProjectPath);
    const packageJson = {
      name: 'test-react-app',
      dependencies: {
        react: '^18.0.0',
      },
    };
    writeFileSync(
      resolve(testProjectPath, 'package.json'),
      JSON.stringify(packageJson),
      'utf-8'
    );

    const projectType = detectProjectType(testProjectPath);
    expect(projectType).toBe('react');
  });

  it('should detect Next.js project', () => {
    mkdirSync(testProjectPath);
    const packageJson = {
      name: 'test-nextjs-app',
      dependencies: {
        next: '^14.0.0',
        react: '^18.0.0',
      },
    };
    writeFileSync(
      resolve(testProjectPath, 'package.json'),
      JSON.stringify(packageJson),
      'utf-8'
    );

    const projectType = detectProjectType(testProjectPath);
    expect(projectType).toBe('nextjs');
  });

  it('should return null for non-project directory', () => {
    mkdirSync(testProjectPath);
    const projectType = detectProjectType(testProjectPath);
    expect(projectType).toBeNull();
  });
});

describe('Doctor - Scanner', () => {
  const testProjectPath = resolve(process.cwd(), 'test-doctor-scan');

  beforeEach(() => {
    mkdirSync(testProjectPath);
  });

  afterEach(() => {
    if (existsSync(testProjectPath)) {
      rmSync(testProjectPath, { recursive: true, force: true });
    }
  });

  it('should detect missing ESLint', async () => {
    const packageJson = {
      name: 'test-app',
      dependencies: { react: '^18.0.0' },
    };
    writeFileSync(
      resolve(testProjectPath, 'package.json'),
      JSON.stringify(packageJson),
      'utf-8'
    );

    const issues = await scanProject(testProjectPath, 'react');
    const eslintIssue = issues.find((i) => i.id === 'missing-eslint');
    expect(eslintIssue).toBeDefined();
    expect(eslintIssue?.fixable).toBe(true);
  });
});
