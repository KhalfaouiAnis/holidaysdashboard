import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: [".github/", ".husky/", "node_modules/", ".next/", "src/components/ui", "*.config.ts", "*.mjs"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "prettier/prettier": "warn",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["^.*\\.config\\.(js|ts|mjs)$", "^.*\\.d\\.ts$"],
        },
      ],
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-useless-rename": "error",
      "import/no-mutable-exports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "{next,next/**}",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": "error",
      "import/no-unresolved": [
        "error",
        {
          caseSensitive: true,
        },
      ],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "import/no-cycle": ["error", { maxDepth: 2 }],
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "computed-property-spacing": ["error", "never"],
      "no-underscore-dangle": ["error", { allow: ["_id", "__dirname"] }],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          ignore: [],
        },
      ],
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      "react/jsx-no-constructed-context-values": "error",
      "react/no-array-index-key": "warn",
      "sonarjs/no-commented-code": "warn",
    },
  },
];
