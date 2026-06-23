import { resolve } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { execa } from 'execa';
import { ProjectConfig } from '../../types/index.js';
import { createDirectory, writeFile } from '../../utils/fs-helpers.js';
import { getPackageJson } from './templates/package.js';
import { getTsConfig } from './templates/tsconfig.js';
import { getTsConfigNode } from './templates/tsconfig-node.js';
import { getViteConfig } from './templates/vite-config.js';
import { getEslintConfig } from './templates/eslint.js';
import { getPrettierConfig } from './templates/prettier.js';
import { getGitignore } from './templates/gitignore.js';
import { getDockerfile, getDockerCompose, getDockerignore, getNginxConfig } from './templates/docker.js';
import { getGitHubActions } from './templates/github-actions.js';
import { getHuskyConfig } from './templates/husky.js';
import { getIndexHtml } from './templates/index-html.js';
import { getAppComponent } from './templates/app.js';
import { getMainTs } from './templates/main.js';
import { getVitestConfig } from './templates/vitest.js';
import { getExampleTest } from './templates/test.js';
import { getReadme } from './templates/readme.js';
import { getEnvTemplate } from './templates/env.js';
import { getEditorConfig } from './templates/editorconfig.js';
import { getApiService } from './templates/api-service.js';
import { getAuthModule } from './templates/auth.js';
import { getTailwindConfig, getPostcssConfig, getIndexCss } from './templates/tailwind.js';
import { getTestSetup } from './templates/test.js';

export async function generateReactProject(config: ProjectConfig): Promise<void> {
  const targetDir = resolve(process.cwd(), config.projectName);

  let spinner = ora('Creating project structure...').start();

  try {
    // Create main directories
    createDirectory(targetDir);
    createDirectory(resolve(targetDir, 'src'));
    createDirectory(resolve(targetDir, 'src/components'));
    createDirectory(resolve(targetDir, 'src/pages'));
    createDirectory(resolve(targetDir, 'src/hooks'));
    createDirectory(resolve(targetDir, 'src/services'));
    createDirectory(resolve(targetDir, 'src/utils'));
    createDirectory(resolve(targetDir, 'src/types'));
    createDirectory(resolve(targetDir, 'src/assets'));
    createDirectory(resolve(targetDir, 'tests'));
    createDirectory(resolve(targetDir, 'public'));

    spinner.succeed(chalk.green('✓ Project structure created'));

    // Generate configuration files
    spinner = ora('Generating configuration files...').start();

    writeFile(resolve(targetDir, 'package.json'), getPackageJson(config));
    writeFile(resolve(targetDir, 'tsconfig.json'), getTsConfig(config));
    writeFile(resolve(targetDir, 'tsconfig.node.json'), getTsConfigNode());
    writeFile(resolve(targetDir, 'vite.config.ts'), getViteConfig(config));
    writeFile(resolve(targetDir, '.eslintrc.cjs'), getEslintConfig(config));
    writeFile(resolve(targetDir, '.prettierrc.json'), getPrettierConfig());
    writeFile(resolve(targetDir, '.gitignore'), getGitignore());
    writeFile(resolve(targetDir, '.editorconfig'), getEditorConfig());
    writeFile(resolve(targetDir, '.env.example'), getEnvTemplate());
    writeFile(resolve(targetDir, 'vitest.config.ts'), getVitestConfig(config));

    spinner.succeed(chalk.green('✓ Configuration files generated'));

    // Generate source files
    spinner = ora('Generating source files...').start();

    writeFile(resolve(targetDir, 'index.html'), getIndexHtml(config));
    writeFile(resolve(targetDir, 'src/main.tsx'), getMainTs(config));
    writeFile(resolve(targetDir, 'src/App.tsx'), getAppComponent(config));
    writeFile(resolve(targetDir, 'src/vite-env.d.ts'), '/// <reference types="vite/client" />');

    // Add API service if requested
    if (config.addApiService) {
      writeFile(resolve(targetDir, 'src/services/api.ts'), getApiService());
    }

    // Add auth module if requested
    if (config.addAuth) {
      writeFile(resolve(targetDir, 'src/services/auth.ts'), getAuthModule());
    }

    // Generate test files
    writeFile(resolve(targetDir, 'tests/App.test.tsx'), getExampleTest());
    writeFile(resolve(targetDir, 'tests/setup.ts'), getTestSetup());

    // Generate Tailwind files if requested
    if (config.useTailwind) {
      writeFile(resolve(targetDir, 'tailwind.config.js'), getTailwindConfig());
      writeFile(resolve(targetDir, 'postcss.config.js'), getPostcssConfig());
      writeFile(resolve(targetDir, 'src/index.css'), getIndexCss());
    }

    spinner.succeed(chalk.green('✓ Source files generated'));

    // Generate Docker files if requested
    if (config.useDocker) {
      spinner = ora('Generating Docker configuration...').start();
      writeFile(resolve(targetDir, 'Dockerfile'), getDockerfile(config));
      writeFile(resolve(targetDir, 'docker-compose.yml'), getDockerCompose(config));
      writeFile(resolve(targetDir, '.dockerignore'), getDockerignore());
      writeFile(resolve(targetDir, 'nginx.conf'), getNginxConfig());
      spinner.succeed(chalk.green('✓ Docker configuration generated'));
    }

    // Generate GitHub Actions if requested
    if (config.useGitHubActions) {
      spinner = ora('Generating GitHub Actions workflow...').start();
      createDirectory(resolve(targetDir, '.github/workflows'));
      writeFile(resolve(targetDir, '.github/workflows/ci.yml'), getGitHubActions(config));
      spinner.succeed(chalk.green('✓ GitHub Actions workflow generated'));
    }

    // Generate README
    spinner = ora('Generating README...').start();
    writeFile(resolve(targetDir, 'README.md'), getReadme(config));
    spinner.succeed(chalk.green('✓ README generated'));

    // Initialize git
    spinner = ora('Initializing Git repository...').start();
    await execa('git', ['init'], { cwd: targetDir });
    spinner.succeed(chalk.green('✓ Git repository initialized'));

    // Setup Husky if requested
    if (config.useHusky) {
      spinner = ora('Configuring Husky...').start();
      const huskyConfig = getHuskyConfig(config);
      writeFile(resolve(targetDir, '.husky/pre-commit'), huskyConfig.preCommit);
      spinner.succeed(chalk.green('✓ Husky configured'));
    }

    console.log(chalk.green.bold('\n✅ Project setup complete!'));
  } catch (error) {
    spinner.fail(chalk.red('✗ Failed to generate project'));
    throw error;
  }
}
