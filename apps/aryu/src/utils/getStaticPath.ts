import path from 'path'

export const getStaticPath = (command: string) => path.resolve(__dirname, '../../static', command)
