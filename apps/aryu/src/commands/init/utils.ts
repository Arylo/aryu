import fs from 'fs'
import path from 'path'
import { genLogger } from '../../utils'

export const updatePkg = <T extends Record<string, any>>(projectPath: string, callback: (obj: T) => T) => {
  const logger = genLogger(projectPath)
  const filepath = path.resolve(projectPath, 'package.json')
  const pkgContent = fs.readFileSync(filepath, { encoding: 'utf-8' })
  let pkg: any
  try {
    pkg = JSON.parse(pkgContent)
  } catch (error) {
    logger.exit('Parse "package.json" failed')
  }
  const newPkg = callback(pkg)
  const spaceLength = pkgContent.match(/\n(\s+)"/)?.[1].length ?? 2
  fs.writeFileSync(filepath, `${JSON.stringify(newPkg, null, spaceLength)}\n`)
  logger.info('File "package.json" updated.')
}
