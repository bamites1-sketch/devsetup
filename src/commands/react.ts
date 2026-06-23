import inquirer from 'inquirer';
import chalk from 'chalk';
import { ProjectConfig } from '../types/index.js';
import { validateProjectName } from '../utils/validation.js';
import { generateReactProject } from '../generators/react/index.js';
import { displayWelcome, displaySuccess } from '../utils/ui.js';
import { rollback } from '../utils/rollback.js';

export async function reactCommand(projectName: string): Promise<void> {
  try {
    displayWelcome();

    // Validate project name
    const validation = validateProjectName(projectName);
    if (!validation.valid) {
      console.error(chalk.red(`\n❌ Error: ${validation.error}`));
      process.exit(1);
    }

    // Interactive prompts
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useTailwind',
        message: 'Use Tailwind CSS?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useDocker',
        message: 'Add Docker support?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useGitHubActions',
        message: 'Add GitHub Actions CI/CD?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useHusky',
        message: 'Add Husky Git Hooks?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'addAuth',
        message: 'Add Example Authentication Module?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'addApiService',
        message: 'Add Example API Service Layer?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'usePathAliases',
        message: 'Add Path Aliases (@/ for src/)?',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Package Manager:',
        choices: ['npm', 'pnpm', 'yarn'],
        default: 'npm',
      },
    ]);

    const config: ProjectConfig = {
      projectName,
      template: 'react',
      ...answers,
    };

    // Generate project
    await generateReactProject(config);

    displaySuccess(config);
  } catch (error) {
    console.error(chalk.red('\n❌ An error occurred during project setup:'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }

    // Attempt rollback
    try {
      await rollback(projectName);
    } catch (rollbackError) {
      console.error(chalk.yellow('\n⚠ Rollback failed. Please manually remove the project directory.'));
    }

    process.exit(1);
  }
}
