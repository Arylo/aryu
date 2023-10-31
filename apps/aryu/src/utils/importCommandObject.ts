import { ICommandObj } from "./command";

export default function (...commands: string[]) {
  return require(`../commands/${commands.join('/')}`).default as ICommandObj
}
