import { findUp } from "./findUp"
import { genLogger } from "./logger"

let p: string

export const getRootProjectPath = () => {
  if (!p) {
    p = findUp(['package.json', 'package-lock.json']) as string
  }
  if (!p) {
    genLogger().exit('No root project root found.')
  }
  return p
}
