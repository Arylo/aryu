import { ICommandObj } from "./command"

interface IDefineCommandOptions {
  turbo: boolean;
}

export default function (cmdKey: string | string[], cmdObj: ICommandObj, cmdOpts?: Partial<IDefineCommandOptions>) {
  const realKey = typeof cmdKey === 'string' ? [cmdKey] : cmdKey
  const options = Object.assign({
    turbo: false,
  }, cmdOpts)
  return [realKey, cmdObj, options] as [string[], ICommandObj, IDefineCommandOptions]
}
