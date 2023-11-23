import fs from 'fs'
import path from 'path'
import { getProjectPath, getRootProjectPath } from '../../../../utils'

export const genTscArgs = () => {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()
  const tsconfigPaths = [
    path.resolve(projectDir, 'tsconfig.prod.json'),
    path.resolve(projectDir, 'tsconfig.json'),
    path.resolve(projectRootDir, 'tsconfig.prod.json'),
    path.resolve(projectRootDir, 'tsconfig.json'),
  ].filter(p => fs.existsSync(p))

  const tsconfigPath = path.relative(projectDir, tsconfigPaths[0])

  const args = [
    `-p ${tsconfigPath}`,
    '--rootDir ./src',
    '--outDir ./dist',
  ]
  return args
}
