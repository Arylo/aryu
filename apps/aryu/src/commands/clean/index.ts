import * as fs from 'fs'
import * as path from 'path'
import { getProjectPath } from '../../utils'

export const COMMAND = ['clean', 'dist']

export const execute = () => {
  const distDir = path.resolve(getProjectPath(), 'dist')
  if (fs.existsSync(distDir) && fs.statSync(distDir).isDirectory()) {
    fs.rmdirSync(distDir, { recursive: true })
  }
}
