import fs from 'fs'
import path from 'path'
import { getProjectPath } from './getProjectPath'
import { getRootProjectPath } from './getRootProjectPath'

export default function findNpmProgram(name: string) {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()
  const programPaths = [
    path.resolve(projectDir, './node_modules/.bin', name),
    path.resolve(projectRootDir, './node_modules/.bin', name),
  ].filter(p => fs.existsSync(p))
  if (programPaths.length === 0) return false
  return programPaths[0]
}
