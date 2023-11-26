import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { getRootProjectPath } from './getRootProjectPath'
import { storeRun } from '../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should return the project path', () => {
  const source = testProject.getPath()
  storeRun(() => {
    const target = getRootProjectPath()
    expect(target).toBe(source)
  }, { cwd: testProject.getPath() })
})

test('should return the project path under the subfolder', () => {
  const subfolderPath = testProject.addDirectory('newFolder')
  storeRun(() => {
    const source = testProject.getPath()
    const target = getRootProjectPath()
    expect(target).toBe(source)
  }, { cwd: subfolderPath })
})
