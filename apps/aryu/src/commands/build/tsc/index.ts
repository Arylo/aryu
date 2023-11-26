import { defineCommandObject, exec, getProjectPath } from '../../../utils'
import { getTscPath } from './utils/getTscPath'
import { getTscArgs } from './utils/getTscArgs'

export const handler = (argv: any[] = []) => {
  const projectRoot = getProjectPath()

  const command = `${getTscPath()} ${getTscArgs(argv).join(' ')}`
  exec.log(command).run(undefined, { cwd: projectRoot })
}

export default defineCommandObject({
  description: 'Build source code using tsc',
  execute: handler,
})

