import chalk from 'chalk';
import { ProjectConfig } from '../types/index.js';

export function displayWelcome(): void {
  console.log(chalk.cyan.bold('\n🚀 DevSetup - Production-Ready Project Generator\n'));
}

export function displaySuccess(config: ProjectConfig): void {
  console.log(chalk.green.bold('\n✅ Project created successfully!\n'));
  console.log(chalk.cyan('Next steps:'));
  console.log(chalk.white(`  cd ${config.projectName}`));
  console.log(chalk.white(`  ${config.packageManager || 'npm'} install`));
  console.log(chalk.white(`  ${config.packageManager || 'npm'} run dev`));
  console.log(chalk.cyan('\nHappy coding! 🎉\n'));
}

export function displayStep(step: string): void {
  console.log(chalk.blue(`\n▶ ${step}`));
}
