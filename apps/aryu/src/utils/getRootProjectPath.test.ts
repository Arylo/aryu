import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { getRootProjectPath } from './getRootProjectPath'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should return the project path', () => {
  const source = testProject.getPath()
  const target = getRootProjectPath({ cwd: testProject.getPath() })
  expect(target).toBe(source)
})

test('should return the project path under the subfolder', () => {
  const subfolderPath = testProject.addDirectory('newFolder')
  const source = testProject.getPath()
  const target = getRootProjectPath({ cwd: subfolderPath })
  expect(target).toBe(source)
})
