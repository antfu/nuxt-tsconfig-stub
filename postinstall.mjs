import { dirname, join, resolve } from 'path'
import fs from 'fs'
import { pathToFileURL } from 'url'
import fg from 'fast-glob'

const cwd = process.env.INIT_CWD || resolve('../../../', pathToFileURL(import.meta.url))
const files = fg.sync('**/tsconfig.json', {
  ignore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.output/**',
    '**/.dist/**',
    '**/.cache/**',
    '**/temp/**',
  ],
  onlyFiles: true,
  absolute: true,
  cwd,
})

for (const file of files) {
  const stubPath = join(dirname(file), '.nuxt/tsconfig.json')
  if (fs.existsSync(stubPath))
    continue
  const content = fs.readFileSync(file, 'utf8')
  if (content.includes('.nuxt/tsconfig.json')) {
    const dir = dirname(stubPath)
    if (!fs.existsSync(dir))
      fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(stubPath, '{}')
    // eslint-disable-next-line no-console
    console.log('stub', stubPath)
  }
}
