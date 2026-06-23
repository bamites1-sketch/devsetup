import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { resolve } from 'path';
import { validateProjectName } from '../src/utils/validation';

describe('Validation', () => {
  const testProjectName = 'test-temp-project';
  const testProjectPath = resolve(process.cwd(), testProjectName);

  afterEach(() => {
    if (existsSync(testProjectPath)) {
      rmSync(testProjectPath, { recursive: true, force: true });
    }
  });

  describe('validateProjectName', () => {
    it('should accept valid project names', () => {
      const result = validateProjectName('my-project');
      expect(result.valid).toBe(true);
    });

    it('should accept project names with numbers', () => {
      const result = validateProjectName('project123');
      expect(result.valid).toBe(true);
    });

    it('should accept project names with underscores', () => {
      const result = validateProjectName('my_project');
      expect(result.valid).toBe(true);
    });

    it('should reject empty project names', () => {
      const result = validateProjectName('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('cannot be empty');
    });

    it('should reject project names with spaces', () => {
      const result = validateProjectName('my project');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('letters, numbers, hyphens');
    });

    it('should reject project names with special characters', () => {
      const result = validateProjectName('my@project');
      expect(result.valid).toBe(false);
    });

    it('should reject existing directory names', () => {
      mkdirSync(testProjectPath);
      const result = validateProjectName(testProjectName);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('already exists');
    });
  });
});
