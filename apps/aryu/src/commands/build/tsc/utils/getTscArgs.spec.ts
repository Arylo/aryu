import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { getTscArgs } from './getTscArgs'
import { storeRun } from '../../../../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

test('should found the tsc config', () => {
  testProject.addFile('tsconfig.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p tsconfig.json')
  }, { cwd: testProject.getPath() })
})

test('should found the tsc production config', () => {
  testProject.addFile('tsconfig.json')
  testProject.addFile('tsconfig.prod.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p tsconfig.prod.json')
  }, { cwd: testProject.getPath() })
})

test('should found the tsc config under the sub-project', () => {
  const subProject = testProject.startSubNodeProject()
  testProject.addFile('tsconfig.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p ../../tsconfig.json')
  }, { cwd: subProject.getPath() })
})

test('should found the tsc production config under the sub-project', () => {
  const subProject = testProject.startSubNodeProject()
  testProject.addFile('tsconfig.json')
  testProject.addFile('tsconfig.prod.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p ../../tsconfig.prod.json')
  }, { cwd: subProject.getPath() })
})

test('should found the sub-project of the tsc config under the sub-project', () => {
  const subProject = testProject.startSubNodeProject()
  testProject.addFile('tsconfig.json')
  subProject.addFile('tsconfig.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p tsconfig.json')
  }, { cwd: subProject.getPath() })
})

test('should found the tsc production config under the sub-project', () => {
  const subProject = testProject.startSubNodeProject()
  testProject.addFile('tsconfig.json')
  testProject.addFile('tsconfig.prod.json')
  subProject.addFile('tsconfig.prod.json')
  storeRun(() => {
    expect(getTscArgs()).toMatch('-p tsconfig.prod.json')
  }, { cwd: subProject.getPath() })
})

