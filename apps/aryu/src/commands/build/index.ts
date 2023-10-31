import fs from 'fs'
import path from 'path'
import { getProjectPath, runTurboCmd } from "../../utils"
import { execute as tsc } from './tsc'
import { COMMAND } from './constant'

export { COMMAND } from './constant'

export const execute = (argv: any[] = []) => {
  runTurboCmd(COMMAND[0], argv)
  const projectRoot = getProjectPath()

  const tsIndexPath = path.resolve(projectRoot, 'src/index.ts')
  if (fs.existsSync(tsIndexPath)) {
    return tsc(argv)
  }
}
