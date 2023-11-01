import fs from 'fs'
import path from 'path'
import { getProjectPath } from './getProjectPath'
import { genLogger } from './logger'
import { exec } from './exec'

export const runTurboCmd = (cmd: string, argv: string[] = []) => {
  const turboConfigPath = path.resolve(getProjectPath(), 'turbo.json')
  if (!fs.existsSync(turboConfigPath)) return false
  const logger = genLogger(getProjectPath())

  logger.info('Found "turbo.json"')

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
  logger.command(command)
  exec(command)
  process.exit(0)
}
