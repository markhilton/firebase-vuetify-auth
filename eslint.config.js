import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.vue'],
    ...pluginVue.configs['vue3-recommended']
  },
  {
    files: ['**/*.js', '**/*.vue'],
    ...prettier
  },
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        process: 'readonly'
      }
    },
    ignores: ['node_modules/**', 'dist/**'],
    rules: {
      'no-async-promise-executor': 0,
      'vue/multi-word-component-names': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  }
];
