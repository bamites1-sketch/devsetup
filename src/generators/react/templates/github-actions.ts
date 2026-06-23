import { ProjectConfig } from '../../../types/index.js';

export function getGitHubActions(config: ProjectConfig): string {
  const packageManager = config.packageManager || 'npm';
  const installCmd = packageManager === 'npm' ? 'npm ci' : `${packageManager} install --frozen-lockfile`;
  const runCmd = packageManager === 'npm' ? 'npm run' : packageManager;

  return `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: '${packageManager}'

    - name: Install dependencies
      run: ${installCmd}

    - name: Run linter
      run: ${runCmd} lint

    - name: Run tests
      run: ${runCmd} test

    - name: Build application
      run: ${runCmd} build

    - name: Upload coverage reports
      if: matrix.node-version == '20.x'
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/coverage-final.json
        flags: unittests
        name: codecov-umbrella
`;
}
