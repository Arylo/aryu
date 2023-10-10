import { getStaticPath } from "../../utils"

export const COMMAND = ['build']

export const STATIC_DIR = getStaticPath(COMMAND[0])
