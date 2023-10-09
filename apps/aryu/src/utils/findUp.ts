import fs from 'fs'
import path from 'path'

export function findUp(targets: string[]) {
  const cwd = process.cwd()
  const { root } = path.parse(cwd)
  const paths: string[] = [cwd]

  let current = cwd
  do {
    current = path.resolve(current, '..')
    paths.push(current)
  } while (current !== root)

  for (const p of paths) {
    const exists = targets
      .map(target => path.resolve(p, target))
      .map(filepath => fs.existsSync(filepath))
    if (exists.includes(false)) continue
    return p
  }
  return undefined
}
