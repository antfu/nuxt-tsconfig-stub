import { dirname, join } from 'path'
import fs from 'fs'
import fg from 'fast-glob'

const cwd = process.cwd()
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
