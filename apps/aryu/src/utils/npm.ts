import fs from 'fs'
import path from 'path'
import { getProjectPath } from './getProjectPath'
import { getRootProjectPath } from './getRootProjectPath'
import { genLogger } from './logger'
import { exec } from './exec'

export function findNpmProgram(name: string) {
  const projectRootDir = getRootProjectPath()
  const projectDir = getProjectPath()
  const programPaths = [
    path.resolve(projectDir, './node_modules/.bin', name),
    path.resolve(projectRootDir, './node_modules/.bin', name),
  ].filter(p => fs.existsSync(p))
  if (programPaths.length === 0) return false
  return programPaths[0]
}

interface NodePackageFile {
  name: string,
  version: string,
  scripts?: Record<string, string>,
  devDependencies?: Record<string, string>,
  dependencies?: Record<string, string>,
  workspaces?: string[],
}

export const getPkgContent = (projectPath: string) => {
  const logger = genLogger(projectPath)
  const filepath = path.resolve(projectPath, 'package.json')
  const pkgContent = fs.readFileSync(filepath, { encoding: 'utf-8' })
  let pkg!: NodePackageFile
  try {
    pkg = JSON.parse(pkgContent)
  } catch (error) {
    logger.exit('Parse "package.json" failed')
  }
  return pkg
}

export const updatePkg = (projectPath: string, data: NodePackageFile) => {
  const logger = genLogger(projectPath)
  const filepath = path.resolve(projectPath, 'package.json')
  const newPkg = data
  const spaceLength = 2
  fs.writeFileSync(filepath, `${JSON.stringify(newPkg, null, spaceLength)}\n`)
  logger.info('File "package.json" updated.')
}


export const getModule = (projectPath: string) => {
  const pkg = getPkgContent(projectPath)

  function hasModule(name: string, dev = false) {
    const pkgContent = getPkgContent(projectPath)
    if (typeof dev === 'boolean') {
      if (dev) {
        return name in (pkgContent.devDependencies ?? {})
      }
      return name in (pkgContent.dependencies ?? {})
    }
    return name in (pkgContent.devDependencies ?? {}) || name in (pkgContent.dependencies ?? {})
  }
  function installModule(name: string, dev = false) {
    return exec(`npm i ${dev ? '-S' : '-D'} ${name}`, { cwd: projectPath })
  }
  function getScript(name: string) {
    return pkg.scripts?.[name]
  }
  function hasScript(name: string) {
    return !!getScript(name)
  }
  function setScript(name: string, command: string, overwrite = false) {
    pkg.scripts ??= {}
    const has = hasScript(name)
    if ((has && overwrite) || !has) {
      pkg.scripts[name] = command
    }
  }
  function addWorkSpace(...names: string[]) {
    pkg.workspaces ??= []
    const workspaceSet = new Set(pkg.workspaces)
    names.forEach(name => workspaceSet.add(name))
    pkg.workspaces = Array.from(workspaceSet)
  }
  function removeWorkSpace(name: string) {
    if (pkg.workspaces) {
      const workspaceSet = new Set(pkg.workspaces)
      workspaceSet.delete(name)
      pkg.workspaces = Array.from(workspaceSet)
    }
  }
  return Object.assign({
    hasModule,
    installModule,
    getScript,
    hasScript,
    setScript,
    addWorkSpace,
    removeWorkSpace,
    save() {
      return updatePkg(projectPath, pkg)
    },
  }, pkg)
}
