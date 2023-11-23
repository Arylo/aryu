import { defineCommandObject, exec, genLogger, getProjectPath } from '../../../utils'
import { getTscPath } from './utils/getTscPath'
import { genTscArgs } from './utils/getTscArgs'

export const handler = (argv: any[] = []) => {
  const projectRoot = getProjectPath()
  const logger = genLogger(projectRoot)

  const command = `${getTscPath()} ${genTscArgs().join(' ')} ${argv.join(' ')}`
  logger.command(command)
  exec(command, { stdio: 'inherit', cwd: projectRoot })
}

export default defineCommandObject({
  description: 'Build source code using tsc',
  execute: handler,
})

