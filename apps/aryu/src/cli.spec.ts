import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should build ts file after init', () => {
  testProject.addFile('src/index.ts', 'const content: string = \'Hello World\'')
  testProject.installModule('typescript', true)
  testProject.installModule(path.resolve(__dirname, '../../aryu'))
  testProject.installModule(path.resolve(__dirname, '../../tsconfig'))

  testProject.exec('npx aryu init')
  testProject.exec('npx aryu build')

  const fileContent = fs.readFileSync(path.resolve(testProject.getPath(), 'dist/index.js'), 'utf-8')
  expect(fileContent).toContain('const content = \'Hello World\'')
})
