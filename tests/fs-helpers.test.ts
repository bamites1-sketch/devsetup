import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, readFileSync, rmSync } from 'fs';
import { resolve } from 'path';
import { writeFile, createDirectory, ensureDir } from '../src/utils/fs-helpers';

describe('File System Helpers', () => {
  const testDir = resolve(process.cwd(), 'test-temp');

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('ensureDir', () => {
    it('should create a directory if it does not exist', () => {
      ensureDir(testDir);
      expect(existsSync(testDir)).toBe(true);
    });

    it('should not fail if directory already exists', () => {
      ensureDir(testDir);
      expect(() => ensureDir(testDir)).not.toThrow();
      expect(existsSync(testDir)).toBe(true);
    });
  });

  describe('writeFile', () => {
    it('should write content to a file', () => {
      const filePath = resolve(testDir, 'test.txt');
      const content = 'Hello, World!';
      writeFile(filePath, content);
      expect(existsSync(filePath)).toBe(true);
      expect(readFileSync(filePath, 'utf-8')).toBe(content);
    });

    it('should create parent directories if they do not exist', () => {
      const filePath = resolve(testDir, 'nested', 'test.txt');
      writeFile(filePath, 'content');
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('createDirectory', () => {
    it('should create a directory', () => {
      createDirectory(testDir);
      expect(existsSync(testDir)).toBe(true);
    });
  });
});
