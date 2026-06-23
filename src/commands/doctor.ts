import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { DoctorConfig, DoctorIssue, FixResult } from '../types/index.js';
import { detectProjectType } from '../utils/doctor/detection.js';
import { scanProject } from '../utils/doctor/scanner.js';
import { applyFixes } from '../utils/doctor/fixer.js';
import { displayReport } from '../utils/doctor/reporter.js';

export async function doctorCommand(options: { fix?: boolean; auto?: boolean }): Promise<void> {
  const projectRoot = process.cwd();

  console.log(chalk.cyan.bold('\n🏥 DevSetup Doctor\n'));
  console.log(chalk.gray('Analyzing your project for common issues...\n'));

  let spinner = ora('Detecting project type...').start();

  try {
    // Detect project type
    const projectType = detectProjectType(projectRoot);

    if (!projectType) {
      spinner.fail(chalk.red('Could not detect project type'));
      console.log(chalk.yellow('\nThis command works with:'));
      console.log('  - React projects');
      console.log('  - Next.js projects');
      console.log('  - Node.js/TypeScript projects');
      console.log('  - Vue projects');
      process.exit(1);
    }

    spinner.succeed(chalk.green(`Detected: ${projectType}`));

    // Scan for issues
    spinner = ora('Scanning for issues...').start();
    const issues = await scanProject(projectRoot, projectType);
    spinner.stop();

    if (issues.length === 0) {
      console.log(chalk.green.bold('\n✅ All good! No issues found.\n'));
      console.log(chalk.gray('Your project configuration looks great!'));
      return;
    }

    // Display report
    displayReport(issues);

    // Determine if we should fix
    let shouldFix = options.fix || options.auto;

    if (!shouldFix && !options.auto) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Would you like to fix these issues?',
          default: true,
        },
      ]);
      shouldFix = confirm;
    }

    if (!shouldFix) {
      console.log(chalk.yellow('\nRun with --fix flag to apply fixes automatically.'));
      return;
    }

    // Select issues to fix (unless auto mode)
    let issuesToFix = issues;
    if (!options.auto) {
      const { selected } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selected',
          message: 'Select issues to fix:',
          choices: issues.map((issue) => ({
            name: `${issue.title} (${issue.severity})`,
            value: issue.id,
            checked: true,
          })),
        },
      ]);
      issuesToFix = issues.filter((issue) => selected.includes(issue.id));
    }

    if (issuesToFix.length === 0) {
      console.log(chalk.yellow('\nNo issues selected.'));
      return;
    }

    // Apply fixes
    console.log(chalk.cyan.bold('\n🔧 Applying fixes...\n'));

    const config: DoctorConfig = {
      projectRoot,
      projectType,
      autoFix: options.auto || false,
      dryRun: false,
    };

    const results = await applyFixes(issuesToFix, config);

    // Display results
    console.log(chalk.cyan.bold('\n📋 Results:\n'));

    let successCount = 0;
    let failureCount = 0;

    results.forEach((result) => {
      if (result.success) {
        successCount++;
        console.log(chalk.green(`✓ ${result.title}`));
        if (result.details) {
          result.details.forEach((detail) => {
            console.log(chalk.gray(`  ${detail}`));
          });
        }
      } else {
        failureCount++;
        console.log(chalk.red(`✗ ${result.title}`));
        if (result.error) {
          console.log(chalk.red(`  Error: ${result.error}`));
        }
      }
    });

    console.log(chalk.cyan.bold('\n📊 Summary:\n'));
    console.log(chalk.green(`  ✓ ${successCount} fixed`));
    if (failureCount > 0) {
      console.log(chalk.red(`  ✗ ${failureCount} failed`));
    }

    // Post-fix recommendations
    const needsInstall = results.some((r) => r.requiresInstall);
    if (needsInstall) {
      console.log(chalk.yellow.bold('\n⚠️  Action Required:\n'));
      console.log(chalk.yellow('New dependencies were added. Run:'));
      console.log(chalk.cyan('  npm install\n'));
    }

    console.log(chalk.green.bold('\n✅ Done!\n'));
  } catch (error) {
    spinner.fail(chalk.red('An error occurred'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
