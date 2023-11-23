import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import { faker } from '@faker-js/faker'

export function createNodeProject(cwd = process.cwd(), { projectName = faker.word.sample() } = {}) {
  const validProjectName = lodash.kebabCase(projectName)
  const projectPath = path.resolve(cwd, validProjectName)
  fs.mkdirSync(projectPath, { recursive: true })
  const pkgContent = {
    name: validProjectName,
    version: '0.0.0',
    description: '',
    license: 'MIT',
  }
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), JSON.stringify(pkgContent, null, 2), 'utf-8')
  return projectPath
}
