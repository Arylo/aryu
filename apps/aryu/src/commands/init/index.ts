import fs from 'fs'
import path from 'path'
import { defineCommandObject, genLogger, getProjectPath } from '../../utils'
import { STATIC_DIR } from './constant'
import { getRootProjectPath } from '../../utils/getRootProjectPath'
import { updatePkg } from './utils'

const copyFiles = (sourceDir: string, targetDir: string) => {
  const logger = genLogger(targetDir)

  fs.readdirSync(sourceDir)
    .forEach((filename) => {
      const sourceStaticFilepath = path.resolve(sourceDir, filename)
      const targetStaticFilepath = path.resolve(targetDir, filename)
      const stat = fs.statSync(sourceStaticFilepath)
      if (stat.isFile()) {
        if (fs.existsSync(targetStaticFilepath)) {
          logger.success(`File "${filename}" already exists.`)
        } else {
          fs.copyFileSync(sourceStaticFilepath, targetStaticFilepath)
          logger.info(`File "${filename}" created.`)
        }
      } else if (stat.isDirectory()) {
        if (!fs.existsSync(targetStaticFilepath)) {
          fs.mkdirSync(targetStaticFilepath, { recursive: true })
        }
        copyFiles(sourceStaticFilepath, targetStaticFilepath)
      }
    })
}

export const initMethods = {
  default(projectDir: string) {
    const logger = genLogger(projectDir)

    logger.info('Processing the default files initialization...')
    copyFiles(path.resolve(STATIC_DIR, 'default'), projectDir)

    updatePkg(projectDir, (obj) => {
      const newObj = obj

      newObj.scripts ??= {}
      newObj.scripts.build ??= 'turbo build'
      newObj.scripts.pretest ??= 'npm run build'
      newObj.scripts.test ??= 'vitest run --coverage'
      newObj.workspaces ??= [
        'apps/*',
        'packages/*',
      ]
      return newObj
    })
  },
  test(projectDir: string) {
    const logger = genLogger(projectDir)

    logger.info('Processing the test files initialization...')
    copyFiles(path.resolve(STATIC_DIR, 'test'), projectDir)

    updatePkg(projectDir, (obj) => {
      const newObj = obj

      newObj.scripts ??= {}
      if (newObj.scripts.build) {
        newObj.scripts.pretest ??= 'npm run build'
      }
      newObj.scripts.test ??= 'vitest run --coverage'
      return newObj
    })
  },
}

export const handler = (cwd: string) => {
  const projectRootDir = getRootProjectPath({ cwd })
  const projectDir = getProjectPath({ cwd })

  if (projectDir !== projectRootDir) {
    copyFiles(path.resolve(STATIC_DIR, 'package'), projectDir)
  } else {
    const logger = genLogger(projectRootDir)

    logger.info('Found the root project path')

    initMethods.default(projectRootDir)
    initMethods.test(projectRootDir)
  }
}

export default defineCommandObject({
  description: 'Project folder initialize',
  execute: () => handler(process.cwd()),
})

