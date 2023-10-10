import { findUp } from "./findUp"
import { genLogger } from "./logger"

let p: string | undefined

export const getProjectPath = () => {
  if (!p) {
    p = findUp(['package.json'])
  }
  if (!p) {
    genLogger().error('No project root found.')
    process.exit(1)
  }
  return p
}
