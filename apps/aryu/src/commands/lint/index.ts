import fs from 'fs'
import path from 'path'
import { findUp, genLogger } from '../../utils'
import { execSync } from 'child_process'
import { STATIC_DIR } from './constant'

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
  const projectRoot = findUp(['package.json'])

  const logger = genLogger(projectRoot ?? process.cwd())

  if (!projectRoot) {
    logger.info('No project root found.')
    process.exit(1)
  }
  ([
    ['config', path.resolve(projectRoot, '.eslintrc')],
    ['ignore', path.resolve(projectRoot, '.eslintignore')],
  ] as [keyof typeof settingPathMap, string][])
    .forEach(([target, p]) => fs.existsSync(p) && (settingPathMap[target] = p))

  const command = `${lintCmd} ${[...genLintArgs(), projectRoot, ...argv].join(' ')}`
  logger.info(command
    .replace(LINT_SETTING_CONFIG, '@aryu/eslint/.eslintrc')
    .replace(LINT_SETTING_IGNORE, '@aryu/eslint/.eslintignore'))
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error: any) {
    process.exit(error.status ?? 127)
  }
}
