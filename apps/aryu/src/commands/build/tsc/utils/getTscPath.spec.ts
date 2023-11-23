import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { getTscPath } from './getTscPath'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should found the tsc progress', () => {
  testProject.addFile('node_modules/.bin/tsc')
  expect(getTscPath({ cwd: testProject.getPath() })).toEqual('node_modules/.bin/tsc')
})

test('should non-found the tsc progress', () => {
  expect(getTscPath({ cwd: testProject.getPath() })).toBeFalsy()
})
