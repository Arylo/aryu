import path from 'path'
import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { findNpmProgram } from './npm'
import { storeRun } from '../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

describe(findNpmProgram.name, () => {
  test('should found the tsc program', () => {
    testProject.addFile('node_modules/.bin/tsc')
    storeRun(() => {
      expect(findNpmProgram('tsc'))
        .toEqual(path.resolve(testProject.getPath(), 'node_modules/.bin/tsc'))
    }, { cwd: testProject.getPath() })
  })

  test('should non-found the tsc program', () => {
    storeRun(() => {
      expect(findNpmProgram('tsc'))
        .toBeFalsy()
    }, { cwd: testProject.getPath() })
  })

  test('should found the tsc program under sub-project', () => {
    testProject.addFile('node_modules/.bin/tsc')
    const subProject = testProject.startSubNodeProject()
    storeRun(() => {
      expect(findNpmProgram('tsc'))
        .toEqual(path.resolve(testProject.getPath(), 'node_modules/.bin/tsc'))
    }, { cwd: subProject.getPath() })
  })

  test('should prioritize found the tsc program under sub-project', () => {
    testProject.addFile('node_modules/.bin/tsc')
    const subProject = testProject.startSubNodeProject()
    subProject.addFile('node_modules/.bin/tsc')
    storeRun(() => {
      expect(findNpmProgram('tsc'))
        .toEqual(path.resolve(subProject.getPath(), 'node_modules/.bin/tsc'))
    }, { cwd: subProject.getPath() })
  })

  test('should found the tsc program from sub-project', () => {
    const subProject = testProject.startSubNodeProject()
    subProject.addFile('node_modules/.bin/tsc')
    storeRun(() => {
      expect(findNpmProgram('tsc'))
        .toEqual(path.resolve(subProject.getPath(), 'node_modules/.bin/tsc'))
    }, { cwd: subProject.getPath() })
  })
})

