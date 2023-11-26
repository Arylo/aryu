import fs from 'fs'
import path from 'path'
import { defineCommandObject, exec, getProjectPath } from '../../utils'
import { STATIC_DIR } from './constant'

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

export const handler = (argv: string[] = []) => {
  const projectPath = getProjectPath();

  ([
    ['config', path.resolve(projectPath, '.eslintrc')],
    ['ignore', path.resolve(projectPath, '.eslintignore')],
  ] as [keyof typeof settingPathMap, string][])
    .forEach(([target, p]) => fs.existsSync(p) && (settingPathMap[target] = p))

  const realCommand = `${lintCmd} ${[...genLintArgs(), projectPath, ...argv].join(' ')}`
  const logCommand = realCommand
    .replace(LINT_SETTING_CONFIG, '@aryu/eslint/.eslintrc')
    .replace(LINT_SETTING_IGNORE, '@aryu/eslint/.eslintignore')

  exec.log(logCommand).run(realCommand)
}

export default defineCommandObject({
  description: 'Code standard using eslint',
  execute(argv: string[] = []) {
    return handler(argv)
  },
})

