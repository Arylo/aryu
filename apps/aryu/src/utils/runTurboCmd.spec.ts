import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { checkTurboFeature } from './runTurboCmd'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should found turbo.json', () => {
  testProject.addFile('turbo.json', JSON.stringify({ pipelines: [] }))
  expect(checkTurboFeature(testProject.getPath())).not.toBeFalsy()
  expect(checkTurboFeature(testProject.getPath())).toEqual(expect.any(String))
})

test('should non found turbo.json', () => {
  expect(checkTurboFeature(testProject.getPath())).toBeFalsy()
})
