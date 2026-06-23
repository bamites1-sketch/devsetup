# DevSetup 🚀

**Production-Ready Developer Project Generator + Project Health Doctor**

Create fully configured, production-ready projects in seconds. Fix existing projects automatically.

[![npm version](https://img.shields.io/npm/v/devsetup.svg)](https://www.npmjs.com/package/devsetup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/bamites1-sketch/devsetup/workflows/CI/badge.svg)](https://github.com/bamites1-sketch/devsetup/actions)

---

## ✨ Why DevSetup?

DevSetup does two things:

1. **Generate new projects** - Create production-ready apps in 30 seconds
2. **Fix existing projects** - Scan and auto-fix configuration issues

### 🚀 Generate New Projects

Most developers spend hours configuring new projects with the same tools over and over. DevSetup eliminates this repetitive work.

**Before DevSetup:**
```bash
# 2-3 hours of manual setup
npm create vite@latest
# Install ESLint... configure... install Prettier...
# Setup Docker... GitHub Actions... Husky...
# Finally ready to code 😓
```

**With DevSetup:**
```bash
devsetup react my-app
cd my-app && npm install && npm run dev
# Start coding immediately! 🎉
```

### 🏥 Fix Existing Projects

Inherited a legacy codebase? Configuration drift across team projects? **DevSetup Doctor** automatically fixes common issues.

```bash
cd existing-project
devsetup doctor

# Automatically fixes:
# ✓ Missing ESLint configuration
# ✓ Missing Prettier setup
# ✓ Missing TypeScript config
# ✓ Missing package.json scripts
# ✓ Missing GitHub Actions
# ✓ And more...
```

---

## 🎯 Features

### Command 1: `devsetup react <name>` - Project Generator
- ✅ **React + TypeScript + Vite** - Modern React development

### What You Get Out of the Box

- ⚡️ **Lightning Fast** - Vite for instant HMR and builds
- 🎯 **TypeScript** - Full type safety
- 🧪 **Testing Ready** - Vitest configured with examples
- 📝 **Code Quality** - ESLint + Prettier pre-configured
- 🐳 **Docker Support** - Production-ready containerization
- 🔄 **CI/CD** - GitHub Actions workflow included
- 🐕 **Git Hooks** - Husky + lint-staged for quality gates
- 🌐 **API Layer** - Optional axios-based service
- 🔐 **Auth Module** - Optional authentication service
- 📦 **Path Aliases** - Clean imports with @/ prefix
- 🎨 **Tailwind CSS** - Optional utility-first styling

### Command 2: `devsetup doctor` - Project Health Check

Scan and automatically fix issues in existing projects:

- 🔧 **ESLint** - Add missing configuration and dependencies
- 💅 **Prettier** - Setup code formatting
- 📝 **TypeScript** - Fix tsconfig issues, enable strict mode
- 📦 **Scripts** - Add missing lint, format, test scripts
- 🔄 **GitHub Actions** - Add CI/CD workflow
- 📂 **.gitignore** - Create comprehensive ignore file
- ⚙️ **.editorconfig** - Ensure editor consistency
- 🎯 **And more...** - Package.json metadata, Git initialization

**Perfect for:**
- Legacy projects needing modernization
- Enforcing team standards
- Onboarding projects to best practices
- Quick health checks

---

## 📦 Installation

### Global Install (Recommended)
```bash
npm install -g devsetup
```

### One-time Use (npx)
```bash
npx devsetup react my-app
```

## 🚀 Quick Start

### Create a New Project

```bash
devsetup react my-app
```

You'll be guided through an interactive setup:

```
🚀 DevSetup - Production-Ready Project Generator

✔ Use Tailwind CSS? … yes
✔ Add Docker support? … yes
✔ Add GitHub Actions CI/CD? … yes
✔ Add Husky Git Hooks? … yes
✔ Add Example Authentication Module? … no
✔ Add Example API Service Layer? … yes
✔ Add Path Aliases (@/ for src/)? … yes
✔ Package Manager: › npm

✓ Project structure created
✓ Configuration files generated
✓ Source files generated
✓ Docker configuration generated
✓ GitHub Actions workflow generated
✓ README generated
✓ Git repository initialized
✓ Husky configured

✅ Project created successfully!
```

### Start Development
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

Interactive mode lets you choose which issues to fix:

```
🏥 DevSetup Doctor

Analyzing your project...
✓ Detected: react

📋 Issues Found:

❌ Errors:
  🔧 Missing tsconfig.json [fixable]

⚠️  Warnings:
  🔧 ESLint not configured [fixable]
  🔧 Prettier not configured [fixable]
  🔧 Missing package.json scripts [fixable]

? Would you like to fix these issues? (Y/n)
```

**Auto-fix everything:**
```bash
devsetup doctor --auto
```

See [DOCTOR_GUIDE.md](DOCTOR_GUIDE.md) for complete documentation.

---

## 📖 Commands
- React 18
- TypeScript 5
- Vite 5
- Vitest for testing
- ESLint & Prettier
- Optional: Tailwind CSS, Docker, GitHub Actions, Husky, API service, Auth module

---

## 🎨 Interactive Configuration

DevSetup asks you what you need:

| Option | Description |
|--------|-------------|
| **Tailwind CSS** | Utility-first CSS framework |
| **Docker** | Dockerfile + docker-compose.yml |
| **GitHub Actions** | Automated CI/CD pipeline |
| **Husky** | Git hooks for pre-commit checks |
| **Auth Module** | Ready-to-use authentication service |
| **API Service** | Axios-based HTTP client with interceptors |
| **Path Aliases** | Use @/ instead of ../../.. |
| **Package Manager** | npm, pnpm, or yarn |

---

## 📁 Generated Project Structure

```
my-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── src/
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── hooks/                  # Custom hooks
│   ├── services/               # API & business logic
│   │   ├── api.ts             # HTTP client (optional)
│   │   └── auth.ts            # Auth service (optional)
│   ├── utils/                  # Helper functions
│   ├── types/                  # TypeScript types
│   ├── assets/                 # Static assets
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── tests/                      # Test files
├── public/                     # Public assets
├── Dockerfile                  # Docker config (optional)
├── docker-compose.yml          # Docker compose (optional)
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
├── tsconfig.json               # TypeScript config
├── .eslintrc.cjs               # ESLint config
├── .prettierrc.json            # Prettier config
├── .editorconfig               # Editor config
├── .env.example                # Environment template
└── README.md                   # Project documentation
```

---

## 🧪 Testing

All generated projects include:

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing
- **Coverage Reports** - Built-in coverage tracking
- **Example Tests** - Learn by example

```bash
npm run test              # Run tests once
npm run test:watch        # Watch mode
npm run test:coverage     # Generate coverage
```

---

## 🐳 Docker Support

If you enable Docker, you get:

- **Multi-stage Dockerfile** - Optimized production builds
- **docker-compose.yml** - One-command deployment
- **.dockerignore** - Minimal image size
- **Nginx config** - Production-ready serving

```bash
docker-compose up --build
```

---

## 🔄 CI/CD with GitHub Actions

Generated workflow includes:

- ✅ Install dependencies
- ✅ Run linting
- ✅ Run tests
- ✅ Build application
- ✅ Upload coverage reports
- ✅ Matrix testing (Node 18 & 20)

Push to GitHub and your CI runs automatically!

---

## 🛠️ Development Tools

### Built-in Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run test         # Run tests
```

### Code Quality

- **ESLint** - Catch bugs and enforce standards
- **Prettier** - Consistent code formatting
- **EditorConfig** - Consistent editor settings
- **Husky** - Pre-commit hooks (optional)
- **lint-staged** - Lint only changed files (optional)

---

## 🗺️ Roadmap

### Upcoming Templates
- [ ] Next.js (React framework)
- [ ] Express (Node.js backend)
- [ ] NestJS (Enterprise Node.js)
- [ ] FastAPI (Python backend)
- [ ] Electron (Desktop apps)
- [ ] React Native (Mobile apps)

### Future Features
- [ ] Plugin marketplace
- [ ] Community templates
- [ ] Remote template support
- [ ] AI-assisted generation
- [ ] Template versioning
- [ ] Team presets
- [ ] Custom template creation
- [ ] Configuration profiles

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/devsetup.git
cd devsetup
```

2. **Install dependencies**
```bash
npm install
```

3. **Run tests**
```bash
npm test
```

4. **Build the project**
```bash
npm run build
```

5. **Test locally**
```bash
npm link
devsetup react test-project
devsetup doctor  # Test the doctor command
```

### Development Guidelines

- Write tests for new features
- Maintain 80%+ code coverage
- Follow existing code style
- Update documentation
- Add changeset for releases

### Areas for Contribution

- 🆕 New project templates
- 🏥 New doctor checks/fixes
- 🐛 Bug fixes
- 📝 Documentation improvements
- ✨ New features
- 🧪 More tests
- 🎨 Template improvements

See [CONTRIBUTING.md](CONTRIBUTING.md) and [DOCTOR_GUIDE.md](DOCTOR_GUIDE.md) for detailed guidelines.

---

## 📄 License

MIT © DevSetup Team

---

## 💬 Support

- 🐛 [Report a Bug](https://github.com/yourusername/devsetup/issues)
- 💡 [Request a Feature](https://github.com/yourusername/devsetup/issues)
- 📖 [Read the Docs](https://github.com/yourusername/devsetup#readme)
- ⭐ [Star on GitHub](https://github.com/yourusername/devsetup)

---

## 🌟 Show Your Support

If DevSetup saves you time, give it a ⭐️ on GitHub!

**Two powerful commands:**
- `devsetup react <name>` - Generate new projects instantly
- `devsetup doctor` - Fix existing projects automatically

Built with ❤️ by developers, for developers.
