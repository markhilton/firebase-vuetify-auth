import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  ...pluginVue.configs['vue3-recommended'],
  prettier,
  {
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
    files: ['**/*.js', '**/*.vue'],
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
