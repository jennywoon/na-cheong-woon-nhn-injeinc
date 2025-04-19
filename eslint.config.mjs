import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    env: {
      node: true,
      es6: true,
    },
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    languageOptions: { globals: globals.browser } 
  },
  tseslint.configs.recommended,
]);