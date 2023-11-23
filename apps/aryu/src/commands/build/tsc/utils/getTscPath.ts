import path from 'path'
import { FindNpmProgramOptions, findNpmProgram, getProjectPath } from '../../../../utils'

interface IGetTscPathOption extends FindNpmProgramOptions {}

export const getTscPath = ({ cwd }: Partial<IGetTscPathOption> = {}) => {
  const tscPath = findNpmProgram('tsc', { cwd })
  const projectDir = getProjectPath({ cwd })
  if (typeof tscPath !== 'string') return false
  return path.relative(projectDir, tscPath)
}
