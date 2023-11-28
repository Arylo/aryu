import fs from 'fs'
import path from 'path'
import { getProjectPath } from './getProjectPath'
import { genLogger } from './logger'
import { exec } from './exec'
import { findNpmProgram } from './npm'

export const checkTurboFeature = (projectPath: string) => {
  const logger = genLogger(projectPath)
  const turboConfigPath = path.resolve(projectPath, 'turbo.json')

  if (!fs.existsSync(turboConfigPath)) return false
  logger.info('Found "turbo.json"')
  return turboConfigPath
}

export const runTurboCmd = (cmd: string, argv: string[] = []) => {
  const projectPath = getProjectPath()
  const turboConfigPath = checkTurboFeature(projectPath)
  const turbo = findNpmProgram('turbo')
  if (!turboConfigPath || !turbo) return false
  const logger = genLogger(projectPath)

  let config: { pipeline: { [cmd: string]: any } } = { pipeline: {} }
  try {
    config = JSON.parse(fs.readFileSync(turboConfigPath, 'utf-8'))
  } catch (error) {
    logger.exit('Read "turbo.json" failed')
  }
  if (!config.pipeline[cmd]) {
    logger.debug(`No command "${cmd}" found in "turbo.json"`)
    return false
  }
  const command = `turbo run ${cmd} ${argv.join(' ')}`
  exec.log(command).run()
  process.exit(0)
}
