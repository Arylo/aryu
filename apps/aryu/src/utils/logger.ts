import { findUp } from './findUp'

export function genLogger(cwd?: string) {
  const curCwd = cwd ?? findUp(['package.json'])
  return {
    debug(...args: any[]) {
      console.debug(`${curCwd} >`, ...args)
    },
    info(...args: any[]) {
      console.info(`${curCwd} >`, ...args)
    },
    warn(...args: any[]) {
      console.warn(`${curCwd} >`, ...args)
    },
    error(...args: any[]) {
      console.error(`${curCwd} >`, ...args)
    },
  }
}
