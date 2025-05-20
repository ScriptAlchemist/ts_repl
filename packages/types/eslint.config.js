import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript rules
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
    },
    rules: js.configs.recommended.rules,
  },

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Common override (optional)
  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
]);

