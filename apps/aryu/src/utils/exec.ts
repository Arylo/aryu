import { ExecSyncOptions, execSync } from "child_process"

export const exec = (command: string, options: ExecSyncOptions = {}) => {
  try {
    return execSync(command, { stdio: 'inherit', ...options })
  } catch (error: any) {
    process.exit(error.status ?? 127)
  }
}
