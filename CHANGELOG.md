# Changelog

All notable changes to DevSetup will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-01-XX

### Added
- Initial release of DevSetup 🎉
- React + TypeScript + Vite template generator
- Interactive CLI with beautiful UI (chalk, ora)
- Optional Tailwind CSS support
- Optional Docker configuration (Dockerfile + docker-compose.yml)
- Optional GitHub Actions CI/CD workflow
- Optional Husky git hooks with lint-staged
- Optional authentication module example
- Optional API service layer with axios
- Optional path aliases (@/ for src/)
- Package manager selection (npm, pnpm, yarn)
- Automatic git initialization
- Comprehensive testing setup with Vitest
- ESLint and Prettier pre-configured
- Project validation (name, existing directories)
- Automatic rollback on failure
- Production-ready project structure
- Professional README generation
- Environment variable templates
- EditorConfig for consistent formatting
- Full TypeScript support
- 80%+ test coverage
- Comprehensive documentation (README, CONTRIBUTING, ARCHITECTURE, PUBLISHING)

### Dependencies
- commander ^11.1.0 - CLI framework
- inquirer ^9.2.12 - Interactive prompts
- chalk ^5.3.0 - Terminal styling
- ora ^7.0.1 - Loading spinners
- execa ^8.0.1 - Process execution

### Dev Dependencies
- typescript ^5.3.3
- vitest ^1.0.4
- eslint ^8.56.0
- prettier ^3.1.1
- @typescript-eslint/* ^6.15.0

## [0.1.0] - 2024-XX-XX (Beta)

### Added
- Beta release for testing
- Core CLI structure
- Basic React template
- Initial documentation

---

## Release Notes

### v1.0.0 - Initial Release

DevSetup is now production-ready! 🚀

#### What's Included

**React Template:**
- Modern React 18 with TypeScript
- Vite for blazing fast development
- Vitest for testing
- ESLint + Prettier for code quality
- Optional Tailwind CSS
- Optional Docker support
- Optional GitHub Actions CI/CD
- Optional Husky git hooks
- Professional project structure

**CLI Experience:**
- Beautiful terminal UI with colors and spinners
- Interactive prompts for configuration
- Smart validation and error handling
- Automatic rollback on failures
- Clear success messages with next steps

**Developer Experience:**
- 80%+ test coverage
- Comprehensive documentation
- Easy to contribute
- Modular architecture
- Extensible for future templates

#### Quick Start

```bash
# Install globally
npm install -g devsetup

# Create a project
devsetup react my-app

# Start developing
cd my-app
npm install
npm run dev
```

#### What's Next?

We're working on:
- Next.js template
- Express template
- NestJS template
- FastAPI template
- Plugin system
- Community templates

#### Contributors

Thank you to all early contributors and testers!

---

[Unreleased]: https://github.com/yourusername/devsetup/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/devsetup/releases/tag/v1.0.0
[0.1.0]: https://github.com/yourusername/devsetup/releases/tag/v0.1.0
