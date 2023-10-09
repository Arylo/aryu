import * as fs from 'fs'
import * as path from 'path'

export const COMMAND = ['clean', 'dist']

export const execute = () => {
  const distDir = path.resolve(process.cwd(), 'dist')
  if (fs.existsSync(distDir) && fs.statSync(distDir).isDirectory()) {
    fs.rmdirSync(distDir, { recursive: true })
  }
}
