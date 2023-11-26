import { getStore } from '../store'
import findUp from './findUp'
import { genLogger } from './logger'

export const getRootProjectPath = () => {
  const { cwd } = getStore()
  const p = findUp(['package.json', '.git'], { cwd }) as string
  if (!p) {
    genLogger().exit('No root project root found.')
  }
  return p
}
