import fs from 'fs'
import path from 'path'
import { afterAll, beforeEach, expect, test } from 'vitest'
import { startNodeProject } from 'tester'
import { handler } from '../init'

const testProject = startNodeProject()

beforeEach(() => {
  testProject.refresh()
})

afterAll(() => {
  testProject.clear()
})

const expectRootPath = () => {
  const rootPath = testProject.getPath();
  [
    '.nvmrc',
    'turbo.json',
    'tsconfig.json',
    'tsconfig.prod.json',
  ].forEach((filename) => {
    expect(fs.existsSync(path.resolve(rootPath, filename))).toBeTruthy()
  })
}

test('should init project', () => {
  handler(testProject.getPath())
  expectRootPath()
})

test('should init project stil success even it has same name file', () => {
  testProject.addFile('.nycrc', JSON.stringify({ all: true }))
  handler(testProject.getPath())
  expectRootPath()
})

test('should init project under the subfolder', () => {
  const subfolderPath = testProject.addDirectory('newFolder')
  handler(subfolderPath)
  expectRootPath()
})

