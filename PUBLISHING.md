# Publishing Guide for DevSetup

This guide explains how to publish DevSetup to npm.

## 📋 Prerequisites

1. **npm Account**
   - Create account at [npmjs.com](https://www.npmjs.com/signup)
   - Verify your email address

2. **Authentication**
   ```bash
   npm login
   ```

3. **Verify Authentication**
   ```bash
   npm whoami
   ```

## 🔍 Pre-publish Checklist

Before publishing, ensure:

- [ ] All tests pass: `npm test`
- [ ] Linting passes: `npm run lint`
- [ ] Coverage meets threshold: `npm run test:coverage`
- [ ] Project builds successfully: `npm run build`
- [ ] README is up-to-date
- [ ] CHANGELOG is updated
- [ ] Version number is correct in `package.json`
- [ ] Git working directory is clean
- [ ] All changes are committed

## 📦 Package Configuration

### package.json Fields

Critical fields for npm:

```json
{
  "name": "devsetup",
  "version": "1.0.0",
  "description": "Production-ready developer project generator",
  "main": "dist/index.js",
  "bin": {
    "devsetup": "./dist/cli.js"
  },
  "type": "module",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "cli",
    "generator",
    "scaffolding",
    "react",
    "typescript"
  ]
}
```

## 🏗️ Build for Production

```bash
# Clean previous build
rm -rf dist

# Build TypeScript
npm run build

# Verify build output
ls -la dist/
```

## 🧪 Test Locally

### Method 1: npm link

```bash
# In devsetup directory
npm link

# Test the CLI
devsetup react test-project

# Unlink when done
npm unlink -g devsetup
```

### Method 2: Local Install

```bash
# Create test directory
mkdir test-local
cd test-local

# Install from local path
npm install ../devsetup

# Test
npx devsetup react test-app
```

## 📊 Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes

### Update Version

```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git commit
- Creates a git tag

## 🚀 Publishing

### First Time Publish

```bash
# Dry run (see what would be published)
npm publish --dry-run

# Publish to npm
npm publish
```

### Subsequent Releases

```bash
# Update version
npm version patch

# Run prepublish checks (automatic)
# - npm test
# - npm run lint

# Publish
npm publish

# Push tags to git
git push --follow-tags
```

### Using Scripts

```bash
# Patch release
npm run release:patch

# Minor release
npm run release:minor

# Major release
npm run release:major
```

These scripts:
1. Run `npm version [patch|minor|major]`
2. Run `npm publish`

## 🏷️ npm Tags

### Latest (default)
```bash
npm publish
# Users install with: npm install devsetup
```

### Beta Release
```bash
npm publish --tag beta
# Users install with: npm install devsetup@beta
```

### Next Release
```bash
npm publish --tag next
# Users install with: npm install devsetup@next
```

## 🔒 Access Control

### Public Package (Recommended for OSS)
```bash
npm publish --access public
```

### Scoped Package
If using organization scope:
```json
{
  "name": "@yourorg/devsetup"
}
```

```bash
npm publish --access public
```

## 📝 Post-Publish Tasks

1. **Verify on npm**
   - Visit https://www.npmjs.com/package/devsetup
   - Check README renders correctly
   - Verify version updated

2. **Test Installation**
   ```bash
   npm install -g devsetup
   devsetup --version
   ```

3. **Create GitHub Release**
   - Go to GitHub repository
   - Create new release
   - Tag: `v1.0.0`
   - Title: `Release 1.0.0`
   - Description: Copy from CHANGELOG

4. **Update Documentation**
   - Update version badges
   - Update installation instructions
   - Announce on social media

## 🐛 Unpublish (Use Sparingly)

**Warning:** Only unpublish within 72 hours of publish, and never for public packages with downloads.

```bash
# Unpublish specific version
npm unpublish devsetup@1.0.0

# Unpublish all versions (DANGEROUS)
npm unpublish devsetup --force
```

## 🔄 Deprecate Old Versions

Instead of unpublishing, deprecate:

```bash
npm deprecate devsetup@1.0.0 "Critical bug, upgrade to 1.0.1"
```

## 📊 Package Analytics

View package statistics:

```bash
npm view devsetup

# See all versions
npm view devsetup versions

# See download stats
npm view devsetup downloads
```

Or visit:
- https://www.npmjs.com/package/devsetup
- https://npmtrends.com/devsetup

## 🔐 Two-Factor Authentication

Recommended for security:

```bash
# Enable 2FA
npm profile enable-2fa auth-and-writes

# Publish with 2FA
npm publish
# Enter OTP when prompted
```

## 🤖 CI/CD Publishing

For GitHub Actions:

```yaml
name: Publish

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 📋 Checklist Summary

Publishing checklist:

```bash
# 1. Verify everything works
npm test && npm run lint && npm run build

# 2. Update version
npm version patch  # or minor/major

# 3. Update CHANGELOG
# Edit CHANGELOG.md

# 4. Commit and push
git push --follow-tags

# 5. Publish
npm publish

# 6. Verify
npm view devsetup version

# 7. Test install
npm install -g devsetup@latest

# 8. Create GitHub release
# Go to GitHub and create release

# 9. Celebrate! 🎉
```

## 🆘 Troubleshooting

### "You do not have permission to publish"
```bash
npm login
npm whoami
```

### "Package name already exists"
- Choose different name
- Or use scoped package: `@username/devsetup`

### "Version already exists"
```bash
npm version patch  # Increment version
```

### "Registry error"
```bash
npm config set registry https://registry.npmjs.org/
```

## 📚 Resources

- [npm Publishing Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Docs](https://docs.npmjs.com/cli/)

---

Happy Publishing! 🚀
