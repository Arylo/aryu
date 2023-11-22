import os from 'os'
import path from 'path'
import fs from 'fs'
import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { SubDir, startNodeProject } from './startNodeProject'
import { testNodeJSProject } from './utils/testNodeProject'

const tmpDir = path.resolve(os.tmpdir(), faker.word.sample())

beforeAll(() => {
  fs.mkdirSync(tmpDir, { recursive: true })
})

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

test('should start nodejs project', () => {
  const project = startNodeProject(tmpDir)
  project.refresh()
  testNodeJSProject(project.getPath())
})

test('should start nodejs sub-project', () => {
  const subProjectName = faker.word.sample()
  const project = startNodeProject(tmpDir)
  project.refresh()
  const subProjectPath = project.startSubNodeProject(subProjectName)

  testNodeJSProject(subProjectPath)
  expect(path.relative(project.getPath(), subProjectPath)).not.toContain('..')
  expect(path.relative(project.getPath(), subProjectPath)).toContain(`${SubDir.APP}${path.sep}`)
})
