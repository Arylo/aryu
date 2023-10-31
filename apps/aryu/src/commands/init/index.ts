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

export const handler = (cwd: string) => {
  const projectRootDir = getRootProjectPath({ cwd })
  const projectDir = getProjectPath({ cwd })

  if (projectDir !== projectRootDir) {
    copyFiles(path.resolve(STATIC_DIR, 'package'), projectDir)
  } else {
    copyFiles(path.resolve(STATIC_DIR, 'root'), projectRootDir)

    updatePkg(path.resolve(projectRootDir, 'package.json'), (obj) => {
      obj.workspaces ??= [
        "apps/*",
        "packages/*"
      ]
      return obj
    })
  }
}

export default defineCommandObject({
  description: 'Project folder initialize',
  execute: () => {
    return handler(process.cwd())
  },
})

