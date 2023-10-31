import fs from 'fs'
import path from 'path'
import { defineCommandObject, getProjectPath } from "../../utils"
import tscCmd from './tsc'

export default defineCommandObject({
  description: 'Build source code',
  execute: (argv: any[] = []) => {
    const projectRoot = getProjectPath()

    const tsIndexPath = path.resolve(projectRoot, 'src/index.ts')
    if (fs.existsSync(tsIndexPath)) {
      return tscCmd.execute(argv.slice(1))
    }
  }
})
