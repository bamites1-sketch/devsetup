# DevSetup Doctor - Real-World Examples

## 🎯 Common Scenarios

### Example 1: Inherited Legacy React App

**Scenario:** You joined a team and inherited a 2-year-old React project with inconsistent configuration.

```bash
cd legacy-react-app
devsetup doctor
```

**Output:**
```
🏥 DevSetup Doctor

Analyzing your project...
✓ Detected: react

📋 Issues Found:

❌ Errors:
  🔧 Invalid tsconfig.json [fixable]
     TypeScript configuration is malformed
     Category: typescript

⚠️  Warnings:
  🔧 ESLint not configured [fixable]
     Add ESLint configuration for code quality
     Category: linting
  
  🔧 TypeScript strict mode disabled [fixable]
     Enable strict mode for better type safety
     Category: typescript
  
  🔧 Missing package.json scripts [fixable]
     Missing: lint, format
     Category: scripts

ℹ️  Info:
  🔧 No CI/CD configured [fixable]
     Add GitHub Actions for automated testing
     Category: ci
  
  🔧 Missing .editorconfig [fixable]
     Add .editorconfig for consistent editor settings
     Category: editor

Summary:
  1 errors
  3 warnings
  2 info
  6 fixable

? Would you like to fix these issues? (Y/n) Y
```

**Select all and fix:**
```
🔧 Applying fixes...

✓ TypeScript configuration
   Fixed tsconfig.json syntax
   Enabled strict mode
✓ ESLint configuration
   Created .eslintrc.cjs
   Added eslint to devDependencies
✓ Package.json scripts
   Added scripts: lint, format
✓ GitHub Actions CI/CD
   Created .github/workflows/ci.yml
✓ .editorconfig
   Created .editorconfig

📊 Summary:
  ✓ 6 fixed
  ✗ 0 failed

⚠️  Action Required:
New dependencies were added. Run:
  npm install

✅ Done!
```

**Result:**
- ✅ Project now follows modern React best practices
- ✅ Ready for team collaboration
- ✅ CI/CD pipeline in place
- ✅ Consistent code quality enforced

---

### Example 2: Quick Health Check Before Deployment

**Scenario:** You're about to deploy but want to ensure everything is properly configured.

```bash
cd production-app
devsetup doctor
```

**Output:**
```
🏥 DevSetup Doctor

Analyzing your project...
✓ Detected: react

✅ All good! No issues found.

Your project configuration looks great!
```

**Result:** Confidence that your project meets standards ✅

---

### Example 3: Enforce Team Standards Across Multiple Projects

**Scenario:** Your team has 10 microservices with inconsistent configurations.

```bash
# Script to fix all projects
for dir in services/*; do
  echo "Fixing $dir..."
  cd "$dir"
  devsetup doctor --auto
  npm install
  cd ../..
done
```

**Result:**
- ✅ All projects use same ESLint config
- ✅ All projects have CI/CD
- ✅ Consistent formatting across codebase
- ✅ All TypeScript projects use strict mode

---

### Example 4: Open Source Project Cleanup

**Scenario:** You're preparing your side project for open source release.

```bash
cd my-side-project
devsetup doctor
```

**Output:**
```
📋 Issues Found:

⚠️  Warnings:
  🔧 Missing .gitignore [fixable]
     Add .gitignore to exclude unnecessary files
  
  🔧 Missing repository field [fixable]
     package.json should include repository information
  
  🔧 Missing license field [fixable]
     package.json should specify a license

ℹ️  Info:
  🔧 No CI/CD configured [fixable]
     Add GitHub Actions for automated testing
  
  🔧 Missing .editorconfig [fixable]
     For consistent editor settings across contributors

? Would you like to fix these issues? Y
```

**After fixing:**
```
✓ .gitignore
   Created .gitignore
✓ Repository field
   Added repository field (update URL as needed)
✓ License field
   Added MIT license (change if needed)
✓ GitHub Actions CI/CD
   Created .github/workflows/ci.yml
✓ .editorconfig
   Created .editorconfig
```

**Result:**
- ✅ Ready for GitHub
- ✅ Contributors can maintain consistency
- ✅ CI runs automatically on PRs
- ✅ Proper licensing in place

---

### Example 5: Convert JavaScript Project to TypeScript

**Scenario:** You've added TypeScript to a JavaScript project but configuration is incomplete.

```bash
cd my-js-project
# After: npm install typescript --save-dev
# After: Renamed some files to .ts
devsetup doctor
```

**Output:**
```
📋 Issues Found:

❌ Errors:
  🔧 Missing tsconfig.json [fixable]
     TypeScript configuration file not found

⚠️  Warnings:
  🔧 TypeScript module resolution [fixable]
     Update moduleResolution for modern tooling
```

**After fixing:**
```
✓ TypeScript configuration
   Created tsconfig.json with recommended settings
✓ Module resolution
   Updated moduleResolution to "bundler"
```

**Result:**
- ✅ Proper TypeScript configuration
- ✅ Strict mode enabled
- ✅ Modern module resolution

---

### Example 6: Fix After Dependency Update

**Scenario:** After updating to React 18, ESLint config is outdated.

```bash
cd my-app
# After: npm update
devsetup doctor
```

**Output:**
```
⚠️  Warnings:
  🔧 ESLint configuration outdated [fixable]
     Update ESLint for React 18
```

**Result:** Updated ESLint config for new React version ✅

---

### Example 7: Onboarding New Developer

**Scenario:** New developer joins the team, clones project, but missing local configuration.

```bash
# New developer's first day
git clone repo
cd repo
npm install
devsetup doctor --auto
```

**Output:**
```
🔧 Applying fixes...

✓ ESLint configuration
   Created .eslintrc.cjs
✓ Prettier configuration
   Created .prettierrc.json
✓ .editorconfig
   Created .editorconfig

✅ Done!
```

**Result:**
- ✅ Developer's environment matches team standards
- ✅ No "works on my machine" issues
- ✅ Reduced onboarding time from hours to minutes

---

### Example 8: Pre-commit Hook in CI

**Scenario:** Enforce configuration standards in CI pipeline.

```yaml
# .github/workflows/doctor.yml
name: Config Standards

on: [push, pull_request]

jobs:
  doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx devsetup doctor --auto
      - name: Verify no changes needed
        run: |
          if [[ -n $(git status --porcelain) ]]; then
            echo "Configuration issues detected!"
            git status
            exit 1
          fi
```

**Result:**
- ✅ PRs fail if configuration doesn't meet standards
- ✅ Forces developers to run `devsetup doctor` locally
- ✅ Maintains consistent configuration across branches

---

### Example 9: Monorepo Health Check

**Scenario:** Large monorepo with multiple packages.

```bash
# Script to check all packages
packages=(
  "packages/frontend"
  "packages/backend"
  "packages/shared"
)

for pkg in "${packages[@]}"; do
  echo "Checking $pkg..."
  cd "$pkg"
  devsetup doctor --fix
  cd ../..
done
```

**Result:** All packages follow same standards ✅

---

### Example 10: Emergency Fix Before Demo

**Scenario:** Demo in 30 minutes, realizing project has configuration issues.

```bash
devsetup doctor --auto
npm install
npm run lint --fix
npm test
npm run build
```

**Result:**
- ✅ Fixed all configuration issues in seconds
- ✅ Linting passes
- ✅ Tests pass
- ✅ Build succeeds
- ✅ Demo ready!

---

## 💡 Pro Tips

### Tip 1: Always Commit Before Running

```bash
git add -A
git commit -m "Before devsetup doctor"
devsetup doctor --auto
```

If something goes wrong, easy to revert.

### Tip 2: Run on Branches

```bash
git checkout -b chore/fix-config
devsetup doctor --auto
git add -A
git commit -m "chore: fix configuration with devsetup doctor"
git push
# Create PR
```

### Tip 3: Use in Package.json Script

```json
{
  "scripts": {
    "doctor": "devsetup doctor",
    "doctor:fix": "devsetup doctor --auto",
    "postinstall": "devsetup doctor"
  }
}
```

### Tip 4: Document in README

```markdown
## Development Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run doctor` to ensure proper configuration
4. Start development with `npm run dev`
```

### Tip 5: Use in Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npx devsetup doctor --auto
COPY . .
RUN npm run build
```

---

## 🚨 Common Issues & Solutions

### Issue: "ESLint config conflicts with existing rules"

**Solution:** Doctor never overwrites existing configs. If you want a fresh start:
```bash
rm .eslintrc.*
devsetup doctor --auto
```

### Issue: "Too many changes at once"

**Solution:** Fix incrementally:
```bash
devsetup doctor --fix
# Select only ESLint and Prettier
# Test the changes
# Run again for more fixes
```

### Issue: "Team has custom ESLint rules"

**Solution:** Let Doctor create the base, then merge your custom rules:
```bash
devsetup doctor --auto
# Edit .eslintrc.cjs to add your custom rules
```

---

**DevSetup Doctor - Real solutions for real problems! 🏥**
