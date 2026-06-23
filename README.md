# DevSetup

**Production-Ready Developer Project Generator + Project Health Doctor**

Create fully configured, production-ready projects in seconds. Fix existing projects automatically.

[![npm version](https://img.shields.io/npm/v/devsetup.svg)](https://www.npmjs.com/package/devsetup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/bamites1-sketch/devsetup/workflows/CI/badge.svg)](https://github.com/bamites1-sketch/devsetup/actions)

---

## Table of Contents

- [Why DevSetup?](#why-devsetup)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [Generated Project Structure](#generated-project-structure)
- [Development](#development)
- [Publishing](#publishing)
- [Contributing](#contributing)
- [License](#license)

---

## Why DevSetup?

DevSetup does two things:

1. **Generate new projects** - Create production-ready apps in 30 seconds
2. **Fix existing projects** - Scan and auto-fix configuration issues

### Generate New Projects

Most developers spend hours configuring new projects with the same tools over and over. DevSetup eliminates this repetitive work.

**Before:**
```bash
# 2-3 hours of manual setup
npm create vite@latest
# Install ESLint, Prettier, Docker, GitHub Actions, Husky...
```

**After:**
```bash
devsetup react my-app
cd my-app && npm install && npm run dev
```

### Fix Existing Projects

**DevSetup Doctor** automatically fixes common configuration issues in existing projects.

```bash
cd existing-project
devsetup doctor

# Automatically fixes:
# - Missing ESLint configuration
# - Missing Prettier setup
# - Missing TypeScript config
# - Missing package.json scripts
# - Missing GitHub Actions
# - And more...
```

---

## Features

### Command 1: `devsetup react <name>`

Generate React + TypeScript + Vite projects with:

- **React 18** - Latest React with hooks
- **TypeScript 5** - Full type safety
- **Vite 5** - Lightning-fast dev server
- **Vitest** - Fast unit testing
- **ESLint + Prettier** - Code quality tools
- **Optional:** Tailwind CSS, Docker, GitHub Actions, Husky, API service, Auth module, Path aliases

### Command 2: `devsetup doctor`

Scan and fix existing projects:

- **ESLint** - Add missing configuration
- **Prettier** - Setup code formatting
- **TypeScript** - Fix tsconfig, enable strict mode
- **Scripts** - Add lint, format, test scripts
- **GitHub Actions** - Add CI/CD workflow
- **.gitignore** - Create ignore file
- **.editorconfig** - Ensure editor consistency
- **Metadata** - Fix package.json fields

**Doctor Options:**
- `devsetup doctor` - Interactive mode (choose what to fix)
- `devsetup doctor --fix` - Fix selected issues
- `devsetup doctor --auto` - Auto-fix all issues

---

## Installation

### Global Install (Recommended)
```bash
npm install -g devsetup
```

### One-time Use
```bash
npx devsetup react my-app
```

---

## Quick Start

### Create a New Project

```bash
devsetup react my-app
```

Interactive prompts:
- Use Tailwind CSS?
- Add Docker support?
- Add GitHub Actions CI/CD?
- Add Husky Git Hooks?
- Add Example Authentication Module?
- Add Example API Service Layer?
- Add Path Aliases (@/ for src/)?
- Package Manager: npm / pnpm / yarn

```bash
cd my-app
npm install
npm run dev
```

### Fix an Existing Project

```bash
cd existing-project
devsetup doctor
```

The doctor will:
1. Detect your project type (React, Next.js, Node.js, etc.)
2. Scan for configuration issues
3. Show a detailed report
4. Ask which issues to fix

**Auto-fix everything:**
```bash
devsetup doctor --auto
```

---

## Commands

### `devsetup react <project-name>`

Creates a new React + TypeScript + Vite project.

**Example:**
```bash
devsetup react my-awesome-app
```

### `devsetup doctor`

Scans and fixes configuration issues in existing projects.

**Options:**
- `--fix` - Show issues, then fix selected ones
- `--auto` - Auto-fix all issues without prompting

**Examples:**
```bash
devsetup doctor           # Interactive mode
devsetup doctor --fix     # Select issues to fix
devsetup doctor --auto    # Fix everything
```

---

## Generated Project Structure

```
my-app/
├── .github/workflows/
│   └── ci.yml              # CI/CD (optional)
├── src/
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   ├── services/           # API & Auth (optional)
│   ├── utils/              # Helper functions
│   ├── types/              # TypeScript types
│   ├── assets/             # Static assets
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── tests/                  # Test files
├── public/                 # Public assets
├── Dockerfile              # (optional)
├── docker-compose.yml      # (optional)
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc.json
└── README.md
```

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run test         # Run tests
npm run test:watch   # Test watch mode
npm run test:coverage # Coverage report
```

---

## Development

### Prerequisites

- Node.js 16+
- npm, pnpm, or yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/bamites1-sketch/devsetup.git
cd devsetup

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# Test the CLI
devsetup react test-project
devsetup doctor
```

### Running Tests

```bash
npm test              # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Code Style

```bash
npm run lint          # Run ESLint
npm run format        # Run Prettier
```

**Guidelines:**
- Use TypeScript for all code
- Follow existing naming conventions
- Keep functions small and focused
- Add tests for new features
- Maintain 80%+ test coverage

### Project Structure

```
devsetup/
├── src/
│   ├── cli.ts                  # CLI entry point
│   ├── commands/               # Command handlers
│   │   ├── react.ts
│   │   └── doctor.ts
│   ├── generators/             # Template generators
│   │   └── react/
│   │       ├── index.ts
│   │       └── templates/
│   ├── utils/                  # Utility functions
│   │   ├── doctor/             # Doctor utilities
│   │   ├── fs-helpers.ts
│   │   ├── validation.ts
│   │   └── ui.ts
│   └── types/                  # TypeScript types
├── tests/                      # Test files
└── ...config files
```

---

## Publishing

### Prerequisites

1. npm account ([sign up here](https://www.npmjs.com/signup))
2. Authentication: `npm login`

### Steps

```bash
# 1. Test everything works
npm install
npm run build
npm test
npm link

# 2. Test the CLI
devsetup react test-app
cd test-app && npm install && npm run dev

# 3. Publish
npm publish
```

**If name is taken:**
```bash
# Use scoped package
# Change package.json name to "@yourusername/devsetup"
npm publish --access public
```

### Version Updates

```bash
npm version patch  # Bug fixes (1.0.1)
npm version minor  # New features (1.1.0)
npm version major  # Breaking changes (2.0.0)
git push --follow-tags
npm publish
```

---

## Contributing

We welcome contributions!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests
5. Run `npm test` and `npm run lint`
6. Commit (`git commit -m 'Add amazing feature'`)
7. Push (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Areas for Contribution

- New project templates (Next.js, Express, etc.)
- New doctor checks and fixes
- Bug fixes
- Documentation improvements
- Tests

### Development Setup

See the [Development](#development) section above.

---

## Roadmap

### Upcoming Templates
- Next.js
- Express
- NestJS
- FastAPI
- Electron
- React Native

### Doctor Enhancements
- `--dry-run` flag
- Custom rule profiles
- Team configuration presets
- Dependency audit
- Security checks

### Future Features
- Plugin marketplace
- Community templates
- Remote template support
- Configuration profiles

---

## License

MIT License

Copyright (c) 2024 Beamlak Tesfahun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Support

- **Issues:** https://github.com/bamites1-sketch/devsetup/issues
- **Repository:** https://github.com/bamites1-sketch/devsetup

---

**Built by Beamlak Tesfahun**
