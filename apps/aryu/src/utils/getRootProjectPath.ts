import findUp from './findUp'
import { genLogger } from './logger'

export const getRootProjectPath = ({ cwd = process.cwd() } = {}) => {
  const p = findUp(['package.json', '.git'], { cwd }) as string
  if (!p) {
    genLogger().exit('No root project root found.')
  }
  return p
}
