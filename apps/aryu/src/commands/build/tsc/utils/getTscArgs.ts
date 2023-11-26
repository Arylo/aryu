import fs from 'fs'
import path from 'path'
import { getProjectPath, getRootProjectPath } from '../../../../utils'

export const getTscArgs = (argv: any[] = []) => {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()
  const tsconfigPaths = [
    path.resolve(projectDir, 'tsconfig.prod.json'),
    path.resolve(projectDir, 'tsconfig.json'),
    path.resolve(projectRootDir, 'tsconfig.prod.json'),
    path.resolve(projectRootDir, 'tsconfig.json'),
  ].filter(p => fs.existsSync(p))

  const tsconfigPath = tsconfigPaths[0]

  const args = [
    tsconfigPath && `-p ${path.relative(projectDir, tsconfigPath)}`,
    '--rootDir ./src',
    '--outDir ./dist',
    ...argv,
  ].filter(Boolean)
  return args
}
