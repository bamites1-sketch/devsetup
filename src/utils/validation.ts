import { existsSync } from 'fs';
import { resolve } from 'path';
import { ValidationResult } from '../types/index.js';

export function validateProjectName(projectName: string): ValidationResult {
  // Check if project name is empty
  if (!projectName || projectName.trim().length === 0) {
    return { valid: false, error: 'Project name cannot be empty' };
  }

  // Check for invalid characters
  const validNameRegex = /^[a-z0-9-_]+$/i;
  if (!validNameRegex.test(projectName)) {
    return {
      valid: false,
      error: 'Project name can only contain letters, numbers, hyphens, and underscores',
    };
  }

  // Check if directory already exists
  const targetDir = resolve(process.cwd(), projectName);
  if (existsSync(targetDir)) {
    return {
      valid: false,
      error: `Directory "${projectName}" already exists. Please choose a different name.`,
    };
  }

  return { valid: true };
}

export function isValidPackageName(name: string): boolean {
  return /^[a-z0-9-_]+$/i.test(name);
}
