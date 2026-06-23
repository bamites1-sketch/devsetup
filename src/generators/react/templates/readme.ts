import { ProjectConfig } from '../../../types/index.js';

export function getReadme(config: ProjectConfig): string {
  const pm = config.packageManager || 'npm';
  const runCmd = pm === 'npm' ? 'npm run' : pm;

  return `# ${config.projectName}

A modern React application built with TypeScript and Vite.

## ✨ Features

- ⚡️ **React 18** - Latest React features
- 🎯 **TypeScript** - Type safety and better DX
- 🚀 **Vite** - Lightning fast HMR and builds
- 🎨 ${config.useTailwind ? '**Tailwind CSS** - Utility-first CSS framework' : '**CSS Modules** - Scoped styling'}
- 🧪 **Vitest** - Fast unit testing
- 📝 **ESLint** - Code linting
- 💅 **Prettier** - Code formatting
${config.useDocker ? '- 🐳 **Docker** - Containerization support' : ''}
${config.useGitHubActions ? '- 🔄 **GitHub Actions** - CI/CD pipeline' : ''}
${config.useHusky ? '- 🐕 **Husky** - Git hooks for quality checks' : ''}
${config.addApiService ? '- 🌐 **API Service Layer** - Axios-based HTTP client' : ''}
${config.addAuth ? '- 🔐 **Authentication Module** - Ready-to-use auth service' : ''}

## 📦 Installation

\`\`\`bash
${pm} install
\`\`\`

## 🚀 Development

Start the development server:

\`\`\`bash
${runCmd} dev
\`\`\`

The application will be available at \`http://localhost:3000\`.

## 🏗️ Build

Build for production:

\`\`\`bash
${runCmd} build
\`\`\`

Preview the production build:

\`\`\`bash
${runCmd} preview
\`\`\`

## 🧪 Testing

Run tests:

\`\`\`bash
${runCmd} test
\`\`\`

Run tests in watch mode:

\`\`\`bash
${runCmd} test:watch
\`\`\`

Generate coverage report:

\`\`\`bash
${runCmd} test:coverage
\`\`\`

## 📝 Linting & Formatting

Lint code:

\`\`\`bash
${runCmd} lint
\`\`\`

Format code:

\`\`\`bash
${runCmd} format
\`\`\`
${
  config.useDocker
    ? `
## 🐳 Docker

Build and run with Docker:

\`\`\`bash
docker-compose up --build
\`\`\`

The application will be available at \`http://localhost:3000\`.
`
    : ''
}
## 📁 Project Structure

\`\`\`
${config.projectName}/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and business logic${config.addApiService ? ' (includes API service)' : ''}${config.addAuth ? ' (includes auth service)' : ''}
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── assets/         # Static assets
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── tests/              # Test files
├── public/             # Public assets
└── ...config files
\`\`\`

## 🔧 Configuration

- **Vite**: \`vite.config.ts\`
- **TypeScript**: \`tsconfig.json\`
- **ESLint**: \`.eslintrc.cjs\`
- **Prettier**: \`.prettierrc.json\`
- **Vitest**: \`vitest.config.ts\`
${config.useTailwind ? '- **Tailwind**: `tailwind.config.js`' : ''}

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🚀 Roadmap

- [ ] Add more components
- [ ] Implement routing
- [ ] Add state management
- [ ] Enhance test coverage
- [ ] Add E2E testing
- [ ] Performance optimizations

---

Built with ❤️ using [DevSetup](https://github.com/yourusername/devsetup)
`;
}
