# Getting Started with DevSetup

Welcome to DevSetup! This guide will help you understand and use the tool effectively.

## 📖 Table of Contents

1. [What is DevSetup?](#what-is-devsetup)
2. [Installation](#installation)
3. [Creating Your First Project](#creating-your-first-project)
4. [Understanding the Options](#understanding-the-options)
5. [Working with Generated Projects](#working-with-generated-projects)
6. [Examples](#examples)
7. [Next Steps](#next-steps)

---

## What is DevSetup?

DevSetup is a CLI tool that generates **production-ready** React projects with modern tooling pre-configured. Instead of spending hours setting up TypeScript, Vite, testing, linting, Docker, and CI/CD, you get everything in seconds.

### The Problem It Solves

**Before DevSetup:**
```
Hour 1: Install Vite, setup TypeScript
Hour 2: Configure ESLint, Prettier
Hour 3: Setup Vitest, write test configs
Hour 4: Docker, docker-compose, nginx
Hour 5: GitHub Actions, Husky, lint-staged
Hour 6: Finally ready to code... 😓
```

**With DevSetup:**
```
devsetup react my-app
cd my-app && npm install && npm run dev
→ Start coding in 2 minutes! 🎉
```

---

## Installation

### Option 1: Global Install (Recommended)

```bash
npm install -g devsetup
```

Verify installation:
```bash
devsetup --version
```

### Option 2: Use with npx (No install)

```bash
npx devsetup react my-app
```

### Option 3: Development Install

If you're contributing or modifying DevSetup:

```bash
git clone https://github.com/yourusername/devsetup.git
cd devsetup
npm install
npm run build
npm link
```

---

## Creating Your First Project

### Basic Usage

```bash
devsetup react my-awesome-app
```

This starts an **interactive setup** where you choose your features.

### Interactive Prompts

You'll be asked:

```
🚀 DevSetup - Production-Ready Project Generator

? Use Tailwind CSS? (Y/n)
? Add Docker support? (Y/n)
? Add GitHub Actions CI/CD? (Y/n)
? Add Husky Git Hooks? (Y/n)
? Add Example Authentication Module? (y/N)
? Add Example API Service Layer? (Y/n)
? Add Path Aliases (@/ for src/)? (Y/n)
? Package Manager: (Use arrow keys)
  ❯ npm
    pnpm
    yarn
```

### What Happens Next

DevSetup will:
1. ✅ Create project directory
2. ✅ Generate all configuration files
3. ✅ Create source code structure
4. ✅ Setup optional features (Docker, CI/CD, etc.)
5. ✅ Initialize Git repository
6. ✅ Configure git hooks (if selected)
7. ✅ Generate comprehensive README

### Success!

```
✅ Project created successfully!

Next steps:
  cd my-awesome-app
  npm install
  npm run dev

Happy coding! 🎉
```

---

## Understanding the Options

### Core Stack (Always Included)

✅ **React 18** - Latest React with Hooks
✅ **TypeScript 5** - Full type safety
✅ **Vite 5** - Lightning-fast dev server
✅ **Vitest** - Modern test framework
✅ **ESLint** - Code linting
✅ **Prettier** - Code formatting

### Optional: Tailwind CSS

**When to use:** You want utility-first CSS styling

**What you get:**
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css` with Tailwind directives
- Pre-configured Vite + Tailwind integration

**Example usage:**
```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

### Optional: Docker Support

**When to use:** You want containerization for deployment

**What you get:**
- Multi-stage `Dockerfile` (optimized for production)
- `docker-compose.yml` for easy local development
- `.dockerignore` for smaller images
- `nginx.conf` for serving the app

**Usage:**
```bash
docker-compose up --build
# App runs on http://localhost:3000
```

### Optional: GitHub Actions CI/CD

**When to use:** You want automated testing and deployment

**What you get:**
- `.github/workflows/ci.yml`
- Runs on push and pull requests
- Tests across Node 18 & 20
- Matrix testing on Ubuntu, Windows, macOS
- Automatic linting, testing, and building

**Features:**
- ✅ Install dependencies
- ✅ Run ESLint
- ✅ Run Vitest
- ✅ Build application
- ✅ Upload coverage reports

### Optional: Husky Git Hooks

**When to use:** You want quality gates before commits

**What you get:**
- Husky pre-commit hook
- `lint-staged` configuration
- Automatic linting on staged files
- Automatic formatting on staged files

**Behavior:**
```bash
git commit -m "feature"
# → Runs ESLint and Prettier on staged files
# → Blocks commit if errors found
```

### Optional: Authentication Module

**When to use:** Your app needs user authentication

**What you get:**
- `src/services/auth.ts`
- Login, register, logout functions
- Token management (localStorage)
- Ready-to-use auth service

**Example:**
```typescript
import { authService } from './services/auth';

await authService.login({ email, password });
const isLoggedIn = authService.isAuthenticated();
```

### Optional: API Service Layer

**When to use:** Your app calls backend APIs

**What you get:**
- `src/services/api.ts`
- Axios-based HTTP client
- Request/response interceptors
- Automatic token injection
- Global error handling

**Example:**
```typescript
import { apiService } from './services/api';

const users = await apiService.get<User[]>('/users');
const newUser = await apiService.post('/users', userData);
```

### Optional: Path Aliases

**When to use:** You want clean imports

**What you get:**
- TypeScript path mapping (`@/*` → `./src/*`)
- Vite alias configuration
- Vitest alias configuration

**Before:**
```typescript
import { Button } from '../../../components/Button';
```

**After:**
```typescript
import { Button } from '@/components/Button';
```

### Package Manager Choice

Choose your preferred package manager:
- **npm** - Default, comes with Node.js
- **pnpm** - Faster, disk-space efficient
- **yarn** - Alternative with different workflow

The generated README will use your chosen package manager in all examples.

---

## Working with Generated Projects

### Project Structure

```
my-app/
├── .github/
│   └── workflows/ci.yml    # CI/CD (optional)
├── src/
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── services/            # API & auth (optional)
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript types
│   ├── assets/              # Images, fonts, etc.
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Styles (if Tailwind)
├── tests/
│   ├── App.test.tsx         # Component tests
│   └── setup.ts             # Test configuration
├── public/                  # Static assets
├── Dockerfile               # Docker (optional)
├── docker-compose.yml       # Docker (optional)
└── ...config files
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier
```

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Make changes** - Edit files in `src/`

3. **See changes live** - Vite HMR updates instantly

4. **Write tests** - Add `.test.tsx` files in `tests/`

5. **Run tests**
   ```bash
   npm test
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

---

## Examples

### Example 1: Minimal Setup

```bash
devsetup react minimal-app

# Select:
# - No Tailwind
# - No Docker
# - No GitHub Actions
# - No Husky
# - No Auth
# - No API Service
# - No Path Aliases
# - npm
```

**Result:** Basic React + TypeScript + Vite project

### Example 2: Full-Featured App

```bash
devsetup react full-app

# Select:
# - Yes to all options
# - Choose your package manager
```

**Result:** Complete setup with everything

### Example 3: API-First App

```bash
devsetup react api-app

# Select:
# - Yes to Tailwind
# - No to Docker
# - Yes to GitHub Actions
# - Yes to Husky
# - Yes to Auth
# - Yes to API Service
# - Yes to Path Aliases
# - npm
```

**Result:** Perfect for frontend apps consuming REST APIs

### Example 4: Docker-Ready App

```bash
devsetup react docker-app

# Select:
# - Yes to Tailwind
# - Yes to Docker
# - Yes to GitHub Actions
# - No to other options
# - npm
```

**Result:** Ready for containerized deployment

---

## Next Steps

### After Creating a Project

1. **Install dependencies**
   ```bash
   cd my-app
   npm install
   ```

2. **Start development**
   ```bash
   npm run dev
   ```

3. **Read the generated README**
   ```bash
   cat README.md
   ```

4. **Explore the code**
   - Check out `src/App.tsx`
   - Look at `tests/App.test.tsx`
   - Review configuration files

5. **Start building your features!**

### Learning Resources

- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Vite:** https://vitejs.dev/
- **Vitest:** https://vitest.dev/
- **Tailwind:** https://tailwindcss.com/

### Getting Help

- **Check generated README** - Project-specific docs
- **GitHub Issues** - Report bugs or ask questions
- **Documentation** - See ARCHITECTURE.md, DEVELOPMENT.md

---

## Tips & Best Practices

### 1. Start Simple

Don't select every option if you don't need it. Start with basics and add features later.

### 2. Use Docker for Consistency

If working in a team, Docker ensures everyone has the same environment.

### 3. Enable Husky for Quality

Git hooks catch issues before they reach CI/CD, saving time.

### 4. Write Tests Early

The project includes Vitest. Use it! Tests save time in the long run.

### 5. Customize Generated Code

The generated project is a starting point. Modify it to fit your needs!

### 6. Keep Dependencies Updated

Regularly update dependencies for security and features:
```bash
npm outdated
npm update
```

---

## Troubleshooting

### Project Already Exists

**Error:** "Directory 'my-app' already exists"

**Solution:** Choose a different name or delete the existing directory

### Node Version Issues

**Error:** "Unsupported engine"

**Solution:** Update to Node.js 16+
```bash
node --version  # Should be 16+
```

### Installation Fails

**Error:** npm install fails in generated project

**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:** Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001,  // or any available port
}
```

---

## FAQ

**Q: Can I use DevSetup for commercial projects?**
A: Yes! MIT license allows commercial use.

**Q: Can I customize the generated project?**
A: Absolutely! It's yours to modify as needed.

**Q: Will DevSetup work on Windows/Mac/Linux?**
A: Yes, it's cross-platform.

**Q: How do I update DevSetup?**
A: `npm update -g devsetup`

**Q: Can I add my own templates?**
A: Not yet, but it's planned! See ROADMAP in README.

**Q: Is TypeScript required?**
A: Currently yes, but JavaScript-only templates may come later.

---

**Ready to build something amazing? Start now!**

```bash
devsetup react my-next-project
```

🚀 Happy coding!
