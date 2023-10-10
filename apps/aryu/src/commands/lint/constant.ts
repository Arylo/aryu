import { getStaticPath } from "../../utils"

export const COMMAND = ['lint']

export const STATIC_DIR = getStaticPath(COMMAND[0])
