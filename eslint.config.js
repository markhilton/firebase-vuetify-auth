import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**']
  },
  
<<<<<<< HEAD
  // Base JavaScript config
  js.configs.recommended,
  
  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off', // Disable base rule
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }]
    }
  },
  
  // Special rule for auth-actions.ts to ignore 'this' parameter
  {
    files: ['**/auth-actions.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_|^this$',
        varsIgnorePattern: '^_'
      }]
    }
  },
  
  // Vue files
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser
      },
=======
  // JavaScript files
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
>>>>>>> e8d24ac54c52ad6937b4434006ba08c67caf605b
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        ClipboardEvent: 'readonly',
        KeyboardEvent: 'readonly'
      }
    },
<<<<<<< HEAD
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }]
    }
  },
  
  // Prettier (should be last)
  prettier
];
=======
    rules: {
      'no-async-promise-executor': 0,
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  },
  
  // Vue files - spread the flat config
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'no-async-promise-executor': 0,
      'vue/multi-word-component-names': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  },
  
  // Prettier config for all files
  {
    files: ['**/*.js', '**/*.vue'],
    ...prettier
  }
];
>>>>>>> e8d24ac54c52ad6937b4434006ba08c67caf605b
