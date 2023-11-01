import { ICommandObj } from './command'

export default function (...commands: string[]) {
  /* eslint-disable-next-line @typescript-eslint/no-require-imports */
  return require(`../commands/${commands.join('/')}`).default as ICommandObj
}
