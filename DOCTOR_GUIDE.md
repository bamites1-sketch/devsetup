# DevSetup Doctor - Complete Guide

## 🏥 What is `devsetup doctor`?

`devsetup doctor` is a powerful command that scans your existing projects and automatically fixes common configuration issues. It's like a health check for your codebase!

### Why You Need It

- ✅ **Onboard legacy projects** - Bring old projects up to modern standards
- ✅ **Fix configuration drift** - Ensure consistency across team projects
- ✅ **Save hours of manual setup** - Automate repetitive fixes
- ✅ **Enforce best practices** - ESLint, Prettier, TypeScript strict mode
- ✅ **Add missing tooling** - CI/CD, Git hooks, EditorConfig

---

## 🚀 Quick Start

### Basic Usage

```bash
cd your-existing-project
devsetup doctor
```

This will:
1. Detect your project type (React, Next.js, Node.js, etc.)
2. Scan for configuration issues
3. Show you a detailed report
4. Ask if you want to fix them

### Auto-Fix All Issues

```bash
devsetup doctor --auto
```

Automatically fixes everything without prompting.

### Fix with Confirmation

```bash
devsetup doctor --fix
```

Shows issues, then lets you select which ones to fix.

---

## 🔍 What It Detects

### 1. **ESLint Configuration**

**Checks:**
- ESLint config file exists (`.eslintrc.*`)
- ESLint is installed
- Proper plugins for project type

**Fixes:**
- Creates `.eslintrc.cjs` with best practices
- Installs ESLint dependencies
- Adds TypeScript and React plugins (if needed)

**Example:**
```javascript
// Generated .eslintrc.cjs for React
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  // ... more config
};
```

---

### 2. **Prettier Configuration**

**Checks:**
- Prettier config exists
- `.prettierignore` file exists
- Prettier is installed

**Fixes:**
- Creates `.prettierrc.json` with consistent settings
- Creates `.prettierignore`
- Installs Prettier

**Example:**
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

### 3. **TypeScript Configuration**

**Checks:**
- `tsconfig.json` exists
- Strict mode enabled
- Proper module resolution
- Correct compiler options

**Fixes:**
- Creates `tsconfig.json` for your project type
- Enables strict mode
- Updates module resolution to "bundler"
- Adds recommended compiler options

**Example:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

---

### 4. **Package.json Scripts**

**Checks:**
- Essential scripts exist (lint, format, test)
- Scripts follow conventions

**Fixes:**
- Adds missing scripts
- Uses correct commands for your setup

**Example:**
```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

### 5. **GitHub Actions CI/CD**

**Checks:**
- `.github/workflows/` directory exists
- CI workflow configured

**Fixes:**
- Creates `.github/workflows/ci.yml`
- Configures linting, testing, building
- Matrix testing across Node versions

**Example:**
```yaml
name: CI
on:
  push:
    branches: [ main, develop ]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    # ... steps
```

---

### 6. **Git Configuration**

**Checks:**
- Git initialized
- `.gitignore` exists
- Proper ignore patterns

**Fixes:**
- Runs `git init`
- Creates comprehensive `.gitignore`
- Excludes node_modules, dist, logs, etc.

---

### 7. **EditorConfig**

**Checks:**
- `.editorconfig` exists

**Fixes:**
- Creates `.editorconfig` for consistency
- Sets indent, line endings, charset

**Example:**
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
```

---

### 8. **Metadata (package.json)**

**Checks:**
- Repository field exists
- License specified
- Description present

**Fixes:**
- Adds repository field (you update URL)
- Sets MIT license (change if needed)
- Prompts for description

---

## 📋 Issue Severity Levels

### ❌ **Error** (Red)
- Blocks development or deployment
- Should be fixed immediately
- Examples: Missing `tsconfig.json`, invalid configs

### ⚠️ **Warning** (Yellow)
- Important but not blocking
- Should be fixed soon
- Examples: Missing ESLint, no Git

### ℹ️ **Info** (Blue)
- Nice to have
- Improves consistency
- Examples: Missing `.editorconfig`, no CI

---

## 🎯 Example Usage Scenarios

### Scenario 1: Legacy React Project

```bash
# You inherit an old React project
cd old-react-app
devsetup doctor

# Output:
# 🏥 DevSetup Doctor
# Analyzing your project...
# ✓ Detected: react
#
# 📋 Issues Found:
#
# ❌ Errors:
#   🔧 Missing tsconfig.json [fixable]
#      TypeScript configuration file not found
#
# ⚠️  Warnings:
#   🔧 ESLint not configured [fixable]
#      Add ESLint configuration for code quality
#   🔧 Prettier not configured [fixable]
#      Add Prettier for consistent code formatting
#   🔧 Missing package.json scripts [fixable]
#      Missing: lint, format, test
#
# ℹ️  Info:
#   🔧 No CI/CD configured [fixable]
#      Add GitHub Actions for automated testing
#   🔧 Missing .editorconfig [fixable]
#      Add .editorconfig for consistent editor settings
#
# Summary:
#   1 errors
#   3 warnings
#   2 info
#   6 fixable
#
# ? Would you like to fix these issues? (Y/n)
```

**Select Yes:**
```bash
# ✓ TypeScript configuration
#    Created tsconfig.json
# ✓ ESLint configuration  
#    Created .eslintrc.cjs
#    Added eslint to devDependencies
# ✓ Prettier configuration
#    Created .prettierrc.json
#    Added prettier to devDependencies
# ✓ Package.json scripts
#    Added scripts: lint, format, test, test:watch
# ✓ GitHub Actions CI/CD
#    Created .github/workflows/ci.yml
# ✓ .editorconfig
#    Created .editorconfig
#
# ⚠️  Action Required:
# New dependencies were added. Run:
#   npm install
#
# ✅ Done!
```

---

### Scenario 2: Quick Health Check

```bash
# Check if your project is properly configured
devsetup doctor

# All good!
# ✅ All good! No issues found.
# Your project configuration looks great!
```

---

### Scenario 3: Fix Specific Issues

```bash
devsetup doctor --fix

# After seeing the report, select only:
# [x] ESLint configuration
# [x] Prettier configuration
# [ ] GitHub Actions (skip this one)
```

---

### Scenario 4: Automated CI Integration

```bash
# In your CI pipeline
devsetup doctor --auto

# Ensures all projects meet standards
# Exits with error code if unfixable issues found
```

---

## 🛠️ Command Options

| Option | Description | Example |
|--------|-------------|---------|
| None | Interactive mode | `devsetup doctor` |
| `--fix` | Show issues, then fix selected | `devsetup doctor --fix` |
| `--auto` | Fix all without prompting | `devsetup doctor --auto` |

---

## 📊 Report Format

### Issue Card

```
🔧 Missing ESLint configuration [fixable]
   Add ESLint for code quality and consistency
   Category: linting
```

**Components:**
- 🔧 Icon (fixable) or ⚠️ (manual)
- **Title** - Brief description
- **[fixable]** or **[manual]** - Can be auto-fixed?
- Description - What and why
- Category - Type of issue

---

## 🎨 Supported Project Types

### React
- Detects: `react` in dependencies
- Configures: React ESLint plugins, JSX, Vite

### Next.js
- Detects: `next` in dependencies
- Configures: Next.js specific ESLint, SSR TypeScript

### Vue
- Detects: `vue` in dependencies
- Configures: Vue ESLint plugins, Vue TypeScript

### Node.js/TypeScript
- Detects: TypeScript or Node.js project
- Configures: Node ESLint, module config

---

## ⚙️ What Gets Modified

Doctor **never** deletes or overwrites existing configs. It only:

✅ **Creates missing files**
✅ **Adds missing dependencies** to package.json
✅ **Adds missing scripts** to package.json
✅ **Updates incomplete configs** (e.g., enabling strict mode)

❌ **Never overwrites** existing ESLint/Prettier configs
❌ **Never removes** your custom settings
❌ **Never modifies** your source code

---

## 🔒 Safety Features

### Backup Recommendations
Before running with `--auto`, consider:
```bash
git add -A
git commit -m "Before devsetup doctor"
devsetup doctor --auto
```

### Rollback
If something goes wrong:
```bash
git reset --hard HEAD
```

### Dry Run
Currently not available, but coming soon:
```bash
devsetup doctor --dry-run  # Show what would change
```

---

## 🚨 Common Issues & Solutions

### Issue: "Could not detect project type"

**Cause:** No `package.json` or not a supported project type

**Solution:**
```bash
# Ensure you're in a project directory
cd your-project
ls package.json  # Should exist

# If missing, it's not a Node project
npm init -y
```

---

### Issue: "New dependencies were added. Run: npm install"

**Cause:** Doctor added ESLint, Prettier, or other tools

**Solution:**
```bash
npm install
# or
pnpm install
# or
yarn install
```

---

### Issue: "GitHub Actions requires .git directory"

**Cause:** Git not initialized

**Solution:**
```bash
# Let doctor fix it
devsetup doctor --auto

# Or manually
git init
```

---

## 🎯 Best Practices

### 1. Run Doctor Regularly
```bash
# Weekly health check
devsetup doctor
```

### 2. Run Before Deploying
```bash
devsetup doctor --auto
npm run lint
npm test
npm run build
```

### 3. Add to Onboarding
```bash
# New developer setup
git clone repo
cd repo
npm install
devsetup doctor --auto  # Ensure everything configured
```

### 4. Use in CI for Enforcement
```yaml
# .github/workflows/doctor.yml
name: Config Check
on: [push]
jobs:
  doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx devsetup doctor --auto
```

---

## 📈 Future Enhancements

Coming soon:
- [ ] `--dry-run` flag
- [ ] Custom rule profiles
- [ ] Team configuration presets
- [ ] More project types (Python, Go, Rust)
- [ ] Dependency audit
- [ ] Security checks
- [ ] Performance recommendations

---

## 🤝 Contributing

Help make Doctor better:

1. **Add new checks** - `src/utils/doctor/scanner.ts`
2. **Add new fixes** - `src/utils/doctor/fixer.ts`
3. **Support new project types** - `src/utils/doctor/detection.ts`
4. **Improve reports** - `src/utils/doctor/reporter.ts`

See `CONTRIBUTING.md` for details.

---

## 📞 Support

- **Issues:** Found a bug? [Report it](https://github.com/yourusername/devsetup/issues)
- **Questions:** [Discussions](https://github.com/yourusername/devsetup/discussions)
- **Docs:** See `README.md`, `DEVELOPMENT.md`

---

**DevSetup Doctor - Keep your projects healthy! 🏥**
