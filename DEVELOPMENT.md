# Development Guide

This guide helps you set up your development environment and understand the development workflow for DevSetup.

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+** (18+ recommended)
- **npm**, **pnpm**, or **yarn**
- **Git**
- A code editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/devsetup.git
cd devsetup
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the project**
```bash
npm run build
```

4. **Link for local development**
```bash
npm link
```

5. **Verify installation**
```bash
devsetup --version
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Edit source files in `src/`
   - Add tests in `tests/`
   - Update documentation if needed

3. **Watch mode (optional)**
```bash
npm run dev
# TypeScript compiler runs in watch mode
```

4. **Rebuild after changes**
```bash
npm run build
```

5. **Test your changes**
```bash
# Run tests
npm test

# Test the CLI
devsetup react test-project
cd test-project
npm install
npm run dev
```

6. **Clean up test projects**
```bash
cd ..
rm -rf test-project
```

### Code Quality

**Run linter**
```bash
npm run lint
```

**Fix linting issues automatically**
```bash
npm run lint -- --fix
```

**Format code**
```bash
npm run format
```

**Run all checks**
```bash
npm run lint && npm test && npm run build
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npx vitest run tests/validation.test.ts
```

### Writing Tests

Tests are located in the `tests/` directory and use Vitest.

**Example test:**
```typescript
import { describe, it, expect } from 'vitest';
import { validateProjectName } from '../src/utils/validation';

describe('validateProjectName', () => {
  it('should accept valid project names', () => {
    const result = validateProjectName('my-project');
    expect(result.valid).toBe(true);
  });
  
  it('should reject empty names', () => {
    const result = validateProjectName('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('cannot be empty');
  });
});
```

### Coverage Requirements

Maintain at least **80% coverage** for:
- Lines
- Functions
- Branches
- Statements

View coverage report:
```bash
npm run test:coverage
# Open coverage/index.html in browser
```

## 📁 Project Structure

```
devsetup/
├── src/                       # Source code
│   ├── cli.ts                # CLI entry point
│   ├── commands/             # Command handlers
│   │   └── react.ts
│   ├── generators/           # Template generators
│   │   └── react/
│   │       ├── index.ts      # Generator logic
│   │       └── templates/    # Template functions
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   └── utils/                # Utilities
│       ├── fs-helpers.ts
│       ├── validation.ts
│       ├── rollback.ts
│       ├── ui.ts
│       └── version.ts
├── tests/                    # Test files
│   ├── templates.test.ts
│   ├── validation.test.ts
│   └── fs-helpers.test.ts
├── dist/                     # Compiled output (gitignored)
└── ...config files
```

## 🔧 Adding a New Template

### Step-by-Step Guide

1. **Create generator directory**
```bash
mkdir -p src/generators/nextjs/templates
```

2. **Create template functions**

Create `src/generators/nextjs/templates/package.ts`:
```typescript
import { ProjectConfig } from '../../../types/index.js';

export function getPackageJson(config: ProjectConfig): string {
  return JSON.stringify({
    name: config.projectName,
    version: '0.1.0',
    // ... configuration
  }, null, 2);
}
```

3. **Create generator**

Create `src/generators/nextjs/index.ts`:
```typescript
import { ProjectConfig } from '../../types/index.js';
import { createDirectory, writeFile } from '../../utils/fs-helpers.js';
import { getPackageJson } from './templates/package.js';

export async function generateNextjsProject(config: ProjectConfig): Promise<void> {
  // Implementation
}
```

4. **Create command**

Create `src/commands/nextjs.ts`:
```typescript
import { generateNextjsProject } from '../generators/nextjs/index.js';

export async function nextjsCommand(projectName: string): Promise<void> {
  // Validation, prompts, generation
}
```

5. **Register command**

Update `src/cli.ts`:
```typescript
import { nextjsCommand } from './commands/nextjs.js';

program
  .command('nextjs <project-name>')
  .description('Create a new Next.js project')
  .action(nextjsCommand);
```

6. **Add tests**

Create `tests/nextjs.test.ts`

7. **Update documentation**
   - README.md
   - CHANGELOG.md

## 🐛 Debugging

### VS Code Debugging

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI",
      "program": "${workspaceFolder}/dist/cli.js",
      "args": ["react", "test-project"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

### Console Debugging

Add `console.log` statements:
```typescript
console.log('Config:', JSON.stringify(config, null, 2));
```

### Test Debugging

Run single test with verbose output:
```bash
npx vitest run tests/validation.test.ts --reporter=verbose
```

## 🔍 Common Issues

### Issue: `npm link` not working

**Solution:**
```bash
npm unlink -g devsetup
npm run build
npm link
```

### Issue: TypeScript errors

**Solution:**
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Issue: Tests failing

**Solution:**
```bash
# Clear test cache
npx vitest run --clearCache
npm test
```

### Issue: Import path errors

Make sure to use `.js` extensions in imports:
```typescript
// Correct
import { foo } from './utils.js';

// Incorrect
import { foo } from './utils';
```

## 📚 Resources

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESM in Node.js](https://nodejs.org/api/esm.html)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

### CLI Development
- [Commander.js](https://github.com/tj/commander.js)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [Chalk](https://github.com/chalk/chalk)
- [Ora](https://github.com/sindresorhus/ora)

### Project Generation
- [Yeoman Generator](https://yeoman.io/)
- [Plop.js](https://plopjs.com/)

## 🤝 Contributing Checklist

Before submitting a PR:

- [ ] Code builds successfully (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Coverage meets threshold (`npm run test:coverage`)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

## 💡 Tips

1. **Use TypeScript strict mode** - Catches bugs early
2. **Write tests first** - TDD approach works well
3. **Keep functions small** - Easier to test and maintain
4. **Use meaningful names** - Code should be self-documenting
5. **Extract reusable logic** - DRY principle
6. **Handle errors gracefully** - User experience matters
7. **Test on multiple platforms** - Windows, macOS, Linux

## 📞 Getting Help

- Open an issue on GitHub
- Check existing issues and PRs
- Read ARCHITECTURE.md for design decisions
- Ask in discussions (if enabled)

---

Happy developing! 🚀
