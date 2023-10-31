import { runTurboCmd } from "../../utils"
import { COMMAND } from "./constant"

export { COMMAND } from "./constant"

export const execute = (argv: string[] = []) => {
  runTurboCmd(COMMAND[0], argv)
}
