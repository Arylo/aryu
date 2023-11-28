import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { storeRun } from '../../../store'
import { handler } from './index'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should build ts files', () => {
  testProject.addFile('src/index.ts', 'const content: string = \'Hello World\'')
  testProject.installModule('typescript', true)
  testProject.exec('npx tsc --init')
  storeRun(() => {
    handler()
    expect(fs.existsSync(path.resolve(testProject.getPath(), 'dist/index.js')))
      .toBeTruthy()
    expect(fs.readFileSync(path.resolve(testProject.getPath(), 'dist/index.js'), 'utf-8'))
      .toContain('const content = \'Hello World\'')
  }, { cwd: testProject.getPath() })
})
