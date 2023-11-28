import fs from 'fs'
import path from 'path'
import { defineCommandObject, genLogger, getProjectPath, npm } from '../../utils'
import { STATIC_DIR } from './constant'
import { getRootProjectPath } from '../../utils/getRootProjectPath'

const copyFiles = (sourceDir: string, targetDir: string) => {
  const logger = genLogger(targetDir)

  fs.readdirSync(sourceDir)
    .forEach((filename) => {
      const sourceStaticFilepath = path.resolve(sourceDir, filename)
      const targetStaticFilepath = path.resolve(targetDir, filename)
      const stat = fs.statSync(sourceStaticFilepath)
      if (stat.isFile()) {
        if (fs.existsSync(targetStaticFilepath)) {
          logger.warn(`File "${filename}" already exists.`)
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

    logger.info('==== Processing the default files initialization...')
    copyFiles(path.resolve(STATIC_DIR, 'default'), projectDir)

    const curModule = npm.getModule(projectDir)
    curModule.setScript('build', 'turbo build')
    curModule.addWorkSpace(
      'apps/*',
      'packages/*',
    )
  },
  lint(projectDir: string) {
    const logger = genLogger(projectDir)

    logger.info('==== Processing the lint files initialization...')
    copyFiles(path.resolve(STATIC_DIR, 'lint'), projectDir)

    const curModule = npm.getModule(projectDir)
    if (curModule.hasScript('build')) {
      curModule.setScript('prelint', 'npm run build')
    }
    curModule.setScript('lint', 'aryu lint')
  },
  test(projectDir: string) {
    const logger = genLogger(projectDir)

    logger.info('==== Processing the test files initialization...')
    copyFiles(path.resolve(STATIC_DIR, 'test'), projectDir)

    const curModule = npm.getModule(projectDir)
    if (curModule.hasScript('build')) {
      curModule.setScript('pretest', 'npm run build')
    }
    curModule.setScript('test', 'aryu test')
  },
}

export const handler = () => {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()

  if (projectDir !== projectRootDir) {
    copyFiles(path.resolve(STATIC_DIR, 'package'), projectDir)
  } else {
    const logger = genLogger(projectRootDir)

    logger.info('Found the root project path')

    initMethods.default(projectRootDir)
    initMethods.lint(projectRootDir)
    initMethods.test(projectRootDir)
  }

  const curModule = npm.getModule(projectDir)
  curModule.save()
}

export default defineCommandObject({
  description: 'Project folder initialize',
  execute: () => handler(),
})
