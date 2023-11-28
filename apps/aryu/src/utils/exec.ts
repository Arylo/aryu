import { ExecSyncOptions, execSync } from 'child_process'
import { getProjectPath } from './getProjectPath'
import { genLogger } from './logger'
import { getStore } from '../store'

const execute = (command: string, options: ExecSyncOptions = {}) => {
  const { cwd } = getStore()
  try {
    return execSync(command, { stdio: 'inherit', cwd, ...options })
  } catch (error: any) {
    process.exit(error.status ?? 127)
  }
}

export function exec(command: string, options: ExecSyncOptions = {}) {
  return execute(command, options)
}

exec.log = (logCommand: string) => {
  const projectPath = getProjectPath()
  const logger = genLogger(projectPath)
  logger.command(logCommand)
  return {
    run(command?: string, options: ExecSyncOptions = {}) {
      return execute(command || logCommand, options)
    },
  }
}
