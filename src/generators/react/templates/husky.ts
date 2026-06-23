import { ProjectConfig } from '../../../types/index.js';

export function getHuskyConfig(_config: ProjectConfig): { preCommit: string } {
  return {
    preCommit: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`,
  };
}
