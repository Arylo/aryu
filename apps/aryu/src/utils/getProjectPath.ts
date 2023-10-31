import { findUp } from "./findUp"
import { genLogger } from "./logger"

let p: string

export function getProjectPath (options: { noExit: true }): string | undefined
export function getProjectPath (options?: { noExit: boolean }): string
export function getProjectPath ({ noExit = false } = {}) {
  if (!p) {
    p = findUp(['package.json']) as string
  }
  if (!p && !noExit) {
    genLogger().exit('No project root found.')
  }
  return p
}
