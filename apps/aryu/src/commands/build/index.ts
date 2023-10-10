import fs from 'fs'
import path from 'path'
import { getProjectPath, genLogger } from "../../utils"
import { execute as tsc } from './tsc'

export { COMMAND } from './constant'

export const execute = (argv: any[] = []) => {
  const projectRoot = getProjectPath()
  const logger = genLogger(projectRoot ?? process.cwd())
  if (!projectRoot) {
    logger.error('Project root not found.')
    process.exit(1)
  }
  const tsIndexPath = path.resolve(projectRoot, 'src/index.ts')
  if (fs.existsSync(tsIndexPath)) {
    return tsc(argv)
  }
}
