import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { getTscPath } from './getTscPath'
import { storeRun } from '../../../../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should found the tsc progress', () => {
  testProject.addFile('node_modules/.bin/tsc')
  storeRun(() => {
    expect(getTscPath()).toEqual('node_modules/.bin/tsc')
  }, { cwd: testProject.getPath() })
})

test('should non-found the tsc progress', () => {
  storeRun(() => {
    expect(getTscPath()).toBeFalsy()
  }, { cwd: testProject.getPath() })
})
