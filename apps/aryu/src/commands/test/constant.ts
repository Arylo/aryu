import { getStaticPath } from "../../utils"

export const COMMAND = ['test']

export const STATIC_DIR = getStaticPath(COMMAND[0])
