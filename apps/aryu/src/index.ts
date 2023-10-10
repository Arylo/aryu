import * as cmds from './commands'
import { parseCommands } from './utils/parseCommands'

const commands = parseCommands(cmds)

export default (argv = process.argv.slice(2)) => {
  for (const cmd of commands) {
    if (JSON.stringify(cmd.COMMAND) === JSON.stringify(argv.slice(0, cmd.COMMAND.length))) {
      cmd.execute(argv.slice(cmd.COMMAND.length))
      process.exit(0)
    }
  }

  process.exit(1)
}
