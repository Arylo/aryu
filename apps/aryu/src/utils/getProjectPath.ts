import findUp from './findUp'
import { genLogger } from './logger'

export function getProjectPath(options: { cwd?: string, noExit: true }): string | undefined
export function getProjectPath(options?: { cwd?: string, noExit?: boolean }): string
export function getProjectPath({ cwd = process.cwd(), noExit = false } = {}) {
  const p = findUp(['package.json'], { cwd }) as string
  if (!p && !noExit) {
    genLogger().exit('No project root found.')
  }
  return p
}
