import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf-8');
}

export function createDirectory(dirPath: string): void {
  ensureDir(dirPath);
}
