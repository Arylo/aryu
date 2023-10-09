import * as initCmd from './commands/init'
import * as buildCmd from './commands/build'
import * as cleanCmd from './commands/clean'
import * as lintCmd from './commands/lint'
import * as testCmd from './commands/test'
import { parseCommands } from './utils/parseCommands'

const commands = [
  ...parseCommands(initCmd),
  ...parseCommands(buildCmd),
  ...parseCommands(cleanCmd),
  ...parseCommands(lintCmd),
  ...parseCommands(testCmd),
]

const curCommands = process.argv.slice(2)

for (const cmd of commands) {
  if (JSON.stringify(cmd.COMMAND) === JSON.stringify(curCommands.slice(0, cmd.COMMAND.length))) {
    cmd.execute(curCommands.slice(cmd.COMMAND.length))
    process.exit(0)
  }
}

process.exit(1)
