import fs from 'fs'
import path from 'path'
import { defineCommandObject, exec, genLogger, getProjectPath, getRootProjectPath } from "../../../utils"

const getTscPath = () => {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()
  const tscPaths = [
    path.resolve(projectDir, './node_modules/.bin/tsc'),
    path.resolve(projectRootDir, './node_modules/.bin/tsc'),
  ].filter(p => fs.existsSync(p))
  const tscPath = path.relative(projectDir, tscPaths[0])
  return tscPath
}

const genTscArgs = () => {
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
    `--rootDir ./src`,
    `--outDir ./dist`,
  ]
  return args
}

export default defineCommandObject({
  description: 'Build source code using tsc',
  execute: (argv: any[] = []) => {
    const projectRoot = getProjectPath()
    const logger = genLogger(projectRoot)

    const command = `${getTscPath()} ${genTscArgs().join(' ')} ${argv.join(' ')}`
    logger.command(command)
    exec(command, { stdio: 'inherit', cwd: projectRoot })
  }
})

