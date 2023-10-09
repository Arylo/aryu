interface ICommandObj {
  COMMAND: string[];
  execute: Function;
}

type IOrCommandObj = ICommandObj | Record<string, ICommandObj>

export const parseCommands = (obj: IOrCommandObj) => {
  const commands: ICommandObj[] = []
  if (isCommandObj(obj)) {
    commands.push(obj)
  } else {
    const commandObjs = Object.values(obj)
    commandObjs.forEach(obj => commands.push(...parseCommands(obj)))
  }
  return commands
}

const isCommandObj = (obj: IOrCommandObj): obj is ICommandObj => {
  if (typeof obj !== 'object') return false
  const keys = Object.keys(obj)
  return keys.includes('COMMAND') && keys.includes('execute')
}
