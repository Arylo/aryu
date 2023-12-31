import fs from 'fs'
import path from 'path'
import os from 'os'
import { ExecSyncOptionsWithStringEncoding, execSync } from 'child_process'
import { faker } from '@faker-js/faker'
import { createNodeProject } from './createNodeProject'

const DEFAULT_ENCODING = 'utf-8'

interface IGenNodeProjectOptions {
  projectName: string,
}

export enum SubDir {
  APP = 'app',
  PKG = 'packages',
}

function genNodeProject(cwd: string, { projectName }: Partial<IGenNodeProjectOptions> = {}) {
  let projectPath: string
  const clear = () => {
    fs.existsSync(projectPath) && fs.rmSync(projectPath, { force: true, recursive: true })
    projectPath = ''
  }
  const refresh = () => {
    clear()
    projectPath = createNodeProject(cwd, { projectName })
  }
  const addDirectory = (name: string) => {
    const dirPath = fs.mkdirSync(path.resolve(projectPath, name), { recursive: true }) as string
    return dirPath
  }
  const addFile = (name: string, content = '') => {
    const filePath = path.resolve(projectPath, name)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, content, DEFAULT_ENCODING)
    return filePath
  }
  function installModule(moduleName: string, devDependency = false) {
    return installModule.npm(moduleName, devDependency)
  }
  installModule.npm = (moduleName: string, devDependency = false) => {
    const command = [
      'npm install',
      '--prefer-offline',
      devDependency ? '-D' : '-S',
      moduleName,
    ].filter(Boolean)
    return execSync(command.join(' '), { encoding: DEFAULT_ENCODING, cwd: projectPath })
  }
  function exec(command: string, options?: ExecSyncOptionsWithStringEncoding) {
    return execSync(command, Object.assign({}, { encoding: DEFAULT_ENCODING, cwd: projectPath }, options))
  }
  return {
    getPath: () => projectPath,
    clear,
    refresh,
    addDirectory,
    addFile,
    installModule,
    exec,
  }
}

export function startNodeProject(cwd = os.tmpdir()) {
  const project = genNodeProject(cwd)
  const startSubNodeProject = (name = faker.word.sample(), { subDir = SubDir.APP } = { }) => {
    const p = genNodeProject(path.resolve(project.getPath(), subDir), { projectName: name })
    p.refresh()
    return {
      ...p,
      clear: undefined,
      refresh: undefined,
    }
  }
  return {
    ...project,
    refresh() {
      project.refresh()
      project.addDirectory('.git')
    },
    startSubNodeProject,
  }
}
