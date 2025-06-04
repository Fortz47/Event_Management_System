// eslint.config.mjs
// import { FlatCompat } from "@eslint/eslintrc";
// import js from "@eslint/js";
// import tsParser from "@typescript-eslint/parser";
// import tsPlugin from "@typescript-eslint/eslint-plugin";
// import prettier from "eslint-plugin-prettier";
// import importPlugin from "eslint-plugin-import";
// import globals from "globals";

// const compat = new FlatCompat();

// export default [
//   js.configs.recommended,
//   ...compat.extends("plugin:@typescript-eslint/recommended"),
//   {
//     files: ["**/*.ts"],
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.es2021,
//       },
//       parser: tsParser,
//       parserOptions: {
//         project: true,
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tsPlugin,
//       import: importPlugin,
//       prettier,
//     },
//     rules: {
//       "import/newline-after-import": ["error", { count: 1 }],
//       "prettier/prettier": [
//         "error",
//         {
//           printWidth: 80,
//           tabWidth: 2,
//           singleQuote: false,
//           trailingComma: "es5",
//           importOrder: [],
//           importOrderSeparation: false,
//           importOrderSortSpecifiers: false,
//         },
//       ],
//     },
//   },
//   {
//     ignores: ["**/dist/**", "**/node_modules/**"],
//   },
// ];



// eslint.config.mjs
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
// import prettierPlugin from 'eslint-plugin-prettier';
// import importPlugin from 'eslint-plugin-import';

// export default [
//   {
//     files: ['**/*.ts'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: true
//       }
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       import: importPlugin,
//       prettier: prettierPlugin
//     },
//     rules: {
//       // Configure import newlines
//       'import/newline-after-import': ['error', { count: 2 }],
      
//       // Explicitly configure Prettier rules to match
//       'prettier/prettier': ['error', {
//         printWidth: 80,
//         tabWidth: 2,
//         singleQuote: false,
//         trailingComma: 'es5',
//         // Add this to prevent Prettier from modifying import spacing
//         importOrder: undefined,
//         importOrderSeparation: false,
//         importOrderSortSpecifiers: false,
//       }],
      
//       // Other recommended rules
//       '@typescript-eslint/no-unused-vars': 'warn'
//     }
//   }
// ];