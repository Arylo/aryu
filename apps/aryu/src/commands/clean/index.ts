import * as fs from 'fs'
import * as path from 'path'
import { defineCommandObject, getProjectPath } from '../../utils'

export const handler = () => {
  const distDir = path.resolve(getProjectPath(), 'dist')
  if (fs.existsSync(distDir) && fs.statSync(distDir).isDirectory()) {
    fs.rmdirSync(distDir, { recursive: true })
  }
}

export default defineCommandObject({
  description: 'Clear export folder(default clear the `dist` folder)',
  execute: () => handler(),
})
