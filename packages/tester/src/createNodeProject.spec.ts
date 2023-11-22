import os from 'os'
import path from 'path'
import fs from 'fs'
import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, test } from 'vitest'
import { createNodeProject } from './createNodeProject'
import { testNodeJSProject } from './utils/testNodeProject'

const tmpDir = path.resolve(os.tmpdir(), faker.word.sample())

beforeAll(() => {
  fs.mkdirSync(tmpDir, { recursive: true })
})

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

test('Should generate valid Node project', () => {
  const projectDir = createNodeProject(tmpDir)

  testNodeJSProject(projectDir)
})
