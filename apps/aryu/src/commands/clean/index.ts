import * as fs from 'fs'
import * as path from 'path'
import { defineCommandObject, getProjectPath } from '../../utils'

export default defineCommandObject({
  description: 'Clear export folder(default clear the `dist` folder)',
  execute: () => {
    const distDir = path.resolve(getProjectPath(), 'dist')
    if (fs.existsSync(distDir) && fs.statSync(distDir).isDirectory()) {
      fs.rmdirSync(distDir, { recursive: true })
    }
  },
})

