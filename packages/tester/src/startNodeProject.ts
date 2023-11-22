import fs from 'fs'
import path from 'path'
import os from 'os'
import { createNodeProject } from './createNodeProject'

export enum SubDir {
  APP = 'app',
  PKG = 'packages',
}

export function startNodeProject(cwd = os.tmpdir()) {
  let projectPath: string
  const clear = () => {
    fs.existsSync(projectPath) && fs.rmSync(projectPath, { force: true, recursive: true })
  }
  const refresh = () => {
    clear()
    projectPath = createNodeProject(cwd, { includeGit: true })
  }
  const addDirectory = (name: string) => {
    const dirPath = fs.mkdirSync(path.resolve(projectPath, name), { recursive: true }) as string
    return dirPath
  }
  const addFile = (name: string, content = '') => {
    const filePath = path.resolve(projectPath, name)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content, 'utf-8')
    return filePath
  }
  const startSubNodeProject = (name: string, { subDir = SubDir.APP } = { }) => {
    return createNodeProject(path.resolve(projectPath, subDir), { includeGit: false,  projectName: name  })
  }
  return {
    clear,
    refresh,
    addDirectory,
    addFile,
    getPath: () => projectPath,
    startSubNodeProject,
  }
}
