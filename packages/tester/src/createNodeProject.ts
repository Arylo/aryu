import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'

export function createNodeProject (cwd = process.cwd(), { includeGit = true } = {}) {
  const projectName = faker.word.sample()
  const projectPath = path.resolve(cwd, projectName)
  fs.mkdirSync(projectPath, { recursive: true })
  if (includeGit) {
    fs.mkdirSync(path.resolve(projectPath, '.git'), { recursive: true })
  }
  const pkgContent = {
    name: projectName,
    version: '0.0.0',
    description: '',
    license: 'MIT',
  }
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), JSON.stringify(pkgContent, null, 2), 'utf-8')
  return projectPath
}
