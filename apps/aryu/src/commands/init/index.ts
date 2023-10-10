import fs from 'fs'
import path from 'path'
import { findUp, genLogger } from '../../utils'
import { STATIC_DIR } from './constant'

export { COMMAND } from './constant'

export const execute = () => {
  const projectRoot = findUp(['package.json', '.git'])
  const logger = genLogger(projectRoot ?? process.cwd())
  if (!projectRoot) {
    logger.error('Project root not found.')
    process.exit(1)
  }

  fs.readdirSync(STATIC_DIR)
    .forEach((filename) => {
      const rootStaticFilepath = path.resolve(projectRoot, filename)
      const curStaticFilepath = path.resolve(STATIC_DIR, filename)
      if (fs.existsSync(rootStaticFilepath)) {
        logger.info(`File "${filename}" already exists.`)
      } else {
        fs.copyFileSync(curStaticFilepath, rootStaticFilepath)
        logger.info(`File "${filename}" created.`)
      }
    })

  const pkgContent = fs.readFileSync(path.resolve(projectRoot, 'package.json'), { encoding: 'utf-8' })
  const pkg = JSON.parse(pkgContent)
  pkg.workspaces ??= [
    "apps/*",
    "packages/*"
  ]
  const space = pkgContent.match(/\n(\s+)"/)?.[1].length ?? 2
  fs.writeFileSync(path.resolve(projectRoot, 'package.json'), `${JSON.stringify(pkg, null, space)}\n`)
  logger.info('File "package.json" updated.')
}
