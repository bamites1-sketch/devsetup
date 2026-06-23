import chalk from 'chalk';
import { DoctorIssue } from '../../types/index.js';

export function displayReport(issues: DoctorIssue[]): void {
  console.log(chalk.cyan.bold('\n📋 Issues Found:\n'));

  // Group by severity
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const info = issues.filter((i) => i.severity === 'info');

  if (errors.length > 0) {
    console.log(chalk.red.bold('❌ Errors:\n'));
    errors.forEach((issue) => displayIssue(issue));
    console.log();
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow.bold('⚠️  Warnings:\n'));
    warnings.forEach((issue) => displayIssue(issue));
    console.log();
  }

  if (info.length > 0) {
    console.log(chalk.blue.bold('ℹ️  Info:\n'));
    info.forEach((issue) => displayIssue(issue));
    console.log();
  }

  // Summary
  console.log(chalk.cyan.bold('Summary:\n'));
  console.log(chalk.red(`  ${errors.length} errors`));
  console.log(chalk.yellow(`  ${warnings.length} warnings`));
  console.log(chalk.blue(`  ${info.length} info`));
  console.log(chalk.gray(`  ${issues.filter((i) => i.fixable).length} fixable\n`));
}

function displayIssue(issue: DoctorIssue): void {
  const icon = issue.fixable ? '🔧' : '⚠️';
  const fixable = issue.fixable ? chalk.green('[fixable]') : chalk.gray('[manual]');
  
  console.log(`  ${icon} ${chalk.bold(issue.title)} ${fixable}`);
  console.log(chalk.gray(`     ${issue.description}`));
  console.log(chalk.gray(`     Category: ${issue.category}\n`));
}
