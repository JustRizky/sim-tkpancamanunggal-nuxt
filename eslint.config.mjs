// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts,vue}'],
    ignores: ['node_modules/**', '.nuxt/**', '.output/**', 'coverage/**'],
    rules: {
      'no-console': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
    },
  },
]
