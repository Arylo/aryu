import path from 'path'
import { npm, getProjectPath } from '../../../../utils'

export const getTscPath = () => {
  const tscPath = npm.findNpmProgram('tsc')
  const projectDir = getProjectPath()
  if (typeof tscPath !== 'string') return false
  return path.relative(projectDir, tscPath)
}
