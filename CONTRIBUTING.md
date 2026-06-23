# Contributing to DevSetup

Thank you for your interest in contributing to DevSetup! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- Report bugs and issues
- Suggest new features or improvements
- Submit pull requests
- Improve documentation
- Create new project templates
- Write tests

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm, pnpm, or yarn
- Git

### Setup Development Environment

1. Fork the repository on GitHub

2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/devsetup.git
cd devsetup
```

3. Install dependencies:
```bash
npm install
```

4. Build the project:
```bash
npm run build
```

5. Link for local testing:
```bash
npm link
```

6. Test the CLI:
```bash
devsetup react test-project
```

## 🧪 Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

**Coverage Requirements:**
- Minimum 80% coverage for all metrics
- All new features must include tests

## 📝 Code Style

We use ESLint and Prettier for code consistency.

Run linting:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

### Style Guidelines

- Use TypeScript for all code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use async/await over promises
- Prefer explicit types over `any`

## 🏗️ Project Structure

```
devsetup/
├── src/
│   ├── cli.ts                 # CLI entry point
│   ├── commands/              # Command implementations
│   ├── generators/            # Template generators
│   │   └── react/
│   │       ├── index.ts       # Generator logic
│   │       └── templates/     # Template functions
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
├── tests/                     # Test files
├── dist/                      # Compiled output
└── ...config files
```

## ✨ Adding a New Template

### 1. Create Generator Directory

```bash
mkdir -p src/generators/your-template/templates
```

### 2. Implement Generator

Create `src/generators/your-template/index.ts`:

```typescript
import { ProjectConfig } from '../../types/index.js';
import { createDirectory, writeFile } from '../../utils/fs-helpers.js';

export async function generateYourTemplateProject(config: ProjectConfig): Promise<void> {
  // Implementation
}
```

### 3. Create Templates

Add template functions in `src/generators/your-template/templates/`:

```typescript
export function getPackageJson(config: ProjectConfig): string {
  return JSON.stringify({
    name: config.projectName,
    // ... more configuration
  }, null, 2);
}
```

### 4. Add Command

Create `src/commands/your-template.ts`:

```typescript
import { generateYourTemplateProject } from '../generators/your-template/index.js';

export async function yourTemplateCommand(projectName: string): Promise<void> {
  // Interactive prompts
  // Validation
  // Generate project
}
```

### 5. Register Command

Update `src/cli.ts`:

```typescript
import { yourTemplateCommand } from './commands/your-template.js';

program
  .command('your-template <project-name>')
  .description('Create a new Your Template project')
  .action(yourTemplateCommand);
```

### 6. Add Tests

Create `tests/your-template.test.ts` with comprehensive test coverage.

### 7. Update Documentation

- Add template to README.md
- Create template-specific docs if needed
- Update CHANGELOG.md

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues
- Test with latest version
- Verify it's reproducible

### Bug Report Template

```markdown
**Description:**
Clear description of the bug

**To Reproduce:**
1. Run command `devsetup ...`
2. Select options ...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., macOS 13.0]
- Node.js: [e.g., 18.12.0]
- DevSetup: [e.g., 1.0.0]

**Additional Context:**
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Mockups, examples, etc.
```

## 📥 Pull Request Process

### Before Submitting PR

1. ✅ Create an issue first (for major changes)
2. ✅ Fork and create a branch
3. ✅ Write tests
4. ✅ Ensure all tests pass
5. ✅ Update documentation
6. ✅ Follow code style
7. ✅ Write clear commit messages

### PR Guidelines

**Branch Naming:**
- `feature/add-nextjs-template`
- `fix/docker-generation-error`
- `docs/update-contributing`

**Commit Messages:**
```
feat: add Next.js template generator
fix: resolve path alias issue in vite config
docs: update installation instructions
test: add tests for validation utility
```

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Tests pass locally
- [ ] Added/updated tests
- [ ] Updated documentation
- [ ] Follows code style
- [ ] No breaking changes (or documented)
```

### Review Process

1. Automated CI runs tests
2. Maintainers review code
3. Address feedback
4. Get approval
5. Merge!

## 📊 Code Coverage

We maintain high code coverage standards:

- **Lines:** 80%+
- **Functions:** 80%+
- **Branches:** 80%+
- **Statements:** 80%+

View coverage report:
```bash
npm run test:coverage
open coverage/index.html
```

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security@devsetup.dev (or create private security advisory)
3. Include detailed description and steps to reproduce

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- CHANGELOG.md
- README.md (optional)
- Release notes

## 💬 Questions?

- Open a discussion on GitHub
- Join our community chat (if available)
- Email: hello@devsetup.dev

---

Thank you for contributing to DevSetup! 🎉
