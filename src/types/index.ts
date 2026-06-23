export interface ProjectConfig {
  projectName: string;
  template: 'react' | 'nextjs' | 'express' | 'fastapi' | 'nestjs' | 'electron' | 'react-native';
  useTailwind?: boolean;
  useDocker?: boolean;
  useGitHubActions?: boolean;
  useHusky?: boolean;
  addAuth?: boolean;
  addApiService?: boolean;
  usePathAliases?: boolean;
  packageManager?: 'npm' | 'pnpm' | 'yarn';
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface TemplateFile {
  path: string;
  content: string;
}

export interface GeneratorOptions {
  config: ProjectConfig;
  targetDir: string;
}

export interface DoctorIssue {
  id: string;
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  fixable: boolean;
  category: 'config' | 'dependencies' | 'linting' | 'formatting' | 'typescript' | 'scripts' | 'metadata' | 'vcs' | 'ci' | 'editor';
}

export interface DoctorConfig {
  projectRoot: string;
  projectType: 'react' | 'nextjs' | 'vue' | 'node' | 'typescript';
  autoFix: boolean;
  dryRun: boolean;
}

export interface FixResult {
  issueId: string;
  title: string;
  success: boolean;
  error?: string;
  details?: string[];
  requiresInstall?: boolean;
}

// Doctor types
export interface DoctorIssue {
  id: string;
  title: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  fixable: boolean;
  category: 'config' | 'dependencies' | 'linting' | 'formatting' | 'typescript' | 'vcs' | 'ci' | 'editor' | 'scripts' | 'metadata';
}

export interface DoctorConfig {
  projectRoot: string;
  projectType: 'react' | 'nextjs' | 'vue' | 'node' | 'typescript' | null;
  autoFix: boolean;
  dryRun: boolean;
}

export interface FixResult {
  id: string;
  title: string;
  success: boolean;
  error?: string;
  details?: string[];
  requiresInstall?: boolean;
}
