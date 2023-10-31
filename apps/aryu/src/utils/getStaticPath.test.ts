import path from 'path'
import { expect, test } from 'vitest'
import { getStaticPath } from './getStaticPath'

test('should return the command of the static path', () => {
  const source = getStaticPath('init')
  const target = path.resolve(__dirname, '../../static/init')
  expect(source).toBe(target)
})
