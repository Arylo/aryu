import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import findNpmProgram from './findNpmProgram'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should found the tsc program', () => {
  testProject.addFile('node_modules/.bin/tsc')
  expect(findNpmProgram('tsc', { cwd: testProject.getPath() }))
    .toEqual(path.resolve(testProject.getPath(), 'node_modules/.bin/tsc'))
})

test('should non-found the tsc program', () => {
  expect(findNpmProgram('tsc', { cwd: testProject.getPath() })).toBeFalsy()
})

test('should found the tsc program under sub-project', () => {
  testProject.addFile('node_modules/.bin/tsc')
  const subProject = testProject.startSubNodeProject('test')
  expect(findNpmProgram('tsc', { cwd: subProject.getPath() }))
    .toEqual(path.resolve(testProject.getPath(), 'node_modules/.bin/tsc'))
})

test('should prioritize found the tsc program under sub-project', () => {
  testProject.addFile('node_modules/.bin/tsc')
  const subProject = testProject.startSubNodeProject('test')
  subProject.addFile('node_modules/.bin/tsc')
  expect(findNpmProgram('tsc', { cwd: subProject.getPath() }))
    .toEqual(path.resolve(subProject.getPath(), 'node_modules/.bin/tsc'))
})

test('should found the tsc program from sub-project', () => {
  const subProject = testProject.startSubNodeProject('test')
  subProject.addFile('node_modules/.bin/tsc')
  expect(findNpmProgram('tsc', { cwd: subProject.getPath() }))
    .toEqual(path.resolve(subProject.getPath(), 'node_modules/.bin/tsc'))
})
