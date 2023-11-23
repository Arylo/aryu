import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: [
        'text',
        'html',
        'clover',
        'cobertura',
        'json-summary',
        'json',
        'lcov',
      ],
    },
  },
})
