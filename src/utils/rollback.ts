import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

export async function rollback(projectName: string): Promise<void> {
  const targetDir = resolve(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    console.log(chalk.yellow('\n🔄 Rolling back changes...'));
    rmSync(targetDir, { recursive: true, force: true });
    console.log(chalk.yellow('✓ Project directory removed'));
  }
}
