import fs from 'fs'
import path from 'path'
import { findUp, genLogger } from '../../utils'

export const COMMAND = ['init']

const STATIC_DIR = path.resolve(__dirname, `../../../static/${COMMAND[0]}`)

export const execute = () => {
  const projectRoot = findUp(['package.json', '.git'])
  if (!projectRoot) return

  const logger = genLogger(projectRoot)

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
}
