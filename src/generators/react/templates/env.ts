export function getEnvTemplate(): string {
  return `# API Configuration
VITE_API_URL=http://localhost:8000/api

# Environment
VITE_ENV=development

# Feature Flags
VITE_ENABLE_DEBUG=true
`;
}
