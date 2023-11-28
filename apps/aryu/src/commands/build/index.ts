import fs from 'fs'
import path from 'path'
import { defineCommandObject, getProjectPath } from '../../utils'
import tscCmd from './tsc'

export function handler(argv: any[] = []) {
  const projectRoot = getProjectPath()

  const tsIndexPath = path.resolve(projectRoot, 'src/index.ts')
  if (fs.existsSync(tsIndexPath)) {
    return tscCmd.execute(argv.slice(1))
  }
}

export default defineCommandObject({
  description: 'Build source code',
  execute: handler,
})
