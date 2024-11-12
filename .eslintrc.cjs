module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'import'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-void': ['error', { allowAsStatement: true }],
    'no-var': 'error',
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    'no-magic-numbers': ['error', { ignore: [0, 1] }],
    'prefer-arrow-callback': ['error'],
    "curly": 'error',
    'no-new-func': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-debugger': 'error',
    'no-console': 'error',

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // comments
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',

    // imports/exports
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',

    // classes
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-misused-new': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        // "newlines-between": "always",
        // alphabetize: {
        //   order: "asc",
        //   caseInsensitive: true,
        // },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};