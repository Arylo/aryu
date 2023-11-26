import { getStore } from '../store'
import findUp from './findUp'
import { genLogger } from './logger'

export function getProjectPath(options: { noExit: true }): string | undefined
export function getProjectPath(options?: { noExit?: boolean }): string
export function getProjectPath({ noExit = false } = {}) {
  const { cwd } = getStore()
  const p = findUp(['package.json'], { cwd }) as string
  if (!p && !noExit) {
    genLogger().exit('No project root found.')
  }
  return p
}
