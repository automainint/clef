module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        endOfLine: 'auto',
      },
    ],
    'max-len': ['error', { code: 120 }],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/no-unresolved': ['off'],
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '_' }],
    'no-unused-vars': ['warn', { varsIgnorePattern: '_' }],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'react/react-in-jsx-scope': ['off'],
    'import/extensions': ['off'],
    'no-use-before-define': ['off'],
    'import/prefer-default-export': ['off'],
    'react/require-default-props': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'class-methods-use-this': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/no-danger': 'off',
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],
    'react/prop-types': 'off',
    'import/no-cycle': [2, { maxDepth: 1 }],
  },
  settings: {
    next: {
      rootDir: 'front/',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    React: 'readonly',
    JSX: 'readonly',
  },
};
