# DevSetup Architecture

This document explains the architecture and design decisions behind DevSetup.

## 🎯 Design Goals

1. **Extensibility** - Easy to add new templates without major refactoring
2. **Modularity** - Separate concerns (CLI, generation, templates, utilities)
3. **Testability** - High test coverage with isolated, testable components
4. **Maintainability** - Clean code that's easy to understand and modify
5. **Performance** - Fast project generation
6. **User Experience** - Beautiful CLI with clear feedback

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   CLI Layer                      │
│  (Commander.js - Command parsing & routing)      │
└─────────────┬───────────────────────────────────┘
              │
              ├─► react <project-name>
              ├─► nextjs <project-name>  (future)
              └─► express <project-name> (future)
              │
┌─────────────▼───────────────────────────────────┐
│              Command Layer                       │
│  (Interactive prompts & validation)              │
└─────────────┬───────────────────────────────────┘
              │
              ├─► Inquirer.js (User prompts)
              ├─► Validation (Input checks)
              └─► Config building
              │
┌─────────────▼───────────────────────────────────┐
│             Generator Layer                      │
│  (Template-specific project generation)          │
└─────────────┬───────────────────────────────────┘
              │
              ├─► Structure creation
              ├─► File generation
              ├─► Git initialization
              └─► Post-generation tasks
              │
┌─────────────▼───────────────────────────────────┐
│             Template Layer                       │
│  (Template functions for files)                  │
└─────────────┬───────────────────────────────────┘
              │
              ├─► package.json
              ├─► tsconfig.json
              ├─► vite.config.ts
              ├─► Docker files
              └─► etc.
              │
┌─────────────▼───────────────────────────────────┐
│              Utility Layer                       │
│  (Reusable utilities & helpers)                  │
└──────────────────────────────────────────────────┘
```

## 📂 Directory Structure

```
devsetup/
├── src/
│   ├── cli.ts                  # Entry point, command registration
│   ├── commands/               # Command handlers
│   │   ├── react.ts
│   │   └── [future templates]
│   ├── generators/             # Template generators
│   │   ├── react/
│   │   │   ├── index.ts       # Generation logic
│   │   │   └── templates/     # Template functions
│   │   └── [future templates]
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts
│   └── utils/                  # Shared utilities
│       ├── fs-helpers.ts      # File system operations
│       ├── validation.ts      # Input validation
│       ├── rollback.ts        # Error recovery
│       ├── ui.ts              # UI/UX helpers
│       └── version.ts         # Version management
├── tests/                      # Test files
└── dist/                       # Compiled output
```

## 🔄 Flow Diagram

### Project Generation Flow

```
User Input
    │
    ▼
┌────────────────────┐
│   CLI Parsing      │ (Commander.js)
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│   Validation       │ (Check project name, existing dirs)
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Interactive Setup  │ (Inquirer prompts)
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│   Build Config     │ (ProjectConfig object)
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Generate Project   │
│  ├─ Create dirs    │
│  ├─ Write files    │
│  ├─ Init git       │
│  └─ Setup hooks    │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  Success/Error     │
│  (with rollback)   │
└────────────────────┘
```

## 🧩 Key Components

### 1. CLI Layer (`src/cli.ts`)

**Responsibility:** Command registration and routing

**Technology:** Commander.js

**Key Features:**
- Version management
- Command registration
- Help text generation

**Example:**
```typescript
program
  .command('react <project-name>')
  .description('Create a new React project')
  .action(reactCommand);
```

### 2. Command Layer (`src/commands/`)

**Responsibility:** Handle user interaction and orchestrate generation

**Technology:** Inquirer.js for prompts

**Key Features:**
- Interactive prompts
- Input validation
- Config building
- Error handling with rollback

**Example:**
```typescript
export async function reactCommand(projectName: string) {
  // Validate
  const validation = validateProjectName(projectName);
  
  // Interactive prompts
  const answers = await inquirer.prompt([...]);
  
  // Build config
  const config = { projectName, ...answers };
  
  // Generate
  await generateReactProject(config);
}
```

### 3. Generator Layer (`src/generators/*/index.ts`)

**Responsibility:** Template-specific project generation logic

**Technology:** Node.js fs module (via helpers)

**Key Features:**
- Directory structure creation
- File generation
- Conditional features
- Git initialization
- Progress feedback (Ora spinners)

**Example:**
```typescript
export async function generateReactProject(config: ProjectConfig) {
  // Create structure
  createDirectory(resolve(targetDir, 'src/components'));
  
  // Generate files
  writeFile(resolve(targetDir, 'package.json'), getPackageJson(config));
  
  // Initialize git
  await execa('git', ['init'], { cwd: targetDir });
}
```

### 4. Template Layer (`src/generators/*/templates/`)

**Responsibility:** Generate file content based on configuration

**Key Features:**
- Configuration-driven templates
- Conditional content inclusion
- Type-safe template functions

**Example:**
```typescript
export function getPackageJson(config: ProjectConfig): string {
  const dependencies = { react: '^18.2.0' };
  
  if (config.addApiService) {
    dependencies.axios = '^1.6.2';
  }
  
  return JSON.stringify({ dependencies }, null, 2);
}
```

### 5. Utility Layer (`src/utils/`)

**Responsibility:** Reusable helper functions

**Components:**
- `fs-helpers.ts` - File system operations with error handling
- `validation.ts` - Input validation logic
- `rollback.ts` - Cleanup on failure
- `ui.ts` - Terminal UI helpers (chalk, ora)
- `version.ts` - Version management

## 🔌 Plugin Architecture (Future)

The current architecture is designed to support a plugin system:

```typescript
interface TemplatePlugin {
  name: string;
  generate: (config: ProjectConfig) => Promise<void>;
  prompts: InquirerQuestion[];
}

// Register plugins
registerTemplate('react', reactPlugin);
registerTemplate('nextjs', nextjsPlugin);
```

## 🎨 Design Patterns

### Factory Pattern
Template generators act as factories, creating projects based on configuration.

### Strategy Pattern
Different generators (React, Next.js, etc.) implement the same interface but with different strategies.

### Template Method Pattern
Common generation steps (create dirs, write files, init git) with template-specific customization.

### Builder Pattern
`ProjectConfig` object is built incrementally through user prompts.

## 🧪 Testing Strategy

### Unit Tests
- Template functions (input → output)
- Validation logic
- File system helpers
- Utility functions

### Integration Tests
- Full project generation
- File structure verification
- Content validation

### Coverage Goals
- 80%+ line coverage
- 80%+ branch coverage
- 80%+ function coverage

## 🔐 Error Handling

### Validation Errors
- Caught early, clear messages
- No side effects

### Generation Errors
- Automatic rollback
- Clean up partial files
- Informative error messages

### Network Errors
- Graceful degradation
- Retry logic for transient failures

## 🚀 Performance Considerations

### File I/O
- Batch operations where possible
- Asynchronous operations
- Minimal read/write cycles

### Dependencies
- Keep core dependencies minimal
- Use native Node.js APIs when possible
- Bundle size optimization

## 📦 Build & Distribution

### TypeScript Compilation
```bash
tsc → dist/
```

### NPM Package
- Type definitions included
- Source maps for debugging
- Executable bin script

### Publishing
```bash
npm publish → registry.npmjs.org
```

## 🔮 Future Enhancements

### Template Marketplace
- Community-contributed templates
- Version management
- Rating system

### Remote Templates
```bash
devsetup --template https://github.com/user/template
```

### AI-Assisted Generation
- Natural language project descriptions
- Intelligent dependency selection
- Best practice recommendations

### Configuration Profiles
```bash
devsetup --profile my-company-preset
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Adding new templates
- Improving existing templates
- Architecture decisions
- Code style guidelines

---

Last Updated: 2024
Version: 1.0.0
