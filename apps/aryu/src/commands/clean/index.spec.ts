import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { handler } from './index'
import { storeRun } from '../../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should delete dist folder', () => {
  testProject.addDirectory('src')
  testProject.addDirectory('dist')
  storeRun(() => {
    handler()
  }, { cwd: testProject.getPath() })
  expect(fs.existsSync(path.resolve(testProject.getPath(), 'src'))).toBeTruthy()
  expect(fs.existsSync(path.resolve(testProject.getPath(), 'dist'))).toBeFalsy()
})
