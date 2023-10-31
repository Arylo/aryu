import { runTurboCmd, defineCommand, importCommandObject, genTable } from './utils'

const initCmd = importCommandObject('init')
const buildCmd = importCommandObject('build')
const buildTscCmd = importCommandObject('build', 'tsc')
const cleanCmd = importCommandObject('clean')
const lintCmd = importCommandObject('lint')
const testCmd = importCommandObject('test')

const cmdMap = [
  defineCommand('init', initCmd),
  defineCommand('clean', cleanCmd, { turbo: true }),
  defineCommand('build', buildCmd, { turbo: true }),
  defineCommand(['build', 'tsc'], buildTscCmd),
  defineCommand('lint', lintCmd, { turbo: true }),
  defineCommand('test', testCmd, { turbo: true }),
]

const cmdList = cmdMap.map(([keys]) => keys)
  .sort((a, b) => b.length - a.length)

const exportHelp = () => {
  console.info('Usage: aryu <command> [<args>]')
  console.info('')
  console.info('Command:')
  const table = genTable()
  cmdMap.forEach(([keys, cmd]) => table.push([keys.join(' '), cmd.description ?? '']))
  console.info(table.toString())
}

export default (argv = process.argv.slice(2)) => {
  for (const cmdKeys of cmdList) {
    if (JSON.stringify(cmdKeys) !== JSON.stringify(argv.slice(0, cmdKeys.length))) {
      continue
    }
    const matches = cmdMap.find(([keys]) => keys === cmdKeys)
    if (matches) {
      const [keys, cmdObj, options] = matches
      if (options.turbo) {
        runTurboCmd(keys[0])
      }
      return cmdObj.execute(argv.slice(cmdKeys.length))
    }
  }
  if (argv.includes('-h') || argv.includes('--help')) {
    exportHelp()
    process.exit(0)
  }
  exportHelp()
  process.exit(1)
}
