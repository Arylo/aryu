import { afterAll, beforeEach, test } from 'vitest'
import { startNodeProject } from 'tester'
import { storeRun } from '../../../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should build ts files', () => {
  testProject.addFile('src/index.ts', 'console.log(\'Hello world\')')
  testProject.installModule('typescript', true)
  storeRun(() => {

  }, { cwd: testProject.getPath() })
})
