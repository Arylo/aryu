import path from 'path'
import { findNpmProgram, getProjectPath } from '../../../../utils'

export const getTscPath = () => {
  const tscPath = findNpmProgram('tsc')
  const projectDir = getProjectPath()
  if (typeof tscPath !== 'string') return false
  return path.relative(projectDir, tscPath)
}
