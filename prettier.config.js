/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@/(components|data|config)/',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default config;
