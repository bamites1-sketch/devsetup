#!/usr/bin/env node

import { Command } from 'commander';
import { reactCommand } from './commands/react.js';
import { doctorCommand } from './commands/doctor.js';
import { getVersion } from './utils/version.js';

const program = new Command();

program
  .name('devsetup')
  .description('Production-ready developer project generator')
  .version(getVersion());

program
  .command('react <project-name>')
  .description('Create a new React + TypeScript + Vite project')
  .action(reactCommand);

program
  .command('doctor')
  .description('Analyze and fix issues in an existing project')
  .option('--fix', 'Automatically fix all issues')
  .option('--auto', 'Auto-fix without prompts')
  .action(doctorCommand);

program.parse();
