import path from 'path'
import fs from 'fs'
import lodash from 'lodash'
import { expect } from 'vitest'
import { execSync } from 'child_process'

export const testNodeJSProject = (projectPath: string) => {
  expect(fs.statSync(projectPath).isDirectory()).toBeTruthy()
  const paths = ['package.json']
    .map(p => fs.existsSync(path.resolve(projectPath, p)))
  expect(paths).toEqual(Array(paths.length).fill(true))

  let pkg
  const pkgDir = path.resolve(projectPath, 'package.json')
  try {
    pkg = JSON.parse(fs.readFileSync(pkgDir, 'utf-8'))
    lodash.set(pkg, 'devDependencies.tester', '^0.0.0')
  } catch (error) {
    expect(error).not.toBeDefined()
  }

  const output = execSync('npm list', { cwd: projectPath, encoding: 'utf-8' })
  expect(output).toContain(projectPath)
}
