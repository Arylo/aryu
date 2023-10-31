import chalk from 'chalk'
import { getProjectPath } from './getProjectPath'

const toolName = 'aryu'

const logPrefix = {
  debug: `${toolName} ${chalk.white('DEBUG')}`,
  info: `${toolName} ${chalk.bgCyan('INFO')}`,
  warn: `${toolName} ${chalk.bgYellow('WARN')}`,
  error: `${toolName} ${chalk.red('ERR!')}`,
  success: `${toolName} ${chalk.green('SUC!')}`,
}

export function genLogger(cwd?: string) {
  const curCwd = cwd ?? getProjectPath({ noExit: true }) ?? process.cwd()
  const baseMethods = {
    debug(...args: any[]) {
      console.debug(`${logPrefix.debug} ${curCwd}:`, ...args)
    },
    info(...args: any[]) {
      console.info(`${logPrefix.info} ${curCwd}:`, ...args)
    },
    warn(...args: any[]) {
      console.warn(`${logPrefix.warn} ${curCwd}:`, ...args)
    },
    error(...args: any[]) {
      console.error(`${logPrefix.error} ${curCwd}:`, ...args)
    },
  }
  const extraMethods = {
    success(cmd: string) {
      console.info(`${logPrefix.success} ${curCwd}>`, cmd)
    },
    command(cmd: string) {
      console.info(`${logPrefix.info} ${curCwd}>`, cmd)
    },
    exit(msg: string, code: number = 1) {
      (code > 0 ? baseMethods.error : baseMethods.info)(msg)
      process.exit(code)
    },
  }
  return {
    ...baseMethods,
    ...extraMethods,
  }
}
