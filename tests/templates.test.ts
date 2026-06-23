import { describe, it, expect } from 'vitest';
import { getPackageJson } from '../src/generators/react/templates/package';
import { getTsConfig } from '../src/generators/react/templates/tsconfig';
import { getViteConfig } from '../src/generators/react/templates/vite-config';
import { getPrettierConfig } from '../src/generators/react/templates/prettier';
import { ProjectConfig } from '../src/types';

describe('Template Generators', () => {
  const baseConfig: ProjectConfig = {
    projectName: 'test-project',
    template: 'react',
    useTailwind: false,
    useDocker: false,
    useGitHubActions: false,
    useHusky: false,
    addAuth: false,
    addApiService: false,
    usePathAliases: false,
    packageManager: 'npm',
  };

  describe('getPackageJson', () => {
    it('should generate valid package.json', () => {
      const result = getPackageJson(baseConfig);
      const parsed = JSON.parse(result);
      expect(parsed.name).toBe('test-project');
      expect(parsed.dependencies.react).toBeDefined();
      expect(parsed.devDependencies.typescript).toBeDefined();
    });

    it('should include tailwind when useTailwind is true', () => {
      const config = { ...baseConfig, useTailwind: true };
      const result = getPackageJson(config);
      const parsed = JSON.parse(result);
      expect(parsed.devDependencies.tailwindcss).toBeDefined();
    });

    it('should include husky when useHusky is true', () => {
      const config = { ...baseConfig, useHusky: true };
      const result = getPackageJson(config);
      const parsed = JSON.parse(result);
      expect(parsed.devDependencies.husky).toBeDefined();
      expect(parsed.scripts.prepare).toContain('husky');
    });

    it('should include axios when addApiService is true', () => {
      const config = { ...baseConfig, addApiService: true };
      const result = getPackageJson(config);
      const parsed = JSON.parse(result);
      expect(parsed.dependencies.axios).toBeDefined();
    });
  });

  describe('getTsConfig', () => {
    it('should generate valid tsconfig.json', () => {
      const result = getTsConfig(baseConfig);
      const parsed = JSON.parse(result);
      expect(parsed.compilerOptions.target).toBe('ES2020');
      expect(parsed.compilerOptions.jsx).toBe('react-jsx');
    });

    it('should include path aliases when usePathAliases is true', () => {
      const config = { ...baseConfig, usePathAliases: true };
      const result = getTsConfig(config);
      const parsed = JSON.parse(result);
      expect(parsed.compilerOptions.paths).toBeDefined();
      expect(parsed.compilerOptions.paths['@/*']).toEqual(['./src/*']);
    });
  });

  describe('getViteConfig', () => {
    it('should generate valid vite config', () => {
      const result = getViteConfig(baseConfig);
      expect(result).toContain('defineConfig');
      expect(result).toContain('react()');
    });

    it('should include path alias when usePathAliases is true', () => {
      const config = { ...baseConfig, usePathAliases: true };
      const result = getViteConfig(config);
      expect(result).toContain("'@':");
      expect(result).toContain('./src');
    });
  });

  describe('getPrettierConfig', () => {
    it('should generate valid prettier config', () => {
      const result = getPrettierConfig();
      const parsed = JSON.parse(result);
      expect(parsed.semi).toBe(true);
      expect(parsed.singleQuote).toBe(true);
    });
  });
});
