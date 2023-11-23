import os from 'os'
import path from 'path'
import fs from 'fs'
import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, expect, test, describe } from 'vitest'
import { SubDir, startNodeProject } from './startNodeProject'
import { testNodeJSProject } from './utils/testNodeProject'

const tmpDir = path.resolve(os.tmpdir(), faker.word.sample())

beforeAll(() => {
  fs.mkdirSync(tmpDir, { recursive: true })
})

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('Start Project', () => {
  test('should start nodejs project', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    testNodeJSProject(project.getPath())
  })

  test('should start nodejs sub-project', () => {
    const subProjectName = faker.word.sample()
    const project = startNodeProject(tmpDir)
    project.refresh()
    const subProject = project.startSubNodeProject(subProjectName)
    const subProjectPath = subProject.getPath()

    testNodeJSProject(subProjectPath)
    expect(path.relative(project.getPath(), subProjectPath)).not.toContain('..')
    expect(path.relative(project.getPath(), subProjectPath)).toContain(`${SubDir.APP}${path.sep}`)
  })
})

describe('Add New file', () => {
  test('should generate new file', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.addFile('.nycrc')
    const filepath = path.resolve(project.getPath(), '.nycrc')
    expect(fs.statSync(filepath).isFile()).toBeTruthy()
  })

  test('should generate new deep file', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.addFile('node_modules/.bin/test')
    const filepath = path.resolve(project.getPath(), 'node_modules/.bin/test')
    expect(fs.statSync(filepath).isFile()).toBeTruthy()
  })
})

describe('Add New folder', () => {
  test('should generate new folder', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.addDirectory('dist')
    const filepath = path.resolve(project.getPath(), 'dist')
    expect(fs.statSync(filepath).isDirectory()).toBeTruthy()
  })

  test('should generate new deep folder', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.addDirectory('coverage/html')
    const filepath = path.resolve(project.getPath(), 'coverage/html')
    expect(fs.statSync(filepath).isDirectory()).toBeTruthy()
  })
})

describe('Install Modules', () => {
  test('should install modules', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.installModule('@js-sh/js-sh')
    const pkgContent = JSON.parse(fs.readFileSync(path.resolve(project.getPath(), 'package.json'), 'utf-8'))
    expect(pkgContent).toMatchObject({ dependencies: { '@js-sh/js-sh': expect.any(String) } })
  })
  test('should install modules for dev', () => {
    const project = startNodeProject(tmpDir)
    project.refresh()
    project.installModule('@js-sh/js-sh', true)
    const pkgContent = JSON.parse(fs.readFileSync(path.resolve(project.getPath(), 'package.json'), 'utf-8'))
    expect(pkgContent).toMatchObject({ devDependencies: { '@js-sh/js-sh': expect.any(String) } })
  })
})
