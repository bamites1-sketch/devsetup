export function getExampleTest(): string {
  return `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeDefined();
  });

  it('renders the count button', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Count is');
  });
});
`;
}

export function getTestSetup(): string {
  return `import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
`;
}
