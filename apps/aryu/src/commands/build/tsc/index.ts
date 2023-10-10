import fs from 'fs'
import path from 'path'
import { execSync } from "child_process"
import { findUp, getProjectPath } from "../../../utils"
import { STATIC_DIR } from '../constant'


const TSC_SETTING_CONFIG = path.resolve(STATIC_DIR, 'tsconfig.json')
const settingPathMap = {
  config: TSC_SETTING_CONFIG,
}

const genTscArgs = () => [
  `-p ${settingPathMap.config}`,
]

export const execute = (argv: any[] = []) => {
  const projectRoot = getProjectPath()
  execSync(`tsc ${argv.join(' ')}`, { stdio: 'inherit' })
}
