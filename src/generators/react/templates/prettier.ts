export function getPrettierConfig(): string {
  return JSON.stringify(
    {
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      arrowParens: 'always',
      endOfLine: 'lf',
    },
    null,
    2
  );
}
