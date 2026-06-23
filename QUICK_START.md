# Quick Start Guide

Get DevSetup up and running in 5 minutes!

## 🎯 Goal

By the end of this guide, you'll have DevSetup built, tested, and ready to use or publish.

---

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

This installs all required packages:
- TypeScript, Vitest, ESLint, Prettier
- Commander, Inquirer, Chalk, Ora, Execa

### Step 2: Build the Project (30 sec)

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### Step 3: Run Tests (1 min)

```bash
npm test
```

All tests should pass! ✅

### Step 4: Link for Local Testing (10 sec)

```bash
npm link
```

This makes `devsetup` command available globally on your system.

### Step 5: Test It Out! (2 min)

```bash
# Create a test project
devsetup react my-test-app

# Answer the prompts (or just hit Enter for defaults)
```

You'll see something like:
```
🚀 DevSetup - Production-Ready Project Generator

✔ Use Tailwind CSS? › yes
✔ Add Docker support? › yes
✔ Add GitHub Actions CI/CD? › yes
✔ Add Husky Git Hooks? › yes
✔ Add Example Authentication Module? › no
✔ Add Example API Service Layer? › yes
✔ Add Path Aliases (@/ for src/)? › yes
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

Next steps:
  cd my-test-app
  npm install
  npm run dev

Happy coding! 🎉
```

### Step 6: Verify the Generated Project (1 min)

```bash
cd my-test-app
npm install
npm run dev
```

Open http://localhost:3000 - you should see your React app! 🎉

---

## 🎨 What Was Generated?

Your `my-test-app` includes:

```
my-test-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.ts          # HTTP client (if selected)
│   ├── App.tsx              # React app
│   └── main.tsx             # Entry point
├── tests/
│   ├── App.test.tsx         # Example test
│   └── setup.ts             # Test setup
├── Dockerfile               # Docker (if selected)
├── docker-compose.yml       # Docker compose (if selected)
├── .github/workflows/ci.yml # CI/CD (if selected)
├── vite.config.ts           # Vite config
├── vitest.config.ts         # Test config
├── tsconfig.json            # TypeScript config
├── .eslintrc.cjs            # ESLint config
├── .prettierrc.json         # Prettier config
├── tailwind.config.js       # Tailwind (if selected)
└── README.md                # Project docs
```

---

## 🧪 Development Commands

### For DevSetup Development

```bash
# Watch mode (auto-rebuild on changes)
npm run dev

# Run linter
npm run lint

# Format code
npm run format

# Run tests with coverage
npm run test:coverage

# Rebuild
npm run build
```

### For Generated Projects

```bash
# Start dev server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚀 Publishing to npm (Optional)

### Prerequisites

1. Create npm account at [npmjs.com](https://www.npmjs.com/signup)
2. Login locally:
```bash
npm login
```

### Publish

```bash
# Verify everything works
npm test && npm run lint && npm run build

# Update version (first release)
npm version 1.0.0

# Publish to npm
npm publish

# Push to git with tags
git push --follow-tags
```

### After Publishing

Anyone can now install and use it:

```bash
npm install -g devsetup
devsetup react my-app
```

---

## 🐛 Common Issues & Solutions

### Issue: "Command not found: devsetup"

**Solution:**
```bash
npm unlink -g devsetup
npm run build
npm link
```

### Issue: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Tests failing

**Solution:**
```bash
npx vitest run --clearCache
npm test
```

### Issue: Import errors in generated project

**Cause:** Missing dependencies in generated package.json

**Solution:** Check `src/generators/react/templates/package.ts`

---

## 📚 What's Next?

### Explore the Codebase

1. **src/cli.ts** - CLI entry point
2. **src/commands/react.ts** - React command
3. **src/generators/react/index.ts** - Project generator
4. **src/generators/react/templates/** - All templates

### Make Changes

1. Edit template files
2. Rebuild: `npm run build`
3. Test: `devsetup react test-app`
4. Verify the output

### Add a New Template

1. Read **DEVELOPMENT.md** - "Adding a New Template" section
2. Create `src/generators/nextjs/` directory
3. Implement generator
4. Add command
5. Add tests

### Contribute

1. Read **CONTRIBUTING.md**
2. Pick an issue or create one
3. Fork the repo
4. Make changes
5. Submit PR

---

## 🎯 Quick Reference

### Project Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Compile TypeScript |
| `npm run dev` | Watch mode |
| `npm test` | Run tests |
| `npm run test:watch` | Test watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

### DevSetup Commands

| Command | Description |
|---------|-------------|
| `devsetup --version` | Show version |
| `devsetup --help` | Show help |
| `devsetup react <name>` | Create React project |

### File Locations

| Path | Description |
|------|-------------|
| `src/` | Source code |
| `tests/` | Test files |
| `dist/` | Compiled output |
| `src/generators/` | Template generators |
| `src/generators/react/templates/` | React templates |

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` succeeded
- [ ] `npm run build` succeeded
- [ ] `npm test` passed
- [ ] `npm link` succeeded
- [ ] `devsetup --version` shows version
- [ ] `devsetup react test-app` creates project
- [ ] Generated project installs and runs
- [ ] All optional features work (Docker, Tailwind, etc.)

---

## 🆘 Getting Help

- **Documentation:** See README.md, DEVELOPMENT.md, ARCHITECTURE.md
- **Issues:** Open a GitHub issue
- **Questions:** Check existing issues or discussions

---

## 🎉 You're Ready!

You've successfully:
- ✅ Set up DevSetup
- ✅ Built the project
- ✅ Tested it locally
- ✅ Generated a sample project

**Now you can:**
- Use it for your own projects
- Customize it for your needs
- Contribute new features
- Publish to npm
- Share with others

---

**Happy coding! 🚀**

*Build something amazing!*
