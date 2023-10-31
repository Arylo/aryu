import fs from 'fs'
import path from 'path'
import os from 'os'
import { createNodeProject } from './createNodeProject'

export function startNodeProject (cwd = os.tmpdir()) {
  let p: string
  const clear = () => {
    fs.existsSync(p) && fs.rmSync(p, { force: true, recursive: true })
  }
  const refresh = ({ includeGit = true } = {}) => {
    clear()
    p = createNodeProject(cwd, { includeGit })
  }
  const addDirectory = (name: string) => {
    const dirPath = fs.mkdirSync(path.resolve(p, name), { recursive: true }) as string
    return dirPath
  }
  const addFile = (name: string, content: string) => {
    const filePath = path.resolve(p, name)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content, 'utf-8')
    return filePath
  }
  return {
    clear,
    refresh,
    addDirectory,
    addFile,
    getPath: () => p,
  }
}
