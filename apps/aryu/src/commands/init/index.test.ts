import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { handler } from '../init'
import { storeRun } from '../../store'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

const PROJECT_DEFAULT_FILES = ['.editorconfig', '.gitignore']
const NODEJS_VERSION_FILES = ['.node-version', '.nvmrc']
const NODEJS_TYPESCRIPT_FILES = ['tsconfig.json', 'tsconfig.prod.json']
const NODEJS_MONOREPO_FILES = ['tsconfig.json', 'tsconfig.prod.json']
const NODEJS_TEST_FILES = ['vitest.config.ts']
const NODEJS_LINT_FILES = ['.eslintignore', 'tsconfig.eslint.json', '.eslintrc.js']

const expectFiles = (p: string, ...fileLists: Array<string|string[]>) => {
  const list = fileLists.reduce<string[]>((list, filenameOrFilenames) => {
    const filenames = (Array.isArray(filenameOrFilenames) ? filenameOrFilenames : [filenameOrFilenames])
      .filter(name => typeof name === 'string')
    list.push(...filenames)
    return list
  }, [])
  list.forEach((filename) => {
    expect(fs.readdirSync(path.resolve(p))).toContain(filename)
  })
}

test('should init project', () => {
  storeRun(() => {
    handler()
  }, { cwd: testProject.getPath() })
  expectFiles(
    testProject.getPath(),
    '.git',
    PROJECT_DEFAULT_FILES,
    NODEJS_VERSION_FILES,
    NODEJS_TYPESCRIPT_FILES,
    NODEJS_MONOREPO_FILES,
    NODEJS_TEST_FILES,
    NODEJS_LINT_FILES,
  )
})

test('should init project still success even it has same name file', () => {
  testProject.addFile('.nvmrc', '16')
  storeRun(() => {
    handler()
  }, { cwd: testProject.getPath() })
  expectFiles(
    testProject.getPath(),
    PROJECT_DEFAULT_FILES,
    NODEJS_VERSION_FILES,
    NODEJS_TYPESCRIPT_FILES,
    NODEJS_MONOREPO_FILES,
    NODEJS_TEST_FILES,
    NODEJS_LINT_FILES,
  )
})

test('should init project under the subfolder', () => {
  const subfolderPath = testProject.addDirectory('newFolder')
  storeRun(() => {
    handler()
  }, { cwd: subfolderPath })
  expectFiles(
    testProject.getPath(),
    PROJECT_DEFAULT_FILES,
    NODEJS_VERSION_FILES,
    NODEJS_TYPESCRIPT_FILES,
    NODEJS_MONOREPO_FILES,
    NODEJS_TEST_FILES,
    NODEJS_LINT_FILES,
  )
})

