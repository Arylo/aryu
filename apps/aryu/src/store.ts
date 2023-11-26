import { AsyncLocalStorage } from 'async_hooks'

interface StoreMap {
  cwd: string,
}

const store = new AsyncLocalStorage<StoreMap>()

export function storeRun<T extends Record<string, any>>(fn: Function, appendContext?: Partial<StoreMap & T>) {
  return store.run(Object.assign({}, { cwd: process.cwd() }, appendContext), () => fn())
}

export function getStore<T extends Record<string, any>>() {
  return (store.getStore() ?? { cwd: process.cwd() }) as StoreMap & T
}
