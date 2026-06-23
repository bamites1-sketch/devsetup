import { ProjectConfig } from '../../../types/index.js';

import { getNginxConfig } from './nginx.js';

export function getDockerfile(config: ProjectConfig): string {
  return `# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`;
}

export { getNginxConfig };

export function getDockerCompose(config: ProjectConfig): string {
  return `version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
`;
}

export function getDockerignore(): string {
  return `node_modules
npm-debug.log
dist
.git
.gitignore
README.md
.env
.env.local
coverage
.vscode
.idea
`;
}
