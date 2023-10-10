import { getStaticPath } from "../../utils"

export const COMMAND = ['init']

export const STATIC_DIR = getStaticPath(COMMAND[0])
