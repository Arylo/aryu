import fs from 'fs'
import path from 'path'
import { getProjectPath } from './getProjectPath'
import { getRootProjectPath } from './getRootProjectPath'

export interface FindNpmProgramOptions {
  cwd: string
}

export default function findNpmProgram(name: string, { cwd }: Partial<FindNpmProgramOptions> = {}) {
  const projectRootDir = getRootProjectPath({ cwd })
  const projectDir = getProjectPath({ cwd })
  const programPaths = [
    path.resolve(projectDir, './node_modules/.bin/tsc'),
    path.resolve(projectRootDir, './node_modules/.bin/tsc'),
  ].filter(p => fs.existsSync(p))
  if (programPaths.length === 0) return false
  return programPaths[0]
}
