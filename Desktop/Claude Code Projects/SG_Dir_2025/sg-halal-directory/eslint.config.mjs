import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore generated types
    "types/database.ts",
  ]),
  // Production-ready rules
  {
    rules: {
      // Require proper entity escaping
      'react/no-unescaped-entities': 'error',
      // Disallow 'any' type - enforce type safety
      '@typescript-eslint/no-explicit-any': 'error',
      // Error on unused variables
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // Require next/image for optimization
      '@next/next/no-img-element': 'error',
      // Enforce Google Font optimization
      '@next/next/google-font-preconnect': 'error',
      // Prevent common mistakes
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Enforce consistent return types
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow async functions without await (common in Next.js)
      '@typescript-eslint/require-await': 'off',
    },
  },
]);

export default eslintConfig;
