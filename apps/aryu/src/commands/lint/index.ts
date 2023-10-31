import fs from 'fs'
import path from 'path'
import { exec, genLogger, getProjectPath, runTurboCmd } from '../../utils'
import { COMMAND, STATIC_DIR } from './constant'

export { COMMAND } from './constant'

const LINT_SETTING_CONFIG = path.resolve(STATIC_DIR, '.eslintrc')
const LINT_SETTING_IGNORE = path.resolve(STATIC_DIR, '.eslintignore')
const settingPathMap = {
  config: LINT_SETTING_CONFIG,
  ignore: LINT_SETTING_IGNORE,
}

const lintCmd = 'eslint'

const genLintArgs = () => [
  `-c ${settingPathMap.config}`,
  `--ignore-path ${settingPathMap.ignore}`,
  '--cache',
  '--ext=.ts',
]

export const execute = (argv: string[] = []) => {
  runTurboCmd(COMMAND[0], argv)

  const projectRoot = getProjectPath()

  const logger = genLogger();

  ([
    ['config', path.resolve(projectRoot, '.eslintrc')],
    ['ignore', path.resolve(projectRoot, '.eslintignore')],
  ] as [keyof typeof settingPathMap, string][])
    .forEach(([target, p]) => fs.existsSync(p) && (settingPathMap[target] = p))

  const command = `${lintCmd} ${[...genLintArgs(), projectRoot, ...argv].join(' ')}`
  logger.command(command
    .replace(LINT_SETTING_CONFIG, '@aryu/eslint/.eslintrc')
    .replace(LINT_SETTING_IGNORE, '@aryu/eslint/.eslintignore'))

  exec(command)
}
